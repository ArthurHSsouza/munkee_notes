const sqlite = require('sqlite-sync');
const bcrypt = require('bcrypt');

module.exports = {
       
        loginValidation(email,password){ 
        
         return new Promise((resolve, reject)=>{
            try{
            if(!email || email == undefined || email == null){
               throw new Error("E-mail não pode ser vazio");
            }else{
               let user = sqlite.run(`SELECT password, id, name 
               FROM USERS WHERE email = "${email}"`);
               if(user == ""){
                 throw new Error("usuário não encontrado");
               }else{
                    bcrypt.compare( password, user[0].password, (err, same) =>{
                         if(same){
                           let {name, id} = user[0];
                           resolve({name, id});
                        }else{
                           throw new Error("Senha incorreta");
                        }
                    });
                 }
               }
         }catch(err){ 
            reject({err});
         }
      })
   },

      signupValidation(email, password, name){
      return new Promise((resolve, reject) =>{
         let regex = new RegExp(/\w/);
         try{
            if(!name || name == undefined || name == null){
               throw new Error("Nome inválido");
            }else{
                  if(!email || email == undefined || email == null){
                  throw new Error("E-mail não pode ser vazio");
                  }else{
                     let exists = sqlite.run(`SELECT 1 FROM users WHERE email = "${email}"`);
                     if(exists != ""){
                     throw new Error("E-mail indisponível");
                     }else if(password.length < 6 || !regex.exec(password)){
                        throw new Error("Senha muito fraca");
                     }else{
                        resolve(true);
                     }
                  }   
               }
            }catch(err){
               reject({err});
            }
         }   
      ) 
   }   
}