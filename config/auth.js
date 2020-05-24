const localStrategy = require('passport-local').Strategy
const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')

// Model de usuário
    require('../models/Usuario')
    const Usuario = mongoose.model('usuarios')

//Configurando estratégia do passport
    module.exports = (passport) => {
        passport.use(new localStrategy({usernameField: 'cpf', passwordField: 'senha'}, (cpf, senha, done) => {//Estratégia do passport E o campo de referencia para logar

            Usuario.findOne({cpf: cpf}).then((usuario) =>{//procura 1 usuario com o cpf igual ao digitado
                if(!usuario)//se for encontrado
                {
                    return done(null, false, {message: 'Esta conta não existe!'});
                }

                bcrypt.compare(senha, usuario.senha, (erro, batem) => {//comparand a senha com a senha digitada
                    if(batem)
                    {
                        return done(null, usuario)
                    }else{
                        return done(null, false, {message: 'Senha incorreta'})
                    }
                })
            })

        }))

        passport.serializeUser((usuario, done) => {
            done(null, usuario.id)//Manda os dados do usuario para uma sessão
        })

        passport.deserializeUser((id, done) => {
            Usuario.findById(id, (err, usuario) => {//procura o usuario pelo id
                done(err, usuario)
            })
        })


    }


