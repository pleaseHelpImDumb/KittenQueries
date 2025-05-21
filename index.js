import {API_BREEDS_KEY, API_KEY} from './config.js'
console.log(API_KEY); // Should now show your API key

//Random Cat Image
const body = document.querySelector("body");
const randomCatImage = document.createElement("img");
randomCatImage.alt="Random Cat Image";
randomCatImage.width = 400;

//Refresh image button
const refreshButton = document.createElement("button");
refreshButton.innerHTML = "Refresh";
body.appendChild(refreshButton);
refreshButton.addEventListener("click", getBreedImage);

//Breed selector
const breedDropdownLabel = document.createElement("label");
const breedDropdown = document.createElement("select");
breedDropdown.id = "breedSelector";
breedDropdownLabel.htmlFor = "breedSelector";
breedDropdownLabel.innerHTML = "Choose a breed!";
const randomOption = document.createElement("option");
randomOption.innerHTML = "Random";
randomOption.value = "rand";
breedDropdown.appendChild(randomOption);

body.appendChild(breedDropdownLabel);
body.appendChild(breedDropdown);
body.appendChild(randomCatImage);

const description = document.createElement("p");
description.id = "breedInfo";

body.appendChild(description);


fetch(API_BREEDS_KEY)
    .then(res => {
        if(!res.ok){
            throw new Error ("Bad request");
        }
        else return res.json();
    })
    .then(data =>{
        data.forEach(e =>{
            const breedOption = document.createElement("option");
            breedOption.innerHTML = e.name;
            breedOption.value = e.id;
            breedDropdown.appendChild(breedOption);
        }
        )
    })
    .catch(error => {
        console.error(error);
    }
    )



fetch(API_KEY)
    .then(res => {
        if(!res.ok){
            throw new Error ("Bad request");
        }
        else return res.json();
    })
    .then(data => {
        console.log(data);
        randomCatImage.src = data[0].url;
    })
    .catch(error => {
        console.error(error);
    });


// async function refreshImage(){
//     const imgData = await fetch(API_KEY);
//     const data = await imgData.json();
//     randomCatImage.src = data[0].url;
// }

async function getBreedImage(){
    console.log("getting breed for: " + breedDropdown.value);
    let imgData;
    if(breedDropdown.value == "rand"){
        imgData = await fetch(API_KEY);
    }
    else{
        description.innerHTML = await getBreedDescription(breedDropdown.value); 
        imgData = await fetch(API_KEY+"?breed_ids="+breedDropdown.value);
    }
    const data = await imgData.json();
    randomCatImage.src = data[0].url;
    body.appendChild(description);
}

async function getBreedDescription(breedId){
    const breedData = await fetch(API_BREEDS_KEY);
    const data = await breedData.json();
    console.log(data);
    const foundBreed = data.find(e => e.id == breedId);

    if(foundBreed){
        return foundBreed.description;
    }
    else{
        return "";
    }

}