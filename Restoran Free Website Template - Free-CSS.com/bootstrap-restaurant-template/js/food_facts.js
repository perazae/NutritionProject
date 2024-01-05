"use strict";
const baseURL = "https://world.openfoodfacts.net/api/v3/product/";

async function fetchFoodFacts() {
  const endpointURL = document.getElementById("barcode").value;
  if (!endpointURL) {
    const message = document.createElement("p");
    message.innerHTML = "Barcode is not provided";
    return;
  }
  const languageParam = "?tags_lc=en";
  const productInfo = document.getElementById("productInfo");
  productInfo.classList.remove("d-none");

  const displayProduct = document.getElementById("displayProduct");
  displayProduct.classList.remove("d-none");

  const spinnerInfo = document.getElementById("spinnerInfo");
  spinnerInfo.classList.remove("d-none");

  try {
    const response = await fetch(baseURL + endpointURL + languageParam);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data)
    displayFoodData(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }

  spinnerInfo.classList.add("d-none");
}

function displayFoodData(data) {
  const displayProduct = document.getElementById("displayProduct");
  displayProduct.innerHTML = "";

  const containerElement = document.createElement("div");
  containerElement.id = "imageContainer";
  const productImage = document.createElement("img");
  productImage.src = `${data.product.image_front_small_url}`;
  containerElement.appendChild(productImage);
  displayProduct.appendChild(containerElement);

  const productName = document.createElement("h5");
  productName.textContent = `${data.product.product_name}`;
  displayProduct.appendChild(productName);

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
  ingredientsParagraph.innerHTML = `<strong>Ingredients:</strong> ${data.product["ingredients_text"]}`;
  displayProduct.appendChild(ingredientsParagraph);
}
