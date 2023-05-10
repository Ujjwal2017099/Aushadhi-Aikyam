const express = require('express');
const app = express();
const port = 4000;
const {PythonShell} = require("python-shell");
require("./connection/connection");
const Link = require("./models/link");
const cors = require("cors");
const User = require('./models/user')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const fileUpload = require('express-fileupload')
const fs = require('fs')
const Seller = require('./models/seller')
const Product = require('./models/products')
const Order = require('./models/orders')

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload());

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
            // console.log(e);
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
        // console.log(ans);
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
        // console.log(token);
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if(err) console.log(err);
            else{
            const r = await User.find({Email:user.Email,Password:user.Password});
            // console.log(r);
                if(r.length)res.json(r[0]);
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

app.post('/getFile', async (req,res)=>{

    try {
        if(req.files){
            const file = req.files.file;
            const name = Date.now() + file.name;
            const path = __dirname + '/uploads/' + name;

            file.mv(path , (err)=>{
                if(err) return res.sendStatus(500);
                console.log('file uploaded successfully');
            })
            let options = {
                mode: "text",
                pythonOptions: ["-u"],
                args: [path]
            };
            let x = await PythonShell.run(
                "src/scrap_and_ocr/vision_ocr.py",
                options,
                function (err, result) {
                    if (err) console.log(err);
                }
            );
            // console.log(x);
            fs.unlink(path,(err)=>{
                if (err) return console.log(err);
                // console.log("file deleted successfully");
            })

            res.status(200).send(x);
        }else{
            return res.sendStatus(400);
        }     
    } catch (error) {
        return res.sendStatus(400);
    }

})

app.post("/upgradeToSeller", (req, res) => {
    try {
        const token = req.query.token;
        // console.log(token);
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) {console.log(err.message); return res.sendStatus(401);}
            else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if (r.length)
                {
                    const seller = new Seller({
                        Name : req.body.name,
                        Mobile : req.body.number,
                        GST : req.body.gst,
                        PIN : req.body.pin,
                        Address : req.body.address
                    })
                    r[0].Type = 1;
                    r[0].SellerId = seller._id;
                    r[0].Address = seller.Address;
                    seller.save()
                    .then(()=>{
                        r[0].save();
                        return res.sendStatus(201);
                    })
                    .catch(()=>{
                        return res.sendStatus(501);
                    })

                }
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(501)
    }
});

app.get('/getProducts',(req,res)=>{
    try {
        const token = req.query.token;
        
        jwt.verify(token , process.env.ACCESS_KEY ,async (err,user)=>{
            if (err) {
                return res.sendStatus(401);
            } else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if (r.length && r[0].Type === 1) {
                    const sId = r[0].SellerId;
                    const s = await Seller.find({
                        _id : sId
                    })
                    if(s.length){
                        let products = s[0].Products;
                        
                            res.status(200).send({
                                products
                            })
                        
                    }else{
                        return res.sendStatus(501)
                    }
                }
                else{
                    return res.sendStatus(401);
                }
            }
        })
    } catch (error) {
        return res.sendStatus(401);
    }
})

app.post('/addProducts',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) {
                return res.sendStatus(401);
            } else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if (r.length && r[0].Type === 1) {
                    const sId = r[0].SellerId;
                    const seller = await Seller.find({
                        _id: sId,
                    });
                    if (seller.length) {
                        const prd = new Product({
                            Name : req.body.title,
                            Description : req.body.description,
                            Price : req.body.price,
                            SellerId : sId,
                            Pin : req.body.pin
                        })

                        // console.log(prd);
                        prd.save()
                        .then(()=>{
                            seller[0].Products.push(prd._id);
                            seller[0].save()
                            return res.sendStatus(201);
                        }).catch((err)=>{
                            console.log(err.message);
                            return res.sendStatus(501);
                        })
                    } else {
                        return res.sendStatus(501);
                    }
                } else {
                    return res.sendStatus(401);
                }
            }
        });
    } catch (error) {
        return res.sendStatus(401);
    }
})

app.get('/findProducts',async (req,res)=>{
    try {
        const prd = await Product.find({
            Name : req.query.title,
            Pin : req.query.pin
        })

        res.status(200).send(prd);
    } catch (error) {
        return req.sendStatus(401);
    }
})

app.post('/placeOrder',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if(err) {res.sendStatus(401);}
            const r = await User.find({
                Email: user.Email,
                Password: user.Password,
            });

            if(r.length){
                const _id = req.body.productId;
                const prd = await Product.find({ _id });
                if (prd.length) {
                    const seller = await Seller.find({
                        _id : prd[0].SellerId
                    })
                    if(seller.length === 0) {return res.sendStatus(404);}
                    const ord = new Order({
                        User: r[0]._id,
                        ProductId: _id,
                        SellerId: prd[0].SellerId,
                        Address : req.body.address
                    });

                    r[0].Orders.push(ord._id);
                    seller[0].Orders.push(ord._id);
                    await ord.save();
                    await r[0].save();
                    await seller[0].save();
                    res.sendStatus(201);
                } else {
                    return res.sendStatus(404);
                }
                
            }
        })
    } catch (error) {
        res.sendStatus(401);
    }
})

app.get('/individualProduct',async (req,res)=>{
    try {
        const _id = req.query.productId;
        const prd = await Product.find({_id});
        if(prd.length){
            return res.status(200).send(prd[0]);
        }
        else{
            return res.sendStatus(404);
        }
    } catch (error) {
        return res.send(404);
    }
})

