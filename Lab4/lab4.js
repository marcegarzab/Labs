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

const latAndLongFunc = function(cityName){ //mapbox api for lat and long
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + cityName + '.json?access_token=' + credentials.MAPBOX_TOKEN
	console.log(url)
	request({url, json:true}, function(error, response){
		if(error){
			console.log(error.Error)
		}else{
			const data = response.body
			if(data.Response == 'False'){
				console.log('Error: ' + data.Error)
			}else{
				// const latAndLong = {
				// 	latitude: ,
				// 	longitude:
				// }
				// console.log(latAndLong)
				console.log(response.body)
				//climateFunc()
			}
		}
	})
}


// const climateFunc = function(){ //darksky api for weather forecast
// 	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + [latitude],[longitude]
// 	console.log(url)
// 	request({url, json:true}, function(error, response){
// 		if(error){
// 			console.log(error.Error)
// 		}else{
// 			const data = response.body
// 			if(data.Response == 'False'){
// 				console.log('Error: ' + data.Error)
// 			}else{
// 				const climate = {

// 				}
// 				console.log(climate)
// 			}
// 		}
// 	})
// }