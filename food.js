const loadFood=()=>{
    let inputText=document.getElementById("search-input").value;
    let url=`https://themealdb.com/api/json/v1/1/search.php?s=${inputText}`
    fetch(url)
          .then(res=>res.json())
          .then(data=>showMeal(data.meals))
          .catch(error=>console.log(error));
}

//loadFood();

const showMeal=(meals)=>{
    let container=document.getElementById("result-container");
    container.innerHTML='';
    meals.forEach(meal => {
        let mealCard=document.createElement('div');
        mealCard.classList='card card-compact bg-base-100 shadow-xl'
        mealCard.innerHTML=` <figure>
                          <img
                            src="${meal.strMealThumb}"
                            alt="Image of ${meal.strMeal}" />
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title">${meal.strMeal}!</h2>
                          <p title="${meal.strInstructions}">${meal.strInstructions.slice(0,200)}...</p>
                          <div class="card-actions justify-end">
                            <button onclick="handleDetails(${meal.idMeal})" class="btn btn-primary">Show Detail</button>
                          </div>
                        </div>`;
    container.appendChild(mealCard);
    });
   
}

async function handleDetails(mealId){
try {
    let url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log(data.meals[0]);
    showDetailsModel(data.meals[0]);
    
} catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
}
}

const showDetailsModel=(meal)=>{
   console.log("ShowDetails",meal);
  // <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
  let containerShowModal=document.getElementById('meal-detail-container');
  containerShowModal.innerHTML=`
   <img  class="h-96 mx-auto" src="${meal.strMealThumb}" alt="meal details image">
   <h1 class="mt-5 text-4xl font-semibold">Name: ${meal.strMeal}</h1>
     <p class="mt-5 text-2xl">Category: ${meal.strCategory}</p>
     <p class="mt-5">Description: ${meal.strInstructions}</p>
     <p class='mt-5 text-semibild pt-4 hover:cursor-pointer'>Mode Details: 
     <span class="text-blue-600"><a href="${meal.strSource}" target="_blank">${meal.strSource} </a>
     </span></p>
     <p class="text-semibild pt-4 hover:cursor-pointer"> 
      <i class="fa-brands fa-youtube"></i> Watch Video: <span class="text-blue-600">
         <a href="${meal.strYoutube}" target="_blank">${meal.strYoutube} </a> 
      </span></p>
  `
  showMealDetailModel.showModal();

}

