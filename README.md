# ShoreSquad 🌊

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## About ShoreSquad

ShoreSquad is a modern web application designed to mobilize young people to clean beaches. We combine interactive maps, real-time weather tracking, and social features to make eco-action fun and connected.

### Why ShoreSquad?

- **Smart Planning**: Real-time weather updates and tide forecasts
- **Community Vibes**: Connect with eco-warriors in your area
- **Interactive Maps**: Discover cleanup hotspots and coordinate events
- **Social Features**: Rally your crew and track impact together

---

## 🎨 Design & Branding

### Color Palette

| Color | Hex | Purpose |
|-------|-----|---------|
| Ocean Blue | `#0066cc` | Primary brand color |
| Ocean Teal | `#00a8cc` | Secondary accent |
| Sand Yellow | `#ffc857` | Call-to-action elements |
| Coral Red | `#ff6b6b` | Interactive highlights |
| Light Aqua | `#e0f7ff` | Backgrounds |
| Dark Gray | `#1a1a1a` | Text content |

### Typography

- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headlines**: Bold 800 weight
- **Body**: Regular weight, 16px base

### Design Principles

✨ **Accessibility First**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
📱 **Mobile-First**: Responsive design for all devices (320px to 1920px)
⚡ **Performance**: Optimized animations and lazy loading
🎯 **User-Centric**: Intuitive navigation and clear CTAs
🌍 **Metric System**: All measurements use International System of Units (SI)

### Measurement Standards

ShoreSquad uses the **metric system** exclusively for global accessibility:

| Measurement | Unit | Example |
|-------------|------|---------|
| Temperature | °C (Celsius) | Water: 18°C, Air: 22°C |
| Distance | m (meters) | Tide: 0.70 m, Wave: 0.91 m |
| Mass | kg (kilograms) | Trash collected: 1.1K kg |
| Coordinates | Degrees Decimal | 1.381497°N, 103.955574°E |

---

## 🚀 Features

### Current Features

- **Responsive Navigation**: Sticky header with smooth scroll navigation
- **Hero Section**: Eye-catching landing with animated wave effects
- **Feature Showcase**: Three key benefits highlighted with icons
- **Interactive Map**: Placeholder for cleanup location mapping
- **Weather Intelligence**: Display weather forecasts and tide information
- **Community Stats**: Showcase user impact and engagement metrics
- **Social Testimonials**: Real member feedback
- **Accessibility**: Screen reader support, keyboard navigation, high contrast mode

### JavaScript Enhancements

1. **Navigation Handler**
   - Smooth scroll to sections
   - Active link tracking
   - Keyboard navigation support

2. **Interactive Features**
   - CTA button feedback
   - Map filtering
   - Toast notifications

3. **Weather Manager**
   - Dynamic weather data
   - Live update simulations
   - Extensible for API integration

4. **Accessibility Manager**
   - ARIA labels and roles
   - Keyboard navigation
   - Live regions for announcements

5. **Performance Optimizer**
   - Lazy loading with Intersection Observer
   - Performance monitoring
   - Critical resource preloading

---

## 📁 Project Structure

```
ShoreSquad/
├── index.html              # HTML5 boilerplate & main content
├── css/
│   └── styles.css         # Ocean-themed stylesheet (17+ sections)
├── js/
│   └── app.js             # Interactive features & performance (400+ lines)
├── assets/                # Images, icons, media (placeholder)
├── .vscode/
│   └── settings.json      # Live Server & editor configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

---

## 🛠️ Setup & Development

### Prerequisites

- **Browser**: Modern browser with ES6+ support (Chrome, Firefox, Safari, Edge)
- **Editor**: Visual Studio Code (recommended)
- **Live Server**: VS Code Live Server extension
- **Git**: For version control and deployment

### Installation & Quick Start

#### Step 1: Clone or Download
```bash
# Clone the repository
git clone https://github.com/yasuowu/ShoreSquad.git
cd ShoreSquad
```

#### Step 2: Open in VS Code
```bash
code .
```

#### Step 3: Install Live Server Extension
1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
3. Search for "**Live Server**"
4. Click **Install** (by Ritwick Dey)

#### Step 4: Start Development Server
1. Right-click on `index.html`
2. Select **"Open with Live Server"**
3. Browser automatically opens at `http://localhost:5500`

### Live Server Configuration

ShoreSquad is configured with `.vscode/settings.json`:

```json
{
    "liveServer.settings.port": 5500,
    "liveServer.settings.root": "/",
    "liveServer.settings.CustomBrowser": "chrome"
}
```

### Hot Reload Development

- **Changes Auto-Sync**: Edit files and save → Live Server auto-reloads
- **CSS Hot Reload**: CSS updates reflect immediately
- **JS Changes**: JavaScript updates after full page reload
- **HTML Updates**: Full reload for HTML changes

### File Editing Tips

- **CSS**: Edit `css/styles.css` - changes appear instantly
- **HTML**: Edit `index.html` - full page reloads on save
- **JavaScript**: Edit `js/app.js` - reload required for changes
- **Console Debugging**: Press `F12` to open DevTools

