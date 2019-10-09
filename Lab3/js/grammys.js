$.ajax({
	url: 'https://marcegarzab.github.io/Labs/grammys.json',
	type: 'GET',
	dataType: 'json',
	success: function(data){
		let newHTML =''
		console.log(data)
		for(let x=0; x<data.length; x++){
			newHTML += `
				<option value="${data[x].field_id}">
					${data[x].field}
				</option>`
		}
		$('#category_types').append(newHTML)
		loadRestJSON()
	},
	error:function(data){
		console.log(errorMsg)
	},
})


function loadRestJSON(){
	$.ajax({
		url: 'https://marcegarzab.github.io/Labs/grammys.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			$('#category_types').on('change', function(event){
				let field = $(this).val()
				for(let x =0; x<data.length; x++){
					

					// if(field == data[x].field_id){
					// 	for(let y =0; y<${data[x].field_id}.length; y++){
					// 		$('#nominees_section').val(data[y].category_name)
					// 	}
					// }
				}
			})
		},
		error: function(errorMsg){
			console.log(errorMsg)
		},
	})
}
