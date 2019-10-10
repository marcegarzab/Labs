// const geocode = function(ciudad, callback){
// 	setTimeout(function(){
// 		const data = {
// 			lat: 0,
// 			long: 0
// 		}
// 		callback(data)
// 	}, 2000)
// }

// geocode('Monterrey', function(data){
// 	console.log(data)
// })

/*
Nombre ciudad -> info del dia 
ej. "Despejado durante el día. Actualmente esta a 4°C. Hay 80% de posibilidad de lluvia."

-2 requests:
-1)API clima (darksky) 
-2)API lat y long (mapbox)
-app.js: modulo 'request' para request
-segundo request: regresa long y lat (primer request)
-observar json que regresa para escoger que imprimir en consola
-cambiar a Celsius
*/

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

	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + lat + "," + long //+ "/lang=es/units=si"
	console.log(url)
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
					humidity : data.currently.precipProbability
				}
				console.log(cityName + ": " + climate.description + "Actualmente esta a " + climate.temp + "°C. Hay " + (climate.humidity*100) + "% de posibilidad de lluvia.")
			}
		}
	})
}

module.exports = {
	longAndLatFunc : longAndLatFunc,
	climateFunc: climateFunc
}