app.get('/cartItems',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if(err) {return res.sendStatus(500);}
            else{
                // console.log("ok");
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if(r.length){
                    return res.status(200).send(r[0].Cart);
                }else{
                    return res.sendStatus(404);
                }
            }
        })
    } catch (error) {
        return res.sendStatus(404)
    }
})

app.post('/addToCart',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if(err){return res.sendStatus(500)}
            else{
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if (r.length) {
                    r[0].Cart.push(req.body.productId);
                    r[0].save()
                    .then(()=>{
                        return res.sendStatus(200);
                    })
                    .catch((err)=>{
                        return res.sendStatus(500);
                    })
                } else {
                    return res.sendStatus(404);
                }
            }
        })
    } catch (error) {
        
    }
})

app.delete('/removeFromCart',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) {
                return res.sendStatus(501);
            } else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if (r.length) {
                    const remove = req.body.productId;
                    let newCart = [];
                    let f=false;
                    r[0].Cart.forEach((e)=>{
                        if(f || e!==remove ){
                            newCart.push(e);
                        }
                        else if(e===remove){
                            f=true;
                        }
                    })
                    r[0].Cart = newCart;
                    r[0].save()
                    .then(()=>{
                        return res.sendStatus(202)
                    })
                    .catch((err)=>{

                    })
                } else {
                    return res.sendStatus(404);
                }
            }
        });
    } catch (error) {}
})

app.get('/customerOrders',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token,process.env.ACCESS_KEY,async(err,user)=>{
            if(err){
                return res.sendStatus(401);
            }else{
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if(r.length && r[0].Type===1){
                    const sId = r[0].SellerId;
                    const seller = await Seller.find({
                        _id : sId
                    })
                    res.status(200).send({orders : seller[0].Orders,id : sId});
                }else{
                    return res.sendStatus(404);
                }
            }
        })
    } catch (error) {
        
    }
})

app.get('/individualOrder',async (req,res)=>{
    try {
        const _id = req.query.order;
        const sId = req.query.sId;
        const order = await Order.find({_id});

        if (order.length && order[0].SellerId===sId) {
            return res.status(200).send(order[0]);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        return res.sendStatus(401);
    }
})

app.post('/delivered' , async (req,res)=>{
    try {
        // console.log(req.body);
        const orderId = req.body.order;
        const sellerId = req.body.seller;
        
        const order = await Order.find({_id : orderId});
        const seller = await Seller.find({_id : sellerId})
        // console.log(order);
        if(order.length && seller.length &&  order[0].SellerId === sellerId){
            order[0].Status = 1;
            order[0].save()
            .then(()=>{
                let newOrder = [];
                let f = false;
                seller[0].Orders.forEach((e) => {
                    if (f || e !== orderId) {
                        newOrder.push(e);
                    } else if (e === orderId) {
                        f = true;
                    }
                });
                seller[0].Orders = newOrder;
                seller[0].save().then(() => {
                    return res.sendStatus(200);
                })
                .catch((err)=>{

                    return res.sendStatus(501);
                })
            })
            .catch((err)=>{
                return res.sendStatus(404)
            })
        }else{
            return  res.sendStatus(401)
        }
    } catch (error) {
        return res.sendStatus(501);
    }
})

app.post('/dropOrder' , async (req,res)=>{
    try {
        // console.log(req.body);
        const orderId = req.body.order;
        const sellerId = req.body.seller;
        
        const order = await Order.find({_id : orderId});
        const seller = await Seller.find({_id : sellerId})
        // console.log(order);
        if(order.length && seller.length &&  order[0].SellerId === sellerId){
            order[0].Status = 2;
            order[0].save()
            .then(()=>{
                let newOrder = [];
                let f = false;
                seller[0].Orders.forEach((e) => {
                    if (f || e !== orderId) {
                        newOrder.push(e);
                    } else if (e === orderId) {
                        f = true;
                    }
                });
                seller[0].Orders = newOrder;
                seller[0].save().then(() => {
                    return res.sendStatus(200);
                })
                .catch((err)=>{

                    return res.sendStatus(501);
                })
            })
            .catch((err)=>{
                return res.sendStatus(404)
            })
        }else{
            return  res.sendStatus(401)
        }
    } catch (error) {
        return res.sendStatus(501);
    }
})

app.get('/order' , (req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if (err) {return res.sendStatus(401);}
            else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                if(r.length){
                    // console.log(r[0]);
                    res.status(200).send(r[0].Orders);
                }
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
})

app.get("/myIndividualOrder" ,  (req,res)=>{
    try {
        const token = req.query.token;
        // console.log(token);
        const orderId = req.query.order;
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) {
                return res.sendStatus(401);
            } else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });
                
                const order = await Order.find({_id:orderId});
                // console.log(order[0].User);
                // console.log(r[0]._id.toString());
                if(order.length && r.length && order[0].User === r[0]._id.toString()){
                    return res.status(200).send({
                        Address: order[0].Address,
                        ProductId: order[0].ProductId,
                        Status : order[0].Status
                    });
                }else{
                    return res.sendStatus(404);
                }
            }
        });
    } catch (error) {
        
    }
})

app.listen(port,()=>{
    console.log("server started");
})