const sqlite = require('sqlite-sync');

sqlite.run(`
     CREATE TABLE users(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         email TEXT NOT NULL,
         password CHAR NOT NULL
     );
`,err=>{
    if(err){
        console.log(err);
    }else{
        console.log("tabela criada com sucesso")
    }
});

