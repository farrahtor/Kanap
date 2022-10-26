// recupérer le panier
let cart = JSON.parse(localStorage.getItem("cart"));

// gestion du panier vide
if (cart == null) {
  console.log("Votre panier est vide ");
  document.querySelector("h1").innerHTML = `Votre Panier est vide`;
}
const cartItems = document.getElementById("cart__items");
// afficher liste de produit
for (let product of cart) {
  console.log(product);
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
}

console.log(cart.length);
