const userDBModel = require('../../db/tables/UserModel');
const {transport} = require('../mailer');
const {promisify} = require('util');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = class UserModel{

   genSalt = promisify(bcrypt.genSalt);
   hash = promisify(bcrypt.hash);
  
   loginValidationModel = async (email,password) => { 
   
      let err; 

      try{
         if(!email || email == undefined || email == null){
             err = "E-mail não pode ser vazio";
            }else{
               var user = await userDBModel.findOne({
               attributes: ['password', 'id', 'name'],
               where:  {email: email}
            });
         }

      }catch{ 
         err = "Erro ao tentar login";
      }
         
      return new Promise((resolve, reject) => {
         try{
            if(!err){
               if(user == null){
                  reject("Usuário não encontrado");
               }else{
                  let same = bcrypt.compareSync(password, user.password);
                  if(same){
                     let {name, id} = user;
                     resolve({name, id, message: `Bem vindo ${name}!`});
                  }else{
                     reject("Senha inválida"); 
                  }
               } 
            }else{
               reject(err);
            }
         }catch{
            reject("Erro ao tentar login");
         }

      }); 
   }

   signupValidationModel = async (email, password, name) => {

      let regex = new RegExp(/\w/);
      var err;

      try{
         if(!name || name == undefined || name == null){
            err = "Nome inválido";
         }else{
            if(!email || email == undefined || email == null){
               err = "E-mail não pode ser vazio";
            }else{
               let userExists = await userDBModel.findOne({where: {email: email}});
               if(userExists == null){
                  if(password.length < 6 || !regex.exec(password)){
                     err = "Senha muito fraca";
                  }else{
                     let salt = await this.genSalt(10);
                     let hashedPassword = await this.hash(password, salt);
                     var {id} = await userDBModel.create({
                        name: name, 
                        email: email, 
                        password: hashedPassword
                     });
                  }
               }else{
                  err = "Usuário já existe";
               }  
            }
         }
      }catch{
         err = "Erro ao realizar cadastro";
      }
    
      return new Promise((resolve, reject) =>{
         
         err ?  reject(err) : resolve({id, message: `Bem vindo ${name}!`})
      
      });
   }   

   frgtPasswordModel = async (email) => {
      
      try{

         var err;
         var user = await userDBModel.findOne({where: {email: email}});

         if(user != null){

            let expires = new Date().getTime();
            expires += 1000 * 60 * 60;
            var token = crypto.randomBytes(8).toString("hex");
            
            await userDBModel.update({passwordResetExpires: expires, passwordResetToken: token},
            {where: {email: user.email}});
         
           await transport.sendMail({
               from: `jorgerufao@gmail.com`,
               to: `${email}`, 
               subject: "Troca de Senha",
               text: "", 
               html: `<b>Seu código de troca de senha é ${token}</b>`, 
            });

         }else{
            err = "email inválido"
         }
         
      }catch(err){
        console.log(err);
        err = 'Erro ao enviar o email';
      }

      return new Promise((resolve, reject) => {
          err ? reject(err) : resolve(user);
      });
   }  

   validateResetTokenModel = async (id, token) => {
      
      var err;
      try{
         var user = await userDBModel.findOne({where: {id: id}});

         if(user != null){
            if(token == user.passwordResetToken){
               let date = new Date().getTime();
               if(date > user.passwordResetExpires){
                  err = "Token expirado";
               }
             }else{
               err = "Código incorreto";
             }
         }else{
            err = "Usuário não encontrado";
         }
      }catch(err){
           err = "Erro inesperado ao recuperar senha";
      }

      return new Promise((resolve, reject) =>{
          err ? reject(err) : resolve(user);
      });
   }

   resetPasswordModel = async (password, passwordRepeat, token) => {

      let err;

      try{
         if(password == passwordRepeat){
            if(password.length > 6){

               let salt = await this.genSalt(10);
               let encrypted = await this.hash(password, salt);
               let user = await userDBModel.update({password: encrypted}, {where: {passwordResetToken: token}});
               console.log(user);
               
            }else{
               err = "Senha inválida";
            }
         }else{
            err = "As senhas devem ser iguais";
         }
      }catch(err){
         err = "Um erro inesperado aconteceu! Desculpe";
      }

      return new Promise((resolve, reject) => {
         err ? reject(err) : resolve();
      });
   }
}