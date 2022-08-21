//making variable input file-input and choose-img
const fileInput = document.querySelector(".file-input"),
//select all filter options
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFiltersBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img");
saveImgBtn = document.querySelector(".save-img");


let rotate = 0, flipHorizonrtal = 1, flipVertical = 1;
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

const applyFilters = () => {
 previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizonrtal}, ${flipVertical})`;
 previewImg.style.filter =  `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;  
}


//
const loadImage = () => {
     let file = fileInput.files[0]; //getting user selected file
     if(!file) return; //return if user hasn't selected file
     //console.log(file);
     previewImg.src = URL.createObjectURL(file); //passing file url as preview img
     //REMOVE DISABLE CLASS
     previewImg.addEventListener("load", function(){
        resetFiltersBtn.click();
        document.querySelector(".container").classList.remove("disable");
     });
}

//selected filter-button only will be active
filterOptions.forEach(option => {
    option.addEventListener("click", function(){
       document.querySelector(".filter .active").classList.remove("active");
       option.classList.add("active");
       //change selected name on slider name
       filterName.innerText = option.innerText;

       if(option.id === "brightness"){
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
       }else if(option.id === "saturation"){
        filterSlider.max = "200";
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
       }else if(option.id === "inversion"){
        filterSlider.max = "100";
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
       }else{
        filterSlider.max = "100";
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
       }
        

    });
});

const updateFilter = () => {
     filterValue.innerText = `${filterSlider.value}%`;
     const selectedFilter = document.querySelector(".filter .active");

     if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
     }else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
     }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
     }else{
        grayscale = filterSlider.value;
     } 

     applyFilters();
}

rotateOptions.forEach(option => {
  option.addEventListener("click", function(){//adding click event 
    if(option.id === "left"){
        rotate -= 90; //minus 90 degree to rotate left
    }else if(option.id === "right"){
        rotate += 90; //plus 90 degree to rotate right
    }else if(option.id == "horizontal"){
        flipHorizonrtal = flipHorizonrtal === 1 ? -1 : 1;
    }else{
        flipVertical = flipVertical === 1 ? -1 : 1;
    }
     applyFilters();
  });
});

const resetFilters = () => {
    rotate = 0, flipHorizonrtal = 1, flipVertical = 1;
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    filterOptions[0].click();
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    //applying users selected filters
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width/2, canvas.height/2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI/180);
    }

    ctx.scale(flipHorizonrtal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    //document.body.appendChild(canvas);
    //creating <a> element
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
    
}

//fire change method
fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFiltersBtn.addEventListener("click", resetFilters);
saveImgBtn.addEventListener("click", saveImage);
//on click choose-img button file-input method revoked;
chooseImgBtn.addEventListener("click", function(){
   fileInput.click();
});

