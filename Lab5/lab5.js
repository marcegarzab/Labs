
const credentials = require('./credentials.js')
const request = require('request')

const longAndLatFunc = function(cityName, callback){ //mapbox api for lat and long
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + cityName + '.json?access_token=' + credentials.MAPBOX_TOKEN
	request({url, json:true}, function(error, response){
		if(error){
			callback(error, undefined)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				callback(data.Error, undefined)
			}else{
				const longAndLat = data.features[0].center
				callback(undefined, longAndLat)
			}
		}
	})
}

const climateFunc = function(cityName, longAndLat, callback){ //darksky api for weather forecast
	// if (typeof x === 'undefined' || x === null || !x) {
	// 	console.log("entro")
	// 	return 1;
	// }
	const LongLatString = longAndLat.toString()
	const splitLongLat = LongLatString.split(",")
	const lat = parseFloat(splitLongLat[1])
	const long = parseFloat(splitLongLat[0])

	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + lat + "," + long + "?lang=es&units=si"
	request({url, json:true}, function(error, response){
		if(error){
			callback('Unable to connect to OMDB service', undefined)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				callback(data.Error, undefined)
			}else{
				const climate = {
					description : data.hourly.summary,
					temp : data.currently.temperature,
					precip : data.currently.precipProbability
				}
				callback(climate)
			}
			// console.log(cityName + ": " + climate.description + " Actualmente esta a " + climate.temp + "°C. Hay " + (climate.precip*100) + "% de posibilidad de lluvia.")		
		}
	})
}

module.exports = {
	longAndLatFunc : longAndLatFunc,
	climateFunc: climateFunc
}