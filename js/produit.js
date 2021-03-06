//récupération de l'id produit dans l'url
const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const idProduct = urlParam.get('id');

//Création de la page produit et des menus
let productLense;
let productQty = 1;

function showProduct() {

    //création et affichage des éléments HTML
    const prodCard = document.getElementById('info');

    //Nom du produit
    const prodName = document.createElement('h3');
    prodCard.appendChild(prodName);
    prodName.textContent = Request.response['name'];

    //Prix
    const prodPrice = document.createElement('p');
    prodCard.appendChild(prodPrice);
    prodPrice.textContent = Request.response['price'] / 100 + " €";

    //Description
    const prodDescription = document.createElement('p');
    prodCard.appendChild(prodDescription);
    prodDescription.textContent = Request.response['description'];

    //Choix de la lentille
    const prodLense = document.createElement('div');
    prodCard.appendChild(prodLense);
    prodLense.innerHTML = "<label for='lenses'>Choix lentille :</label><select name='lenses' id='lenses'><option>Sélectionner</option></select>";

    //création et affichage du menu de choix de le lentille
    const menuLenses = document.getElementById('lenses');
    Request.response['lenses'].forEach((lense) => {
        const newOption = document.createElement('option');
        newOption.textContent = lense;
        menuLenses.appendChild(newOption);
    });

    //Choix de la quantité commandé
    const prodQty = document.createElement('div');
    prodCard.appendChild(prodQty);
    prodQty.innerHTML = "<label for='quantity'>Quantité :</label><input type='number' name='quantity' id='quantity' value='1'>";

    //Photo
    const prodPhoto = document.getElementById('photo');
    const prodImg = document.createElement('img');
    prodPhoto.appendChild(prodImg);
    prodImg.setAttribute('src', Request.response['imageUrl']);

    //Choix de la lentille
    menuLenses.addEventListener('change', function (e) {
        e.preventDefault();
        productLense = e.target.value;
        console.log('productLense', productLense);
    });

    //quantité de produit
    document.getElementById('quantity').addEventListener('change', function (e) {
        e.preventDefault();
        productQty = parseInt(e.target.value);
        console.log('productQty', productQty);
    });
};

//Ajoute le produit au panier
function ajoutPanier() {
    //verifie si le client à choisi une lentille
    if (!productLense) {
        alert("Vous devez choisir une lentille");
        return;
    }

    //créer l'objet
    let panierObj = ({
        id: Request.response["_id"],
        lense: productLense,
        quantity: productQty
    });
    const productKey = `${Request.response._id}-${productLense}`;
    console.log("productKey", productKey);
    console.log('panierObj', panierObj);

    //verifie si le produit est déjà dans le localStorage, si oui mets à jour la quantité
    if (!localStorage.getItem(productKey)) {
        localStorage.setItem(productKey, JSON.stringify(panierObj));
    } else {
        let tmpProduct = JSON.parse(localStorage.getItem(productKey));
        let tmpQty = panierObj.quantity + tmpProduct.quantity;
        panierObj.quantity = tmpQty;
        localStorage.setItem(productKey, JSON.stringify(panierObj));
    };
}

//Envoie un requête à l'API pour récuperer les infos du produit choisi
Request.get(`http://localhost:3000/api/cameras/${idProduct}`)
    .then(showProduct);

//fonction mettre le produit au panier
const btnPanier = document.getElementById("ajout-panier");
btnPanier.addEventListener('click', function (e) {
    e.preventDefault();
    ajoutPanier();
});



