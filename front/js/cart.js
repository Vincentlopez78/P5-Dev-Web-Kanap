// récupération du LocalStorage
let localPanier = JSON.parse(localStorage.getItem("produitPanier"));

//recupération de l'API
function produitId(id) {
    return fetch("http://localhost:3000/api/products/" + id)
        .then(function(res) {
            return res.json();
        })
        .catch((error) => {
            //une erreur est survenue
            console.log('erreur');
        })
        .then(function(response) {
            return response;
        })
    };

function affichageProduit() {

    const panierCart = document.getElementById("cart__items");
    let panierHtml = [];
    //Si panier vide alors crée un tableau
    if (localPanier === null || localPanier == 0) {
        panierCart.textContent = "votre panier est vide";
    } else {
        //Si panier pas vide alors rajoute un produit
        for (i = 0; i < localPanier.length; i++) {
            const produit = produitId(localPanier[i].id);
            const prixTotal = (produit.price *= localPanier[i].quantity);
            panierHtml += `
                <article class="cart__item" data-id=${localPanier[i].id}>
                <div class="cart__item__img">
                    <img src=${produit.imageUrl} alt=${produit.altTxt}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${produit.name}</h2>
                        <p>${localPanier[i].color}</p>
                        <p>${prixTotal}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input data-id=${localPanier[i].id}  data-color=${localPanier[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p data-id=${localPanier[i].id}  data-color=${localPanier[i].color} class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
                </article>`;
        }
    }
}

affichageProduit();