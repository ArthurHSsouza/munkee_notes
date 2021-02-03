const AnnotationModel = require('../models/annotationModel');
const slugify = require('slugify');

module.exports = class Annotations extends AnnotationModel{
   
    show = async (req,res)=>{
       
       let {page} = req.params; 
       let totalPages = 1;
    
       try{

            var {annotations, image, mimetype} = await this.showModel(req.session.user.id, page);
            if(annotations.count != 0){
                if(annotations.count % 11 == 0){
                    totalPages = parseInt(annotations.count/11);
                }else{ 
                  totalPages = parseInt(annotations.count/11)+1;
                } 
            }

            if(page > totalPages){

                res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

            }else{
                
                res.render('main',
                {   
                    annotations: annotations.rows, 
                    username: slugify(req.session.user.name), 
                    page, 
                    size: totalPages,
                    image,
                    mimetype
                }); 
            }

        }catch(err){
            console.log(err);
            res.render('main',
            {
                annotations: undefined, 
                username: slugify(req.session.user.name),
                page: 1,
                size: totalPages,
                image,
                mimetype
            });
        }
    }

    create = async (req,res)=>{

        let {content, importance} = req.body;
        try{

            await this.createModel(content, importance, req.session.user.id);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

        }catch(err){

            req.flash('error', err);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

        }   
    }
    
    save = async (req,res)=>{

        let id = req.params.id;
        let {content, importance} = req.body;
        
        try{

            await this.saveModel(content, importance, id);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

        }catch(err){

            req.flash('error',"Anotação não encontrada");
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

        }
          
    }

    delete = async (req,res)=>{
        
        let id = req.params.id;
        try{
          this.deleteModel(id);
          res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);
        }catch(err){
            req.flash('err', err);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);
        }
   
    }
}