// Loading animation
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hide');
    }, 1000);
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add active class to clicked nav link
        const activeLink = document.querySelector(`[data-section="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Smooth scroll to top of main content
        document.querySelector('.main-content').scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Intersection Observer for auto-highlighting nav items
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const correspondingNavLink = document.querySelector(`[data-section="${id}"]`);
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeSection = document.querySelector('.section.active');
        const activeSectionId = activeSection ? activeSection.id : 'objective';
        const sectionIds = ['objective', 'experience', 'education', 'publications', 'skills', 'awards'];
        const currentIndex = sectionIds.indexOf(activeSectionId);

        if (e.key === 'ArrowRight' && currentIndex < sectionIds.length - 1) {
            showSection(sectionIds[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sectionIds[currentIndex - 1]);
        }
    });

    // Add smooth hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to the main title
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1500);

    // Add scroll-to-top functionality
    function addScrollToTopButton() {
        let scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        `;
        
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollToTopBtn);

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.transform = 'scale(1)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.transform = 'scale(0.8)';
            }
        });
    }

    // Add print functionality
    function addPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print CV';
        printBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            padding: 12px 20px;
            border-radius: 25px;
            background: linear-gradient(135deg, #27ae60, #229954);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
        `;
        
        printBtn.setAttribute('aria-label', 'Print CV');
        
        printBtn.addEventListener('click', function() {
            // Show all sections for printing
            sections.forEach(section => {
                section.style.display = 'block';
            });
            
            window.print();
            
            // Restore section visibility
            setTimeout(() => {
                sections.forEach(section => {
                    section.style.display = '';
                });
                // Re-activate the current section
                const activeLink = document.querySelector('.nav-link.active');
                if (activeLink) {
                    const targetSection = activeLink.getAttribute('data-section');
                    showSection(targetSection);
                }
            }, 100);
        });
        
        printBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        printBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        document.body.appendChild(printBtn);
    }

    // Add search functionality
    function addSearchFunction() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: white;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: all 0.3s ease;
            width: 50px;
            height: 50px;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search CV...';
        searchInput.setAttribute('aria-label', 'Search CV content');
        searchInput.style.cssText = `
            border: none;
            padding: 15px 20px;
            width: 250px;
            font-size: 14px;
            outline: none;
            background: transparent;
            margin-left: -200px;
            transition: all 0.3s ease;
        `;

        const searchIcon = document.createElement('div');
        searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        searchIcon.style.cssText = `
            position: absolute;
            right: 15px;
            top: 15px;
            color: #3498db;
            cursor: pointer;
            font-size: 16px;
            z-index: 2;
        `;
        searchIcon.setAttribute('role', 'button');
        searchIcon.setAttribute('aria-label', 'Toggle search');

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchIcon);
        document.body.appendChild(searchContainer);

        let isExpanded = false;

        searchIcon.addEventListener('click', function() {
            if (!isExpanded) {
                searchContainer.style.width = '270px';
                searchInput.style.marginLeft = '0';
                searchInput.focus();
                isExpanded = true;
            } else if (searchInput.value === '') {
                searchContainer.style.width = '50px';
                searchInput.style.marginLeft = '-200px';
                isExpanded = false;
            }
        });

        searchInput.addEventListener('blur', function() {
            if (this.value === '') {
                setTimeout(() => {
                    searchContainer.style.width = '50px';
                    searchInput.style.marginLeft = '-200px';
                    isExpanded = false;
                }, 200);
            }
        });

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allText = document.querySelectorAll('.card-content, .publication');
            
            allText.forEach(element => {
                const text = element.textContent.toLowerCase();
                const parent = element.closest('.card') || element.closest('.section');
                
                if (text.includes(searchTerm) || searchTerm === '') {
                    if (parent) parent.style.opacity = '1';
                } else {
                    if (parent) parent.style.opacity = '0.3';
                }
            });
        });
    }

    // Add theme toggle
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f39c12, #e67e22);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
        `;
        
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');

        let isDarkMode = false;

        themeToggle.addEventListener('click', function() {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
                this.innerHTML = '<i class="fas fa-sun"></i>';
                this.style.background = 'linear-gradient(135deg, #f1c40f, #f39c12)';
                this.setAttribute('aria-label', 'Toggle light mode');
                
                // Update card backgrounds for dark mode
                document.querySelectorAll('.card').forEach(card => {
                    card.style.background = '#34495e';
                    card.style.color = '#ecf0f1';
                });
                
                document.querySelectorAll('.skill-category').forEach(category => {
                    category.style.background = 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)';
                    category.style.color = '#ecf0f1';
                });
            } else {
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                this.innerHTML = '<i class="fas fa-moon"></i>';
                this.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
                this.setAttribute('aria-label', 'Toggle dark mode');
                
                // Restore light mode
                document.querySelectorAll('.card').forEach(card => {
                    card.style.background = '#f8f9fa';
                    card.style.color = '#333';
                });
                
                document.querySelectorAll('.skill-category').forEach(category => {
                    category.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                    category.style.color = '#333';
                });
            }
        });

        document.body.appendChild(themeToggle);
    }

    // Add contact modal
    function addContactModal() {
        const contactBtn = document.createElement('button');
        contactBtn.innerHTML = '<i class="fas fa-envelope"></i>';
        contactBtn.style.cssText = `
            position: fixed;
            top: 140px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
        `;
        
        contactBtn.setAttribute('aria-label', 'View contact information');

        contactBtn.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'contact-title');

            modal.innerHTML = `
                <div style="
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    animation: slideIn 0.3s ease;
                ">
                    <button style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #7f8c8d;
                    " aria-label="Close contact modal">×</button>
                    
                    <h2 id="contact-title" style="color: #2c3e50; margin-bottom: 20px; text-align: center;">
                        <i class="fas fa-envelope" style="color: #e74c3c;"></i> Contact Information
                    </h2>
                    
                    <div style="space-y: 15px;">
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <i class="fas fa-envelope" style="color: #3498db; margin-right: 10px;"></i>
                            <strong>Email:</strong> naseem.ahamad.uthscsa@gmail.com
                        </div>
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <i class="fas fa-phone" style="color: #27ae60; margin-right: 10px;"></i>
                            <strong>Phone (India):</strong> +91-8130780782
                        </div>
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <i class="fas fa-phone" style="color: #27ae60; margin-right: 10px;"></i>
                            <strong>Phone (USA):</strong> +1-210-564-4104
                        </div>
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <i class="fas fa-map-marker-alt" style="color: #e74c3c; margin-right: 10px;"></i>
                            <strong>Address:</strong> H.No.-333, Street No.-11, Main Road, North Laddhawala, Muzaffar Nagar 251002, U.P. India
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            
            // Focus management
            const closeButton = modal.querySelector('button');
            closeButton.focus();
            
            // Close modal handlers
            closeButton.addEventListener('click', function() {
                modal.remove();
                contactBtn.focus();
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                    contactBtn.focus();
                }
            });
            
            // Escape key handler
            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    contactBtn.focus();
                }
            });
        });

        document.body.appendChild(contactBtn);
    }

    // Initialize all features
    addScrollToTopButton();
    addPrintButton();
    addSearchFunction();
    addThemeToggle();
    addContactModal();

    // Add mobile menu toggle for small screens
    function addMobileMenuToggle() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const navList = document.querySelector('.nav-list');
            
            const menuToggle = document.createElement('button');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.style.cssText = `
                background: #34495e;
                color: white;
                border: none;
                padding: 15px;
                cursor: pointer;
                width: 100%;
                font-size: 16px;
            `;
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            let isMenuOpen = false;
            
            menuToggle.addEventListener('click', function() {
                isMenuOpen = !isMenuOpen;
                if (isMenuOpen) {
                    navList.style.display = 'flex';
                    navList.style.flexDirection = 'column';
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    navList.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            nav.insertBefore(menuToggle, navList);
            navList.style.display = 'none';
        }
    }
    
    // Check for mobile on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navList = document.querySelector('.nav-list');
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
        }
    });
    
    addMobileMenuToggle();
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
    document.head.appendChild(script);
}

// Performance optimization: Lazy load heavy content
const observerConfig = {
    threshold: 0.1,
    rootMargin: '50px'
};

const lazyLoadObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            section.classList.add('loaded');
            lazyLoadObserver.unobserve(section);
        }
    });
}, observerConfig);

// Observe sections for lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        lazyLoadObserver.observe(section);
    });
});

// Add error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Export functions for potential external use
window.CVWebsite = {
    showSection: function(sectionId) {
        const event = new CustomEvent('showSection', { detail: { sectionId } });
        document.dispatchEvent(event);
    },
    
    getCurrentSection: function() {
        const activeSection = document.querySelector('.section.active');
        return activeSection ? activeSection.id : null;
    },
    
    searchContent: function(term) {
        const searchInput = document.querySelector('input[placeholder="Search CV..."]');
        if (searchInput) {
            searchInput.value = term;
            searchInput.dispatchEvent(new Event('input'));
        }
    }
};