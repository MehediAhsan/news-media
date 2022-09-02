// display all categories

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
        // console.log(categorie);
        const categoriesName = document.createElement('button');
        categoriesName.classList.add('text-gray-600','hover:text-primary','focus:text-primary');
        categoriesName.innerHTML = `
        <a onclick="loadNews('${categorie.category_id}')">${categorie.category_name}</a>
        `;
        CategoriesAll.appendChild(categoriesName);
    });
}

loadCategories();


// display news

const loadNews = async(category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch(error){
        console.log(error);
    }
}

const displayNews = allNews => {
    console.log(allNews);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach(news => {
        console.log(news);
        const {thumbnail_url,title,details,author,total_view} = news;
        const {name,img,published_date} = author;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card','lg:card-side','bg-base-100','shadow-xl','mb-6');
        newsDiv.innerHTML = `
        <figure><img class="p-6" src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title font-bold">${title}</h2>
          <p class="text-gray-500">${details.slice(0,400)+'...'}</p>
          <div class="flex justify-between">
          <div class="flex">
          <img class="w-10 h-10 rounded-full mr-3" src="${img}" alt="Album">
          <h3>${name}</h3>
          </div>
          <div>
          <h3>${total_view}</h3>
          </div>  
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Details</button>
          </div>
          </div> 
        </div>        
        `;
        newsContainer.appendChild(newsDiv);
    });
}

loadNews();