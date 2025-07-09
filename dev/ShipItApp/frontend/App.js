// App.js - Frontend functionality for ShipItApp

class ShipItApp {
    constructor() {
        this.initializeEventListeners();
        this.loadShoutouts();
    }

    initializeEventListeners() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => this.switchTab(button));
        });

        // Navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNavItem(item);
            });
        });

        // Vote buttons
        const voteButtons = document.querySelectorAll('.vote-btn');
        voteButtons.forEach(button => {
            button.addEventListener('click', () => this.handleVote(button));
        });

        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');

        if (uploadArea) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.uploadFile());
        }

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // New post button
        const newPostBtn = document.querySelector('.new-post-btn');
        if (newPostBtn) {
            newPostBtn.addEventListener('click', () => this.showNewPostModal());
        }
    }

    switchTab(clickedTab) {
        // Remove active class from all tabs
        const allTabs = document.querySelectorAll('.tab-btn');
        allTabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to clicked tab
        clickedTab.classList.add('active');

        // Update content based on selected tab
        const tabName = clickedTab.textContent.toLowerCase();
        this.loadPostsByTab(tabName);
    }

    setActiveNavItem(clickedItem) {
        // Remove active class from all nav items
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(item => item.classList.remove('active'));

        // Add active class to clicked item
        clickedItem.classList.add('active');
    }

    handleVote(button) {
        const voteCount = button.querySelector('.vote-count');
        if (voteCount) {
            let currentVotes = parseInt(voteCount.textContent);
            
            if (button.classList.contains('upvote')) {
                currentVotes++;
                button.style.color = '#4caf50';
            } else if (button.classList.contains('downvote')) {
                currentVotes--;
                button.style.color = '#f44336';
            }
            
            voteCount.textContent = currentVotes;
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#00d4ff';
        e.currentTarget.style.backgroundColor = '#3a3a4f';
    }

    handleDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
        e.currentTarget.style.borderColor = '#3a3a4f';
        e.currentTarget.style.backgroundColor = '#2a2a3f';
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        // Validate file type
        const allowedTypes = ['audio/', 'video/'];
        const isValidType = allowedTypes.some(type => file.type.startsWith(type));
        
        if (!isValidType) {
            this.showNotification('Please select an audio or video file.', 'error');
            return;
        }

        // Update upload area to show selected file
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-file-audio upload-icon"></i>
                <p>Selected: ${file.name}</p>
                <p class="file-size">Size: ${this.formatFileSize(file.size)}</p>
            `;
        }

        this.selectedFile = file;
    }

    async uploadFile() {
        if (!this.selectedFile) {
            this.showNotification('Please select a file first.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('userName', 'Anonymous'); // You can make this dynamic

        try {
            const response = await fetch('/api/shoutouts', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                this.showNotification('Shoutout uploaded successfully!', 'success');
                this.resetUploadArea();
                this.loadShoutouts(); // Refresh the list
            } else {
                this.showNotification(result.message || 'Upload failed.', 'error');
            }
        } catch (error) {
            this.showNotification('Error uploading file. Please try again.', 'error');
            console.error('Upload error:', error);
        }
    }

    resetUploadArea() {
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-microphone upload-icon"></i>
                <p>Click to record or drag & drop audio/video files</p>
            `;
        }
        this.selectedFile = null;
    }

    async loadShoutouts() {
        try {
            const response = await fetch('/api/shoutouts');
            const data = await response.json();
            
            if (response.ok) {
                this.displayShoutouts(data.shoutouts);
            }
        } catch (error) {
            console.error('Error loading shoutouts:', error);
        }
    }

    displayShoutouts(shoutouts) {
        // This would update the posts container with actual shoutouts
        // For now, we'll keep the sample posts
        console.log('Loaded shoutouts:', shoutouts);
    }

    loadPostsByTab(tabName) {
        // Simulate loading different content based on tab
        console.log(`Loading posts for tab: ${tabName}`);
        // In a real app, this would fetch different data based on the tab
    }

    handleSearch(query) {
        // Implement search functionality
        console.log('Searching for:', query);
        // In a real app, this would filter posts based on the search query
    }

    showNewPostModal() {
        // Implement new post modal
        console.log('Opening new post modal');
        // In a real app, this would open a modal for creating new posts
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#4caf50';
                break;
            case 'error':
                notification.style.backgroundColor = '#f44336';
                break;
            default:
                notification.style.backgroundColor = '#00d4ff';
        }

        // Add to page
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShipItApp();
}); 