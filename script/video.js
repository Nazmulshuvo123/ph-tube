//1 - Fetch, Load and Show Categories on html

//Create loadCategories function

const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((response) => response.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}


//Create loadCategories function

// {
//     "category_id": "1001",
//     "category": "Music"
// }
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((elements) => {
        console.log(elements)
        //create a button for each categories
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = elements.category;

        //add button categories
        categoryContainer.append(button);
    });
    
}


loadCategories()