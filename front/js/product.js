//Récupération de l'id via les paramètres de l'url
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

//Récupération du produit grace a son id
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
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
    let selectColors = document.querySelector("#colors");
    productData.colors.forEach((colors) => {
      let optionColors = document.createElement("option");
      selectColors.appendChild(optionColors);
      optionColors.value = colors;
      optionColors.innerHTML = colors;
    });

    //Ajout un produit au panier

    const addToCart = () => {
      const color = selectColors.value;
      const quantity = document.getElementById("quantity").value;

      if (color == "") {
        alert("Veuillez choisir une couleur");
      } else if (quantity == 0 || quantity > 100) {
        alert("Veuillez choisir la quantité comprise entre 1 et 100");
      } else {
        let productJson = {
          id: productData._id,
          color: color,
          quantity: quantity,
        };
        let product = JSON.stringify(productJson);
        localStorage.setItem("product", product);
      }
    };
    let addToCartBtn = document.getElementById("addToCart");
    addToCartBtn.addEventListener("click", addToCart);
  })
  .catch((err) => {
    console.log(err);
  });
