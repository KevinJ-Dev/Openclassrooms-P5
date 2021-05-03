let cart = {
    items: [],
    init() {
        //extrait les infos des produits dans le panier et les stock dans un array d'objet
        return new Promise((resolve, reject) => {

            cart.items = [];
            for (let i = 0; i <= localStorage.length - 1; i++) {
                if (localStorage.key(i).startsWith("5be")) {
                    cart.items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            };
            console.log('cart.items', cart.items);
            console.log('localStorage', localStorage);
            resolve(cart.items);
        });
    }
};
