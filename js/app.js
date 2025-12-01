/* ========================================
   ShoreSquad - JavaScript Application
   Robust Error Handling & Feedback System
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
   Toast Notification System
   ======================================== */

class Toast {
    static show(message, type = 'info', duration = 3000) {
        try {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideOutDown 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
            }, duration);

            return toast;
        } catch (error) {
            console.error('Toast error:', error);
        }
    }

    static success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    static error(message, duration = 4000) {
        return this.show(message, 'error', duration);
    }

    static warning(message, duration = 3500) {
        return this.show(message, 'warning', duration);
    }

    static info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }
}

/* ========================================
   Loading Overlay Manager
   ======================================== */

class LoadingOverlay {
    static show(message = 'Loading...') {
        try {
            let overlay = document.getElementById('loading-overlay');
            
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'loading-overlay';
                overlay.className = 'spinner-overlay';
                overlay.innerHTML = `
                    <div style="text-align: center;">
                        <div class="spinner"></div>
                        <p style="margin-top: 16px; color: #666; font-weight: 500;">${message}</p>
                    </div>
                `;
                document.body.appendChild(overlay);
            } else {
                overlay.style.display = 'flex';
                overlay.querySelector('p').textContent = message;
            }
        } catch (error) {
            console.error('LoadingOverlay error:', error);
        }
    }

    static hide() {
        try {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        } catch (error) {
            console.error('LoadingOverlay hide error:', error);
        }
    }
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
        try {
            // Handle navigation link clicks
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleNavClick(e));
            });

            // Update active link on scroll
            window.addEventListener('scroll', throttle(() => this.updateActiveLink(), 100));
        } catch (error) {
            console.error('NavigationHandler init error:', error);
        }
    }

    handleNavClick(e) {
        try {
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
        } catch (error) {
            console.error('Navigation click error:', error);
        }
    }

    updateActiveLink() {
        try {
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
        } catch (error) {
            console.error('Active link update error:', error);
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
        try {
            // CTA button click handlers
            this.ctaButtons.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleCTAClick(e));
            });

            // Map filter buttons
            this.filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleFilterClick(e));
            });
        } catch (error) {
            console.error('InteractiveFeatures init error:', error);
        }
    }

    handleCTAClick(e) {
        try {
            const btn = e.target;
            const text = btn.textContent.trim();

            // Add feedback animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);

            // Log user interaction (for analytics)
            console.log(`User clicked: ${text}`);

            // Show toast notification
            Toast.success(`Action: ${text}`);
        } catch (error) {
            console.error('CTA click error:', error);
            Toast.error('An error occurred. Please try again.');
        }
    }

    handleFilterClick(e) {
        try {
            const btn = e.target;
            const filterType = btn.dataset.filter || 'unknown';

            // Update active button
            this.filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Simulate filter action
            console.log(`Filtering by: ${filterType}`);
            Toast.info(`Showing: ${filterType} events`);
        } catch (error) {
            console.error('Filter click error:', error);
            Toast.error('Filter failed. Please try again.');
        }
    }
}

/* ========================================
   NEA Weather API Manager
   ======================================== */

class WeatherManager {
    constructor() {
        this.weatherGrid = document.getElementById('weather-grid');
        this.apiEndpoint = 'https://api.data.gov.sg/v1/environment/air-temperature';
        this.forecastEndpoint = 'https://api.data.gov.sg/v1/environment/4day-weather-forecast';
        this.init();
    }

    async init() {
        try {
            LoadingOverlay.show('Fetching weather data...');
            
            // Fetch 4-day forecast data
            await this.fetchWeatherForecast();
            
            LoadingOverlay.hide();
        } catch (error) {
            console.error('Error initializing weather:', error);
            LoadingOverlay.hide();
            this.showErrorState();
            Toast.error('Failed to load weather data. Please refresh.');
        }
    }

    async fetchWeatherForecast() {
        try {
            const response = await fetch(this.forecastEndpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.parseAndDisplayForecast(data);
            Toast.success('Weather forecast loaded!');
        } catch (error) {
            console.error('Failed to fetch weather forecast:', error);
            Toast.warning('Forecast unavailable. Fetching current temperature...');
            // Fall back to current temperature API
            await this.fetchCurrentTemperature();
        }
    }

    async fetchCurrentTemperature() {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.parseAndDisplayTemperature(data);
            Toast.success('Current temperature loaded!');
        } catch (error) {
            console.error('Failed to fetch temperature data:', error);
            this.showErrorState();
            Toast.error('Unable to load weather data. Please check your internet connection.');
        }
    }

