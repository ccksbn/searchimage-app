const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper= document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imageListWrapper");


runEventListeners();

function runEventListeners(){
    form.addEventListener("submit" , search);
    clearButton.addEventListener("click", clear )
    searchButton.addEventListener("click", alertMessage)
    
}

function alertMessage(e) {
    const value = searchInput.value.trim(); 
    if (value==="") {
        showalert("danger", "❌ Empty search box alert! 🚨 Please fill it up!")
        
    } else {
        showalert("success", "Success! 🚀 Your search results are below.")
    }
}

function showalert(type,message) {
    // <!-- <div class="alert alert-danger" role="alert">
    //         A simple danger alert—check it out!
    //       </div> -->

    const div = document.createElement("div");
    div.className= `alert alert-${type}`
    div.textContent=message;


    form.appendChild(div)

    setTimeout(() => {
        div.remove();
    }, 3500);

}

function clear() {
   
    searchInput.value="";
    imageListWrapper.innerHTML="";
    
    
    
}


function search(e){
    const value = searchInput.value.trim();
    

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID snfDqNJVXMEc0IcrrIDJZettSIjT0XT_nt2TnkROWtg"
        }
    })
    .then((res)=> res.json())
    .then((data)=>{
      Array.from(data.results).forEach((image)=>{
       console.log(image.urls.small)
        addImagetoUI(image.urls.small)

        
      })  
       
    })
    .catch((err)=> console.log(err));


    e.preventDefault();
}




function addImagetoUI(url) {
    // <div class="imageListWrapper">
    //       <!-- resimler -->
    //     </div>

    const div=document.createElement("div");
    div.className="card";

    const img= document.createElement("img");
    img.setAttribute("src",url);
    img.height=300;
    img.width=300;

    div.append(img);
    imageListWrapper.append(div);



}


