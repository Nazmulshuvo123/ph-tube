function getTimeString(time){
  //get hour and rest time
  const year = parseInt(time / 94608000);
  const month = parseInt((time % 94608000) / 7884000) + 1;
  const hour = parseInt(time / 3600)
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${year} year ${month} ${hour} hour ${minute} minute ${remainingSecond} second` 
}
const removeActiveClass = () =>{
   const buttons = document.getElementsByClassName("category-btn");
   for(let btn of buttons){
      btn.classList.remove("active")
   }
}

//1 - Fetch, Load and Show Categories on html

//Create loadCategories function

const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
      //Remove active class
      removeActiveClass();

      //Add active class
      const activeBtn = document.getElementById(`btn-${id}`)
      console.log(activeBtn);
      activeBtn.classList.add("active")
      displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}
//Create loadCategories function

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((elements) => {
    console.log(elements);
    //create a button for each categories
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = 
    `
      <button id="btn-${elements.category_id}" onclick="loadCategoryVideos(${elements.category_id})" class="btn category-btn">
        ${elements.category}
      </button>
    `

    //add button categories
    categoryContainer.append(buttonContainer);
  });
};
//Create loadDetails function
const loadDetails= async (videoID) =>{
  console.log(videoID);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
  const response = await fetch(uri);
  const data = await response.json();
  displayDetails(data.video);
}
const displayDetails = (video) =>{
  console.log(video);
  const detailContainer = document.getElementById('modal-content');
  detailContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p>${video.description}</p>
  `
// way-1
//  document.getElementById('showModalData').click();
 //way-2
 document.getElementById('customModal').showModal();
}

//Create get video function
const loadVideos = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .then((error) => console.log(error));
};

//Create loadVideos function
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if(videos.length === 0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML= 
    `
    <div class = "min-h-[400] flex flex-col gap-5 justify-center items-center">
    <img src="./assets/Icon.png" />
    <h2 class="text-center font-bold text-xl">Oops!! Sorry There is no <br>content here</h2>
    </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add("grid");
  }


  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = 'card card-compact'
    card.innerHTML = `
    <figure class = "h-[200px] relative">
      <img
      src= ${video.thumbnail}
      class ="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0 ? " " : `<span class="absolute right-2 bottom-2 text-xs bg-black rounded p-1 text-white">${getTimeString( video.others.posted_date)}</span>`
      }
      
    </figure>
    <div class="px-0 py-2 flex gap-2">
       <div>
         <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
       </div>
       <div>
         <h2 class="font-bold text-xl">${video.title}</h2>
         <div class = "flex items-center">
            <p class= "text-gray-400 font-bold">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? `<img class="w-7 h-7" src= "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
         </div>

         <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
       </div>
      
    </div>
     `;
    videoContainer.append(card)
  });
};

loadCategories();
loadVideos();
