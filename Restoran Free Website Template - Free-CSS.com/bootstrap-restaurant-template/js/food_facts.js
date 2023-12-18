"use strict";
const baseURL = "https://world.openfoodfacts.org/api/v2/product/";

async function fetchFoodFacts() {
  const endpointURL = document.getElementById("barcode").value;
  if (!endpointURL) {
    const message = document.createElement('p')
    message.innerHTML = "Barcode is not provided"
    return;
  }
  const languageParam = "?tags_lc=en";
  try {
    const response = await fetch(baseURL + endpointURL + languageParam);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayFoodData(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function displayFoodData(data) {
  const displayProduct = document.getElementById("displayProduct");
  const productInfo = document.getElementById("productInfo");
  productInfo.classList.remove("d-none");
  displayProduct.innerHTML = "";

  const containerElement = document.createElement("div");
  containerElement.id = "imageContainer";
  const productImage = document.createElement("img");
  productImage.src = `${data.product.image_front_small_url}`
  containerElement.appendChild(productImage);
  displayProduct.appendChild(containerElement);




  const carbsParagraph = document.createElement("p");
  carbsParagraph.innerHTML = `<strong>Carbs:</strong> ${data.product.nutriments["carbohydrates"]}g`;
  displayProduct.appendChild(carbsParagraph);
  
  const fatParagraph = document.createElement("p");
  fatParagraph.innerHTML = `<strong>Fat:</strong> ${data.product.nutriments["fat"]}g`;
  displayProduct.appendChild(fatParagraph);
  
  const proteinParagraph = document.createElement("p");
  proteinParagraph.innerHTML = `<strong>Protein:</strong> ${data.product.nutriments["proteins"]}g`;
  displayProduct.appendChild(proteinParagraph);
  
  const ingredientsParagraph = document.createElement("p");
  ingredientsParagraph.innerHTML = `<strong>Ingredients:</strong> ${data.product.ingredients_text}`;
  displayProduct.appendChild(ingredientsParagraph);
  
 

}
