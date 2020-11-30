const sqlite = require('sqlite-sync');

sqlite.run(`
    CREATE TABLE annotations(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     importance TEXT NOT NULL,
     user_id INT NOT NULL,
     FOREIGN KEY(user_id) REFERENCES users(id)
);`,err=>{
    err ? console.log(err) : console.log("Tabela annotations criada com sucesso");
});
