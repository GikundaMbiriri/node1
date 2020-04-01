const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/d43bc53186028e4cdd9fbe017048060a/'+latitude+','+longitude
      request({url:url,json:true},(error,{body})=>{
          if(error){
              callback('please check your net connection and try again',undefined)
          }
          else if(body.error){
              callback('invalid input.please try again',undefined);
          }
          else{
              callback(undefined,body.daily.data[0].summary);
          }

      })
}
module.exports=forecast;