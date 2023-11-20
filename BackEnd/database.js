// const mysql = require('mysql2');

// module.exports = mysql.createConnection({
//     host:'localhost',
//     user:'dchung',
//     password:'ei58vakm',
//     database:'React'
// })

const mongoose = require('mongoose')


module.exports = ()=>{
    mongoose.connect('mongodb://localhost:27017/playoffs')
    .then(()=>{console.log("Connected")})
    .catch((err)=>console.log(err))
}


// {
//     connectToDb:()=>{
//         MongoClient.connect('mongodb://localhost:27017/playoffs')
//         .then((client)=>{
//             dbConnection = client.db()
//         })
//         .catch(err =>{
//             console.log(err)
//         })
//     },
//     getDb: ()=>dbConnection
// }