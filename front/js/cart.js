// récupération du LocalStorage
let localPanier = localStorage.getItem("panier");

//afficher prix total
let totalPrice = 0;

if(localPanier !== null) {
    affichageproduit();
} else {
    console.log('Aucun produit dans le panier')
};

function affichageproduit() {

    let panier
}