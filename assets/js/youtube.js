//const video1El = document.getElementById('videoDay1');

let currentVideoBtn;

let apiIndex = 0;
const apiYTKeys = [
 'AIzaSyBieqmFw6oSSEM0PM0c_6ueVGWzQn-wO-A',
 'AIzaSyC5HVomrvJWmjCyo1ZNYuVscce7LB_SqrQ',
 'AIzaSyDx65xaBMXYbHaYag_0WJ0kj8TzdnjKwe4',
 'AIzaSyBVfkPJFu_HvUnAsL8z5pGWP1BAhYfUeBQ',
 'AIzaSyCZhbZrOAjKct6f_n17TCyL1pHEogHbHTY',
 'AIzaSyDNv8m1V2HCWSd8Sqf5aE8unIb4WYoesKQ'
];
// 1 'AIzaSyBzPdxIhS805a1DF3IUy6HHhuznNFrN8Hw'  OUT
// 2 'AIzaSyB6cpGWbXF__AFrSE8Pqe356TwClNtOfWw'  a few left
// 3 'AIzaSyDkL8GaFWdS1FIb2oxX_gLDTu8S84mK12U'  almost out
// 'AIzaSyDx65xaBMXYbHaYag_0WJ0kj8TzdnjKwe4'  FULL(4)
// 'AIzaSyBVfkPJFu_HvUnAsL8z5pGWP1BAhYfUeBQ'  FULL(5)
// 'AIzaSyCZhbZrOAjKct6f_n17TCyL1pHEogHbHTY'  FULL(6)
// 'AIzaSyDNv8m1V2HCWSd8Sqf5aE8unIb4WYoesKQ'  FULL(7)
// 'AIzaSyC5HVomrvJWmjCyo1ZNYuVscce7LB_SqrQ'  FULL(8)
// 'AIzaSyBieqmFw6oSSEM0PM0c_6ueVGWzQn-wO-A'  FULL(9)


function logVideoAddress(youTubeVideo) {
  //alert(youTubeVideo);
 const btnLink = document.createElement('a');
 const btn = document.createElement('button');
 btn.textContent = (youTubeVideo);
 btnLink.setAttribute('href', youTubeVideo);
 btnLink.setAttribute('target', 'blank');
 btnLink.append(btn);
 currentVideoBtn.parentElement.append(btnLink);
  

}

// ASync Function to fetch the YouTube video
const fetchYouTubeVideo = async (recipeName) => {
    let trimmedRecipeName = recipeName.trim() + '+recipe+how+to';
    let concatRecipeName = trimmedRecipeName.replaceAll(' ', '+');
    debugger;
    let apiYouTubeCall = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiYTKeys[apiIndex]}&type=video&maxResults=1&q=${concatRecipeName}`;
    const response = await fetch(apiYouTubeCall);
    const data = await response.json();
    return data;
};

// Function to retrieve a YouTube video with recipe key words passed in
function getYouTubeVideoForRecipe(event) {
  const recipeName = event.target.dataset.recipe;
  currentVideoBtn = event.target;
  debugger;
  fetchYouTubeVideo(recipeName)
  .then(data => {
    let youTubeVideo = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
    logVideoAddress(youTubeVideo);
  })
  .catch(error => {
      apiIndex++;
      fetchYouTubeVideo(recipeName)
        .then(data => {
          let youTubeVideo = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
          logVideoAddress(youTubeVideo);
        })
        .catch(error => {
          window.alert('A YouTube video could not be found for this recipe.')
        })
  })
};

//getYouTubeVideoForRecipe('sweet potatoe pie');
