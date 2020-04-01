const request =require('request');

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require('express')
const hbs=require('hbs');
const port =process.env.PORT || 3000;
const app=express()
//define paths for express config
const public=path.join(__dirname,'../public');
const vPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handlebars and engine location
app.set('view engine','hbs');
app.set('views',vPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(public));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'MGikunda'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about us',
        name:'MGikunda'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        name:'MGikunda',
        helpMessage:'We are here to help you do what you want'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
         forecast(longitude,latitude,(error,fdata)=>{
             if(error){
                 return res.send({
                    error
                })
             }
             res.send({
                location:location,
                forecast:fdata,
                address:req.query.address
            });
         })
     })
    // res.send({
    //     location:'nairobi',
    //     forecast:'rainy',
    //     address:req.query.address
    // });
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
   return  res.send({
        error:'search must be provided please'
    })}
    res.send({
        products:[]
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{title:'error message',name:'MGikunda',errorMessage:'we did not find that article'} );
})

app.get('*',(req,res)=>{
    res.render('404',{title:'error message',name:'MGikunda',errorMessage:'we did not find that article'} );
})
app.listen(port,()=>{
    console.log('we are live on port '+port);
})