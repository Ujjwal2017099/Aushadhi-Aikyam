const express = require('express');
const app = express();
const port = 8000;
const {PythonShell} = require("python-shell");

app.get('/',async (req,res)=>{
    // console.log(req.query);
    let options = {
        mode: "text",
        pythonOptions: ["-u"], 
        args: [req.query.url,req.query.med_container_class,req.query.med_name_class,req.query.bit,req.query.med_price_class], 
    };
    let x= await PythonShell.run("src/scrap_and_ocr/get_medicine_data.py", options, function (err, result) {
        if (err) console.log(err);
    });
    let ans = "";
    for(let i=0;i<x.length;i++) ans +=x[i];
    // ans = ans.slice(2,ans.length-2);
    res.send(JSON.parse(ans));
})
app.listen(port,()=>{
    console.log("server started");
})