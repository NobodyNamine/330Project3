import * as json from "./content.js";

//onload run this function
function init(){
    storedData();//look at local storage
    document.querySelector("#generate").onclick = getData;//run function when generate is clicked.
}

//function for setting and accessing local storage
function storedData(){

    //adding a prefix to access local storage
    const prefix = "nqs3694-";    
    const genreKey = prefix + "genre";
    
    //getting the genre
    const userGenre = document.querySelector("#genres");
    


    //putting them into a stored value
    const storedGenre = localStorage.getItem(genreKey);

    //if they exist make it equal to the value in local storage
    if(storedGenre)
    {
        userGenre.value = storedGenre;   
    }
    
    //regardless store data by user to the local storage and update the status image
    //this stopped working all of a sudden
        
    userGenre.onchange = function(e){
        localStorage.setItem(genreKey,e.target.value);
        document.querySelector("#statusImage").src = "images/waiting.gif";
        document.querySelector("#statusText").textContent = "Choose a genre"; 
    }
        
    
}

function getData(){        
    
    // 1 myanimelist api url
    let url = "https://api.jikan.moe/v3/search/anime?q=";

    // // 2 get userlimit first
    // let userLimit = document.querySelector("#limit").value;
    
    // //add limit to the url
    // url += "&limit=" + userLimit;
    
    // //getting the score and genre
    // let userScore = document.querySelector("#score").value;
    let userGenre = document.querySelector("#genres").value;
                
    //make the whole url search
    url+="&genre="+userGenre;

    //update status to loading
    document.querySelector("#statusText").textContent = "Loading...";
    document.querySelector("#statusImage").src = "images/loading.gif";

    console.log(url);

    // call the web service, and prepare to download the file / tried to do this with xhr but it didn't work
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: json.jsonLoaded
    });
}

export { init };
    