    parseAndDisplayForecast(data) {
        try {
            if (!data.items || !data.items[0] || !data.items[0].forecasts) {
                throw new Error('Invalid forecast data structure');
            }

            const forecasts = data.items[0].forecasts;
            
            // Display first 4 days of forecast
            const displayForecasts = forecasts.slice(0, 4);

            if (!this.weatherGrid) {
                console.error('Weather grid element not found');
                return;
            }

            this.weatherGrid.innerHTML = '';

            displayForecasts.forEach((forecast, index) => {
                try {
                    const card = this.createWeatherCard(forecast, index);
                    this.weatherGrid.appendChild(card);
                } catch (cardError) {
                    console.error(`Error creating weather card ${index}:`, cardError);
                }
            });
        } catch (error) {
            console.error('Error parsing forecast data:', error);
            this.showErrorState();
        }
    }

    parseAndDisplayTemperature(data) {
        try {
            if (!data.items || !data.items[0] || !data.items[0].readings) {
                throw new Error('Invalid temperature data structure');
            }

            // Get temperature readings for Pasir Ris area
            const readings = data.items[0].readings;
            
            // Find closest station to Pasir Ris
            const pasirRisReading = readings.find(r => 
                r.station_id === 'S109' || // Pasir Ris station
                r.station_id === 'S81'   // Changi Airport (near Pasir Ris)
            ) || readings[0];

            if (!this.weatherGrid) return;

            this.weatherGrid.innerHTML = '';

            // Create 4 cards with current data as fallback
            for (let i = 0; i < 4; i++) {
                const card = document.createElement('div');
                card.className = 'weather-card';
                
                const dayName = this.getDayName(i);
                const temp = Math.round(pasirRisReading.value);

                card.innerHTML = `
                    <div class="weather-icon">${this.getWeatherIcon(i)}</div>
                    <h3>${dayName}</h3>
                    <p class="temp">${temp}°C</p>
                    <p class="condition">Temperature Reading</p>
                    <p class="humidity">Station: ${pasirRisReading.station_id}</p>
                `;

                this.weatherGrid.appendChild(card);
            }
        } catch (error) {
            console.error('Error parsing temperature data:', error);
            this.showErrorState();
        }
    }

    createWeatherCard(forecast, index) {
        try {
            const card = document.createElement('div');
            card.className = 'weather-card';

            const date = new Date(forecast.date);
            const dayName = this.formatDate(date);
            
            // Parse forecast text for better display
            const forecast_text = forecast.forecast ? forecast.forecast.toLowerCase() : 'Fair';
            const icon = this.mapWeatherIcon(forecast_text);
            
            // Extract temperature range if available
            const tempInfo = forecast.relative_humidity 
                ? `Humidity: ${forecast.relative_humidity}%`
                : 'No data';

            card.innerHTML = `
                <div class="weather-icon">${icon}</div>
                <h3>${dayName}</h3>
                <p class="condition">${forecast.forecast || 'Fair'}</p>
                <p class="wind">${tempInfo}</p>
            `;

            return card;
        } catch (error) {
            console.error('Error creating weather card:', error);
            const card = document.createElement('div');
            card.className = 'weather-card';
            card.innerHTML = '<p style="color: #999;">Unable to display forecast</p>';
            return card;
        }
    }

    mapWeatherIcon(forecastText) {
        try {
            if (forecastText.includes('rain') || forecastText.includes('thundery')) {
                return '🌧️';
            } else if (forecastText.includes('cloud') || forecastText.includes('overcast')) {
                return '☁️';
            } else if (forecastText.includes('fair') || forecastText.includes('clear')) {
                return '☀️';
            } else if (forecastText.includes('wind') || forecastText.includes('strong')) {
                return '💨';
            }
            return '🌤️';
        } catch (error) {
            console.error('Error mapping weather icon:', error);
            return '🌤️';
        }
    }

    getWeatherIcon(dayIndex) {
        const icons = ['☀️', '⛅', '🌤️', '🌊'];
        return icons[dayIndex % icons.length];
    }

    getDayName(dayIndex) {
        const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4'];
        return days[dayIndex];
    }

    formatDate(date) {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-SG', options);
    }

    showErrorState() {
        if (!this.weatherGrid) return;

        this.weatherGrid.innerHTML = `
            <div class="weather-card" style="grid-column: 1 / -1; background: linear-gradient(135deg, #fee 0%, #ffe0e0 100%);">
                <p style="color: #f44336; font-weight: 500;">Unable to load weather data</p>
                <p style="color: #d32f2f; font-size: 0.9rem; margin-top: 8px;">
                    Please try again later. Data provided by NEA.
                </p>
            </div>
        `;
    }

    getWeatherData() {
        // Return data for external use
        return {
            source: 'NEA Singapore',
            endpoint: this.forecastEndpoint,
            timestamp: new Date()
        };
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
    try {
        console.log('🌊 ShoreSquad app initializing...');

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
            performance,
            Toast,
            LoadingOverlay
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

        console.log('✅ ShoreSquad initialized successfully!');
        Toast.success('Welcome to ShoreSquad! 🌊', 2000);
    } catch (error) {
        console.error('Fatal initialization error:', error);
        Toast.error('An error occurred during initialization. Please refresh the page.');
        LoadingOverlay.hide();
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

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
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
