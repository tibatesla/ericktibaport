document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // --- Magic Line Logic ---
    const nav = document.querySelector('.nav-links');
    let magicLine = document.querySelector('.magic-line');
    
    if (!magicLine && window.innerWidth > 900) {
        magicLine = document.createElement('div');
        magicLine.classList.add('magic-line');
        nav.appendChild(magicLine);
    }

    function moveLine(target) {
        // Prevent the line from highlighting the new CV download button
        if (!target || window.innerWidth <= 900 || target.classList.contains('download-btn')) return;
        
        const linkRect = target.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        magicLine.style.width = `${linkRect.width}px`;
        magicLine.style.left = `${linkRect.left - navRect.left}px`;
        magicLine.style.opacity = '1';
    }

    // Ensure 
    const activeLink = document.querySelector('.nav-links a.active:not(.download-btn)');
    if (activeLink) setTimeout(() => moveLine(activeLink), 50);

    // Only apply hover logic to standard navigation items
    const navItems = document.querySelectorAll('.nav-links a:not(.download-btn)');
    navItems.forEach(link => {
        link.addEventListener('mouseenter', (e) => moveLine(e.target));
    });

    nav.addEventListener('mouseleave', () => {
        if (activeLink) moveLine(activeLink);
        else if (magicLine) magicLine.style.opacity = '0';
    });
});

// --- EMAIL SENDING LOGIC ---
function validateForm() {
    // Fetch the values from the DOM
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic frontend validation
    if (name.length < 2) {
        alert("Please enter a valid name.");
        return false;
    }

    if (!email.includes('@')) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (message.length < 3) {
        alert("Message is too short.");
        return false;
    }

    // The destination email
    const myEmail = "erickmbaluka7@gmail.com"; 
    
    // Using encodeURIComponent to safely format the text for the email client
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Triggers the default mail client (Outlook, Apple Mail, Gmail web handler, etc.)
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    // Prevents form submission from reloading the page
    return false; 
}