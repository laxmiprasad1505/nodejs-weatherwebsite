const request = require('request')

const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoibGF4bWlwcmFzYWQxNTA1IiwiYSI6ImNrZG4yNWt1MDA2eTkycXR2a296d3kwMTAifQ.E-Lry8UEpNBHOioiteW8aQ&limit=1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the server',undefined)
        }else if(body.features.length===0){
            callback('sorry not found,try another location',undefined)
        }else{
            callback(undefined,{
                longtitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }

    })
}



module.exports=geocode