const apikey = 'e0b2a6d1f04a4c3ab8ba4eb976492d05';

const blogContainer = document.getElementById('bolg-container');
const searchField = document.getElementById
("search-input")

const searchButton = document.getElementById
("search-button")

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error('Error fetching news', error);
        return [];
    }
}
searchButton.addEventListener("click",async () =>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery (query)
            displayBlogs(articles)

        } catch(error){
            console.log ("error fetching news by query",error)

        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=$(query)&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error('Error fetching news', error);
        return [];
    }

}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length >30? article.title.slice(0,30) + "...........": article.title;
        title.textContent = TruncatedTitle

        const description = document.createElement("p");

    
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",() =>{
            window.open(article.url,  "_blank"  )
        }

        )
        blogContainer.appendChild(blogCard);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch(error) {
        console.error("Error fetching random news", error);
    }
});
