//agregar elementos a la lista
//poder darle checked a los elemmentos (que se tache el elemento)

console.log("js for Lab2 is working!");

function addElement(){
	var input = document.getElementById("newitem");
	var li = document.createElement("li");
	li.setAttribute("type", "checkbox");
	li.setAttribute("name", "todo");
	var li = "<li><input type="checkbox" name="todo"><span>" + input + "</span></li>";
    document.getElementById("elements").appendChild(li);
}

function checkElement(){
	var element = document.getElementById("newitem");
}