//Récupération de l'id via les paramètres de l'url
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

//Récupération du produit grace a son id
async function getProduct() {
  let response = await fetch("http://localhost:3000/api/products/" + productId);
  const productData = await response.json();

  // Repartition des data produits dans le DOM
  //Titre de la page
  let pageTitle = document.title;
  document.title = productData.name;
  // img
  let productImg = document.querySelector(".item__img");
  productImg.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
  // title
  let productTitle = document.getElementById("title");
  productTitle.innerHTML = productData.name;
  //Price
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = productData.price;
  // description
  let productdescription = document.getElementById("description");
  productdescription.innerHTML = productData.description;
  // option couleur
  let selectColors = document.querySelector("#colors");
  productData.colors.forEach((colors) => {
    let optionColors = document.createElement("option");
    selectColors.appendChild(optionColors);
    optionColors.value = colors;
    optionColors.innerHTML = colors;
  });
}
getProduct();

//Ajout un produit au panier

document.getElementById("addToCart").onclick = (e) => {
  // recuperation et validité des valeur color et quantity
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;
  if (color == "") {
    alert("Veuillez choisir une couleur");
    return;
  }
  if (quantity == 0 || quantity > 100) {
    alert("Veuillez choisir la quantité comprise entre 1 et 100");
    return;
  }
  let product = {
    id: productId,
    color: color,
    quantity: parseInt(quantity),
  };
  function saveCart(cart) {
    product = localStorage.setItem("cart", JSON.stringify(cart));
  }
  function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  }

  function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find(
      (p) => p.id == product.id && p.color == product.color
    );
    if (foundProduct != undefined) {
      foundProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    saveCart(cart);
    console.log(cart);
  }
  addCart(product);
};
