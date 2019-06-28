let enter_but = document.getElementById("enter");
let input = document.getElementById("userinput");
let ul = document.querySelector("ul");
let li = document.getElementsByTagName("li");


ul.addEventListener("click", function(e){
	let clickedElement = e.target
	let clickedElClassList = e.target.classList;
	//console.log(clickedElement.tagName);
	if (clickedElement.tagName === "LI") {
		//console.log("if");
		//console.log("element li "+ clickedElClassList)
		clickedElClassList.toggle("done");
		console.log(clickedElement.style.textDecoration);
		//document.getElementById("myAnchor").removeAttribute("href");
		if(clickedElement.style.textDecoration==="line-through") {
			clickedElement.removeAttribute("style");

		}else{
			clickedElement.style.textDecoration="line-through";
		} 
		}else if (clickedElement.tagName === "BUTTON") {
			//console.log("BUTTON");
			//list.removeChild(list.childNodes[0]);
			(clickedElement.parentElement.parentElement).removeChild(clickedElement.parentElement);
			//console.log(clickedElClassList);
			//console.log(e.target.innerHTML);
			//console.log(e.target.className);
		}
})
	
	
enter_but.addEventListener("click", addToListOnClick);

input.addEventListener("keypress", addToListOnEnter);

function inputLength() {
	return input.value.length;
}



function addToListOnClick() {
	if(inputLength()>0){
	addListElement();
}
}

function addToListOnEnter(event) {
	if(inputLength()>0 && event.keyCode === 13){
		addListElement();
}
}

function addListElement() {
	let di = document.createElement("div")
	let li = document.createElement("li");
	let bu = document.createElement("button")
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(di);
	di.classList.add("li-container");
	di.appendChild(li);
	di.appendChild(bu);
	bu.innerText="Delete";
	input.value="";
}