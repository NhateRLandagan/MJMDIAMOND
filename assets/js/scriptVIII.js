const navbar = document.querySelector("header");

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
})


const images = [

    "images/Grade 8/trsday.jpg",
    "images/Grade 8/pjp13.jpg",
    "images/Grade 8/pjp9.jpg",
    "images/Grade 8/grad1.jpg"

];

let current = 0;

function changeBackground(){

    current++;

    if(current >= images.length){
        current = 0;
    }

    let home = document.querySelector("#hero");

    home.style.background =
    `linear-gradient(rgba(0,0,0,.15),
    rgba(0,0,0,.25)),
    url("${images[current]}")`;

   home.style.backgroundSize = "cover";
    home.style.backgroundPosition = "center";

}

setInterval(changeBackground, 5000);

const modal = document.getElementById("galleryModal");

const galleryContent = document.querySelector(".gallery-content");

const galleryTitle = document.getElementById("galleryTitle");

const galleryDescription = document.getElementById("galleryDescription");

const closeBtn = document.querySelector(".close-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        galleryContent.innerHTML = "";

        let media;

        if(item.tagName === "IMG"){

            media = document.createElement("img");
            media.src = item.src;

        }else{

            media = document.createElement("video");
            media.src = item.querySelector("source").src;
            media.controls = true;
            media.autoplay = true;

        }

        galleryContent.appendChild(media);

        galleryTitle.textContent = item.dataset.title;

        galleryDescription.textContent = item.dataset.description;

        modal.classList.add("active");

    });

});

closeBtn.addEventListener("click", () => {

    modal.classList.remove("active");

    galleryContent.innerHTML = "";

});

modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.classList.remove("active");

        galleryContent.innerHTML = "";

    }

});

document.addEventListener("keydown", (e)=>{

    if(e.key==="Escape"){

        modal.classList.remove("active");

        galleryContent.innerHTML="";

    }

});