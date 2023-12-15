const baseURL = "https://world.openfoodfacts.org/api/v2/product/";

async function fetchFoodFacts() {
  const endpointURL = document.getElementById("barcode").value;
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
    console.log(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}