const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000;

//data parsing
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const productData = require('../public/js/product-data');
const indexData = require('../public/js/index-data')
const sendMail = require('../public/js/mail')

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=>{
    res.render('index', indexData)
})

app.post('/email', (req,res) =>{
    const {email, subject, text} = req.body;
    sendMail(email, subject, text, function(err, data){
        if(err){
            res.status(500).json({message : 'Internal Error'})
        }else{
            res.json({message: 'Email sent!'})
        }
    })
})

app.get('/products', (req,res) =>{
    res.render('products', productData)
})

// app.get('/contact', (req,res)=>{
//     res.render('contact')
// })
app.listen(port , () =>{
    console.log('Server is running')
})
