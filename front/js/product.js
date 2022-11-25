//Récupération de l'id via les paramètres de l'url
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

let pageTitle = document.title;
let productImg = document.querySelector(".item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productdescription = document.getElementById("description");
let selectColors = document.querySelector("#colors");
//Récupération du produit grace a son id
async function getProduct() {
  let response = await fetch("http://localhost:3000/api/products/" + productId);
  const productData = await response.json();

  document.title = productData.name;
  productImg.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
  productTitle.innerHTML = productData.name;
  productPrice.innerHTML = productData.price;
  productdescription.innerHTML = productData.description;
  productData.colors.forEach((colors) => {
    let optionColors = document.createElement("option");
    selectColors.appendChild(optionColors);
    optionColors.value = colors;
    optionColors.innerHTML = colors;
  });
}
getProduct();

//Ajout un produit au panier

document.getElementById("addToCart").onclick = (data) => {
  const color = selectColors.value;
  const quantity = document.getElementById("quantity").value;
  if (color == "") {
    Toastify({
      text: "Veuillez choisir une couleur",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #3498db, #2c3e50)",
      },
    }).showToast();
    return;
  }
  if (quantity <= 0 || quantity >= 100) {
    Toastify({
      text: "Veuillez choisir la quantité comprise entre 1 et 100",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #3498db, #2c3e50)",
      },
    }).showToast();
    return;
  }
  let productSave = {
    _id: productId,
    color: color,
    quantity: parseInt(quantity),
  };
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  }
  Toastify({
    text: "Votre produit a été ajouté au panier",
    duration: 3000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #3498db, #2c3e50)",
    },
  }).showToast();

  function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find(
      (p) => p.id == product.id && p.color == product.color
    );
    if (foundProduct != undefined) {
      product.quantity = parseInt(quantity);
      foundProduct.quantity += parseInt(quantity);
    } else {
      cart.push(product);
    }
    saveCart(cart);
  }
  addCart(productSave);
};
