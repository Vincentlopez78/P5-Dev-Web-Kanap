// récupération du LocalStorage
let localPanier = JSON.parse(localStorage.getItem("panier"));

//recupération de l'API
function getProduitById(id) {
    console.log(id);
    return fetch(`http://localhost:3000/api/products/${id}`)
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

async function affichageProduit() {

    const panierCart = document.getElementById("cart__items");
    
    let panierHtml = [];
    //Si panier vide alors crée un tableau
    if (localPanier === null || localPanier == 0) {
        panierCart.textContent = "Pas de Kanap dans le panier";
    } else {
        //Si panier pas vide alors rajoute un produit
        for (i = 0; i < localPanier.length; i++) {
            const produit = await getProduitById(localPanier[i].id);
            const prixTotal = (produit.price *= localPanier[i].quantity);
            panierHtml += `
                <article class="cart__item" data-id=${localPanier[i].id}>
                <div class="cart__item__img">
                    <img src=${produit.imageUrl}>
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${produit.name}</h2>
                        <p>${localPanier[i].couleur}</p>
                        <p>${prixTotal}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input data-id=${localPanier[i].id}  data-color=${localPanier[i].couleur} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${localPanier[i].quantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p data-id=${localPanier[i].id}  data-color=${localPanier[i].couleur} class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
                </article>`;
        }
        panierCart.insertAdjacentHTML("beforeend", panierHtml);

        //Prix total du panier
        let quantityTotal = 0;
        let panierTotal = 0;

        for(i = 0; i < localPanier.length; i++) {
            const kanap = await getProduitById(localPanier[i].id)
            quantityTotal += parseInt(localPanier[i].quantity);
            panierTotal += parseInt(kanap.price * localPanier[i].quantity);
        };

        document.getElementById('totalQuantity').innerHTML = quantityTotal;
        document.getElementById('totalPrice').innerHTML = panierTotal;
    
        modifyQuantity();
    }
}
affichageProduit();

function modifyQuantity() {
    let itemQuantity = document.querySelectorAll(".itemQuantity");

    itemQuantity.forEach((produitQuantity) => {
        let articleQuantity = produitQuantity.closest("article");
        console.log(produitQuantity.closest("article"));
        let articleId = articleQuantity.dataset.id;
        console.log(articleId);

        let articleColor = articleQuantity.dataset.color;
        console.log(articleColor);

        produitQuantity.addEventListener("change", () => {
            let newQuantity = Number(produitQuantity.value);

            localPanier.forEach((element) => {
                if (element.produitId == articleId && element.couleur == articleColor) {
                    element.quantity = newQuantity;
                }
            });
            localStorage.setItem("panier", JSON.stringify(localPanier));
            window.location.reload();
        });
    });
}