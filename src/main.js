import * as json from "./content.js";

//onload run this function
function init(){
    storedData();//look at local storage
    document.querySelector("#search").onclick = getData;//run function when search is clicked.
}

//function for setting and accessing local storage
function storedData(){

    //adding a prefix to access local storage
    const prefix = "nqs3694-";
    const scoreKey = prefix + "score";
    const genreKey = prefix + "genre";
    const limitKey = prefix + "limit";

    //getting the score, genre, and limit variable
    const userScore = document.querySelector("#score");
    const userGenre = document.querySelector("#genres");
    const userLimit = document.querySelector("#limit");


    //putting them into a stored value
    const storedScore = localStorage.getItem(scoreKey);
    const storedGenre = localStorage.getItem(genreKey);
    const storedLimit = localStorage.getItem(limitKey);

    //if they exist make it equal to the value in local storage
    if(storedScore)
    {
        userScore.value = storedScore;
    }
    if(storedGenre)
    {
        userGenre.value = storedGenre;   
    }
    if(storedLimit)
    {
        userLimit.value = storedLimit;   
    }

    //regardless store data by user to the local storage and update the status image
    //this stopped working all of a sudden
    userScore.onchange = function(e){ 
        localStorage.setItem(scoreKey, e.target.value);
        document.querySelector("#statusImage").src = "images/waiting.gif";
        document.querySelector("#statusText").textContent = "Waiting for Submission";
    }
        
    userGenre.onchange = function(e){
        localStorage.setItem(genreKey,e.target.value);
        document.querySelector("#statusImage").src = "images/waiting.gif";
        document.querySelector("#statusText").textContent = "Waiting for Submission"; 
    }
        
    
    userLimit.onchange = function(e){
        localStorage.setItem(limitKey,e.target.value);
        document.querySelector("#statusImage").src = "images/waiting.gif";
        document.querySelector("#statusText").textContent = "Waiting for Submission"; 
    }

}

function getData(){        
    // 1 myanimelist api url
    let url = "https://api.jikan.moe/v3/search/anime?q=";

    // 2 get userlimit first
    let userLimit = document.querySelector("#limit").value;
    
    //add limit to the url
    url += "&limit=" + userLimit;
    
    //getting the score and genre
    let userScore = document.querySelector("#score").value;
    let userGenre = document.querySelector("#genres").value;
                
    //make the whole url search
    url+="&score=" + userScore + "&genre="+userGenre;

    //update status to loading
    document.querySelector("#statusText").textContent = "Loading...";
    document.querySelector("#statusImage").src = "images/loading.gif";

    // call the web service, and prepare to download the file / tried to do this with xhr but it didn't work
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: json.jsonLoaded
    });
}

export { init };
    