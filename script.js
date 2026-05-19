var tablinks   = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (var tl of tablinks)   tl.classList.remove("active-link");
  for (var tc of tabcontents) tc.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

// Create overlay element
var overlay = document.createElement("div");
overlay.className = "nav-overlay";
document.body.appendChild(overlay);
overlay.addEventListener("click", closemenu);

function openmenu() {
  sidemenu.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closemenu() {
  sidemenu.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-link").forEach(function(link) {
  link.addEventListener("click", closemenu);
});

var sections = document.querySelectorAll("section, #header");
var navLinks  = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function() {
  var scrollY = window.scrollY + 120;
  sections.forEach(function(sec) {
    var top    = sec.offsetTop;
    var height = sec.offsetHeight;
    var id     = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(function(link) { link.classList.remove("active"); });
      var active = document.querySelector(".nav-link[href='#" + id + "']");
      if (active) active.classList.add("active");
    }
  });
}, { passive: true });

window.addEventListener("scroll", revealOnScroll, { passive: true });
revealOnScroll(); // run on load too

function revealOnScroll() {
  var reveals = document.querySelectorAll(".reveal");
  var windowHeight = window.innerHeight;
  reveals.forEach(function(el) {
    var top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

var scriptURL = 'https://script.google.com/macros/s/AKfycbxOeLz__A6X-lHyXRfB5NqeWqrKZhfVSZJiL12ccTstlitLCAJK-4DNcQjcCcAi_PFT/exec';
var form = document.forms['submit-to-google-sheet'];
var msg  = document.getElementById("msg");

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Sending…";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(function() {
        msg.innerHTML  = "✅ Message sent successfully!";
        msg.style.color = "#61b752";
        setTimeout(function() { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(function(err) {
        console.error('Error:', err.message);
        msg.innerHTML  = "❌ Failed to send. Please try again.";
        msg.style.color = "#e05f5f";
      })
      .finally(function() {
        btn.disabled = false;
        btn.textContent = "Send Message";
      });
  });
}

var skills = [
  "Full-Stack Developer,",
  "React & Node.js Developer,",
  "Backend & API Builder,",
  "System & Network Engineer,",
  "Problem Solver"
];

var typingEl  = document.querySelector(".typing");
var skillIdx  = 0;
var charIdx   = 0;
var typeSpeed = 90;
var eraseSpeed = 45;
var delay     = 1800;

function typeSkill() {
  if (!typingEl) return;
  if (charIdx < skills[skillIdx].length) {
    typingEl.textContent += skills[skillIdx].charAt(charIdx);
    charIdx++;
    setTimeout(typeSkill, typeSpeed);
  } else {
    setTimeout(eraseSkill, delay);
  }
}

function eraseSkill() {
  if (!typingEl) return;
  if (charIdx > 0) {
    typingEl.textContent = skills[skillIdx].substring(0, charIdx - 1);
    charIdx--;
    setTimeout(eraseSkill, eraseSpeed);
  } else {
    skillIdx = (skillIdx + 1) % skills.length;
    setTimeout(typeSkill, typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(typeSkill, 400);
});

function scrollToPortfolio() {
  var section = document.querySelector('#portfolio');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}
