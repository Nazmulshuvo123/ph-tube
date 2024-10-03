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

const displayCategories = (data) => {
    console.log(data);
}


loadCategories()