// recupérer le panier depuis le local storage
async function getCart() {
  let cart = await JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    document.querySelector("h1").innerHTML = `Votre Panier est vide`;
  }
  return cart;
}

// Récuperer les produits depuis l'APi
async function getData() {
  let response = await fetch("http://localhost:3000/api/products/");
  const productData = await response.json();
  return productData;
}
// récuprér les details du produit présent dans le panier depuis l'api
async function getCartDetails() {
  let cart = await getCart();
  let data = await getData();
  let productDisplay = [];

  for (let product of cart) {
    let foundProduct = data.find((p) => p._id == product.id);
    foundProduct.quantity = product.quantity;
    foundProduct.color = product.color;
    productDisplay.push(foundProduct);
  }
  return productDisplay;
}

const cartItems = document.getElementById("cart__items");
// afficher le panier dans le dom
async function cartDisplay() {
  let cart = await getCartDetails();
  for (let product of cart) {
    cartItems.innerHTML += `<article class="cart__item" data-id="${
      product.id
    }" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.alt}">
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
  }
}
cartDisplay();

console.log();
