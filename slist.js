
//--------variables---------------------------------------------------------------
let items = [];
let enter_but = document.getElementById("enter");
let input = document.getElementById("userinput");
let ul = document.querySelector("ul");
//let li = document.getElementsByTagName("li");

//------------------------function testing s_list presence onload-----------------
window.onload = (e) => {
	console.log('page is fully loaded');
	if (localStorage.getItem("s_list")) {
		console.log('slist exist in storage');
		items = JSON.parse(localStorage.getItem("s_list"));
		console.log('items from localstorage:', items);
		display_stored_list(items);
	} else {
		console.log('slist not stored');
	}
};

//----------------------function displaying  items array list---------------------------
function display_stored_list() {
	console.log('displaystoredlist func');
	console.log('cleaning list');
	ul.innerHTML = "";
	for (i = 0; i < items.length; i++) {
		console.log('adding', i)
		addListElement(items[i])
	}
}

//------------------------adding item to DOM------------------------------------------
function addListElement(item) {
	console.log('addlistelement', item.name)
	let di = document.createElement("div")
	let li = document.createElement("li");
	let bu = document.createElement("button")
	li.appendChild(document.createTextNode(item.name));
	ul.appendChild(di);
	di.classList.add("li-container", "container");
	di.appendChild(li);
	li.classList.add("list-group-item", "w-100", "h3", "text-wrap");
	li.id = item.id;
	if (item.bought) { li.classList.add("strike-out") };
	li.appendChild(bu);
	bu.classList.add("btn", "btn-secondary", "btn-sm", "delete", "float-right");
	bu.innerText = "Delete";
	input.value = "";
}

//--------------------EVENTS--------------------------------------------------------

//---------------------click on list element event ------------------------------
ul.addEventListener("click", function (e) {
	console.log('item clicked', e.target.parentElement);
	let clickedElement = e.target
	let clickedElClassList = e.target.classList;
	if (clickedElement.tagName === "LI") {
		clickedElClassList.toggle("strike-out");
		items[parseInt(clickedElement.id)].bought = !items[parseInt(clickedElement.id)].bought;
		refresh_storage();
		console.log("index nr", clickedElement.id);
		/*if (clickedElement.style.textDecoration === "line-through") {
			clickedElement.style.textDecoration = ("none");
			items[parseInt(clickedElement.id)].bought = false;
			console.log(clickedElement, "index", clickedElement.id);
		} else {
			clickedElement.style.textDecoration = "line-through";
			console.log("index", clickedElement.id);
			items[parseInt(clickedElement.id)].bought = true;

		}*/
	} else if (clickedElement.tagName === "BUTTON") {
		(clickedElement.parentElement.parentElement).removeChild(clickedElement.parentElement);
		console.log("id clicked", parseInt(clickedElement.parentElement.id));
		update_array(parseInt(clickedElement.parentElement.id));
	}
})

//-------------click  for new item input EVENT-----------------------------------
enter_but.addEventListener("click", addToListOnClick);

//-------------------enter pressed for new item input EVENT----------------------
input.addEventListener("keypress", addToListOnEnter);


//--------------------FUNCTIONS HELPERS--------------------------------------------------
//------------------getting input length-----------------------------------------
function inputLength() {
	return input.value.length;
}

//--------------------------calling add new item to list on click------------------------
function addToListOnClick() {
	if (inputLength() > 0) {
		add_to_list({ id: items.length, name: input.value, bought: false });
		//addListElement({ name: input.value, bought: false });
	}
}

//-----------------------calling add new item to list on enter---------------------------
function addToListOnEnter(e) {
	if (inputLength() > 0 && e.keyCode === 13) {
		add_to_list({ id: items.length, name: input.value, bought: false });
	}
}



function add_to_list(item) {
	console.log('update array', item.name)
	items.push(item);
	refresh_storage();
	display_stored_list();
}

function refresh_storage() {
	localStorage.removeItem("s_list");
	localStorage.setItem("s_list", JSON.stringify(items));
	display_stored_list();
}

function update_array(index) {
	console.log("wycinam:", items[index])
	items.splice(index, 1);
	console.log('nowa dlugosc tablicy', items.length);
	for (i = 0; i < items.length; i++) {
		items[i].id = i;
		console.log('item:', items[i]);

	}
	refresh_storage();
}
