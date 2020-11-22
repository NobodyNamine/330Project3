//referenced giffy finder for some of this stuff
window.onload = init;
	
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
                document.querySelector("#statusText").textContent = "Waiting for Submission";}
           
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
            //console.log("searchButtonClicked() called");
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

			// 11
			//console.log(url);
        
            //12        
    //update status to loading
    document.querySelector("#statusText").textContent = "Loading...";
    document.querySelector("#statusImage").src = "images/loading.gif";
    //`<p id = 'info'>LOADING....</p>`;
    
    // call the web service, and prepare to download the file / tried to do this with xhr but it didn't work
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: jsonLoaded
    });
   }

function jsonLoaded(obj){
    //if there are no results, print a message and return
    if(obj.error){
        let msg = obj.error;
        document.querySelector("#content").innerHTML = `<p><i>Problem! <b>${msg}</b></i></p>`;
        return; // Bail out
    }
    
    //get an array like list of objects
    let results = obj.results;
    
    
    //If there are no results, show that
    if(!results){
        document.querySelector("#content").innerHTML = `<p><i>Problem! <b>No results for "${term}"</b></i></p>`;
        return;
    }
    
    //Showing the user the number of results
    let bigString = "";
    
    //if there is an array of results, loop through them
    //Get the url, name, and synopsis from the returned json object
    
    //i used a bubble sort to go through the objects and sort them numerically b/c sort doesn't work here
    for(let i=0;i<results.length;i++)
    {
        for(let i=0;i<results.length-1;i++)
       {    
            if (results[i].score < results[i+1].score)
            {
                let temp = results[i];
                temp = results[i]
                results[i] = results[i+1];
                results[i+1] = temp;
                //console.log(results[i].score)
            }
       }  
    }
    
    //go through the list and print them all
    for (let i=0;i<results.length;i++)
    {
        let result = results[i];
        let url = result.url;
        let score = result.score;
        let title = result.title;
        let synopsis = result.synopsis;
        //If no synopsis exists, tell the user that
        if(synopsis=="")
        {
            synopsis = "No Synopsis exists for this anime yet."
            
        }
        //Add the image
        //create the big string to display
        let imageURL = result.image_url;
        let line = `<div class = 'animeResult'><div class = 'mainContent'><a target ='_blank' href='${url}'><h2>${title}</h2></a><p class = 'score'>Score: ${score}</p><p class='synopsis'>'${synopsis}'</p></div>`;
        let image = `<img class = 'image' src ='${imageURL}' alt = '${title} image'></div>`;
        bigString+=line;
        bigString += image;
    }
    let x = false;
    //if there is or isn't a result update status image
    if(results.length == 0)
    {
        document.querySelector("#statusText").textContent = "No results...";  
        document.querySelector("#statusImage").src = "images/none.gif";

    }
    else
    {
        document.querySelector("#statusImage").src = "images/ok.gif";
        document.querySelector("#shows").innerHTML = "Check These Shows Out";
        document.querySelector("#statusText").textContent = "Results are below!";
        x = true;
    }
    
    //display final results to user
    document.querySelector("#content").innerHTML = bigString;
   if (x == true){
       window.scroll({
            top: 630,
            behavior: 'smooth'});
   } 
}	
    