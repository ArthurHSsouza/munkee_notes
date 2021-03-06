
const annotationDBModel = require('../../db/tables/AnnotationModel');
const userDBModel = require('../../db/tables/UserModel');
const {readFileSync} = require('fs');

module.exports = class AnnotationModel{

        #contentValidation = (content) => {

            return new Promise((resolve, reject) => {

                if(content == "" || typeof content == undefined || 
                    content == null){   

                        reject({message: "Conteúdo inválido", treated: true});

                    }

                resolve();
            });  
        }
    
        #importanceValidation = (importance) => {

            return new Promise((resolve, reject) => {

                if(importance == "" || importance != "#98eb34" && importance != "#ebe534" && 
                importance != "#eb8634"){

                    reject({message: "Importância inválida", treated: true});
                }
        
                resolve();

            });
        }

        showModel = async(id, page)=>{
            
            try{   
                
                var {dataValues} = await userDBModel.findOne({where: {id: id}});
                var annotations = await annotationDBModel.findAndCountAll({
                    limit: 11,
                    offset: page * 11 - 11,
                    where: {userId: id},
                    order: [['createdAt','DESC']]
                });

                if(dataValues.image){
                    var  image = readFileSync(dataValues.image) || null;
                    var  mimetype = dataValues.mimetype || null;
                }

                annotations.rows.forEach(annotation =>{
                    annotation.date = annotation.createdAt.toString().slice(0, 24);
                });

                return {annotations, image, mimetype}; 

            }catch(error){
                console.log(error);
                throw new Error("Error consulting the data in the database");
            }
        }

        createModel = async (content, importance, id) => {

            let err;

            try{

                await this.#contentValidation(content);
                await this.#importanceValidation(importance);

                await annotationDBModel.create(
                {content, importance, UserId: id});

            }catch(error){

                error.treated ? err = error.message : err = "Erro ao salvar anotação";

            }

            return new Promise((resolve, reject) => {
                    
                err ? reject(err) : resolve();

            });   

        }

        saveModel = async(content, importance, id) => {

            let err;

            try{

                await this.#contentValidation(content);
                await this.#importanceValidation(importance);

                await annotationDBModel.update(
                {content, importance}, {where: {id: id}}
                );

            }catch(error){

                console.log(error);
                error.treated ? err = error.message : err = "Erro ao salvar anotação";

            }

            return new Promise((resolve, reject) => {
                    
                err ? reject(err) : resolve();

            });   

        }

        deleteModel = async (id) => {
            let err;

            try{
                await annotationDBModel.destroy({where: {id: id}});
            }catch{
                err = "Erro ao deletar anotação";
            }

            return new Promise((resolve, reject) => {
                err ? reject(err) : resolve();
            });
        }
   }




  
    

   
     
    
