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
    // make cards that hold data
    // store excess for later same interaction use
    // tally ingredients of displayed recipes
    // get costs of recipes
    // total costs
    // display shopping list with total cost
    // displaycards
    
    
    }).catch(error => console.log(`fetch failed ${error}`));
}



function BuildEdamamCall(searchparamsobj){

    let basecall = `https://api.edamam.com/api/recipes/v2?type=any&app_id=${appId}&app_key=${appkey}&field=label&field=source&field=url&field=ingredients&field=totalTime&field=cuisineType&field=mealType&random=true`;
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