//------------------------récupération du LocalStorage
let localPanier = JSON.parse(localStorage.getItem("panier"));

//------------------------recupération de l'API
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
    //-------------------Si panier vide alors crée un tableau
    if (localPanier === null || localPanier == 0) {
        panierCart.textContent = "Pas de Kanap dans le panier";
    } else {
        //---------------Si panier pas vide alors rajoute un produit
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
    };
    let qttTotal = 0;
    let priceTotal = 0;
    for(i = 0; i < localPanier.length; i++) {
            const kanap = await getProduitById(localPanier[i].id);
            qttTotal += parseInt(localPanier[i].quantity);
            priceTotal += parseInt(kanap.price * localPanier[i].quantity);
        };

        document.getElementById('totalQuantity').innerHTML = qttTotal;
        document.getElementById('totalPrice').innerHTML = priceTotal;
    modifyQtt();
    deleteProduct();
};
affichageProduit();

//----------------------------modification de la quantité
function modifyQtt() {
    let itemsQtt = document.querySelectorAll(".itemQuantity");
    console.log(document.querySelectorAll(".itemQuantity"));
    itemsQtt.forEach((inputQtt) => {
        inputQtt.addEventListener("change", (event) => {
            event.preventDefault();
            const input = event.target.value;
            const dataId = event.target.getAttribute("data-id");
            const dataColor = event.target.getAttribute("data-color");
            let panier = localStorage.getItem("panier");
            let produit = JSON.parse(panier);

            produit = produit.map((item, index) => {
                if (item.id === dataId && item.couleur === dataColor) {
                    item.quantity = input;
            } 
            return item;
            });
            if (input > 100) {
                alert("la quantité maximum autorisée est de cent Kanap");
                location.reload();
                return;
            } else if (input <= 0) {
                alert("Veuillez supprimé le Kanap");
                location.reload();
                return;
            }
            let produitString = JSON.stringify(produit);
            localStorage.setItem("panier", produitString);
            location.reload();
        });
    });
};
//-----------------------------suppréssion du produit
function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for (let d = 0; d < deleteBtn.length; d++) {
        deleteBtn[d].addEventListener("click", (event) => {
            event.preventDefault();
            let buttonClick = event.target;
            buttonClick.parentElement.parentElement.parentElement.parentElement.remove();

            //suppression dans le lS
            localPanier.splice(d, 1);
            localStorage.setItem("panier", JSON.stringify(localPanier));

            location.reload();
            affichageProduit();
        })
    }
};