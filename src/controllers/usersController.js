//import model
const UserModel = require('../models/userModel');
const slugify = require('slugify');


module.exports = class User extends UserModel{ 

  
  createUserInSession = (req, name, email, id)=>{
      req.session.user = {
          name,
          email,
          id
      }
  }

  getSignup = (req,res)=>{
    res.render('signup');
  }

  signup = async (req,res) => {
    var {name, email, password} = req.body;
    try{
      let {id, message} = await this.signupValidationModel(email,password,name); 
      this.createUserInSession(req, name, email, id);
      res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);
    }catch(err){
      req.flash('error', err);
      res.redirect('/users/signup');
    }
  } 
    
  getLogin = (req,res)=>{
      res.render('login');
  }

  login =  async (req,res)=>{

      let {email, password} = req.body;

      try{

        let {name, id, message} = await this.loginValidationModel(email, password);
        this.createUserInSession(req, name, email, id); 
        res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

      }catch(err){
        req.flash("error", err);
        res.redirect('/users/login');
      }
  }    

  getFrgtPassword = (req,res) =>{
      res.render('frgtPassword');
  }

  frgtPassword = async (req,res) =>{
      
      let {email} = req.body;
     
      try{  
      
        let user = await this.frgtPasswordModel(email);
        res.render('writeToken',{id: user.id});
  
      }catch(err){

        console.log(err)
        req.flash('error', err.toString());
        res.redirect('/users/frgtPassword');

      }
  }

  validateResetToken = async (req,res) => {

    var {token} = req.body;

    try{
            
      let user = await this.validateResetTokenModel(req.params.id, token);
      var {name, email, id, passwordResetToken} =  user; 

      res.render("resetPassword", {
        name,
        email,
        id,
        token: passwordResetToken
      });
  
    }catch(err){

      console.log(err);
      req.flash("error", err);
      res.redirect('/users/frgtPassword');

    }
  }
    
  resetPassword =  async (req, res) => {
      
      try{

        var {password, passwordRepeat, token, name, email, id} = req.body;
        await this.resetPasswordModel(password, passwordRepeat, token);
        this.createUserInSession(req, name, email, id);  
        res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);

      }catch(err){

        req.flash("error", err);
        res.redirect(`/users/frgtPassword`);

      }
  }

  getUploadImage = (req, res) => {
    res.render('profileImage');
  }

  uploadImage = async (req,res) => {
    
    if(!req.file){
       req.flash("error", "Arquivo inválido");
       res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);
       return;
    }
    try{
      await this.uploadImageModel(
          req.session.user.photo, 
          req.session.user.id,
          req.session.user.mimetype
        );
    }catch(err){
      console.log(err);
    }

    res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);
  }

  logout = (req,res)=>{ 

      req.session.destroy();
      res.redirect('/');

  }
}