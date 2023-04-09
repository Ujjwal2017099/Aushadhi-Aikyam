const express = require('express');
const app = express();
const port = 8000;
const {PythonShell} = require("python-shell");
require("./connection/connection");
const Link = require("./models/link");
const cors = require("cors");
const User = require('./models/user')
const jwt = require('jsonwebtoken');
require("dotenv").config();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

app.get('/',async (req,res)=>{
    let ans = [];
    let complete = false;
    try {
        let name = req.query.name;
        let webData = await Link.find();
        // console.log(name);
        await webData.forEach(async (e)=>{
            let str = e.url;
            let arr = str.split('^');
            str = arr[0]+name;
            for(let i=1;i<arr.length;i++) str += arr[i];
            e.url = str
            console.log(e);
            let options = {
                mode: "text",
                pythonOptions: ["-u"],
                args: [str,e.mainContainer,e.container,e.bit,e.priceContainer,e.linkBit,e.linkContainer]
            };
            let x = await PythonShell.run(
                "src/scrap_and_ocr/get_medicine_data.py",
                options,
                function (err, result) {
                    if (err) console.log(err);
                }
            );
            let temp = "";
            for (let i = 0; i < x.length; i++) temp += x[i];
            temp = JSON.parse(temp);
            let company = e.name;
            temp.forEach((e)=>{
                e.company = company
            })
            ans.push(temp);
            if (ans.length===4) res.send(ans);
        })
        console.log(ans);
    } catch (error) {
        console.log(error);
        res.status(400).send("error");
    }
    
})

app.post('/register',async (req,res)=>{
    // console.log(req.body);
    const user = new User({Name : req.body.name,Email : req.body.email,Password : req.body.password});
    user.save()
    .then(()=>{
        console.log("user saved");
        // console.log(user);
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(400);
    })
})

app.get('/login', async (req,res)=>{
    let status = 400
    let token="";   
    try {
        // console.log(req.body);
        const r = await User.find({Email : req.query.email,Password : req.query.password})
        // console.log(r);
        if(r.length) {
            status = 200
            token = jwt.sign({
                Email: req.query.email,
                Password: req.query.password,
            },process.env.ACCESS_KEY);
        }
        
    } catch (error) {
        
        console.log(error);
    }
    // console.log(token);
    res.status(status).json(token);
})

app.get('/profile',async (req,res)=>{

    try{
        const token = req.query.token;
        // const ret="";
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if(err) console.log(err);
            else{
            const r = await User.find({Email:user.Email,Password:user.Password});
            // console.log(r);
                res.json({Email : r[0].Email,Name : r[0].Name,History : r[0].History});
            }
        })
    }catch(err){
        console.log(err);
    }
    
})

app.post('/userhistory',(req,res)=>{
    try {
        const token = req.body.token;
        const history = req.body.history;
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) console.log(err);
            else {
                const r = await User.findOneAndUpdate({
                    Email: user.Email,
                    Password: user.Password,
                },{
                    Email : user.Email,
                    Password : user.Password,
                    Name : user.Name,
                    History : history
                });
                // console.log(r);
                res.sendStatus(201);
            }
        });
    } catch (error) {
        
    }
})

app.listen(port,()=>{
    console.log("server started");
})