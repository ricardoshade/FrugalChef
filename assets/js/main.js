const appId = '196c237a';
const appkey = '9d8fce1dbd4a46fa288a0e8aa92c11e6';
const shoppingList = document.getElementById('shopping-list-items');
const cardContainer = document.getElementById('all-containers');
const testModalObj = {

    mealtime: "Dinner",
    health: ['gluten-free']

}




var images = document.querySelectorAll('.recipe-card img');
for (const image of images) {
    if (!image.src.includes('edamam')) {
      image.src = 'https://picsum.photos/300/300';
    }
}

function FetchRecipesAndDisplay(object){
  
 // create modalObj with modal inputs
 const modalObj = object ;

const apiCall = BuildEdamamCall(modalObj);
//create the recipe cards and place them in the all-containers section
    cardContainer.innerHTML = '';

for(let i = 0; i < modalObj.numberOfMeals; i++){
    const newSection = document.createElement('div');
    newSection.innerHTML = 
//      `<section id="day-${i+1}" class="recipe-card flex flex-col justify-center basis-1/2 p-5 max-w-sm rounded overflow-hidden shadow-lg"> <!-- Day ${i+1} card -->
//     <h3>Day ${i+1}</h3>
//     <img src="#" alt="#">
//     <p class="meal-title">${modalObj.mealtime}:</p>
//     <p id="dinner-day-${i+1}" class="meal-description"></p>
//     <span id="cost-day-${i+1}"></span>
// </section>`;
`<section id="day-${i+1}" class="recipe-card flex flex-col justify-center basis-1/2 max-w-sm rounded overflow-hidden shadow-2xl bg-slate-50/75"> <!-- Day 1 card -->
                <img src="#" alt="#">
                <h3 class="font-bold text-xl mb-2 text-gray-700 text-base">Day 1</h3>
                <p class="meal-title font-bold text-xl mb-2 text-gray-700 text-bases">${modalObj.mealtime}:</p>
                <p id="dinner-day-${i+1}" class="meal-description text-gray-700 text-base"></p>
                <span id="cost-day-${i+1}"></span>
            </section>`;


cardContainer.append(newSection);

}


    fetch(apiCall).then(function (response){
    
        return response.json();
    
    }).then(function (data){
        console.log(data);

        //create array to store total ingredients for shopping list
        const ingredientsObj = {};
    // get cards that hold data
        const recipeCards = document.getElementsByClassName('recipe-card');
    // set card data
        for(let i = 0; i< recipeCards.length; i++){
            const title = recipeCards[i].getElementsByClassName('meal-title');
            const url = recipeCards[i].getElementsByClassName('meal-description');
            const image = recipeCards[i].querySelector('img');

            title[0].textContent = data.hits[i].recipe.label;
           
            url[0].textContent = data.hits[i].recipe.url;
            image.setAttribute('src', data.hits[i].recipe.image );
            
            // tally ingredients of displayed recipes
            for(ingredient of data.hits[i].recipe.ingredients){

                const curIngredientname = ingredient.food.toLowerCase()
                
                if(ingredientsObj[curIngredientname]){

                    ingredientsObj[curIngredientname].amount ++;
                }else{
                    
                    ingredientsObj[curIngredientname] = { amount: 1 , ingredient: ingredient.food, measurement: ingredient.measure};
                    if(ingredientsObj[curIngredientname].amount === 0){
                        ingredientsObj[curIngredientname].amount = 1;
                    }
                }
            }

            //create a favorite? button  and add it to the card. 
            const favBtn = document.createElement('button');
            favBtn.textContent = "🖤";
            favBtn.setAttribute("data-recipe", JSON.stringify(data.hits[i]));
            favBtn.addEventListener('click', AddRecipeToFavorites);
            recipeCards[i].append(favBtn);

               //create a Video? button  and add it to the card. 
               const videoBtn = document.createElement('button');
               videoBtn.textContent = "🎥";
               videoBtn.setAttribute("data-recipe", JSON.stringify(data.hits[i].recipe.label));
               videoBtn.addEventListener('click', getYouTubeVideoForRecipe);
               recipeCards[i].append(videoBtn);


            
            
            
        }
        console.log(ingredientsObj);
        
                    for (let property in ingredientsObj) {
                       
                        
        
                          const newListItem = document.createElement('li');
                          newListItem.textContent = ingredientsObj[property].amount + ' ' + "recipe(s) need" + " " + ingredientsObj[property].ingredient ;
                          shoppingList.appendChild(newListItem);
                        
                        
                        
                        
                       // console.log(ingredientsObj[property].amount + ' ' + ingredientsObj[property].measurement + " " + ingredientsObj[property].ingredient )
                        
                                   
                    }
    // store excess for later same interaction use
    sessionStorage.setItem('random-recipes' , JSON.stringify(data));

    // ? get costs of recipes
    // ? total costs
    // ? display shopping list with total cost
    
    
    
    }).catch(error => console.log(`${error}`));
}



function BuildEdamamCall(searchparamsobj){

    let basecall = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${appId}&app_key=${appkey}&field=label&field=source&field=url&field=ingredients&field=totalTime&field=cuisineType&field=mealType&field=image&random=true`;
    if (searchparamsobj.mealtime){
       basecall = basecall.concat("&mealType=" + searchparamsobj.mealtime);
    }else{
        basecall = basecall.concat("&mealType=Dinner&mealType=Breakfast&mealType=Lunch&mealType=Snack&mealType=Teatime")
    }



    if(searchparamsobj.health){
        for(let i = 0; i < searchparamsobj.health.length; i++){
            
            basecall = basecall.concat("&health=" + searchparamsobj.health[i]);

        }
    }

     console.log(basecall);
    return basecall;
    

}

function AddRecipeToFavorites(event){

    //console.log(event.target);
    event.target.textContent = "❤";
    const newRecipe = JSON.parse(event.target.dataset.recipe)
    
    
    if(localStorage.getItem('favorites')){

        const favArry = JSON.parse(localStorage.getItem('favorites'));
        if(!favArry.includes(newRecipe)){
            favArry.push(newRecipe);
        }
        localStorage.setItem('favorites', JSON.stringify(favArry));
    
    }else{
    
        const favArry = [];
        favArry.push(newRecipe);
        localStorage.setItem('favorites', JSON.stringify(favArry));
    
    }
    

}


//fields to consider adding. mealtype[Breakfast dinner Lunch Snack Teatime] cuisineType [country stuff] health[allergens]


//fields to make static type=any appid app_key 