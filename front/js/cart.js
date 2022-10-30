// recupérer le panier
let cart = JSON.parse(localStorage.getItem("cart"));

// gestion du panier vide
if (cart == null) {
  console.log("Votre panier est vide ");
  document.querySelector("h1").innerHTML = `Votre Panier est vide`;
}

// Affichages
let quantityArray = [];
let priceArray = [];
const cartItems = document.getElementById("cart__items");
function getCart() {
  for (let product of cart) {
    // tableau produit(s) dans le panier

    cartItems.innerHTML += `<article class="cart__item" data-id="${
      product.id
    }" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.imgUrl}" alt="${product.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price * product.quantity} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                product.quantity
              }">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
    </article>`;

    function getArrays() {
      quantityArray.push(product.quantity);
      priceArray.push(product.price * product.quantity);
    }
    getArrays();
  }
}
getCart();

//afficher quantité et prix total

const totalQuantityDisplay = document.getElementById("totalQuantity");
const totalPriceDisplay = document.getElementById("totalPrice");

let sum = 0;
function sumQuantityProduct() {
  for (let quantity of quantityArray) {
    sum += parseInt(quantity);
  }
  totalQuantityDisplay.innerText = sum;
}
function sumPriceProduct() {
  for (let price of priceArray) {
    sum += price;
  }
  totalPriceDisplay.innerText = sum;
}
sumQuantityProduct();
sumPriceProduct();

// gestion de la quantité

const productDisplay = document.querySelectorAll(".cart__item");
const inputQuantity = document.querySelectorAll(".itemQuantity");
const priceDisplay = document.querySelectorAll(
  ".cart__item__content__description p:last-child"
);
function changeQuantity() {
  for (let input of inputQuantity) {
    input.addEventListener("change", (e) => {
      const product = input.closest("article");
      inputQuantity.innerText = e.target.value;
      for (i = 0; i < cart.length; i++) {
        if (
          cart[i].id == product.dataset.id &&
          cart[i].color == product.dataset.color
        ) {
          let newValue = parseInt(e.target.value);

          cart[i].quantity = newValue;
          localStorage.setItem("cart", JSON.stringify(cart));
          for (let price of priceDisplay) {
            price.innerText = `${cart[i].price * newValue} €`;
          }
        }
      }
    });
  }
}
changeQuantity();
