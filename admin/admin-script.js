// DOM Elements
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logout');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const contentSections = document.querySelectorAll('.content-section');
const destinationsTable = document.getElementById('destinationsTable');
const toursTable = document.getElementById('toursTable');
const testimonialsTable = document.getElementById('testimonialsTable');
const addDestinationBtn = document.getElementById('addDestination');
const addTourBtn = document.getElementById('addTour');
const addTestimonialBtn = document.getElementById('addTestimonial');
const modal = document.getElementById('editModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const saveModalBtn = document.getElementById('saveModal');
const cancelModalBtn = document.getElementById('cancelModal');
const closeModalBtn = document.querySelector('.close-modal');

// Sample Data (In a real app, this would come from a database or API)
let destinations = [
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
    }
];

let tours = [
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
    }
];

let testimonials = [
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
    }
];

// Check if user is logged in (simulated with localStorage)
if (window.location.pathname.includes('dashboard.html') && !localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html';
}

// Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in real app, this would be a proper auth check)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    });
}

// Sidebar Navigation
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').substring(1);
        
        // Update active link
        sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');
        
        // Show corresponding section
        contentSections.forEach(section => {
            if (section.id === target) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// Load Data Tables
function loadDestinationsTable() {
    destinationsTable.innerHTML = destinations.map(dest => `
        <tr data-id="${dest.id}">
            <td>${dest.id}</td>
            <td><img src="${dest.image}" alt="${dest.title}"></td>
            <td>${dest.title}</td>
            <td>${dest.description.substring(0, 50)}...</td>
            <td>${dest.price}</td>
            <td class="action-buttons">
                <button class="btn edit-destination">Edit</button>
                <button class="btn btn-danger delete-destination">Delete</button>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to edit/delete buttons
    document.querySelectorAll('.edit-destination').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('tr').getAttribute('data-id'));
            openEditDestinationModal(id);
        });
    });
    
    document.querySelectorAll('.delete-destination').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('tr').getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this destination?')) {
                deleteDestination(id);
            }
        });
    });
}

function loadToursTable() {
    toursTable.innerHTML = tours.map(tour => `
        <tr data-id="${tour.id}">
            <td>${tour.id}</td>
            <td><img src="${tour.image}" alt="${tour.title}"></td>
            <td>${tour.title}</td>
            <td>${tour.price}</td>
            <td>${tour.duration}</td>
            <td class="action-buttons">
                <button class="btn edit-tour">Edit</button>
                <button class="btn btn-danger delete-tour">Delete</button>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to edit/delete buttons
    document.querySelectorAll('.edit-tour').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('tr').getAttribute('data-id'));
            openEditTourModal(id);
        });
    });
    
    document.querySelectorAll('.delete-tour').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('tr').getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this tour?')) {
                deleteTour(id);
            }
        });
    });
}

