// récupération de l'id
const str = window.location;
const url = new URL(str);
const produitId = url.searchParams.get("id");
const objetUrl = "http://localhost:3000/api/products/" + produitId;

//requete API
function produitHtml() {
    fetch('http://localhost:3000/api/products/' + produitId)
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
            
            let produitImage = document.createElement('img');
            document.querySelector('.item__img').appendChild(produitImage);
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
    AddToPanier(objetUrl);
};

produitHtml();

// Ajout au panier

function AddToPanier(objetUrl) {
    let btnPanier = document.getElementById('addToCart');
    console.log(btnPanier);
    btnPanier.addEventListener('click', (event) => {
        produitPanier = JSON.parse(localStorage.getItem('produit'));
        let choiceColor = document.getElementById('colors');
        console.log(colors.value);
        console.log(produitPanier);

        const produitColor = Object.assign({} , objetUrl, {
            color : `${colors.value}`,
            quantité: 1
        });
        console.log(produitColor)

        if(produitPanier == null) {
            produitPanier = [];
            produitPanier.push(produitColor);
            console.log(produitPanier);
            localStorage.setItem('produit' , JSON.stringify(produitPanier));
        }
    })
};
