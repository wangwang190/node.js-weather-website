const request = require("request")

const geoCode = (address,callBack) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoid2lsc29uMTkwIiwiYSI6ImNrdW84dGJ5eTJxY24yb3BocTdhNWs2cjIifQ.wA8uh8V8QGcMdnvxbJmD_Q&limit=1"

    request({url, json:true}, (error,response) => {
        if (error) {
            callBack("not connected to location service", undefined)
        } else if (response.body.features.length === 0) {
            callBack("unable to find location. Try another Search", undefined)
        } else {
            callBack(undefined, {
                latitude: response.body.features[0].center[1],
                longtitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
        }
    })
}

module.exports = geoCode











