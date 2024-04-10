const appId = '196c237a';
const appkey = '9d8fce1dbd4a46fa288a0e8aa92c11e6';


fetch('https://api.edamam.com/api/recipes/v2?type=any&app_id=196c237a&app_key=9d8fce1dbd4a46fa288a0e8aa92c11e6&&field=image&field=label&field=source&field=url&field=ingredients&field=totalTime&field=cuisineType&field=mealType').then(function (response){

    return response.json();

}).then(function (data){
    console.log(data);
}).catch();


function BuildEdamamCall(){

    const basecall = 'https://api.edamam.com/api/recipes/v2?type=any&app_id=196c237a&app_key=9d8fce1dbd4a46fa288a0e8aa92c11e6&field=label&field=source&field=url&field=ingredients&field=totalTime&field=cuisineType&field=mealType';
    

}


//fields to consider adding. mealtype[Breakfast dinner Lunch Snack Teatime] cuisineType [country stuff] health[allergens]


//fields to make static type=any appid app_key 