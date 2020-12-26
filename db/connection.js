const {Sequelize} = require('sequelize');

 const sequelize = new Sequelize({
     dialect: 'sqlite',
     storage: './db/database.db'
});

sequelize.authenticate().then(()=>{
    console.log("Sequelize inicializado com sucesso! ");
}).catch(err =>{
   console.log("Erro ao inicializar o Sequelize"); 
})

module.exports = sequelize;