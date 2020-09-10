const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const { title } = require('process')
const app = express()

console.log(path.join(__dirname))

//paths for express config
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//define handlerbars view engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
//app.set('views',path.join(__dirname,'../views'))


//set up static directory
app.use(express.static(publicdirectorypath))

hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'prasad'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'prasad'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This application is used to the get weather through user given location in the search box in the Weather page',
        title:'Help',
        name:'prasad'    
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'the address query is needed'
        })
    }
    geocode(req.query.address,(error,{longtitude,latitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longtitude,latitude, (error, {description,temperature,feelslike}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                description:description,
                temperature:temperature,
                feelslike:feelslike,
                address:req.query.address
            })

          })
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'error',
        name:'prasad',
        err:'the help page is not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'error',
        name:'prasad',
        err:'404 page not found'

    })
})


app.listen(3000,()=>{
    console.log('server is started in port 3000')
})