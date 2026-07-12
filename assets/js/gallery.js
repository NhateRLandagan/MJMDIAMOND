const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const closeBtn = document.querySelector(".close");

const items = document.querySelectorAll(".open-lightbox");

const commentsList = document.getElementById("comments-list");
const addComment = document.getElementById("add-comment");

const nameInput = document.getElementById("comment-name");
const commentInput = document.getElementById("comment-text");

const likeBtn = document.getElementById("like-btn");
const likeCount = document.getElementById("like-count");

const shareBtn = document.getElementById("share-btn");

const lightboxVideo = document.getElementById("lightbox-video");

let currentPhoto = "";


function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);


    setTimeout(()=>{
        toast.classList.add("show");
    },100);


    setTimeout(()=>{
        toast.classList.remove("show");

        setTimeout(()=>{
            toast.remove();
        },300);

    },2500);

}


items.forEach(item => {


    item.addEventListener("click",()=>{


        lightbox.classList.add("active");


        lightboxTitle.textContent = item.dataset.title;

        lightboxDesc.textContent = item.dataset.desc;



        if(item.tagName === "IMG"){


            lightboxImg.style.display="block";

            lightboxVideo.style.display="none";


            lightboxImg.src=item.src;


            currentPhoto=item.src;


        }



        else if(item.tagName === "VIDEO"){


            lightboxImg.style.display="none";

            lightboxVideo.style.display="block";


            let source=item.querySelector("source");


            lightboxVideo.src=source.src;


            lightboxVideo.play();


            currentPhoto=source.src;


        }



        loadComments();

        loadLikes();


    });


});



closeBtn.addEventListener("click",()=>{


    lightbox.classList.remove("active");


    lightboxVideo.pause();

    lightboxVideo.currentTime=0;


});


lightbox.addEventListener("click",(e)=>{


    if(e.target === lightbox){


        lightbox.classList.remove("active");


        lightboxVideo.pause();

        lightboxVideo.currentTime=0;


    }


});


document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        lightbox.classList.remove("active");

    }

});


 
addComment.addEventListener("click",()=>{


    let name = nameInput.value.trim();

    let text = commentInput.value.trim();


    if(name === "" && text === ""){

    showToast("Please enter your name and message.");

    return;

    }

    if(name === ""){

        showToast("Please enter your name.");

        return;

    }

    if(text === ""){

        showToast("Please enter a message.");

        return;

    }


    let comments = JSON.parse(localStorage.getItem("galleryComments")) || {};


    if(!comments[currentPhoto]){
        comments[currentPhoto] = [];
    }


    comments[currentPhoto].push({
        name:name,
        text:text,
        date:new Date().toLocaleString()

    });


    localStorage.setItem(
        "galleryComments",
        JSON.stringify(comments)
    );


    nameInput.value="";

    commentInput.value="";


    loadComments();


});


function loadComments(){


    commentsList.innerHTML="";


    let comments = JSON.parse(localStorage.getItem("galleryComments")) || {};


    let photoComments = comments[currentPhoto] || [];


    photoComments.forEach(comment=>{


        let div=document.createElement("div");


        div.className="comment";


        div.innerHTML=`

            <strong>${comment.name}</strong>

            <span>${comment.text}</span>

            <small>${comment.date}</small>

        `;


        commentsList.appendChild(div);


    });


}

function loadLikes(){


    let likes = JSON.parse(localStorage.getItem("galleryLikes")) || {};


    likeCount.textContent = likes[currentPhoto] || 0;


}



likeBtn.onclick=()=>{


    let likes = JSON.parse(localStorage.getItem("galleryLikes")) || {};


    if(!likes[currentPhoto]){

        likes[currentPhoto]=0;

    }


    likes[currentPhoto]++;


    localStorage.setItem(
        "galleryLikes",
        JSON.stringify(likes)
    );


    loadLikes();


};

shareBtn.onclick=()=>{


    navigator.clipboard.writeText(
        window.location.href + "#" + currentPhoto
    );


    alert("Photo link copied!");

};  


// GALLERY FILTER
const buttons = document.querySelectorAll(".filter-btn");
const s = document.querySelectorAll(".item");


buttons.forEach(button=>{

    button.addEventListener("click",()=>{


        buttons.forEach(btn=>{

            btn.classList.remove("active");

        });


        button.classList.add("active");


        let filter = button.dataset.filter;


        s.forEach(item=>{


            let category = item.dataset.category;


            if(filter === "all" || category === filter){

                item.classList.remove("hide");

            }

            else{

                item.classList.add("hide");

            }


        });


    });


});


// MOBILE NAVBAR
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const icon = menuBtn.querySelector("i");


menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("active");


    if(navLinks.classList.contains("active")){

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

    else{

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


document.addEventListener("click",(e)=>{


    if(

        !navLinks.contains(e.target) &&

        !menuBtn.contains(e.target)

    ){


        navLinks.classList.remove("active");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
        dropdown.classList.remove("active");


    }


});

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.shiftKey && e.key === "D"){

        localStorage.removeItem("galleryComments");

        localStorage.removeItem("galleryLikes");

        alert("Gallery comments and likes cleared!");

        location.reload();

    }

});

// DROPDOWN MENU (Mobile/Tablet Accordion)
const dropdown = document.querySelector(".dropdown");
const dropdownLink = dropdown.querySelector(":scope > a");

dropdownLink.addEventListener("click",(e)=>{

    if(window.innerWidth <= 900){

        e.preventDefault();

        dropdown.classList.toggle("active");

    }

});

window.addEventListener("resize",()=>{

    if(window.innerWidth > 900){

        dropdown.classList.remove("active");

    }

});

const lazyImages = document.querySelectorAll("img[loading='lazy']");


lazyImages.forEach(img=>{


    img.addEventListener("load",()=>{

        img.classList.add("loaded");

    });


});