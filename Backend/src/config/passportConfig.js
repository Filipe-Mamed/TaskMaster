const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// Configuração da estratégia local
passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'senha' },
        function (email, senha, done) {
            Usuario.findOne({ email: email })
                .then(function (usuario) {
                    if (!usuario) {
                        return done(null, false, { message: 'Essa conta não existe!' });
                    }

                    bcrypt.compare(senha, usuario.senha, function (erro, batem) {
                        if (erro) {
                            return done(erro); // Tratamento de erro do bcrypt
                        }
                        if (batem) {
                            return done(null, usuario);
                        } else {
                            return done(null, false, { message: 'Senha incorreta!' });
                        }
                    });
                })
                .catch(function (err) {
                    return done(err); // Tratamento de erro do banco de dados
                });
        }
    )
);

// Serialização do usuário
passport.serializeUser(function (usuario, done) {
    done(null, usuario.id);
});

// Desserialização do usuário
passport.deserializeUser(function (id, done) {
    Usuario.findById(id)
        .lean()
        .then(function (usuario) {
            done(null, usuario);
        })
        .catch(function (err) {
            done(err, null); // Tratamento de erro no banco de dados
        });
});

module.exports = passport;
