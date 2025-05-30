// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const currentYear = document.getElementById('current-year');
const destinationContainer = document.getElementById('destination-container');
const tourContainer = document.getElementById('tour-container');
const testimonialContainer = document.getElementById('testimonial-container');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Set Current Year
currentYear.textContent = new Date().getFullYear();

// Sample Data (In a real app, this would come from a database)
const destinations = [
    {
        id: 1,
        title: "Santorini, Greece",
        description: "Experience the stunning sunsets and white-washed buildings of this iconic Greek island.",
        image: "images/santorini.jpg",
        price: "$1,299"
    },
    {
        id: 2,
        title: "Kyoto, Japan",
        description: "Discover ancient temples, beautiful gardens, and traditional tea houses in Japan's cultural capital.",
        image: "images/kyoto.jpg",
        price: "$2,499"
    },
    {
        id: 3,
        title: "Machu Picchu, Peru",
        description: "Explore the mysterious ruins of the ancient Inca civilization high in the Andes mountains.",
        image: "images/machu-picchu.jpg",
        price: "$1,899"
    },
       {
        id: 5,
        title: "Paris, France",
        description: "The city of love, art, and gastronomy awaits with its iconic landmarks and charming streets.",
        image: "images/paris.jpg",
        price: "$1,599"
    },
    

];

const tours = [
    {
        id: 1,
        title: "European Adventure",
        image: "images/europe-tour.jpg",
        price: "$2,999",
        duration: "14 days",
        groupSize: "Small group (12 people max)",
        difficulty: "Moderate",
        highlights: "Paris, Rome, Barcelona, Amsterdam"
    },
    {
        id: 2,
        title: "Asian Explorer",
        image: "images/asia-tour.jpg",
        price: "$3,499",
        duration: "21 days",
        groupSize: "Small group (15 people max)",
        difficulty: "Moderate",
        highlights: "Tokyo, Bangkok, Bali, Singapore"
    },
    {
        id: 3,
        title: "African Safari",
        image: "images/africa-tour.jpg",
        price: "$4,299",
        duration: "10 days",
        groupSize: "Private tour",
        difficulty: "Easy",
        highlights: "Serengeti, Ngorongoro Crater, Zanzibar"
    }
];

const testimonials = [
    {
        id: 1,
        text: "Our trip to Japan was absolutely amazing! Every detail was perfectly arranged and our guide was incredibly knowledgeable. Can't wait to book our next adventure with ExploreWorld!",
        author: "Sarah Johnson",
        role: "Travel Enthusiast"
    },
    {
        id: 2,
        text: "The European tour exceeded all our expectations. The hotels were excellent, the itinerary was well-balanced, and we made friends for life. Highly recommended!",
        author: "Michael Chen",
        role: "First-time Group Traveler"
    },
    {
        id: 3,
        text: "As a solo traveler, I felt completely safe and well taken care of during my African safari. The team went above and beyond to make it a memorable experience.",
        author: "Emma Rodriguez",
        role: "Solo Traveler"
    }
];

// Load Destinations
function loadDestinations() {
    destinationContainer.innerHTML = destinations.map(destination => `
        <div class="destination-card" data-id="${destination.id}">
            <div class="destination-img">
                <img src="${destination.image}" alt="${destination.title}">
            </div>
            <div class="destination-info">
                <h3>${destination.title}</h3>
                <p>${destination.description}</p>
                <p class="price">From ${destination.price}</p>
                <a href="#contact" class="btn">Inquire</a>
            </div>
        </div>
    `).join('');
}

// Load Tours
function loadTours() {
    tourContainer.innerHTML = tours.map(tour => `
        <div class="tour-card" data-id="${tour.id}">
            <div class="tour-img">
                <img src="${tour.image}" alt="${tour.title}">
            </div>
            <div class="tour-info">
                <h3>${tour.title}</h3>
                <p class="tour-price">${tour.price}</p>
                <div class="tour-details">
                    <p><i class="fas fa-calendar-alt"></i> Duration: ${tour.duration}</p>
                    <p><i class="fas fa-users"></i> Group Size: ${tour.groupSize}</p>
                    <p><i class="fas fa-tachometer-alt"></i> Difficulty: ${tour.difficulty}</p>
                    <p><i class="fas fa-star"></i> Highlights: ${tour.highlights}</p>
                </div>
                <a href="#contact" class="btn">Book Now</a>
            </div>
        </div>
    `).join('');
}

// Testimonial Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach(item => item.classList.remove('active'));
    testimonialItems[index].classList.add('active');
}

function loadTestimonials() {
    testimonialContainer.innerHTML = `
        <div class="testimonial-slider">
            ${testimonials.map((testimonial, index) => `
                <div class="testimonial-item ${index === 0 ? 'active' : ''}">
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <p class="testimonial-author">${testimonial.author}</p>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
            `).join('')}
            <div class="testimonial-nav">
                ${testimonials.map((_, index) => `
                    <button onclick="showTestimonial(${index})" ${index === 0 ? 'class="active"' : ''}>
                        ${index + 1}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Newsletter Subscription
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDestinations();
    loadTours();
    loadTestimonials();
});