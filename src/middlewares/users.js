const slugify = require('slugify');

module.exports = { 
    
    blockPrivateRoutes: async (req,res,next)=>{
        req.session.user ? next() : res.redirect('/');
    },

    disableAuthRoutes: (req,res,next)=>{
        
        if(!req.session.user){
            next();
        }else{
        res.redirect(`/profileNotes/${slugify(req.session.user.name)}/1`);
    }

    }
}
 
