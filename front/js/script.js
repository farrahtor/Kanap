const urlApi = "http://localhost:3000/api/products";
//récupération de tout les produits
getAllProducts();
function getAllProducts() {
  fetch(urlApi)
    .then((response) => response.json())
    .then((products) => {
      console.log(products);

      const sectionItems = document.getElementById("items");
      for (let product of products) {
        sectionItems.innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`;
      }
    });
}
