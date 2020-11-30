const sqlite = require('sqlite-sync');
const validate = require('./validation/annotationValidation');


module.exports = class Annotations{
   
   static blockPrivateRoutes = (req,res,next)=>{
         if(req.session.user) next();
         //res.json({err: "Usuário precisa estar logado"});
         res.redirect('/');
    }

    main = (req,res) => {
        res.render('main');
    }

    show = (req,res)=>{
        console.log(req.session.user.id)
        let annotations = sqlite.run(`
        SELECT * FROM annotations WHERE user_id = "${req.session.user.id}"
        `);   
        res.statusCode = 200;
        res.json(annotations[0].values);
    }

    save = (req,res)=>{
        console.log(req.session.user);
        let {title, content, importance} = req.body;
        err = [];
        err = validate(title, "Título inválido", err);
        err = validate(content, "Conteúdo inválido", err);
        err = validate(importance, "Importância inválida", err);
        if(err.length > 0){
             //res.json(err);
             res.redirect('/');
        }else{
           let user_id = req.session.user.id;
           sqlite.run(`INSERT INTO annotations(title,content,importance,user_id) 
           VALUES ("${title}", "${content}", "${importance}","${user_id}");`);
           //res.json({success: "Anotação salva com sucesso"});
           res.redirect('/');
        }
    }

    delete = (req,res)=>{
           
    }
}