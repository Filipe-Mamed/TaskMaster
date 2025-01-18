const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const passport = require("passport");

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
          .then(function () {
            // Sucesso
            res
              .status(201)
              .json({ message: "Usuário cadastrado com sucesso!" });
          })
          .catch(function (err) {
            // Em caso de erro
            res.status(500).json({
              message: "Erro ao cadastrar usuário.",
              err,
            });
          });
      })
      .catch(function (err) {
        // Erro ao verificar o usuário
        res.status(500).json({
          message: "Erro ao verificar usuário.",
          err,
        });
      });
  }
};

// Login
exports.login = function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/tarefas', // Redireciona para a página de tarefas em caso de sucesso
        failureRedirect: '/login', // Redireciona para a página de login em caso de falha
        passReqToCallback: true
    })(req, res, next);
}

// Sair
exports.sair = function(req, res){
    req.logout();
    res.status(201).json({redirectTo: '/login'}) // Redireciona para a página de login após sair
}
