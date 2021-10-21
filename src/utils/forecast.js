
const request = require("request");

// const chalk = require("chalk");

const forecast = (lat,long, callBack) => {
    
    const weatherUrl = "http://api.weatherstack.com/current?access_key=24bdf2de9cdc37d8af0a375fb03e4c34&query=" + lat + "," + long ;

    request({url:weatherUrl, json:true},
        (error,response) => {
            if (error) {
                callBack("not connected to WeatherStack", undefined);
            } else if (response.body.error) {
                callBack("Please specify a valid location", undefined)
            } else {

                callBack(undefined,"It is " + response.body.current.weather_descriptions +" Today.The temperature is " + response.body.current.temperature + " Degree and it feels like " + response.body.current.feelslike + " Degree today.")
            }

        }          
        
    )
        
}

module.exports = forecast