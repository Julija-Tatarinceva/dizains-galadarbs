window.addEventListener('scroll', () => {
  const overlay = document.querySelector('.blue-overlay');
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Calculate progress (0 to 1)
  let progress = (scrollY+100) / viewportHeight;
  if (progress > 1) progress = 1;

  overlay.style.opacity = progress.toFixed(2);
});

function scrollToMain() {
  document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
}

let currentIndex = 0;
  const cards = document.querySelectorAll('.card');
  const navButtons = document.querySelectorAll('nav button');
  document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
      document.body.classList.add("dark-mode");
      const themeButtons = document.querySelectorAll('.icon');
    themeButtons.forEach(btn => {
      btn.textContent = '🌙';
    });
    }
    const toggleButton = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
  
    toggleButton.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      console.log("Toggled mobile nav");
    });
    document.querySelectorAll('#mobile-nav button').forEach(btn => {
      btn.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });    
  });
  
  const toggleButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  toggleButton.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
  });
  

  function ChangeTheme(){
    document.body.classList.toggle('dark-mode');
      const themeButtons = document.querySelectorAll('.icon');
    themeButtons.forEach(btn => {
      btn.classList.add('animate');
      btn.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
    });
    setTimeout(() => {
      
      // Animate icon back in
      themeButtons.forEach(btn => {
        btn.classList.remove('animate');
      });
    }, 300); // should match CSS transition duration


  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark ? "true" : "false");
  }
  
  function showCard(index) {
    if (index === currentIndex) return;

    const oldCard = cards[currentIndex];
    const newCard = cards[index];

    // Remove active from current card and animate out
    oldCard.classList.remove('active');
    oldCard.classList.remove('exit-left', 'exit-right');
    oldCard.classList.add(index > currentIndex ? 'exit-left' : 'exit-right');

    // Prepare new card: reset its classes
    newCard.classList.remove('exit-left', 'exit-right');
    newCard.classList.add('active');

    // Force reflow to enable transition (trick to reset animation)
    void newCard.offsetWidth;

    // Slide in the new card
    newCard.classList.add(index > currentIndex ? 'enter-right' : 'enter-left');

    // Clean up the enter animation class after it finishes
    setTimeout(() => {
      newCard.classList.remove('enter-left', 'enter-right');
      oldCard.classList.remove('exit-left', 'exit-right');
    }, 600);

    // Update nav button states
    navButtons.forEach(btn => btn.classList.remove('active'));
    navButtons[index].classList.add('active');

    currentIndex = index;
  }
  function hideDesktopNav() {
    const nav = document.getElementById("desktop-nav");
    nav.classList.add("hide");
    nav.style.position = "absolute";
    nav.classList.remove("show");
    nav.style.visibility = "hidden";
    // Wait for animation to finish
    setTimeout(() => {
      if(window.innerWidth<=900)
        nav.style.display = "none";
    }, 400); // must match the CSS transition duration (0.5s = 500ms)
  }
  
  function showDesktopNav() {
    const nav = document.getElementById("desktop-nav");
    nav.style.position = "";
    nav.style.visibility = "visible";
    nav.style.display = "flex";// restore it first so it can animate back
    
    // force reflow so browser applies the display change before removing class
    void nav.offsetWidth;
    nav.classList.add("show");
    nav.classList.remove("hide");
  }
  function checkViewport() {
    if (window.innerWidth <= 900) {
      hideDesktopNav();
      showMobileNav()
    } else {
      hideMobileNav()
      showDesktopNav();
    }
  }
  function hideMobileNav() {
    const nav = document.getElementById("mobile-header");
    nav.classList.add("hide");
    nav.style.position = "absolute";
    nav.classList.remove("show");
    // Wait for animation to finish
    setTimeout(() => {
      if(window.innerWidth>900)
        nav.style.display = "none";
    }, 300); // must match the CSS transition duration (0.5s = 500ms)
  }
  
  function showMobileNav() {
    const nav = document.getElementById("mobile-header");
    nav.style.position = "";
    nav.style.display = "flex";// restore it first so it can animate back
    
    // force reflow so browser applies the display change before removing class
    void nav.offsetWidth;
    nav.classList.add("show");
    nav.classList.remove("hide");
  }

  
  // Check once on load
  checkViewport();
  
  // Check on resize
  window.addEventListener("resize", checkViewport);
  
  