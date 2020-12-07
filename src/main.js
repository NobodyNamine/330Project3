import * as json from "./content.js";

let ready;
const generateBtn =  document.querySelector("#generate");

//onload run this function
function init(){
    ready = false;

    storedData();//look at local storage

    setupUI();
    
    generateBtn.onclick = getData;//run function when generate is clicked.
}

function setupUI() {
    // Get elements
    const radioButtons = document.querySelectorAll("input[type=radio][name=interactiontype]");
    const statusText = document.querySelector("#statusText");
    const customSettings = document.querySelector("#customSettings");
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    let checkedRB;

    // Starting state
    customSettings.style.visibility = "hidden";
    generateBtn.disabled = true;

    // Checking radio buttons
    for(let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].onclick = () => {
            if(radioButtons[i].checked) {
                checkedRB = radioButtons[i];

                if(checkedRB.value == "replace_words") {
                    // Show additional settings
                    ready = false;
                    statusText.innerHTML = "Select which parts of speech you'd like to randomize."
                    customSettings.style.visibility = "visible";
                }
                else if(checkedRB.value == "generate_words") {
                    ready = true;
                    customSettings.style.visibility = "hidden";
                }

            }

            if(ready) {
                activateGenerateBtn();
            }
        }
    }

    // Check setting selection
    customSettings.onclick = () => {
        for(let i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].checked) {
                ready = true;
            }
        }

        if(ready) {
            activateGenerateBtn();
        }
    }
}

function activateGenerateBtn() {
    statusText.innerHTML = "Ready to generate!";
    generateBtn.disabled = false;
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
    if(storedGenre && storedGenre != 0)
    {
        userGenre.value = storedGenre;   
        statusText.innerHTML = "Choose a randomization setting.";
    }
    
    //regardless store data by user to the local storage and update the status image
    //this stopped working all of a sudden
        
    userGenre.onchange = function(e){
        localStorage.setItem(genreKey,e.target.value);
        document.querySelector("#statusImage").src = "images/waiting.gif";
        if(e.target.value == 0) {
            statusText.innerHTML = "Choose a genre."; 
        }
        else {
            statusText.innerHTML = "Choose a randomization setting.";
        }
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

    if(userGenre == 0) {
        document.querySelector("#statusText").textContent = "You haven't chosen a genre yet!";
        return;
    }
                
    //make the whole url search
    url+="&genre="+userGenre;

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
    