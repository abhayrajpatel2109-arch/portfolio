document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(3, 7, 18, 0.95)';
            nav.style.padding = '1rem 0';
        } else {
            nav.style.background = 'rgba(3, 7, 18, 0.8)';
            nav.style.padding = '1.5rem 0';
        }
    });

    // --- Background Particles ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    animate();

    // --- Chatbot Patel Logic ---
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatContainer = document.getElementById('chatbot-container');
    const chatClose = document.querySelector('.chat-close');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    chatToggle.addEventListener('click', () => chatContainer.classList.toggle('active'));
    chatClose.addEventListener('click', () => chatContainer.classList.remove('active'));

    const knowledgeBase = {
        greeting: ["hello", "hi", "hey", "who are you"],
        skills: ["skill", "languages", "tools", "what can you do"],
        projects: ["project", "work", "edu", "result", "application"],
        contact: ["contact", "email", "phone", "reach", "whatsapp"],
        education: ["education", "college", "degree", "study", "btech"]
    };

    function getBotResponse(input) {
        input = input.toLowerCase();
        if (knowledgeBase.greeting.some(k => input.includes(k))) {
            return "I am Patel, your guide to Abhay's professional world. You can ask me about his skills, projects, or how to contact him!";
        } else if (knowledgeBase.skills.some(k => input.includes(k))) {
            return "Abhay is proficient in Python, C, JavaScript, and PHP. In Cyber Security, he's experienced with Kali Linux, Nmap, Burp Suite, and Wireshark.";
        } else if (knowledgeBase.projects.some(k => input.includes(k))) {
            return "His key projects include the EduDesk Educational App (Flutter/Firebase) and a Student Result Portal (PHP/MySQL). He also built a WiFi car for a hackathon!";
        } else if (knowledgeBase.education.some(k => input.includes(k))) {
            return "Abhay is currently pursuing his B.Tech in Cyber Security (2021-2025) with a CGPA of 7.8.";
        } else if (knowledgeBase.contact.some(k => input.includes(k))) {
            return "You can email him at abhayrajpatel2109@gmail.com or message him via WhatsApp at +91 9336418393.";
        } else {
            return "That's a great question! While I'm still learning, you can reach out directly to Abhay for more details. Should I give you his email?";
        }
    }

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.classList.add('message', sender);
        msg.innerHTML = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const val = chatInput.value.trim();
        if (!val) return;
        addMessage(val, 'user');
        chatInput.value = '';

        const typing = document.createElement('div');
        typing.classList.add('message', 'bot', 'typing');
        typing.innerText = 'Patel is thinking...';
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typing.remove();
            addMessage(getBotResponse(val), 'bot');
        }, 1000);
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});