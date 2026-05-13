// API configuration
const API_URL = 'http://localhost:3000/api';

// Tab switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Load content based on tab
        if (tabId === 'materials') loadMaterials();
        if (tabId === 'classes') loadClasses();
        if (tabId === 'discussion') loadDiscussion();
    });
});

// Check API status
async function checkStatus() {
    const statusEl = document.getElementById('status');
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            statusEl.textContent = '🟢 API Online';
            statusEl.classList.add('online');
            return true;
        }
    } catch (error) {
        statusEl.textContent = '🔴 API Offline';
        statusEl.classList.add('offline');
        return false;
    }
}

// Load study materials
async function loadMaterials() {
    const list = document.getElementById('materials-list');
    list.innerHTML = '<p class="empty-state">Loading materials...</p>';
    
    try {
        const response = await fetch(`${API_URL}/materials`);
        const materials = await response.json();
        
        if (materials.length === 0) {
            list.innerHTML = '<p class="empty-state">No materials available yet.</p>';
            return;
        }
        
        list.innerHTML = materials.map(material => `
            <div class="card">
                <h3>${material.title}</h3>
                <p>${material.description}</p>
                <p class="card-meta">By ${material.author}</p>
            </div>
        `).join('');
    } catch (error) {
        list.innerHTML = '<p class="empty-state">Error loading materials. Please check if the API is running.</p>';
        console.error('Error loading materials:', error);
    }
}

// Load classes
async function loadClasses() {
    const list = document.getElementById('classes-list');
    list.innerHTML = '<p class="empty-state">Loading classes...</p>';
    
    try {
        const response = await fetch(`${API_URL}/classes`);
        const classes = await response.json();
        
        if (classes.length === 0) {
            list.innerHTML = '<p class="empty-state">No classes scheduled yet.</p>';
            return;
        }
        
        list.innerHTML = classes.map(cls => `
            <div class="card">
                <h3>${cls.name}</h3>
                <p><strong>${cls.day}</strong> at ${cls.time}</p>
                <p>📖 Topic: ${cls.topic}</p>
            </div>
        `).join('');
    } catch (error) {
        list.innerHTML = '<p class="empty-state">Error loading classes. Please check if the API is running.</p>';
        console.error('Error loading classes:', error);
    }
}

// Load discussion posts
async function loadDiscussion() {
    const list = document.getElementById('discussion-list');
    list.innerHTML = '<p class="empty-state">Loading discussion...</p>';
    
    try {
        const response = await fetch(`${API_URL}/discussion`);
        const posts = await response.json();
        
        if (posts.length === 0) {
            list.innerHTML = '<p class="empty-state">Be the first to start a discussion!</p>';
            return;
        }
        
        list.innerHTML = posts.map(post => `
            <div class="post">
                <div class="post-author">👤 ${post.author}</div>
                <div class="post-message">${post.message}</div>
                <div class="post-time">${new Date(post.timestamp).toLocaleString()}</div>
            </div>
        `).join('');
    } catch (error) {
        list.innerHTML = '<p class="empty-state">Error loading discussion. Please check if the API is running.</p>';
        console.error('Error loading discussion:', error);
    }
}

// Post new discussion
async function postDiscussion() {
    const author = document.getElementById('author').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!author || !message) {
        alert('Please enter your name and a message.');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/discussion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, message })
        });
        
        if (response.ok) {
            document.getElementById('author').value = '';
            document.getElementById('message').value = '';
            await loadDiscussion();
        } else {
            alert('Error posting message. Please try again.');
        }
    } catch (error) {
        alert('Error posting message. Please check if the API is running.');
        console.error('Error posting discussion:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkStatus();
    loadMaterials();
    
    // Refresh status every 5 seconds
    setInterval(checkStatus, 5000);
});
