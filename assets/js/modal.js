const modal = document.getElementById('modal');
const numOfmealsinput = document.getElementById('number-of-meals');
const budgetInput = document.getElementById('budget');
const mealTimeOptions = modal.getElementsByClassName('meal-time-option');
const mealTimeSelected = document.getElementById('selected-meal-time');
let selectedMealTime = "";
//completely necessary blank space
//
//
//
//
//
//
//
function healthList() {
    var healthListArr = ["alcohol-cocktail","alcohol-free","celery-free","crustacean-free","dairy-free","DASH","egg-free","fish-free","fodmap-free","gluten-free","immuno-supportive","keto-friendly","kidney-friendly","kosher","low-potassium","low-sugar","lupine-free","Mediterranean","mollusk-free","mustard-free","no-oil-added","paleo","peanut-free","pescatarian","pork-free","red-meat-free","sesame-free","shellfish-free","soy-free","sugar-conscious","sulfite-free","tree-nut-free","vegan","vegetarian","wheat-free"]
 
  var healthList = document.getElementById("health-list");

  for (var i = 0; i < healthListArr.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = `
          <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input id="checkbox-item-${i}" type="checkbox" value="${healthListArr[i]}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="checkbox-item-${i}" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">${healthListArr[i]}</label>
          </div>
      `;
      healthList.appendChild(li);
  }
}

function ChangeSelectedMealtime(event){

    selectedMealTime = event.dataset.time;
    mealTimeSelected.textContent = selectedMealTime;
    console.log(selectedMealTime);

}


function CreateObjectUsingModal(){

    const modalObj = {};
    const healthCheckBoxes = modal.getElementsByTagName('input');

    modalObj.numberOfMeals = numOfmealsinput.value;
    modalObj.budget = budgetInput.value;
    modalObj.mealtime = selectedMealTime;
    modalObj.health = [];


    for(let checkbox of healthCheckBoxes){
        
            if(checkbox.checked){
                modalObj.health.push(checkbox.value);
                checkbox.checked = false;
            };
        
    }

    numOfmealsinput.value = '';
    budgetInput.value = '';
    selectedMealTime = '';
    mealTimeSelected.textContent = '';
    



    return modalObj;

}



healthList();