// récupération de l'id de l'API
const str = window.location.href;
const url = new URL(str);
//console.log(url);
const productId = url.searchParams.get("id");
const objetUrl = "http://localhost:3000/api/products/" + productId;



//requete API
function productHtml() {
    fetch(objetUrl)
        .then(function(res) {
            return res.json();
        })
        
        .catch((error) => {
            console.log(error);
        })
        //Ajout des données(img, titre, prix, description, couleur et nombre articles) du produit de l'API vers le DOM
        .then(function(getProduct) {
            const product = getProduct;
            
            let productImage = document.createElement('img');
            document.querySelector('.item__img').appendChild(productImage);
            productImage.setAttribute('src', `${product.imageUrl}`);
            productImage.setAttribute('alt', `${product.altTxt}`);

            let productTitle = document.getElementById('title');
            productTitle.textContent = `${product.name}`;

            let productPrice = document.getElementById('price');
            productPrice.textContent = `${product.price}`;

            let productDescription = document.getElementById('description');
            productDescription.textContent = `${product.description}`;

            document.querySelector('#colors').insertAdjacentHTML('beforeend', 
                        product.colors.map(
                            (color) => 
                                `<option value="${color}">${color}</option>`
                                )
                            );
        });
    AddToPanier();
};

productHtml();

// fonction d'ajout au panier du produit.

function AddToPanier() {
    //on selectionne le DOM.
    let productPanier = document.querySelector('#addToCart');
    console.log(productPanier);
    
    //On écoute la variable au click.
    productPanier.addEventListener('click', (event) => {
    
        let panierQuantity = document.getElementById('quantity').value;
        let colorChoice = document.getElementById('colors').value;
        
        //Une condition qui nous retourne une alerte si la couleur n'est pas choisie.
        if(colorChoice == "") {
            window.alert("Veuillez choisir une couleur pour votre Kanap!")
            return;
        }

        //Une condition qui nous retourne une alerte si la quantité est égale à 0.
        if(panierQuantity <= 0) {
            window.alert("Veuillez choisir une quantité pour votre Kanap!")
            return;
        }

        //Une condition qui nous retourne une alerte si la quantité est supérieure a 100.
        if(panierQuantity > 100) {
            window.alert("Vous avez trop de Kanap!")
            return;
        }
        
        //création de l'objet produit
        var product = {
            id: productId,
            color: colorChoice,
            quantity: panierQuantity
        };
        console.log(product);

        //création du LocalStorage pour les stocker l'objet "product".
        let panier = JSON.parse(localStorage.getItem("panier"));
        
        //Création du panier si le panier n'existe pas.
        if (panier === null) {
            panier = [];
        }
        //constante qui dit que si même id et même couleur alors augmenter juste la quantité.
        const indexProduit = (item) => (item.id === product.id) && (item.color === product.color);
        let index = panier.findIndex(indexProduit);
        
        //Si l'index de l'objet "product" n'est pas dans le "panier" alors on l'ajoute
        if (index == -1) {
            panier.push(product);

        //Si il est déjà présent alors on modifie juste la quantité
        } else {
            let totalQuantity = parseInt(panier[index].quantity) + parseInt(product.quantity);

            panier[index].quantity = totalQuantity; // modification de la quantité
        }

        //conversion du tableau en "string" pour le stocker dans le LS à nouveau
        panier = JSON.stringify(panier);

        //Création d'une nouvelle valeur à la clé "panier"
        localStorage.setItem('panier', panier); 
        
        // Pour empêcher les paramètres par défaut du 'clic' (le changement de page)
        event.preventDefault();
        window.alert("produit ajouté au panier");
    });
};


