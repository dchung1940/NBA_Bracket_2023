const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const db = require('./database')

app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

let data = fs.readFileSync('./data.js','utf8')
data = JSON.parse(data)

app.get('/api',(req,res)=>{
    const {userID} = req.query
    
    user_data = null

    query = `select * from playoffs where ID = "${userID}"`

    db.promise().query(query).then((result )=>{
        if (result[0].length == 0){
            res.status(400).json({ success: false, msg:"Entered ID doesn't exist"})
        }
        else{
        res.status(201).json({ success: true,playoff:result[0], msg:"Success"})
        }
    }
    ).catch((error)=>{
        res.status(400).json({ success: false, msg:"Error"})
    }
    )
})

app.post('/api', (req, res) => {

    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide name value' })
    }

    // const userID = playoff["ID"]

    // const found = data.find((element) => element["ID"] === userID);
    
    // if (found){
    //     return res.status(400).json({success:false,msg:"Please use a different userID"})
    // }

    // let new_file = [...data,playoff]
    // new_file = JSON.stringify(new_file)
    
    // fs.writeFileSync('data.js',new_file,'utf8')
        query = "insert into playoffs values("
        query = postHelper(query,playoff)

        db.promise().query(query).then(()=>{
            res.status(201).json({ success: true, msg:"Success"})
        }
        ).catch((error)=>{
            res.status(400).json({ success: false, msg:"Please use a different ID"})
        }
        )

  })

app.put('/api', async (req,res)=>{
    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide playoff value' })
    }

    const userID = playoff["ID"]

    // const found = data.findIndex((element) => element["ID"] === userID);

    // if (found == -1){
    //     return res.status(400).json({success:false,msg:"User ID does not exist"})
    // }
    
    // data[found] = playoff
    // new_file = JSON.stringify(data)
    // fs.writeFileSync('data.js',new_file,'utf8')
    // res.status(201).json({ success: true, msg:"Update (PUT) Successful"})
    let query_1 = `delete from playoffs where id = "${userID}";`
    let query_2 = "insert into playoffs values(" + postHelper("",playoff)

    try{
        let result = await db.promise().query(query_1)
        if (result[0]["affectedRows"] == 0){
            res.status(400).json({success:false,msg:"ID does not exist to Delete"})
        }
        else{        
            await db.promise().query(query_2)
            res.status(200).json({success:true,msg:"Updated"})
        }
      } catch(err) {
        res.status(400).json({success:false,msg:"ID does not exist to delete"})
      }
})



app.delete('/api', async (req,res)=>{
    const {userID} = req.body
    
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide user ID' })
    }

    // const found = data.findIndex((element) => element["ID"] === userID);

    // if (found == -1){
    //     return res.status(400).json({success:false,msg:"User ID does not exist"})
    // }
    // data.splice(found,1)
    // new_file = JSON.stringify(data)
    // fs.writeFileSync('data.js',new_file,'utf8')
    // res.status(201).json({ success: true, msg:"Delete Successful"})

    let query = `delete from playoffs where id = "${userID}";`
    try {
        let result = await db.promise().query(query)
        if (result[0]["affectedRows"] == 0){
            res.status(400).json({success:false,msg:"ID does not exist to Delete"})
        }
        else{
            res.status(200).json({success:true,msg:"Deleted"})
        }
    }
    catch(error){
        res.status(400).json({success:false,msg:"ID does not exist to Delete"})
    }
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