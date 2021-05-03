function displayProduct() {
  //création des éléments dynamique
  Request.response.forEach(product => {
    const newContainer = document.createElement("div");
    newContainer.classList.add('card');

    const newLink = document.createElement("a");
    newLink.setAttribute('href', `produit.html?id=${product._id}`);
    newLink.classList.add("product");

    const newImg = document.createElement("img");
    newImg.setAttribute('src', product.imageUrl);
    newImg.classList.add('card');

    const newLabel = document.createElement("p");
    newLabel.setAttribute('class', 'product-name');
    newLabel.innerHTML = `
        <div class="container"
          <div class="card-body">
          <!-- Products name -->
          <h5 class="card-title">${product.name}</h5>
          <!-- Products price -->
          <p class="card-text price">${product.price / 100} €</p>
        <!-- Products _ID -->
        <a href="produit.html?id=${product._id}" class="btn btn-primary">En savoir plus</a>
          </div>
      </div>`;

    newLink.appendChild(newImg);
    newLink.appendChild(newLabel);
    newContainer.appendChild(newLink);

    const listeProduits = document.getElementById('results');
    listeProduits.appendChild(newContainer);
  });
};
//Envoie une requête à l'API et affiche les produits
Request.get("http://localhost:3000/api/cameras")
  .then(displayProduct);


