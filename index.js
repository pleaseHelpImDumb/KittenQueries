//Random Cat Image
const body = document.querySelector("body");
const randomCatImage = document.createElement("img");
randomCatImage.alt="Random Cat Image";
randomCatImage.width = 400;

//Refresh image button
const refreshButton = document.createElement("button");
refreshButton.innerHTML = "Refresh";
body.appendChild(refreshButton);
refreshButton.addEventListener("click", refreshImage);

body.appendChild(randomCatImage);

fetch('https://api.thecatapi.com/v1/images/search')
    .then(res => {
        if(!res.ok){
            throw new Error ("Bad request");
        }
        else return res.json();
    })
    .then(data => {
        console.log(data[0]);
        randomCatImage.src = data[0].url;
    })
    .catch(error => {
        console.error(error);
    });


async function refreshImage(){
    const imgData = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await imgData.json();
    randomCatImage.src = data[0].url;
}