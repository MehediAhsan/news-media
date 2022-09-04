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
        categoriesName.classList.add('text-gray-500','hover:text-primary','focus:text-primary','font-semibold');
        categoriesName.innerHTML = `
        <a class='anchor'>${categorie.category_name}</a>
        `;
        CategoriesAll.appendChild(categoriesName);
        categoriesName.querySelector('.anchor').onclick = ()=>{
            loadNews(categorie)
        }
    });
}

loadCategories();

// spinner

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }
}

// display news

const loadNews = async({category_id,category_name}) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        // item count
        const itemCount = document.getElementById('item-count');
        if(data.data.length !== 0){
            itemCount.classList.remove('hidden');
            itemCount.innerHTML = `
            <h2 class="font-semibold">${data.data.length} items found for category ${category_name}</h2>
            `
        }
        else{
            itemCount.innerHTML = `
            <h2 class="font-semibold">${data.data.length} items found for category ${category_name}</h2>
            `
        }
        displayNews(data.data);      
    }
    catch(error){
        console.log(error);
    }
}

const displayNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    toggleSpinner(false);
    
    // news shorted by total view
    allNews.sort((a, b) => b.total_view - a.total_view);

    allNews.forEach(news => {
        console.log(news);
        const {thumbnail_url,title,details,author,total_view,_id,image_url} = news;
        const {name,img,published_date} = author;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card','lg:card-side','bg-base-100','shadow-xl','mb-6');
        newsDiv.innerHTML = `
        <figure><img class="p-6" src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body ">
          <h2 class="card-title font-bold">${title}</h2>
          <p class="text-gray-500">${details.slice(0,350)+'...'}</p>
          <div class="flex items-center justify-between flex-wrap text-gray-600 text-lg my-4">
          <div class="flex space-x-2.5 items-center justify-start basis-3/4 md:basis-1/4">
          <img class="w-10 h-10 rounded-full mr-3" src="${img}" alt="Album">
          <div class="inline-flex flex-col items-start justify-start">
          <h3 class="text-base text-gray-800 whitespace-nowrap">${name ? name : 'Not available'}</h3>
          <p class="text-sm text-gray-500 capitalize">${published_date ? published_date.slice(0,10) : 'Not available'}</p>
          </div>
          </div>
          <div class="flex space-x-3 items-center justify-end w-20 h-6 basis-1/4 md:basis-0">
          <i class="fa-regular fa-eye"></i>
          <h3 class="text-lg font-semibold text-gray-600 ">${(total_view !== null) ? total_view : 'Not available'}</h3>
          </div>
          <div class="flex space-x-2.5 basis-1/2 md:basis-0 items-center justify-end w-1/5 h-6">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          </div>  
          <div class="card-actions justify-end">
          <!-- The button to open modal -->
          <label for="modal${_id}" class="btn modal-button btn-primary">Details</label>
          
          <input type="checkbox" id="modal${_id}" class="modal-toggle" />
          <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
   
            <figure><img class="w-full" src="${image_url}" alt="Album"></figure>
            <h3 class="text-lg font-bold my-5 text-gray-800">${title}</h3>

            <div class="flex space-x-2.5 items-center justify-start basis-3/4 md:basis-1/4 mb-5 border-2 p-3">
            <img class="w-14 h-14 rounded-full mr-3" src="${img}" alt="Album">
            <div class="inline-flex flex-col items-start justify-start">
            <h3 class="text-base text-gray-700 whitespace-nowrap font-semibold">${name ? name : 'Not available'}</h3>
            <p class="text-sm text-gray-500 capitalize">${published_date ? published_date : 'Not available'}</p>
            </div>
            </div>

            <p class="text-gray-500 first-letter:text-5xl first-letter:font-semibold">${details.slice(0,800)}</p>
            
            <div class="modal-action">
                <label for="modal${_id}" class="h-10 w-10 bg-indigo-100 text-indigo-500 grid place-content-center rounded-full text-xl hover:bg-indigo-200 hover:text-2xl duration-200 cursor-pointer mx-auto "><i class="fa-solid fa-xmark"></i></label>
            </div>
            </div>
          </div>
            
          </div>
          </div> 
        </div>        
        `;
        newsContainer.appendChild(newsDiv);
    });
}

loadNews({category_id:'05',category_name:'Entertainment'});
