const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));


const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Niranjan Saha'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Niranjan Saha'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        contact_us: 'contact us on 8402091136' ,
        name: 'Niranjan Saha'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address in the search term'
        })
    };

    const address = req.query.address;
    geocode(address,(error, { latitude,longitude,location }= {} )=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData
            })
        })
    }) 

    // console.log(req.query);
    // res.send({
    //     forecast: 'It is snowing',
    //     address: req.query.address,
    //     name: 'Niranjan Saha'
    // });

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMsge: 'Help article not found'
    });
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)

    //Cannot respond twice so there is the error cannot set headers after they are sent ot the client
    res.send({
        products: []
    })
})

// * is the wild card character
app.get('*',(req,res)=>{
    res.render('404',{
        errorMsge: 'Page not found'
    })
})


// app.com
// app.com/help
// app.com/about

app.listen(3000,()=>{
    console.log('Server is up on port 3000.');
})