var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");  
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
}
const scriptURL = 'https://script.google.com/macros/s/AKfycbxOeLz__A6X-lHyXRfB5NqeWqrKZhfVSZJiL12ccTstlitLCAJK-4DNcQjcCcAi_PFT/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();
  
  // Show a loading state
  const submitButton = form.querySelector('button');
  submitButton.disabled = true;
  submitButton.innerText = "Sending...";

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
        submitButton.disabled = false;
        submitButton.innerText = "Submit";
        form.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        msg.innerHTML = "Failed to send message. Please try again.";
        submitButton.disabled = false;
        submitButton.innerText = "Submit";
    });
});

window.addEventListener("scroll", reveal);

function reveal(){
    var reveals = document.querySelectorAll(".reveal");

    for(var i = 0; i < reveals.length; i++){

        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if(elementTop < windowHeight - elementVisible){
            reveals[i].classList.add("active");
        }
    }
}
const skills = [
  "Full-Stack Developer,",
  "React & Node.js Developer,",
  "Backend & API Builder,",
  "System & Network Engineer,",
  "Problem Solver"
]; 

const typingElement = document.querySelector(".typing");
let skillIndex = 0;
let charIndex = 0;
let typingSpeed = 100; 
let erasingSpeed = 50;
let delayBetweenSkills = 2000; 

function typeSkill() {
    if (charIndex < skills[skillIndex].length) {
        typingElement.textContent += skills[skillIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeSkill, typingSpeed);
    } else {
        setTimeout(eraseSkill, delayBetweenSkills);
    }
}

function eraseSkill() {
    if (charIndex > 0) {
        typingElement.textContent = skills[skillIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseSkill, erasingSpeed);
    } else {
        skillIndex = (skillIndex + 1) % skills.length; // loop skills
        setTimeout(typeSkill, typingSpeed);
    }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
    typeSkill();
});

function scrollToPortfolio() {
    const portfolioSection = document.querySelector('#portfolio');
    portfolioSection.scrollIntoView({ 
        behavior: 'smooth' 
    });
}