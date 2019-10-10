
const credentials = require('./credentials.js')
const request = require('request')

const longAndLatFunc = function(cityName){ //mapbox api for lat and long
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + cityName + '.json?access_token=' + credentials.MAPBOX_TOKEN
	request({url, json:true}, function(error, response){
		if(error){
			console.log(error.Error)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				console.log('Error: ' + data.Error)
			}else{
				const longAndLat = data.features[0].center
				climateFunc(cityName, longAndLat)
			}
		}
	})
}

const climateFunc = function(cityName, longAndLat){ //darksky api for weather forecast
	const LongLatString = longAndLat.toString()
	const splitLongLat = LongLatString.split(",")
	const lat = parseFloat(splitLongLat[1])
	const long = parseFloat(splitLongLat[0])

	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + lat + "," + long + "?lang=es&units=si"
	request({url, json:true}, function(error, response){
		if(error){
			console.log(error.Error)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				console.log('Error: ' + data.Error)
			}else{
				const climate = {
					description : data.hourly.summary,
					temp : data.currently.temperature,
					precip : data.currently.precipProbability
				}
				console.log(cityName + ": " + climate.description + " Actualmente esta a " + climate.temp + "°C. Hay " + (climate.precip*100) + "% de posibilidad de lluvia.")
			}
		}
	})
}

module.exports = {
	longAndLatFunc : longAndLatFunc,
	climateFunc: climateFunc
}