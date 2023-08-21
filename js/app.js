// Criamos duas variávei pra armazenar as arrays que vamos receber com o fetch da url
let arrayOfAllProducts;
let filteredArray;

// criamos a função para rodar após iniciar a página
async function loadAllProducts() {

  // pegamos a resposta do fetch e armazenamos nessa array
  arrayOfAllProducts = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json").then(r => r.json());
  
  convertEatchPrice(arrayOfAllProducts); //converto o preço de todos os produtos
  arrayOfAllProducts = sortByRating(arrayOfAllProducts);  //reorganizo a array por rating
  
  // ativo a função que captura os eventos que ocorrem em cada campo de consulta
  captureBrandFilterChange();
  captureTypeFilterChange();
  captureSortType();
  captureWrittenName();
  // faço uma shallow copy do array recebido, vai ser nessa filtered array que sempre vamos mexer
  filteredArray = [...arrayOfAllProducts];

  console.log("Carreguei a lista") //informamos que está pronto para pesquisa
  
}

// crio as variáveis que vão guardar o que ta inscrito nos campos de pesquisa
let selectedBrand;
let selectedType;
let selectedSortType;
let productName;

// abaixo estão as funções de converter o valor de cada produto e de filtrar e reorganizar a lista de acordo com o filtro selecionado
function convertEatchPrice(array) {
  array.forEach(element => {
    element.price = (parseFloat(element.price) * 5.50).toFixed(2)
  });
}

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

function findName(array, str) {
  return array.filter((e) => {
    return e.name.includes(str)
  })
}

// abaixo estão as funções que captam a interação com os filtros de pesquisa e armazenas nas variáveis de filtragem

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

function captureWrittenName() {
  const writtenNameElement = document.getElementById("filter-name");
  writtenNameElement.addEventListener("input", (event) => {
    productName = event.target.value;
    filterArray();
  })
}

// aqui está a função que é chamada toda vez que um campo de pesquisa é alterado e o console.log nos retorna os produtos que cumprem os requisitos.
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

  if (productName !== "" && productName !== undefined) {
    filteredArray = findName(filteredArray, productName)
  }
  console.log(filteredArray)
 
  

  
}

// aqui onde chamamos a função ao iniciar a página.
loadAllProducts()
