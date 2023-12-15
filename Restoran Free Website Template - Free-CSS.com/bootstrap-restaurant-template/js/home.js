window.onload = init;

function init() {
  exampleBarcodes.forEach(barcode => fetchFoodFacts(barcode))
}

// Nutella - Ferrero - 400 g: 3017620422003
// Prince Chocolat biscuits au blé complet - Lu - 300 g: 7622210449283
// Céréales Chocapic - Nestlé - 430 g: 7613034626844
// Muesli Raisin, Figue, Abricot - Bjorg - 375 g: 3229820129488
const exampleBarcodes = [
  "3017620422003",
  "7622210449283",
  "7613034626844",
  "3229820129488",
];
const baseURL = "https://world.openfoodfacts.org/api/v2/product/";

async function fetchFoodFacts(barcode = null) {
  let endpointURL = barcode
    ? barcode
    : document.getElementById("barcode").value;

  if (!endpointURL) {
    console.error("Barcode is not provided");
    return;
  }

  try {
    const response = await fetch(baseURL + endpointURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayExampleFoods(data);
    // console.log(data.product.nutrient_levels.fat)
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function displayExampleFoods(data) {
  const img = document.getElementById(data.code);
  img.src = data.product.image_front_thumb_url;
  img.alt = data.product.generic_name;

  const nutrientLevels = document.getElementById(`nutrients-${data.code}`)
  nutrientLevels.innerHTML = `
    <li>Fat: ${data.product.nutrient_levels["fat"]}</li>
    <li>Salt: ${data.product.nutrient_levels["salt"]}</li>
    <li>Saturated-fat: ${data.product.nutrient_levels["saturated-fat"]}</li>
    <li>Sugars: ${data.product.nutrient_levels["sugars"]}</li>
  `
}