const request = require('request')
const forecast = (longtitude,latitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=882f66e3aa064ce1c1d05df3e918980f&query='+latitude+','+longtitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the server',undefined)
        }else if(body.error){
            callback('invalid coordinates',undefined)
        }else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }

    })
}
module.exports = forecast