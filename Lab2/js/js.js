//agregar elementos a la lista
//poder darle checked a los elemmentos (que se tache el elemento)

var list = document.getElementById("todoList");
var newTask = document.getElementById("newItem");
var valueCount = 5;

newTask.addEventListener("keyup", function(key){ //check when a key is released
	key.preventDefault();
	if(key.keycode === 13 && newTask.value != ""){ //check is key is enter
		var newLi = document.createElement("li");
		var newInput = document.createElement("input");
		newInput.type = "checkbox";
		newInput.name = "todo";
		var newSpan = document.createElement("span");
		var newText = document.createTextNode(newInput.value);

		valueCount++;
		newSpan.id = "s" + valueCount;

		newInput.onchange = function(){
			crossoutFunction(this);
		};

		newSpan.appendChild(newText); //ul li input span
		newLi.appendChild(newInput);
		newLi.appendChild(newSpan);
		list.appendChild(newLi);
		newTask.value = "";


	}
})

function crossoutFunction(checkbox){
	if(checkbox.checked){ //checked = cross out
		document.getElementById("s" + checkbox.value).classList.add("done");
	}else{ //no checked = not crossed
		document.getElementById("s" + checkbox.value).classList.remove("done");
	}
}