---

## ✨ JavaScript Features & Architecture

### Error Handling & Robustness

ShoreSquad includes comprehensive error handling:

```javascript
// Try-catch blocks in all async operations
class WeatherManager {
    async init() {
        try {
            LoadingOverlay.show('Fetching weather data...');
            await this.fetchWeatherForecast();
            LoadingOverlay.hide();
        } catch (error) {
            console.error('Error:', error);
            LoadingOverlay.hide();
            Toast.error('Failed to load weather.');
        }
    }
}
```

### User Feedback System

#### Toast Notifications
```javascript
// Different notification types
Toast.success('Action completed!');        // Green
Toast.error('Something went wrong!');       // Red
Toast.warning('Please be careful');         // Orange
Toast.info('Here\'s some information');     // Blue
```

#### Loading Overlays
```javascript
// Show/hide loading spinner
LoadingOverlay.show('Processing...');
// ... do work ...
LoadingOverlay.hide();
```

### Performance Optimizations

- **Debounce**: Reduces scroll event firing to every 150ms
- **Throttle**: Limits navigation updates to every 100ms
- **Lazy Loading**: Images and cards load as they enter viewport
- **Preloading**: Critical CSS and resources preload asynchronously
- **Shimmer Effects**: Smooth loading animations

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Global API Reference

Access ShoreSquad features from browser console:

```javascript
// Navigation
window.ShoreSquad.navigation.updateActiveLink();

// Interactive features
window.ShoreSquad.features.handleCTAClick(event);

// Weather
window.ShoreSquad.weather.getWeatherData();

// Accessibility
window.ShoreSquad.accessibility.announce('Message for screen readers');

// Toast notifications
window.ShoreSquad.Toast.success('Success message!');

// Loading state
window.ShoreSquad.LoadingOverlay.show('Loading...');
```

---

## ♿ Accessibility Features

### WCAG 2.1 Compliance

✅ **Level AA Conformance** including:

- Semantic HTML5 structure
- ARIA labels and live regions
- Keyboard navigation (Tab, Enter, Space)
- High contrast color ratios (>4.5:1)
- Focus indicators for interactive elements
- Reduced motion support (`prefers-reduced-motion`)
- Dark mode support (`prefers-color-scheme`)
- Screen reader optimized

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between interactive elements |
| `Enter` / `Space` | Activate buttons |
| `Shift+Tab` | Navigate backwards |
| `Scroll` | Auto-highlight navigation links |

---

## 🎯 UX Design Principles

### 1. **Clarity & Simplicity**
   - Clear hierarchy with large, readable fonts
   - Intuitive navigation structure
   - Consistent button and link styling

### 2. **Engagement**
   - Animated wave effects in hero
   - Smooth transitions and hover states
   - Interactive map placeholder
   - Social proof through testimonials

### 3. **Performance**
   - Fast load times with optimized CSS
   - Lazy loading for below-fold content
   - Minimal JavaScript bloat
   - Efficient animations

### 4. **Responsiveness**
   - Mobile-first design approach
   - Flexible grid layouts
   - Touch-friendly button sizes (44px minimum)
   - Adaptive typography

### 5. **Trust & Community**
   - Social stats showcase impact
   - Member testimonials
   - Clear value proposition
   - Accessible CTA buttons

---

## 🔧 Configuration

### Live Server Settings

The `.vscode/settings.json` includes:

```json
{
    "liveServer.settings.port": 5500,
    "liveServer.settings.root": "/",
    "liveServer.settings.CustomBrowser": "chrome"
}
```

### Auto-Format

Files automatically format on save with Prettier (if installed).

---

## 📊 Git Setup

The project includes a comprehensive `.gitignore`:

```
node_modules/
.DS_Store
Thumbs.db
.env
dist/
coverage/
```

### First-Time Git Setup

```bash
# Initialize repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial ShoreSquad project setup"

# (Optional) Connect to remote
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 🚀 Future Enhancements

### Phase 2 Features

- [ ] Real-time weather API integration (OpenWeatherMap)
- [ ] Interactive map with Leaflet.js or Google Maps
- [ ] User authentication and profiles
- [ ] Event creation and RSVP system
- [ ] Impact tracking dashboard
- [ ] Push notifications

### Phase 3 Features

- [ ] Mobile app (React Native)
- [ ] Backend API (Node.js/Express)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Social sharing features
- [ ] Leaderboard system

---

## 📞 Support & Contribution

For questions, suggestions, or contributions:

1. Check existing issues
2. Create a new issue with clear description
3. Submit pull requests with improvements

---

## 📄 License

ShoreSquad © 2025. All rights reserved.

---

## 🌍 Let's Clean Beaches Together!

Join ShoreSquad and make a difference. Rally your crew. Hit the beach. Clean up. Repeat.

**Visit**: [www.shoresquad.app](https://www.shoresquad.app)  
**Follow**: [@ShoreSquadApp](https://twitter.com/shoresquadapp)  
**Discord**: [ShoreSquad Community](https://discord.gg/shoresquad)

---

*Made with 🌊 for beach lovers everywhere*
