//Récupération de l'id via les paramètres de l'url
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

//Récupération du produit grace a son id
getProduct();
function getProduct() {
  fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => res.json())
    .then((productData) => {
      console.log(productData);
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
      let productColors = document.querySelector("#colors option");
      for (let colors of productData.colors) {
        productColors.value = colors;
        productColors.innerHTML = colors;
        console.log(productColors);
        console.log(productData.colors);
        // productColors.appendChild(document.querySelector("#colors"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
