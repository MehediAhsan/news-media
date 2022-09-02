const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}

const displayCategories = categories => {
    const CategoriesAll = document.getElementById('categories-all');
    categories.forEach(categorie => {
        console.log(categorie)
        const categoriesName = document.createElement('button');
        categoriesName.classList.add('text-gray-600','hover:text-primary');
        categoriesName.innerHTML = `
        <a>${categorie.category_name}</a>
        `;
        CategoriesAll.appendChild(categoriesName);
    });
}

loadCategories();