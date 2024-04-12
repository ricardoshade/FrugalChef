function healthList() {
  var healthListArr = ["Alcohol-Cocktail","Alcohol-Free","Celery-Free","Crustcean-Free","Dairy-Free","DASH","Egg-Free","Fish-Free","FODMAP-Free","Gluten-Free","Immuno-Supportive","Keto-Friendly","Kidney-Friendly","Kosher","LowPotassium","LowSugar","Lupine-Free","Mediterranean","Mollusk-Free","Mustard-Free","Nooiladded","Paleo","Peanut-Free","Pescatarian","Pork-Free","Red-Meat-Free","Sesame-Free","Shellfish-Free","Soy-Free","Sugar-Conscious","Sulfite-Free","Tree-Nut-Free","Vegan","Vegetarian","Wheat-Free"]

  var healthList = document.getElementById("health-list");

  for (var i = 0; i < healthListArr.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = `
          <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input id="checkbox-item-${i}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="checkbox-item-${i}" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">${healthListArr[i]}</label>
          </div>
      `;
      healthList.appendChild(li);
  }
}

healthList();