const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const passport = require("../config/passportConfig");

// Registrar um novo usuário
exports.registrar = function (req, res) {
  const { nome, email, senha, senha2 } = req.body;
  let erros = [];

  if (!nome || typeof nome == undefined || nome == null) {
    erros.push({ message: "Nome inválido!" });
  }

  if (!email || typeof email == undefined || email == null) {
    erros.push({ message: "Email inválido!" });
  }

  if (!senha || typeof senha == undefined || senha == null) {
    erros.push({ message: "Senha inválida!" });
  }

  if (senha.length < 8) {
    erros.push({
      message: "Senha inválida! A senha deve ter pelo menos 8 caracteres.",
    });
  }

  if (senha != senha2) {
    erros.push({ message: "As senhas são diferentes, tente novamente!" });
  }

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  } else {
    // Verificar se o email já existe
    Usuario.findOne({ email: email })
      .lean()
      .then(function (usuarioExistente) {
        if (usuarioExistente) {
          return res.status(400).json({
            erros: [{ message: "Email já cadastrado!" }],
          });
        }

        // Criando novo usuário
        const novoUsuario = new Usuario({
          nome,
          email,
          senha,
        });

        // Gerar o salt e fazer o hash da senha
        bcrypt
          .genSalt(10)
          .then(function (salt) {
            return bcrypt.hash(novoUsuario.senha, salt);
          })
          .then(function (hash) {
            // Atualiza a senha com o hash gerado
            novoUsuario.senha = hash;

            // Salvar o novo usuário no banco de dados
            return novoUsuario.save();
          })
          .then(function (usuario) {
            // Ao registrar com sucesso, faz o login do usuário
            req.login(usuario, function (err) {
              if (err) {
                return res.status(500).json({ message: "Erro ao fazer login após o registro", err });
              }
              // Agora o usuário está autenticado
              return res.status(201).json({ message: "Usuário registrado e autenticado com sucesso!", usuario });
            });
          })
          .catch(function (err) {
            res.status(500).json({ message: "Erro ao registrar usuário", err });
          });
      })
      .catch(function (err) {
        res.status(500).json({ message: "Erro ao verificar e registrar o usuário", err });
      });
  }
};

// Login
exports.login = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err || !user) {
      // Se houver erro ou não houver usuário, retorna um erro no frontend
      return res.status(401).json({ message: info.message });
    }
    // Se o login for bem-sucedido, retorna uma mensagem de sucesso e os dados do usuário
    req.login(user, function (err) {
      if (err) {
        return res.status(500).json({ message: "Erro ao fazer login!" });
      }
      return res.status(200).json({ message: "Login realizado com sucesso!", redirectTo: "/minhastarefas" });
    });
  })(req, res, next);
};

// Sair
exports.sair = function (req, res) {
  req.logout(function(err){
    if(err){
      return res.status(500).json({ message: "Erro ao deslogar, tente novamente!", err })
    }
    res.status(200).json({ message: "Deslogado com sucesso!", redirectTo: "/login" }) // Redireciona para a página de login após sair
  })
};
