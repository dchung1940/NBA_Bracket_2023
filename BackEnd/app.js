const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

let data = fs.readFileSync('./data.js','utf8')
data = JSON.parse(data)

app.get('/api',(req,res)=>{
    const {userID} = req.query
    
    user_data = null

    if (userID){
        user_data = data.find((playoff) => playoff["ID"] == userID)
    }
    else{
        res.status(400).json({success:false,msg:"Invalid userID"})
    }
    
    if (!user_data){
        res.status(400).json({success:false,msg:"User ID doesn't exist"})
    }

    return res.status(200).json({success:true,playoff:user_data, msg:"Success"})
})

app.post('/api', (req, res) => {

    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide name value' })
    }

    const userID = playoff["ID"]

    const found = data.find((element) => element["ID"] === userID);
    
    if (found){
        return res.status(400).json({success:false,msg:"Please use a different userID"})
    }

    let new_file = [...data,playoff]
    new_file = JSON.stringify(new_file)
    
    fs.writeFileSync('data.js',new_file,'utf8')
    res.status(201).json({ success: true, msg:"Post Successful"})
  })

app.put('/api', (req,res)=>{
    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide playoff value' })
    }

    const userID = playoff["ID"]

    const found = data.findIndex((element) => element["ID"] === userID);

    if (found == -1){
        return res.status(400).json({success:false,msg:"User ID does not exist"})
    }
    
    data[found] = playoff
    new_file = JSON.stringify(data)
    fs.writeFileSync('data.js',new_file,'utf8')
    res.status(201).json({ success: true, msg:"Update (PUT) Successful"})
})

app.put('/api', (req,res)=>{
    const playoff = req.body

    if (!playoff) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide playoff value' })
    }

    const userID = playoff["ID"]

    const found = data.findIndex((element) => element["ID"] === userID);

    if (found == -1){
        return res.status(400).json({success:false,msg:"User ID does not exist"})
    }
    
    data[found] = playoff
    new_file = JSON.stringify(data)
    fs.writeFileSync('data.js',new_file,'utf8')
    res.status(201).json({ success: true, msg:"Update (PUT) Successful"})
})

app.delete('/api', (req,res)=>{
    const {userID} = req.body
    
    if (!userID) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please provide user ID' })
    }

    const found = data.findIndex((element) => element["ID"] === userID);

    if (found == -1){
        return res.status(400).json({success:false,msg:"User ID does not exist"})
    }
    data.splice(found,1)
    new_file = JSON.stringify(data)
    fs.writeFileSync('data.js',new_file,'utf8')
    res.status(201).json({ success: true, msg:"Delete Successful"})
})

app.listen(5000, ()=>{

    console.log('Server listening to port 5000')
})