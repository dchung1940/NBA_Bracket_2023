const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const Playoffs = require("./mongoose/schemas/Playoffs")
require("./mongoose/index")

app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

let data = fs.readFileSync('./data.js','utf8')
data = JSON.parse(data)

app.get('/api',async (req,res)=>{
    const {userID} = req.query
    
    user_data = null
    try{
    const data  = await Playoffs.find({ID:`${userID}`},{_id:false,__v:false})
    if (data.length >0) {
        res.status(201).json({success:true,playoff:data[0],msg:"Success"})
    }
    else{
        res.status(400).json({success:false,msg:"Entered ID doesn't exist"})
    }
    }
    catch(err){
        // console.log(err.message)
        res.status(400).json({success:false,msg:"Server Error"})
    }
    

    // MySQL Code

    // query = `select * from playoffs where ID = "${userID}"`

    // db.promise().query(query).then((result )=>{
    //     if (result[0].length == 0){
    //         res.status(400).json({ success: false, msg:"Entered ID doesn't exist"})
    //     }
    //     else{
    //     res.status(201).json({ success: true,playoff:result[0], msg:"Success"})
    //     }
    // }
    // ).catch((error)=>{
    //     res.status(400).json({ success: false, msg:"Error"})
    // }
    // )
})

app.post('/api', async (req, res) => {

    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide name value' })
    }

    const userID = playoff["ID"]

    try{
        const data  = await Playoffs.find({ID:`${userID}`})
        if (data.length >0) {
            const {Id,...rest} = playoff
            await Playoffs.updateOne({ID:`${userID}`},{$set:{
                ...rest
            }})
            res.status(201).json({success:true,playoff:data,msg:"Update Success"})
        }
        else{
            await Playoffs.create({...playoff})
            res.status(201).json({success:true,msg:"Addition Success"})
        }
        }
    catch(err){
        // console.log(err.message)
        res.status(400).json({success:false,msg:"Server Error"})
    }

        //MySQL Code

        // query = "insert into playoffs values("
        // query = postHelper(query,playoff)

        // db.promise().query(query).then(()=>{
        //     res.status(201).json({ success: true, msg:"Success"})
        // }
        // ).catch((error)=>{
        //     res.status(400).json({ success: false, msg:"Please use a different ID"})
        // }
        // )

  })

app.put('/api', async (req,res)=>{
    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide playoff value' })
    }

    const userID = playoff["ID"]

    try{
        const data  = await Playoffs.find({ID:`${userID}`})
        if (data.length >0) {
            const {Id,...rest} = playoff
            await Playoffs.updateOne({ID:`${userID}`},{$set:{
                ...rest
            }})
            res.status(201).json({success:true,playoff:data,msg:"Update Success"})
        }
        else{
            res.status(201).json({success:false,msg:"ID does not exist to Update"})
        }
        }
    catch(err){
        // console.log(err.message)
        res.status(400).json({success:false,msg:"Server Error"})
    }

    // MySQL Code

    // let query_1 = `delete from playoffs where id = "${userID}";`
    // let query_2 = "insert into playoffs values(" + postHelper("",playoff)

    // try{
    //     let result = await db.promise().query(query_1)
    //     if (result[0]["affectedRows"] == 0){
    //         res.status(400).json({success:false,msg:"ID does not exist to Delete"})
    //     }
    //     else{        
    //         await db.promise().query(query_2)
    //         res.status(200).json({success:true,msg:"Updated"})
    //     }
    //   } catch(err) {
    //     res.status(400).json({success:false,msg:"ID does not exist to delete"})
    //   }
})



app.delete('/api', async (req,res)=>{
    const {userID} = req.body
    
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide user ID' })
    }

    try{
        const data  = await Playoffs.deleteOne({ID:`${userID}`})
        if (data["deletedCount"] > 0) {
            res.status(201).json({success:true,msg:"Deleted"})
        }
        else{
            res.status(400).json({success:false,msg:"Entered ID doesn't exist"})
        }
        }
        catch(err){
            // console.log(err.message)
            res.status(400).json({success:false,msg:"Server Error"})
        }


    // MySQL Code

    // let query = `delete from playoffs where id = "${userID}";`
    // try {
    //     let result = await db.promise().query(query)
    //     if (result[0]["affectedRows"] == 0){
    //         res.status(400).json({success:false,msg:"ID does not exist to Delete"})
    //     }
    //     else{
    //         res.status(200).json({success:true,msg:"Deleted"})
    //     }
    // }
    // catch(error){
    //     res.status(400).json({success:false,msg:"ID does not exist to Delete"})
    // }
})

app.listen(5000, ()=>{

    console.log('Server listening to port 5000')
})

function postHelper(query,playoff){
        for (const [key, value] of Object.entries(playoff)) {
            if (typeof(value) === "object"){
                value.forEach((prop)=>{
                    query += `, "${prop}"`
                })
            }
            else if (key == "ID"){
                query += `"${value}"`
            }
            else{
                query += `, ${value}`
            }
        } 
        query += ");"
        return query
}