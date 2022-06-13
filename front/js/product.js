// récupération de l'id
const str = window.location.href;
const url = new URL(str);
//console.log(url);
const produitId = url.searchParams.get("id");
const objetUrl = "http://localhost:3000/api/products/" + produitId;



//requete API
function produitHtml() {
    fetch(objetUrl)
        .then(function(res) {
            return res.json();
        })
        
        .catch((error) => {
            //Il y a une erreur
            console.log(error);
        })
        //Ajout des données(img, titre, prix, description, couleur et nbre article) du produit de l'API vers le DOM
        .then(function(getProduit) {
            const product = getProduit;
            //console.log(getProduit)
            
            let produitImage = document.createElement('img');
            document.querySelector('.item__img').appendChild(produitImage);
            console.log(document.querySelector('.item__img').appendChild(produitImage));
            produitImage.setAttribute('src', `${product.imageUrl}`);
            produitImage.setAttribute('alt', `${product.altTxt}`);

            let produitTitle = document.getElementById('title');
            produitTitle.textContent = `${product.name}`;

            let produitPrice = document.getElementById('price');
            produitPrice.textContent = `${product.price}`;

            let produitDescription = document.getElementById('description');
            produitDescription.textContent = `${product.description}`;

            document.querySelector('#colors').insertAdjacentHTML('beforeend', 
                        product.colors.map(
                            (color) => 
                                `<option value="${color}">${color}</option>`
                                )
                            );
        });
    AddToPanier();
};

produitHtml();

// Ajout au panier

function AddToPanier() {
    
    let produitPanier = document.querySelector('#addToCart');
    console.log(produitPanier);
    
    produitPanier.addEventListener('click', (event) => {
    
        let panierQuantity = document.getElementById('quantity').value;

        let colorChoice = document.getElementById('colors');
        let produitColor = colorChoice.options[colorChoice.selectedIndex].text;
        
        //création de l'objet produit
        var produit = {
            id: produitId,
            couleur: produitColor,
            quantity: panierQuantity
        };

        //création du LocalStorage
        let panier = JSON.parse(localStorage.getItem("panier"));
        console.log(panier);
        
        //constante qui dis que si le même produit et la même couleur est ajouté alors augmenté juste la quantité
        const indexProduit = (item) => (item.id === produit.id) && (item.couleur === produit.couleur);
        let index = -1;
        if (panier === null) {
            panier = [];
        }
        if (panier.size > 0) {
            index = panier.find(indexProduit);
        }
        console.log(indexProduit);

        if (index == -1) {
            panier.push(produit);
            console.log(produit);
        } else {
            console.log(produit);

            let totalQuantity = parseInt(panier[index].quantity) + parseInt(produit.quantity);

            panier[index].quantity = totalQuantity; // modification de la quantité
        }

        panier = JSON.stringify(panier);

        localStorage.setItem('panier', panier); 

        event.preventDefault(); //pour empêcher le changement de la page
        alert("produit ajouté au panier");
    });
};


