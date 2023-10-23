const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// Routers
const routes = express.Router();
const Product = require('./model/product.model');

//5b87h32uC6InqgvC
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ainyafzaldev:JYOnGlrgCd2qTCN1@cluster0.kjcmrol.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("DB connected......")
})

routes.get('/', (req, res)=>{ 
    res.status(200); 
    res.send('{"message":"Welcome to DressStore application."}'); 
});

routes.route('/api/products').get((req, res) => {
    Product.find().then(products=>res.status(200).json(products))
    .catch(err=>res.status(400).json({"error":err}))
});
routes.route('/api/products?name=[kw]').get((req, res) => {
    Product.findOne({name : {$regex:/kw/}})
    .then(products=>res.status(200).json(products))
    .catch(err=>res.status(400).json({"error":err}))
});
routes.route('/api/products/:id').get((req, res) => {
    Product.findById(req.params.id)
    .then(products=>res.status(200).json(products))
    .catch(err=>res.status(400).json({"error":err}))
});

routes.route('/api/products').post((req,res)=>{
    let product = new Product(req.body)
    product.save()
    .then(products=>res.status(200).json(products))
    .catch(err=>res.status(400).json({"error":err}))

})

routes.route('/api/products/:id').put((req,res)=>{

    Product.findById(req.params.id).
    then(product=>{
        // update
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.category = req.body.category;
        // save

        product.save().
        then(product=>res.status(200).json(product))
        .catch(err=>res.status(400).json({"error":err}))

        res.status(200).json(product)
    })
    .catch(err=>res.status(400).json({"error":err}))


})

routes.route('/api/products/:id').delete((req,res)=>{

    Product.deleteOne(req.params.id)
    .then(res.status(200).json("Successfully deleted"))
    .catch(err=>res.status(400).json({"error":err}))
})

routes.route('/api/products/').delete((req,res)=>{

    Product.deleteMany()
    .then(res.status(200).json("Successfully deleted"))
    .catch(err=>res.status(400).json({"error":err}))
})

app.use(routes);


app.listen(8081,()=>{
    console.log("Server is running on 8081....");
});