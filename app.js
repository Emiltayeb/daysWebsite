let controller,slideScene,pageScene ;




const mouse = document.querySelector(".cursor");
const mouseText = mouse.querySelector(".cursor-text")

const burger = document.querySelector(".burger")
const navbar = document.querySelector(".nav-bar")
const navLinks = document.querySelectorAll(".nav-links h3")
const navHeader = document.getElementById("nav-header");

burger.addEventListener("click",toggleBurger)
//toget mouse potsion with scroll
let xMousePos = 0;
let yMousePos = 0;
let lastScrolledLeft = 0;
let lastScrolledTop = 0;
let timer = null;

$(function () {
  $(document).scroll(function () {
    var $nav = $("#nav-header");
    if(!document.querySelector(".burger").classList.contains("open")){
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    }
  });
});

function toggleBurger(e){
  console.log("burger click")
  //create a timeline instance

  // detect if we need to toggel

  burger.classList.toggle("open")

  const tl = gsap.timeline();
  if(  burger.classList.contains("open")){

   document.body.style.overflow = "hidden";
  tl.to(".line-1",{rotate:"50deg",y:5, backgroundColor:"black"},"mainNav")
  tl.to(".line-2",{rotate:"-50deg",y:-5,x:3 , backgroundColor:"black"},"mainNav")
  tl.to(navbar,1,{clipPath:"circle(2050px  at 100% -10%)",ease:"power1.inOut"},"mainNav")
  // tl.fromTo(navHeader,{display:"none"},{delay:1,display:"flex",backgroundColor:"white"},"mainNav")
  tl.fromTo(".nav-links h3",{x:"-100%",opacity:0},{duration:0.5,x:0,opacity:1,stagger:0.45,ease:"power2.inOut"})
  tl.fromTo(".contact",{opacity:0},{duration:1,delay:0.5,opacity:1,ease:"power1.easeOut"})


  }
else{
  document.body.style.overflow = "auto";
  tl.to(".line-1",{rotate:"0",y:0, backgroundColor:"white"},"mainNav")
  tl.to(".line-2",{rotate:"0",y:0,x:0 , backgroundColor:"white"},"mainNav")
  // tl.fromTo(navHeader,{backgroundColor:"white"},{delay:0.3,backgroundColor:"#17181a"},"mainNav")
  tl.to(navbar,1,{clipPath:"circle(50px  at 100% -10%)",ease:"power2.inOut"},"mainNav")


}
}


function animateSlides(){
  // init controller
   controller = new ScrollMagic.Controller(); 
  //animation with gsap
  const sliders = document.querySelectorAll(".slide");
  const nav  = document.querySelector("#nav-header")  



  // loop over slides and start animateing
  sliders.forEach((slide,index,slides)=>{

    const revealImg = slide.querySelector(".reveal-img")
    const revealText = slide.querySelector(".reveal-text")
    const img = slide.querySelector(".hero-img img")

    // creat new tl

    const timeLine = gsap.timeline({defaults:{duration:0.7,ease:"Power2.easeOut"}})


    // the reval s
    if(index==0){
      timeLine.fromTo(nav,{y:"-100%",opacity:0},{y:"0%",opacity:1})
    }

    timeLine.fromTo(img,{scale:2},{scale:1},"reveals")
    timeLine.to(revealImg,{x:"100%",display:"none"},"reveals"  )
    timeLine.to(revealText,{x:"100%" ,display:"none"} )
   


    // now we want everyslide to have this so it will also happend on scroll

   slideScene = new ScrollMagic.Scene({
      triggerElement:slide,
      triggerHook:0.25,
      reverse:false
    }).setTween(timeLine)
    // .addIndicators({colorStart:'white',colorTrigger:'red',name:"slides"})
    .addTo(controller)

    
  // creating  a new animation
  const pageTl = gsap.timeline();
  let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
  pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
  pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
  pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
  //Create new scene
  pageScene = new ScrollMagic.Scene({
    triggerElement: slide,
    duration: "100%",
    triggerHook: 0
  })
    // .addIndicators({
    //   colorStart: "white",
    //   colorTrigger: "white",
    //   name: "page",
    //   indent: 200
    // })
    .setPin(slide, { pushFollowers: false })
    .setTween(pageTl)
    .addTo(controller);

  })


}

animateSlides()

window.addEventListener('mousemove',(e)=>{


  mouse.style.top = e.pageY  + "px";
  mouse.style.left = e.pageX  + "px";



})

window.addEventListener('mouseover',(e)=>{

const item = e.target;

if(item.id === 'logo' || item.classList.contains('burger')){
  mouse.classList.add("nav-hover")
}
else{
  mouse.classList.remove("nav-hover")
}
if(item.classList.contains("explore")){
  mouse.classList.add("exploreActive");
  mouseText.innerHTML ="TAP!";
}else{
  mouse.classList.remove("exploreActive");
  mouseText.innerHTML =""; 
}

})


window.addEventListener('scroll', function() {
    if(timer !== null) {
      mouse.style.visibility="hidden"
        clearTimeout(timer);        
    }
    timer = setTimeout(function(e) {

    
      mouse.style.visibility="visible"
    }, 150);
}, false);



//getiing mouse postion on sctoll
$(document).mousemove(function(event) {
    captureMousePosition(event);
})  
    $(window).scroll(function(event) {


        if(lastScrolledLeft != $(document).scrollLeft()){
            xMousePos -= lastScrolledLeft;
            lastScrolledLeft = $(document).scrollLeft();
            xMousePos += lastScrolledLeft;
        }
        if(lastScrolledTop != $(document).scrollTop()){
            yMousePos -= lastScrolledTop;
            lastScrolledTop = $(document).scrollTop();
            yMousePos += lastScrolledTop;

         
        }



        mouse.style.top = yMousePos+ "px";
        mouse.style.left = xMousePos+ "px";


    });
function captureMousePosition(event){
    xMousePos = event.pageX;
    yMousePos = event.pageY;
    window.status = "x = " + xMousePos + " y = " + yMousePos;
}

// gsap

// const   controller = new ScrollMagic.Controller();


// const  exoploreScene = new ScrollMagic.Scene({
//   triggerElement:'.hike-exp',
//   triggerHook:0.5
// })
// .addIndicators({colorStart:'white',colorTrigger:'red'})
// .setClassToggle(".hike-exp","active")
// .addTo(controller);
// // // experiments


// window.addEventListener("scroll",function(e){

//   if(e.type === 'scroll'){
//     mouse.style.visibility="hidden"
//   }
//   else{

//   }
// })

// // observer
// const slides = document.querySelectorAll(".slide")
// let options = {
//   threshold: 0.65
// }
// let observer = new IntersectionObserver(slideAnimation, options);

// slides.forEach(slide=>observer.observe(slide))


// function slideAnimation(entries){

//   entries.forEach(entry => {
//     console.log(entry.target)
//     if(entry.isIntersecting){
//       entry.target.classList.add("active")
//     }
//     else{
//       entry.target.classList.remove("active")
//     }
//   });
// }