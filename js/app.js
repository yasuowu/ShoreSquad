/* ========================================
   ShoreSquad - JavaScript Application
   ======================================== */

// Debounce utility for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle utility for rate-limiting scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========================================
   Navigation & Scroll Behavior
   ======================================== */

class NavigationHandler {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.activeLink = null;
        this.init();
    }

    init() {
        // Handle navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Update active link on scroll
        window.addEventListener('scroll', throttle(() => this.updateActiveLink(), 100));
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Update active link
            this.navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');

            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    updateActiveLink() {
        let currentSection = null;

        // Find which section is in view
        this.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        // Update active link
        if (currentSection) {
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
}

/* ========================================
   Interactive Features
   ======================================== */

class InteractiveFeatures {
    constructor() {
        this.ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.init();
    }

    init() {
        // CTA button click handlers
        this.ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCTAClick(e));
        });

        // Map filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });
    }

    handleCTAClick(e) {
        const btn = e.target;
        const text = btn.textContent;

        // Add feedback animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);

        // Log user interaction (for analytics)
        console.log(`User clicked: ${text}`);

        // Show toast notification
        this.showNotification(`Starting: ${text}`, 'info');
    }

    handleFilterClick(e) {
        const btn = e.target;
        const filterType = btn.dataset.filter;

        // Update active button
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Simulate filter action
        console.log(`Filtering by: ${filterType}`);
        this.showNotification(`Filtering: ${filterType}`, 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#0066cc' : '#4caf50'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Auto-remove notification
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

/* ========================================
   Dynamic Weather Data
   ======================================== */

class WeatherManager {
    constructor() {
        this.weatherGrid = document.getElementById('weather-grid');
        this.weatherData = [
            {
                day: 'Tomorrow',
                temp: '22°C',
                icon: '☀️',
                condition: 'Sunny, Light Breeze',
                tide: 'Tide: 0.70 m rising'
            },
            {
                day: 'Next Weekend',
                temp: '20°C',
                icon: '⛅',
                condition: 'Partly Cloudy',
                tide: 'Tide: 0.55 m falling'
            },
            {
                day: 'Conditions',
                temp: '18°C',
                icon: '🌊',
                condition: 'Water Temp',
                tide: 'Wave Height: 0.91 m'
            }
        ];
        this.init();
    }

    init() {
        // Weather can be dynamically updated
        this.updateWeather();
    }

    updateWeather() {
        if (!this.weatherGrid) return;

        // Simulate live weather updates
        setInterval(() => {
            const weatherCards = this.weatherGrid.querySelectorAll('.weather-card');
            weatherCards.forEach((card, index) => {
                // Add subtle animation on update
                card.style.opacity = '0.8';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 500);
            });
        }, 30000); // Update every 30 seconds
    }

    getWeatherData() {
        return this.weatherData;
    }
}

/* ========================================
   Accessibility Enhancements
   ======================================== */

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // Add ARIA labels where needed
        this.enhanceARIA();

        // Add keyboard navigation
        this.enableKeyboardNav();

        // Announce page changes to screen readers
        this.setupLiveRegions();
    }

    enhanceARIA() {
        // Add main role
        const main = document.querySelector('main') || document.querySelector('section:first-of-type');
        if (main) main.setAttribute('role', 'main');

        // Add landmark roles
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (header) header.setAttribute('role', 'banner');
        if (footer) footer.setAttribute('role', 'contentinfo');

        // Add button roles to interactive elements
        document.querySelectorAll('.btn, .filter-btn').forEach(btn => {
            if (!btn.hasAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });
    }

    enableKeyboardNav() {
        // Allow Tab key navigation to all interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.matches('.btn, .filter-btn, .nav-link')) {
                    e.target.click();
                }
            }
        });
    }

    setupLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'announcements';
        document.body.appendChild(liveRegion);
    }

    announce(message) {
        const liveRegion = document.getElementById('announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

/* ========================================
   Performance Optimization
   ======================================== */

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images when they come into view
        this.setupLazyLoading();

        // Monitor performance metrics
        this.monitorPerformance();

        // Preload critical resources
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Trigger animations or load content
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            });

            document.querySelectorAll('.feature-card, .weather-card, .testimonial').forEach(el => {
                observer.observe(el);
            });
        }
    }

    monitorPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'style';
        preloadLink.href = 'css/styles.css';
        document.head.appendChild(preloadLink);
    }
}

/* ========================================
   Initialization
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 ShoreSquad app initialized!');

    // Initialize all modules
    const navigation = new NavigationHandler();
    const features = new InteractiveFeatures();
    const weather = new WeatherManager();
    const accessibility = new AccessibilityManager();
    const performance = new PerformanceOptimizer();

    // Make globally accessible for debugging
    window.ShoreSquad = {
        navigation,
        features,
        weather,
        accessibility,
        performance
    };

    // Add some welcome animation
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 0.6s ease-out';
            hero.style.opacity = '1';
        }, 100);
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is created
    // navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .in-view {
        animation: slideUp 0.6s ease-out;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);