function loadTestimonialsTable() {
    testimonialsTable.innerHTML = testimonials.map(testimonial => `
        <tr data-id="${testimonial.id}">
            <td>${testimonial.id}</td>
            <td>${testimonial.text.substring(0, 50)}...</td>
            <td>${testimonial.author}</td>
            <td>${testimonial.role}</td>
            <td class="action-buttons">
                <button class="btn edit-testimonial">Edit</button>
                <button class="btn btn-danger delete-testimonial">Delete</button>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to edit/delete buttons
    document.querySelectorAll('.edit-testimonial').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('tr').getAttribute('data-id'));
            openEditTestimonialModal(id);
        });
    });
    
    document.querySelectorAll('.delete-testimonial').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('tr').getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this testimonial?')) {
                deleteTestimonial(id);
            }
        });
    });
}

// Modal Functions
function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Destination CRUD
function openAddDestinationModal() {
    const form = `
        <form id="destinationForm">
            <div class="form-group">
                <label for="destTitle">Title</label>
                <input type="text" id="destTitle" name="destTitle" required>
            </div>
            <div class="form-group">
                <label for="destDescription">Description</label>
                <textarea id="destDescription" name="destDescription" required></textarea>
            </div>
            <div class="form-group">
                <label for="destPrice">Price</label>
                <input type="text" id="destPrice" name="destPrice" required>
            </div>
            <div class="form-group">
                <label for="destImage">Image</label>
                <input type="file" id="destImage" name="destImage">
                <small>Recommended size: 800x600px</small>
            </div>
        </form>
    `;
    openModal('Add New Destination', form);
    
    // Set up form submission
    saveModalBtn.onclick = () => {
        const newDest = {
            id: destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1,
            title: document.getElementById('destTitle').value,
            description: document.getElementById('destDescription').value,
            price: document.getElementById('destPrice').value,
            image: 'images/default-destination.jpg' // In real app, this would be the uploaded file path
        };
        
        destinations.push(newDest);
        loadDestinationsTable();
        closeModal();
    };
}

function openEditDestinationModal(id) {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;
    
    const form = `
        <form id="destinationForm">
            <div class="form-group">
                <label for="destTitle">Title</label>
                <input type="text" id="destTitle" name="destTitle" value="${dest.title}" required>
            </div>
            <div class="form-group">
                <label for="destDescription">Description</label>
                <textarea id="destDescription" name="destDescription" required>${dest.description}</textarea>
            </div>
            <div class="form-group">
                <label for="destPrice">Price</label>
                <input type="text" id="destPrice" name="destPrice" value="${dest.price}" required>
            </div>
            <div class="form-group">
                <label for="destImage">Image</label>
                <input type="file" id="destImage" name="destImage">
                <small>Current: ${dest.image.split('/').pop()}</small>
            </div>
        </form>
    `;
    openModal('Edit Destination', form);
    
    // Set up form submission
    saveModalBtn.onclick = () => {
        dest.title = document.getElementById('destTitle').value;
        dest.description = document.getElementById('destDescription').value;
        dest.price = document.getElementById('destPrice').value;
        // In real app, handle image update
        
        loadDestinationsTable();
        closeModal();
    };
}

function deleteDestination(id) {
    destinations = destinations.filter(d => d.id !== id);
    loadDestinationsTable();
}

// Tour CRUD
function openAddTourModal() {
    const form = `
        <form id="tourForm">
            <div class="form-group">
                <label for="tourTitle">Title</label>
                <input type="text" id="tourTitle" name="tourTitle" required>
            </div>
            <div class="form-group">
                <label for="tourPrice">Price</label>
                <input type="text" id="tourPrice" name="tourPrice" required>
            </div>
            <div class="form-group">
                <label for="tourDuration">Duration</label>
                <input type="text" id="tourDuration" name="tourDuration" required>
            </div>
            <div class="form-group">
                <label for="tourGroupSize">Group Size</label>
                <input type="text" id="tourGroupSize" name="tourGroupSize" required>
            </div>
            <div class="form-group">
                <label for="tourDifficulty">Difficulty</label>
                <input type="text" id="tourDifficulty" name="tourDifficulty" required>
            </div>
            <div class="form-group">
                <label for="tourHighlights">Highlights</label>
                <textarea id="tourHighlights" name="tourHighlights" required></textarea>
            </div>
            <div class="form-group">
                <label for="tourImage">Image</label>
                <input type="file" id="tourImage" name="tourImage">
                <small>Recommended size: 800x600px</small>
            </div>
        </form>
    `;
    openModal('Add New Tour', form);
    
    // Set up form submission
    saveModalBtn.onclick = () => {
        const newTour = {
            id: tours.length > 0 ? Math.max(...tours.map(t => t.id)) + 1 : 1,
            title: document.getElementById('tourTitle').value,
            price: document.getElementById('tourPrice').value,
            duration: document.getElementById('tourDuration').value,
            groupSize: document.getElementById('tourGroupSize').value,
            difficulty: document.getElementById('tourDifficulty').value,
            highlights: document.getElementById('tourHighlights').value,
            image: 'images/default-tour.jpg' // In real app, this would be the uploaded file path
        };
        
        tours.push(newTour);
        loadToursTable();
        closeModal();
    };
}

function openEditTourModal(id) {
    const tour = tours.find(t => t.id === id);
    if (!tour) return;
    
    const form = `
        <form id="tourForm">
            <div class="form-group">
                <label for="tourTitle">Title</label>
                <input type="text" id="tourTitle" name="tourTitle" value="${tour.title}" required>
            </div>
            <div class="form-group">
                <label for="tourPrice">Price</label>
                <input type="text" id="tourPrice" name="tourPrice" value="${tour.price}" required>
            </div>
            <div class="form-group">
                <label for="tourDuration">Duration</label>
                <input type="text" id="tourDuration" name="tourDuration" value="${tour.duration}" required>
            </div>
            <div class="form-group">
                <label for="tourGroupSize">Group Size</label>
                <input type="text" id="tourGroupSize" name="tourGroupSize" value="${tour.groupSize}" required>
            </div>
            <div class="form-group">
                <label for="tourDifficulty">Difficulty</label>
                <input type="text" id="tourDifficulty" name="tourDifficulty" value="${tour.difficulty}" required>
            </div>
            <div class="form-group">
                <label for="tourHighlights">Highlights</label>
                <textarea id="tourHighlights" name="tourHighlights" required>${tour.highlights}</textarea>
            </div>
            <div class="form-group">
                <label for="tourImage">Image</label>
                <input type="file" id="tourImage" name="tourImage">
                <small>Current: ${tour.image.split('/').pop()}</small>
            </div>
        </form>
    `;
    openModal('Edit Tour', form);
    
    // Set up form submission
    saveModalBtn.onclick = () => {
        tour.title = document.getElementById('tourTitle').value;
        tour.price = document.getElementById('tourPrice').value;
        tour.duration = document.getElementById('tourDuration').value;
        tour.groupSize = document.getElementById('tourGroupSize').value;
        tour.difficulty = document.getElementById('tourDifficulty').value;
        tour.highlights = document.getElementById('tourHighlights').value;
        // In real app, handle image update
        
        loadToursTable();
        closeModal();
    };
}

function deleteTour(id) {
    tours = tours.filter(t => t.id !== id);
    loadToursTable();
}

// Testimonial CRUD
function openAddTestimonialModal() {
    const form = `
        <form id="testimonialForm">
            <div class="form-group">
                <label for="testimonialText">Testimonial Text</label>
                <textarea id="testimonialText" name="testimonialText" required></textarea>
            </div>
            <div class="form-group">
                <label for="testimonialAuthor">Author</label>
                <input type="text" id="testimonialAuthor" name="testimonialAuthor" required>
            </div>
            <div class="form-group">
                <label for="testimonialRole">Role</label>
                <input type="text" id="testimonialRole" name="testimonialRole" required>
            </div>
        </form>
    `;
    openModal('Add New Testimonial', form);
    
    // Set up form submission
    saveModalBtn.onclick = () => {
        const newTestimonial = {
            id: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1,
            text: document.getElementById('testimonialText').value,
            author: document.getElementById('testimonialAuthor').value,
            role: document.getElementById('testimonialRole').value
        };
        
        testimonials.push(newTestimonial);
        loadTestimonialsTable();
        closeModal();
    };
}

function openEditTestimonialModal(id) {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;
    
    const form = `
        <form id="testimonialForm">
            <div class="form-group">
                <label for="testimonialText">Testimonial Text</label>
                <textarea id="testimonialText" name="testimonialText" required>${testimonial.text}</textarea>
            </div>
            <div class="form-group">
                <label for="testimonialAuthor">Author</label>
                <input type="text" id="testimonialAuthor" name="testimonialAuthor" value="${testimonial.author}" required>
            </div>
            <div class="form-group">
                <label for="testimonialRole">Role</label>
                <input type="text" id="testimonialRole" name="testimonialRole" value="${testimonial.role}" required>
            </div>
        </form>
    `;
    openModal('Edit Testimonial', form);
    
    // Set up form submission
    saveModalBtn.onclick = () => {
        testimonial.text = document.getElementById('testimonialText').value;
        testimonial.author = document.getElementById('testimonialAuthor').value;
        testimonial.role = document.getElementById('testimonialRole').value;
        
        loadTestimonialsTable();
        closeModal();
    };
}

function deleteTestimonial(id) {
    testimonials = testimonials.filter(t => t.id !== id);
    loadTestimonialsTable();
}

// Event Listeners
if (addDestinationBtn) {
    addDestinationBtn.addEventListener('click', openAddDestinationModal);
}

if (addTourBtn) {
    addTourBtn.addEventListener('click', openAddTourModal);
}

if (addTestimonialBtn) {
    addTestimonialBtn.addEventListener('click', openAddTestimonialModal);
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('dashboard.html')) {
        loadDestinationsTable();
        loadToursTable();
        loadTestimonialsTable();
        
        // Show dashboard by default
        document.querySelector('.sidebar-nav li.active a').click();
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});