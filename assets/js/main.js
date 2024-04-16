const appId = '196c237a';
const appkey = '9d8fce1dbd4a46fa288a0e8aa92c11e6';
const shoppingList = document.getElementById('shopping-list-items');
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

function FetchRecipesAndDisplay(event){

  
 // create modalObj with modal inputs
 const modalObj = event ;

const apiCall = BuildEdamamCall(modalObj);


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

                    ingredientsObj[curIngredientname].amount += ingredient.quantity;
                }else{
                    
                    ingredientsObj[curIngredientname] = { amount: ingredient.quantity , ingredient: ingredient.food, measurement: ingredient.measure};
                    if(ingredientsObj[curIngredientname].amount === 0){
                        ingredientsObj[curIngredientname].amount = 1;
                    }
                }
            }

            
            
            
            
        }
        console.log(ingredientsObj);
        
                    for (let property in ingredientsObj) {
                       
                        console.log('ping')
        
                          const newListItem = document.createElement('li');
                          newListItem.textContent = ingredientsObj[property].amount + ' ' + ingredientsObj[property].measurement + " " + ingredientsObj[property].ingredient ;
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
    }
    if(searchparamsobj.health){
        for(let i = 0; i < searchparamsobj.health.length; i++){
            
            basecall = basecall.concat("&health=" + searchparamsobj.health[i]);

        }
    }

   // console.log(basecall);
    return basecall;
    

}


//fields to consider adding. mealtype[Breakfast dinner Lunch Snack Teatime] cuisineType [country stuff] health[allergens]


//fields to make static type=any appid app_key 