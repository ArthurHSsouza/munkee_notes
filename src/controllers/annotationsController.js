const AnnotationModel = require('../models/annotationModel');
const annotationDBModel = require('../../db/tables/AnnotationModel');
const slugify = require('slugify');

module.exports = class Annotations extends AnnotationModel{
   
   static blockPrivateRoutes = async (req,res,next)=>{
        req.session.user ? next() : res.redirect('/');
    }

    show = async (req,res)=>{

       try{

            let annotations = await annotationDBModel.findAll({where: {userId: req.session.user.id}});
            res.render('main',{annotations, username: slugify(req.session.user.name)}); 

        }catch{

            res.render('main',{username: slugify(req.session.user.name)});
            
        }
    }

    create = async (req,res)=>{

        let {content, importance} = req.body;
        try{

            await this.createModel(content, importance, req.session.user.id);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);

        }catch(err){

            req.flash('error', err);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);

        }   
    }
    
    save = async (req,res)=>{

        let id = req.params.id;
        let {content, importance} = req.body;
        
        try{

            await this.saveModel(content, importance, id);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);

        }catch(err){

            req.flash('error',"Anotação não encontrada");
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);

        }
          
    }
    

    delete = async (req,res)=>{
        
        let id = req.params.id;
        try{
          this.deleteModel(id);
          res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);
        }catch(err){
            req.flash('err', err);
            res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);
        }
   
    }
}