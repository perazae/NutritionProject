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
  
  displayProduct.innerHTML = "";
  
  const nameParagraph = document.createElement("p");
  nameParagraph.textContent = `Product Name: ${data.product.product_name_en}`;
  displayProduct.appendChild(nameParagraph);

  const fatParagraph = document.createElement("p");
  nameParagraph.textContent = `Fat: ${data.product.nutriments["fat"]}`;
  displayProduct.append(fatParagraph);

  const ingredientsParagraph = document.createElement("p");
  ingredientsParagraph.textContent = `Ingredients: ${data.product.ingredients_text}`;
  displayProduct.appendChild(ingredientsParagraph);


}
