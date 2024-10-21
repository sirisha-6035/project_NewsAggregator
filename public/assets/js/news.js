// Variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array to store news data
var newsDataArr = [];

// API Key and URLs
const API_KEY = "4267ed7512e677ca0847ae7fb38a6f00";  // Updated API Key
const HEADLINES_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in;
const GENERAL_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&categories=general;
const BUSINESS_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&categories=business;
const SPORTS_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&categories=sports;
const ENTERTAINMENT_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&categories=entertainment;
const TECHNOLOGY_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&categories=technology;
const SEARCH_NEWS = http://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=;

// Load headlines by default
window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchNews(HEADLINES_NEWS);
};

// Event Listeners for buttons
generalBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>General News</h4>";
    fetchNews(GENERAL_NEWS);
});

businessBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Business News</h4>";
    fetchNews(BUSINESS_NEWS);
});

sportsBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Sports News</h4>";
    fetchNews(SPORTS_NEWS);
});

entertainmentBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Entertainment News</h4>";
    fetchNews(ENTERTAINMENT_NEWS);
});

technologyBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>Technology News</h4>";
    fetchNews(TECHNOLOGY_NEWS);
});

searchBtn.addEventListener("click", function(){
    const query = newsQuery.value;
    if (query) {
        newsType.innerHTML = "<h4>Search Results: " + query + "</h4>";
        fetchSearchNews(query);
    }
});

// Fetch news function
const fetchNews = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        newsDataArr = data.data;  // Mediastack uses data instead of articles
        displayNews();
    } catch (error) {
        console.log(error);
        newsdetails.innerHTML = "<h5>Unable to fetch data. Please try again later.</h5>";
    }
};

// Fetch search news
const fetchSearchNews = async (query) => {
    try {
        const response = await fetch(${SEARCH_NEWS}${encodeURIComponent(query)});
        const data = await response.json();
        newsDataArr = data.data;  // Mediastack uses data instead of articles
        displayNews();
    } catch (error) {
        console.log(error);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
    }
};

// Display news in the DOM
function displayNews() {
    newsdetails.innerHTML = ""; // Clear previous content

    if (newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    newsDataArr.forEach(news => {
        const date = news.published_at.split("T")[0];  // Use published_at in Mediastack

        // Create a card for each news article
        const col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement('div');
        card.className = "p-2";

        const image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.image || "placeholder-image.jpg"; // Use a placeholder if no image is available

        const cardBody = document.createElement('div');

        const newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date;

        const description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        const link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        // Append elements to the card
        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);
        newsdetails.appendChild(col);
    });
}