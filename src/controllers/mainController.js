module.exports = class Main{
     
    index = (req,res)=>{
          if(req.session.user){
             res.redirect(`/profileNotes/${req.session.user.name}/1`);   
          }
          res.render('index');
    }

 }