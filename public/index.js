async function loader(){
    let req = new Request("index.json");
    let res = await fetch(req);
    let data = await res.json();

    section1(data);
    images(data);
}

function section1(data){
    document.querySelector("#heading1").innerHTML = data.heading;
    document.querySelector("#input1").placeholder = data.input1Placeholder;
    document.querySelector("#input2").placeholder = data.input2Placeholder;
    document.querySelector(".starttravelling").innerHTML = data.buttontext;
    document.querySelector(".heading1").innerHTML = data.heading1;
    document.querySelector(".heading2").innerHTML = data.heading2;
    document.querySelector(".text1").innerHTML = data.text1;
    document.querySelector(".text2").innerHTML = data.text2;
    document.querySelector(".learmore1").innerHTML = data.section2buttons;
    document.querySelector(".learmore2").innerHTML = data.section2buttons;


}

function images(data){
  document.querySelector(".Sec2Img2").setAttribute('src', data.image[0]);
  document.querySelector(".Sec2Img1").setAttribute('src', data.image[1]);
  document.querySelector("#tarvel").setAttribute('src', data.image[2]);
  document.querySelector(".top-img").setAttribute('src', data.image[3]);
  document.querySelector("#copy").setAttribute('src', data.image[4]);
  let charphotos = document.querySelectorAll("#charphotos");
  charphotos = charphotos[0].querySelectorAll('img');
  charphotos[0].setAttribute('src', data["charphotos"][0]);
  charphotos[1].setAttribute('src', data["charphotos"][1]);
  charphotos[2].setAttribute('src', data["charphotos"][2]);

  let third = document.querySelectorAll(".third");
  third = third[0].querySelectorAll("img");
  for (let i=0; i<third.length; i++) {
    third[i].setAttribute('src', data.third[i]);
  }

  let fourth = document.querySelectorAll(".fourth");
  fourth = fourth[0].querySelectorAll("img");
  for (let i=0; i<fourth.length; i++) {
    fourth[i].setAttribute('src', data.fourth[i]);
  }

}


loader();

let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) { //This is for the next buttons
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("slideshow");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }


    var st = document.getElementById("galleryscroll");
    var sa = document.getElementById("aboutscroll");
  
    var i = 50;
    function scrollcall(){
      if(i<=4500)
      {window.scrollTo(0,i);
      i+=100;}
    }
    st.addEventListener('click', () => {
      setInterval(scrollcall,50);
      if(i>=4500){i=50}
    });

    var j = 50;
    function scrollcall2(){
      if(j<=1400)
      {window.scrollTo(0,j);
      j+=100;}
    }
    sa.addEventListener('click', () => {
      setInterval(scrollcall2,50);
      if(i>=1400){j=50}
    });
    // var scrollender=setTimeout(clearInterval(scrollcaller),3000);

    // This has only two problems now , gallery looking real weird IDK why
    //  and it starts from the top always whenever I click on the gallery link


    var learn1=0;
    function checklearn1(){
      if(learn1==0){
        changeHtml1();
      }
      else if(learn1==1){
        unchangeHtml1();
      }
    }


    function changeHtml1(){

      document.getElementById("demo").style.display="block";
      learn1=1;

    }
    function unchangeHtml1(){

      document.getElementById("demo").style.display="none"; 
      learn1=0;

    }

    var learn2=0;
    function checklearn2(){
      if(learn2==0){
        changeHtml2();
      }
      else if(learn2==1){
        unchangeHtml2();
      }
    }
    function changeHtml2(){

      document.getElementById("demob").style.display="block";
      // document.getElementById("demob").style.transition=".7s ease out";
      learn2=1;

    }
    function unchangeHtml2(){

      document.getElementById("demob").style.display="none"; 
      learn2=0;

    }

    // var le1=document.getElementsByClassName("learmore1");
    // le1.addEventListener('click',checklearn1());

    // var le2=document.getElementsByClassName("learmore2");
    // le2.addEventListener('click',checklearn2);