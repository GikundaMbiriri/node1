const request=require('request')
const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoibWdpa3VuZGEiLCJhIjoiY2s4NGpyYW9yMDJ3aTNvbWNha21nbDRveSJ9.jTLhpawCdZWkMsVXRlYZAQ'

    request({url,json:true},(error,data)=>{
        if(error){
            callback('please check your net connection and try again',undefined)
        }
        else if(data.body.features.length===0){
            callback('location not found.Please try another location',undefined)
        }
        else{
            callback(undefined,{
                latitude:data.body.features[0].center[0],
                longitude:data.body.features[0].center[1],
                location:data.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode
