//1 - Fetch, Load and Show Categories on html

//Create loadCategories function

const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

//Create loadCategories function

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((elements) => {
    console.log(elements);
    //create a button for each categories
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = elements.category;

    //add button categories
    categoryContainer.append(button);
  });
};

//Create get video function
const loadVideos = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .then((error) => console.log(error));
};

// {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }
//Create loadVideos function
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = 'card card-compact'
    card.innerHTML = `
    <figure class = "h-[200px]">
      <img
      src= ${video.thumbnail}
      class ="h-full w-full object-cover"
      alt="Shoes" />
    </figure>
    <div class="px-0 py-2 flex gap-2">
       <div>
         <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
       </div>
       <div>
         <h2 class="font-bold text-xl">${video.title}</h2>
         <div class = "flex items-center">
            <p class= "text-gray-400 font-bold">${video.authors[0].profile_name}</p>
            <img class="w-7 h-7" src= "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>
         </div>
         <p></p>
       </div>
      
    </div>
     `;
    videoContainer.append(card)
  });
};

loadCategories();
loadVideos();
