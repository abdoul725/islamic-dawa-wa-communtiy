/* ========== Mobile menu toggle ========== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ========== Hero slideshow ========== */
const slides = Array.from(document.querySelectorAll('.hero .slide'));
let slideIndex = 0;

function setSlideBackgrounds() {
  slides.forEach((s, i) => {
    const src = s.getAttribute('data-src') || '';
    if (src) s.style.backgroundImage = `url('${src}')`;
    if (i === 0) s.classList.add('active');
  });
}
setSlideBackgrounds();

function showNextSlide() {
  if (!slides.length) return;
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}
let heroTimer = setInterval(showNextSlide, 2000); // 2 seconds per request

/* Pause on hover for better UX */
const heroEl = document.querySelector('.hero');
if (heroEl) {
  heroEl.addEventListener('mouseenter', () => clearInterval(heroTimer));
  heroEl.addEventListener('mouseleave', () => heroTimer = setInterval(showNextSlide, 2000));
}

/* ========== Volunteer form handler REMOVED ========== 
  This logic was removed because the volunteer form is now handled by FormSubmit 
  (an HTML-only solution) for email submission, as decided previously.
*/

/* ========== Gallery: simple lightbox ========== */
document.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item, .gallery-item img');
  if (item) {
    const img = item.querySelector ? item.querySelector('img') : (item.tagName === 'IMG' ? item : null);
    if (!img) return;
    const src = img.src;
    // create lightbox
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.tabIndex = 0;
    lb.addEventListener('click', () => lb.remove());
    const imgEl = document.createElement('img');
    imgEl.src = src;
    lb.appendChild(imgEl);
    document.body.appendChild(lb);
    return;
  }
});

/* ========== Contact form: WhatsApp handler ========== */
// ACTION REQUIRED: Use your full WhatsApp number including country code (e.g., 2349067458755)
const phoneNumber = "09067458755"; 

// Get the button element (which should have the ID 'whatsappButton' in your HTML)
const whatsappButton = document.getElementById('whatsappButton');

if (whatsappButton) {
  whatsappButton.addEventListener('click', function(event) {
    // 1. Get field values from the HTML inputs (using their IDs)
    const name = document.getElementById('c_name').value;
    const email = document.getElementById('c_email').value;
    const subject = document.getElementById('c_subject').value;
    const message = document.getElementById('c_message').value;

    // Simple validation check (ensure fields are not empty before proceeding)
    if (!name || !email || !subject || !message) {
      alert("Please fill out all required fields.");
      return; // Stop the function if fields are missing
    }

    // 2. Combine all fields into a single, structured message string
    let fullMessage = `*New Inquiry from Landing Page:*\n\n`;
    fullMessage += `*Name:* ${name}\n`;
    fullMessage += `*Email:* ${email}\n`;
    fullMessage += `*Subject:* ${subject}\n\n`;
    fullMessage += `*Message:*\n${message}`;
    
    // 3. URL-encode the message
    const encodedMessage = encodeURIComponent(fullMessage);
    
    // 4. Construct the final WhatsApp API URL
    const whatsappURL = `https://wa.me/${09067458755}?text=${encodedMessage}`;
    
    // 5. Open the URL in a new browser tab
    window.open(whatsappURL, '_blank');
  });
}

/* ========== small nav scroll shrink ========= */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });