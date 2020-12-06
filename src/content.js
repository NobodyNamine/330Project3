import * as utils from "./utils.js";
import * as rita from "./rita.js";

function jsonLoaded(obj){
    //if there are no results, print a message and return
    if(obj.error){
        let msg = obj.error;
        document.querySelector("#content").innerHTML = `<p><i>Problem! <b>${msg}</b></i></p>`;
        return; // Bail out
    }

    // Get an array of objects -- filter results so they display only SFW results
    let results = obj.results.filter(obj => obj.rated != "Rx");

    //If there are no results, show that
    if(!results){
        document.querySelector("#content").innerHTML = `<p><i>Problem! <b>No results for "${term}"</b></i></p>`;
        return;
    }
    
    //gets one randomresult
    let randomResultNum = utils.getRandom(0,results.length);
    console.log(utils.getRandom(0,results.length));
    //Showing the user the number of results
    let bigString = "";

    let result = results[randomResultNum];
    let url = result.url;
    let title = result.title;
    let synopsis = result.synopsis;
    let fakeSynopsis = rita.madLib(result.synopsis);
    if(synopsis=="")
    {
        //TODO: If no synopsis exists, put a random synopsis
        synopsis = "This is a random synopsis."
    }
    //Add the image
    //create the big string to display
    let imageURL = result.image_url;
    let line = ` <div id = left>
                    <a target ='_blank' href=${url}><h2>${title}</h2></a>
                    <p></p>
                    <button id="picture" type="picture">Change Picture</button>
                `;

    bigString+=line;
    let image = `<img class = 'image' src ='${imageURL}' alt = '${title} image'></div>`;
    bigString += image;
    let line2 = `
        <div id = right>
                    <p class='synopsis'>Real synopsis: ${synopsis}</p>
                    <p class='synopsis'>Fake synopsis: ${fakeSynopsis}</p>
        </div>;`
    bigString+= line2;
    
    
    
    let x = false;
    //if there is or isn't a result update status image
    if(results.length == 0)
    {
        document.querySelector("#statusText").textContent = "No results...";  
        document.querySelector("#statusImage").src = "images/none.gif";

    }
    else
    {
        document.querySelector("#shows").textContent = "Fake Anime Below!";
        document.querySelector("#statusImage").src = "images/ok.gif";
        document.querySelector("#statusText").textContent = "Now Select your interaction!";
        x = true;
    }
    
    //display final results to user
    document.querySelector("#content").innerHTML = bigString;
    //scrolls window down
    if (x == true){
        window.scroll({
                top: 630,
                behavior: 'smooth'});
    } 
}

function sfwFilter() {

}

export { jsonLoaded };