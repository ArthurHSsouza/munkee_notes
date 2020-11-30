const validation = require('./validation/userValidation');
const sqlite = require('sqlite-sync');
const slugify = require('slugify');
const bcrypt = require('bcrypt');
const util = require('util');

module.exports = class User{ 

  constructor(){
    this.genSalt = util.promisify(bcrypt.genSalt);
    this.hash = util.promisify(bcrypt.hash);
  }

  disableAuthRoutes = (req,res,next)=>{
    if(!req.session.user){
        next();
    }else{
      res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);
  }
}

  createUserInSession = (req, name, email, password, id)=>{
      req.session.user = {
          name,
          email,
          password,
          id
      }
   }

    getSignup = (req,res)=>{
      res.render('signup');
    }

  signup = async (req,res) => {
    var {name, email, password} = req.body;
    try{
      await validation.signupValidation(email,password,name)
      let salt = await this.genSalt(10);
      let hashedPassword = await this.hash(password,salt);
     let id = sqlite.run(`INSERT INTO users (name,email,password) 
      VALUES("${name}","${email}","${hashedPassword}")`);         
      this.createUserInSession(req, name, email, hashedPassword, id);
      res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);
    }catch(err){
      console.log(err);
      req.flash('error', "Preecha os dados corretamente");
      res.redirect('/users/signup');
    }
  } 
    
    getLogin = (req,res)=>{
      res.render('login');
    }

    login = async(req,res)=>{
      let {email, password} = req.body;
      try{
        let {name, id} = await validation.loginValidation(email, password);
        this.createUserInSession(req, name, email, password, id); 
        res.redirect(`/profileNotes/${slugify(req.session.user.name)}`);
      }catch(err){
        req.flash("error","Preecha os dados corretamente");
        res.redirect('/users/login');
      }
    }    

    logout = (req,res)=>{ 
      req.session.destroy();
      res.redirect('/');
   }
 }