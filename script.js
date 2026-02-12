// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing effect for hero text
const heroText = document.querySelector('.hero-content p');
const originalText = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        heroText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    section.animate {
        animation: fadeInUp 0.8s ease-out;
    }

    @media (min-width: 769px) {
        .nav-links.active {
            display: flex !important;
            flex-direction: row !important;
            position: static !important;
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
        }
    }

    .copyable {
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
    }

    .copyable:hover {
        transform: translateY(-2px);
        background: rgba(74, 144, 226, 0.1);
        border-radius: 10px;
    }

    .copyable.copied::after {
        content: 'Copied!';
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: #4a90e2;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        white-space: nowrap;
        animation: fadeInOut 2s ease-in-out;
    }

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
    }
`;
document.head.appendChild(style);

// Copy to clipboard function
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        element.classList.add('copied');
        setTimeout(() => {
            element.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Toggle projects visibility
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    hiddenProjects.forEach(project => {
        if (project.style.display === 'none' || project.style.display === '') {
            project.style.display = 'block';
            project.style.animation = 'fadeInUp 0.8s ease forwards';
        } else {
            project.style.display = 'none';
        }
    });
    
    if (showMoreBtn.textContent === 'Show More Projects') {
        showMoreBtn.textContent = 'Show Less Projects';
    } else {
        showMoreBtn.textContent = 'Show More Projects';
    }
}