//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
  <figure class="product-figure">
    <img src="https://d3t32hsnjxo7q6.cloudfront.net/i/deedb7bd74bda43f062a09aab2ee1ec8_ra,w158,h184_pa,w158,h184.png" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">NYX Mosaic Powder Blush Paradise</h1>
    <div class="product-brands"><span class="product-brand background-brand">Nyx</span>
<span class="product-brand background-price">R$ 57.70</span></div>
  </section>
  // CARREGAR OS DETALHES
</div>`;
return item;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
      return details
}
let arrayOfAllProducts;
let filteredArray;

async function loadAllProducts() {

  const catalog = document.querySelector(".catalog");

  arrayOfAllProducts = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(r => r.json());
  arrayOfAllProducts = sortByRating(arrayOfAllProducts)
  captureBrandFilterChange();
  captureTypeFilterChange();
  captureSortType();
  filteredArray = [...arrayOfAllProducts];
  // arrayOfAllProducts.forEach(element => {
  //   catalog.innerHTML += productItem(element)
  // });

}

let selectedBrand;
let selectedType;
let selectedSortType;

function filterByBrand(array, productBrand){
return array.filter((p) => {
  return p.brand === productBrand
})
}

function filterByType(array, productType) {
  return array.filter((e) => {
    return e.product_type === productType
  })
}

function sortByRating(array) {
  return array.sort((p1, p2) => {
   
    return p2.rating - p1.rating
    
  })
  
}

function sortByHigherPrice(array) {
  return array.sort((p1, p2) => {
    return p2.price - p1.price
  })
}

function sortByLowerPrice(array) {
  return array.sort((p1, p2) => {
    return p1.price - p2.price
  })
}

function sortByAZ(array) {
  return array.sort((p1, p2) => {
    const nameP1 = p1.name.toLowerCase();
    const nameP2 = p2.name.toLowerCase();

    if (nameP1 < nameP2) {
      return -1
    }

    if (nameP2 < nameP1) {
      return 1
    }

    return 0

  })
}

function sortByZA(array) {
  return array.sort((p1, p2) => {
    const nameP1 = p1.name.toLowerCase();
    const nameP2 = p2.name.toLowerCase();

    if (nameP1 > nameP2) {
      return -1
    }

    if (nameP2 > nameP1) {
      return 1
    }

    return 0

  })
}

function calculatePrice(price) {
  return (parseFloat(price) * 5.50).toFixed(2)
}


function captureBrandFilterChange() {
  const filterBrandElement = document.getElementById("filter-brand");
  filterBrandElement.addEventListener("change", () => {
    selectedBrand = filterBrandElement.value;
    filterArray()
    
})
}

function captureTypeFilterChange() {
  const filterTypeElement = document.getElementById("filter-type");
  filterTypeElement.addEventListener("change", () => {
    selectedType = filterTypeElement.value.toLowerCase();
    filterArray()
    
  })
}

function captureSortType() {
  const sortTypeElement = document.getElementById("sort-type");
  sortTypeElement.addEventListener("change", () => {
    selectedSortType = sortTypeElement.value;
    filterArray()
    
  })
}

function filterArray() {
  filteredArray = [...arrayOfAllProducts];
  if (selectedBrand !== "todos" && selectedBrand !== undefined) {
    filteredArray = filterByBrand(filteredArray, selectedBrand)
  }

  if (selectedType !== "todos" && selectedType !== undefined) {
    filteredArray = filterByType(filteredArray, selectedType)
  }

  if (selectedSortType !== "Melhor Avaliados" && selectedSortType !== undefined) {
    switch (selectedSortType) {
      case "Menores Preços":
        filteredArray = sortByLowerPrice(filteredArray)
        break;
      case "Maiores Preços":
        filteredArray = sortByHigherPrice(filteredArray)
        break;
      case "A-Z":
        filteredArray = sortByAZ(filteredArray)
        break;
      case "Z-A":
        filteredArray = sortByZA(filteredArray)
        break;
      default:
        filteredArray = sortByRating(filteredArray)
    }
    
  }

  console.log(filteredArray)
  const catalog = document.querySelector(".catalog");

  
}


loadAllProducts()
