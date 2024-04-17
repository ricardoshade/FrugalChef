const cardContainer = document.getElementById('all-containers');
const data = JSON.parse(localStorage.getItem('favorites'));

for(let i = 0; i < data.length; i++){
    const newSection = document.createElement('div');
    newSection.innerHTML =  `<section id="day-${i+1}" class="recipe-card flex flex-col justify-center basis-1/2 p-5 max-w-sm rounded overflow-hidden shadow-lg"> <!-- Day ${i+1} card -->
    <h3>Day ${i+1}</h3>
    <img src="#" alt="#">
    <p class="meal-title"></p>
    <p id="dinner-day-${i+1}" class="meal-description"></p>
    
</section>`;

cardContainer.append(newSection);

}

function SetUpFavsPage(){
    
    const recipeCards = document.getElementsByClassName('recipe-card');
    // set card data
    
    
        for(let i = 0; i< recipeCards.length; i++){
            const title = recipeCards[i].getElementsByClassName('meal-title');
            const url = recipeCards[i].getElementsByClassName('meal-description');
            const image = recipeCards[i].querySelector('img');
            console.log(data[i]);
    
            title[0].textContent = data[i].recipe.label;
           
            url[0].textContent = data[i].recipe.url;
            image.setAttribute('src', data[i].recipe.image );


            const videoBtn = document.createElement('button');
               videoBtn.textContent = "🎥";
               videoBtn.setAttribute("data-recipe", JSON.stringify(data[i].recipe.label));
               videoBtn.addEventListener('click', getYouTubeVideoForRecipe);
               recipeCards[i].append(videoBtn);


        }
    }
SetUpFavsPage();