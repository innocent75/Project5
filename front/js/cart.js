let orderId = "";

var url = new URL(window.location.href);
var idInfo = url.searchParams.get("idFo");

let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

let productsCount = 0;
let productsAmount = 0;

// Looping on cart items
for (let cartItem of cartLocalStorage) {
	// Getting missing data from API
	fetch("http://localhost:3000/api/products/" + cartItem.id)
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		let product = value;

		//console.log(product);
		//console.log(cartItem.quantity);

		// Creating "article"
		let productArticle = document.createElement("article");
		document.querySelector("#cart__items").appendChild(productArticle);
		productArticle.className = "cart__item";
		productArticle.setAttribute('data-id', product._id);

		// Creating "div"
		let productDivImg = document.createElement("div");
		productArticle.appendChild(productDivImg);
		productDivImg.className = "cart__item__img";

		// Creating img
		let productImg = document.createElement("img");
		productDivImg.appendChild(productImg);
		productImg.src = product.imageUrl;
		productImg.alt = product.altTxt;

		// Creating "div"
		let productItemContent = document.createElement("div");
		productArticle.appendChild(productItemContent);
		productItemContent.className = "cart__item__content";

		// "Creating div"
		let productItemContentTitlePrice = document.createElement("div");
		productItemContent.appendChild(productItemContentTitlePrice);
		productItemContentTitlePrice.className = "cart__item__content__titlePrice";

		// Creating "H2"
		let productTitle = document.createElement("h2");
		productItemContentTitlePrice.appendChild(productTitle);
		productTitle.innerHTML = product.name;

		// Creating the color
		let productColor = document.createElement("p");
		productTitle.appendChild(productColor);
		productColor.innerHTML = cartItem.color;
		productColor.style.fontSize = "20px";

		// Creating the price
		let productPrice = document.createElement("p");
		productItemContentTitlePrice.appendChild(productPrice);
		productPrice.innerHTML = product.price + " €";

		// Creating "div"
		let productItemContentSettings = document.createElement("div");
		productItemContent.appendChild(productItemContentSettings);
		productItemContentSettings.className = "cart__item__content__settings";

		// Creating "div"
		let productItemContentSettingsQuantity = document.createElement("div");
		productItemContentSettings.appendChild(productItemContentSettingsQuantity);
		productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

		// Creating the quantity
		let productQte = document.createElement("p");
		productItemContentSettingsQuantity.appendChild(productQte);
		productQte.innerHTML = "Qté : ";

		// Creating the quantity part2
		let productQuantity = document.createElement("input");
		productItemContentSettingsQuantity.appendChild(productQuantity);
		productQuantity.value = cartItem.quantity;
		productQuantity.className = "itemQuantity";
		productQuantity.setAttribute("type", "number");
		productQuantity.setAttribute("min", "1");
		productQuantity.setAttribute("max", "100");
		productQuantity.setAttribute("name", "itemQuantity");

		// Creating div
		let productItemContentSettingsDelete = document.createElement("div");
		productItemContentSettings.appendChild(productItemContentSettingsDelete);
		productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

		// Creating delete "p"
		let productSupprimer = document.createElement("p");
		productItemContentSettingsDelete.appendChild(productSupprimer);
		productSupprimer.className = "deleteItem";
		productSupprimer.innerHTML = "Supprimer";

		// Deleting the product from LocalStorage
		productSupprimer.addEventListener("click" , (event) => {
			event.preventDefault();
			let key = cartLocalStorage.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
			if(key != -1) {
				cartLocalStorage.splice(key, 1);
				localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
				window.location.reload();
			}
		});

		// Updating the product quantity in LocalStorage
		productQuantity.addEventListener("change" , (event) => {
			event.preventDefault();
			let key = cartLocalStorage.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
			if(key != -1) {
				cartLocalStorage[key].quantity = productQuantity.value;
				localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
				window.location.reload();
			}
		});

		// Getting the total of articles
		productsCount = productsCount + parseInt(productQuantity.value);
		document.getElementById('totalQuantity').innerHTML = productsCount;
		productsAmount = productsAmount + (parseInt(productQuantity.value) * product.price);
		document.getElementById('totalPrice').innerHTML = productsAmount;
	}	
)}

const btnValidate = document.querySelector("#order");


btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

//getting the fetch to return on the confirmation page
function sendToServer() {
	const sendToServer = fetch("http://localhost:3000/api/products/order")
      
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
      });

    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId;
    }
  }
})

// Form 
let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);
