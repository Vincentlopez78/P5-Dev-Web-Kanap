// récupération de l'id
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
        //Ajout des données(img, titre, prix, description, couleur et nbre article) du produit de l'API vers le DOM
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

// Ajout au panier

function AddToPanier() {
    
    let productPanier = document.querySelector('#addToCart');
    console.log(productPanier);
    
    productPanier.addEventListener('click', (event) => {
    
        let panierQuantity = document.getElementById('quantity').value;
        let colorChoice = document.getElementById('colors').value;

        if(colorChoice == "") {
            window.alert("Veuillez choisir une couleur pour votre Kanap!")
            return;
        }

        if(panierQuantity <= 0) {
            window.alert("Veuillez choisir une quantité pour votre Kanap!")
            return;
        }

        if(panierQuantity > 100) {
            window.alert("Vous avez trop de Kanap!")
            return;
        }
        
        //création de l'objet produit
        var product = {
            id: productId,
            couleur: colorChoice,
            quantity: panierQuantity
        };

        //création du LocalStorage
        let panier = JSON.parse(localStorage.getItem("panier"));
        
        if (panier === null) {
            panier = [];
        }
        //constante qui dis que si le même produit et la même couleur alors augmenté juste la quantité
        const indexProduit = (item) => (item.id === product.id) && (item.couleur === product.couleur);
        let index = panier.findIndex(indexProduit);
        
        if (index == -1) {
            panier.push(product);
        } else {
            let totalQuantity = parseInt(panier[index].quantity) + parseInt(product.quantity);

            panier[index].quantity = totalQuantity; // modification de la quantité
        }

        panier = JSON.stringify(panier);

        localStorage.setItem('panier', panier); 

        event.preventDefault(); //pour empêcher le changement de la page
        window.alert("produit ajouté au panier");
    });
};


