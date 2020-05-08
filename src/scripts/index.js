let  apikey="9485e5925b36466aaa9269821cb75b31";
let article_area=document.getElementById("news-articles");
let output="";
function getNews(news)
{
   console.log(news.totalResults);
    if( news.totalResults > 0 )
    { 

    news.articles.forEach(ind=>{
     output+=
    ` <section class="container">
        <li class="article">

            <div class="img">
            <img src="${ind.urlToImage}" class="article-img" alt="${ind.title}"></img>
            </div>

            <h2 class="article-title">${ind.title}</h2>

            <p class="article-description">${ind.description || "Description not available."}</p><br>

            <span class="article-author">${ind.author? ind.author: "unknown"}</span><br>
            <a class="article-link" href="${ind.url}">
            </a>
        </li>
    </section> 
    `;
});

article_area.innerHTML=output;

    

}
else{

    article_area.innerHTML=`<div class="not-found">No article was found based on the search.</div>`;
}
}

async function reterieve(searchValueText="")
{
    article_area.innerHTML='<p class="loader">News loading please wait..</p>';
    
    if(searchValueText!="")
    {
        url=`https://newsapi.org/v2/everything?q=${searchValueText}&apiKey=${apikey}`;
    }
    else{
        url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    let responce = await fetch(url);
    //console.log(url);
    let result = await responce.json();

    getNews(result);
    //console.log(result);
};


//for passing value to retrive function

async function searchvalue(event){

    if(event.which===13 || event.keycode===13 ||  event.key==="Enter")
    {
        console.log(event);
        console.log(event.which);
        console.log(event.key);
        console.log(event.keycode);
        console.log(event.target.value);

        reterieve(event.target.value);


        
    }
};


//let article=document.getElementById("news-articles");


function start()
{
    console.log("onload")//comment to onload start function
    document.getElementById("search").addEventListener('keypress',searchvalue);
    reterieve();

}