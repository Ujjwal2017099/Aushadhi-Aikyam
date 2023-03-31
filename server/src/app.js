const express = require('express');
const app = express();
const port = 8000;
const {PythonShell} = require("python-shell");
require("./connection/connection");
const Link = require("./models/link");
const cors = require("cors");


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
            let options = {
                mode: "text",
                pythonOptions: ["-u"],
                args: [str,e.mainContainer,e.container,e.bit,e.priceContainer]
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
        // res.status(200).send(ans);
        console.log(ans);
    } catch (error) {
        console.log(error);
        res.status(400).send("error");
    }
    
})

app.listen(port,()=>{
    console.log("server started");
})