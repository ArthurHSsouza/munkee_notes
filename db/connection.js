const {Sequelize} = require('sequelize');
const path = require('path');

 const sequelize = new Sequelize({
     dialect: 'sqlite',
     storage: path.resolve(__dirname,'database.db')
});

sequelize.authenticate().then(()=>{
    console.log("Sequelize inicializado com sucesso! ");
}).catch(err =>{
   console.log("Erro ao inicializar o Sequelize"); 
})

module.exports = sequelize;