const appId = '196c237a';
const appkey = '9d8fce1dbd4a46fa288a0e8aa92c11e6';
const testModalObj = {

    mealtime: "Dinner",
    health: ['gluten-free']

}

function FetchRecipesAndDisplay(event){

  
 // create modalObj with modal inputs
 const modalObj = event 

const apiCall = BuildEdamamCall(modalObj);


    fetch(apiCall).then(function (response){
    
        return response.json();
    
    }).then(function (data){
        console.log(data);
        //create array to store total ingredients for shopping list
        const ingredientsArry = [];
    // get cards that hold data
        const recipeCards = document.getElementsByClassName('recipe-card');
    // set card data
        for(let i = 0; i< recipeCards.length; i++){
            const title = recipeCards[i].getElementsByClassName('meal-title');
            const url = recipeCards[i].getElementsByClassName('meal-description');
            const image = recipeCards[i].querySelector('img');

            title[0].textContent = data.hits[i].recipe.label;
            console.log(url[0].textContent)
            url[0].textContent = data.hits[i].recipe.url;
            image.setAttribute('src', data.hits[i].recipe.image );
            
            // tally ingredients of displayed recipes
            for(ingredient of data.hits[i].recipe.ingredients){
                ingredientsArry.push(ingredient.food)
            }




        }
        console.log(ingredientsArry);
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

    console.log(basecall);
    return basecall;
    

}


//fields to consider adding. mealtype[Breakfast dinner Lunch Snack Teatime] cuisineType [country stuff] health[allergens]


//fields to make static type=any appid app_key 