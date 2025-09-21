# Zentry Clone - Interactive Gaming Website

A stunning clone of the [Zentry](https://www.zentry.world/) gaming website, built with modern web technologies and featuring advanced animations. This project showcases smooth video transitions, interactive elements, and responsive design.

[Zentry Clone Demo](https://www.zentry.world/)

## 🌟 Features

- **Interactive Video Transitions** - Smooth expanding video animations on click
- **Responsive Design** - Optimized for desktop and mobile devices  
- **Advanced Animations** - GSAP-powered scroll-triggered animations
- **Custom Typography** - Multiple custom font families
- **Tilt Effects** - Interactive 3D card tilt animations
- **Audio Integration** - Background audio with visual indicators
- **Smooth Scrolling** - Custom scrollbar with scroll-triggered effects

## 🚀 Technologies Used

### Core Framework
- **React 19.1.1** - Latest React with concurrent features
- **React DOM 19.1.1** - DOM rendering for React
- **TypeScript** - Type safety and better developer experience

### Styling & Animation
- **Tailwind CSS 4.1.12** - Latest version with new `@theme` syntax
- **@tailwindcss/vite 4.1.12** - Vite integration plugin
- **GSAP 3.13.0** - Professional animation library
- **@gsap/react 2.1.2** - React hooks for GSAP (useGSAP)

### Utilities
- **clsx 2.1.1** - Conditional className concatenation
- **react-icons 5.5.0** - Popular icon libraries as React components
- **react-use 17.6.0** - Collection of React hooks (used for scroll detection)


## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/zentry-clone.git
   cd zentry-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Tailwind CSS with Vite**
   
   **Step 1:** Install Tailwind CSS dependencies (already included in package.json)
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

   **Step 2:** Import Tailwind in your main CSS file (`src/App.css`):
   ```css
   @import "tailwindcss";
   
   /* Your custom styles */
   @theme {
     /* Custom theme configuration */
   }
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Main hero section with video transitions
│   ├── About.tsx         # About section with clip-path animations
│   ├── Features.tsx      # Feature cards with tilt effects
│   ├── Story.tsx         # Story section with image reveals
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx        # Footer component
│   ├── Navbar.tsx        # Navigation with scroll effects
│   ├── Button.tsx        # Reusable button component
│   └── AnimatedTitle.tsx # Animated text component
├── App.tsx              # Main app component
├── App.css             # Custom CSS utilities and animations
└── main.tsx            # App entry point

public/
├── fonts/              # Custom font files
├── videos/             # Hero and feature videos
├── img/                # Images and graphics
└── audio/              # Background audio files
```

## 🎬 Animation Features

### GSAP Animations
- **Video Transitions**: Seamless expanding video effects using GSAP timelines
- **Scroll Triggers**: Elements animate based on scroll position
- **Clip Path Animations**: Dynamic shape morphing on scroll
- **Text Animations**: Staggered word animations on scroll

### Custom CSS Animations
- **3D Tilt Effects**: Mouse-following card rotations
- **Loading Animations**: Custom three-dot loading spinner
- **Hover Effects**: Interactive button and navigation states

## 🎮 Key Components

### Hero Section
- Multi-video background system
- Interactive mini-video preview
- Smooth video switching animations
- Responsive typography scaling

### Features Section  
- Bento grid layout
- 3D tilt interactive cards
- Video backgrounds for each feature
- Mobile-optimized responsive design

### About Section
- Clip-path reveal animations
- Pinned scroll effects
- Dynamic image masking

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Tailwind responsive utilities
- Custom breakpoints for optimal viewing
- Touch-friendly interactions on mobile

## 🎵 Audio Integration

- Background audio loop
- Visual audio indicator with animations
- Play/pause functionality
- Smooth fade transitions

## 🛠️ Development Setup

### Vite Configuration
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

### Tailwind Customization
Custom utilities are defined in `App.css`:

```css
@utility custom-class {
  /* Your custom styles */
}
```

## 🌟 Acknowledgments

This project is a clone built for educational purposes. Full credit goes to:

- **[Zentry](https://www.zentry.world/)** - Original amazing web design and concept
- **Zentry Team** - Incredible UI/UX design and innovative animations
- **Original Website**: [https://www.zentry.world/](https://www.zentry.world/)

This clone was created to practice and demonstrate modern web development techniques including advanced animations, responsive design, and interactive elements.

## 📄 License

This project is for educational purposes only. All design credits belong to Zentry.

---

**Note**: This is a clone project created for learning purposes. Please visit the [original Zentry website](https://www.zentry.world/) to experience the official version.
