function writeRecipe(response) {
  let userIngredientsElement = document.querySelector("#user-ingredients");
  userIngredientsElement = response.data.answer;
  console.log(response.data.answer);
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateRecipe(event) {
  event.preventDefault();
  let ingredientsInput = document.querySelector("#user-ingredients");
  let prompt = `Please show me a recipe with the following ingredients ${ingredientsInput.value}. You may add spices, herbs and dried ingredients at your convenience. Please write it in basic HTML and begin directly with the dish's name, how many it serves, how long the preparation takes and follow with listing the ingredients. Then write how to prepare the dish.`;
  let context =
    "You are an experienced AI assistent for nutritious umami cooking. You prefer a healthy cuisine if possible vegan. You ususally work with metric units.";
  let apiKey = `31596ta47a643ofdbb992da3f1ed09dc`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  axios.get(apiUrl).then(writeRecipe);

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");

  recipeElement.innerHTML = `Searching recipe with ${ingredientsInput.value}...<span class="blink">⏳</span>`;
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
