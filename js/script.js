const navbar = document.querySelector("header");

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
})


const images = [

    "images/Grade 9/672301374_990171613670493_688553094652149857_n.jpg",
    "images/Grade 9/562732407_1355858289311624_6341178896925631834_n.jpg",
    "images/Grade 9/588263356_885323257161182_1808207775552689232_n.jpg",
    "images/Grade 9/567794227_837625925613771_4700144965136544332_n.jpg"

];

let current = 0;

function changeBackground(){

    current++;

    if(current >= images.length){
        current = 0;
    }

    let home = document.querySelector("#hero");

    home.style.background =
    `linear-gradient(rgba(0,0,0,.45),
    rgba(0,0,0,.55)),
    url("${images[current]}")`;

   home.style.backgroundSize = "cover";
    home.style.backgroundPosition = "center";

}

setInterval(changeBackground, 4000);