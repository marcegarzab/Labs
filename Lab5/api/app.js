const cityClimate = require('./lab5.js')
cityClimate.longAndLatFunc('Mexico', function(error, data){
	if(error){
		console.log(error)
	}else{
		console.log(data)
		if(data......){
			cityClimate.climateFunc(data.cityName, data.longAndLat, function(error, data){
				console.log(data)
			})
		}
	}
})

