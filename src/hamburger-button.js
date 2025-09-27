// Import CSS as text (Vite approach)
import cssText from './style.css?inline';

class HamburgerButton extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    
    // Create stylesheet from imported CSS text
    const tailwindSheet = new CSSStyleSheet();
    tailwindSheet.replaceSync(cssText);
    
    // Create component-specific styles
    const componentSheet = new CSSStyleSheet();
    componentSheet.replaceSync(`
      :host {
        display: inline-block;
      }

      .line {
        fill: none;
        stroke: var(--hamburger-color, #fff);
        stroke-width: 10;
        transition: stroke-dasharray .3s ease-out, stroke-dashoffset .4s ease-out;
      }

      .line1 { stroke-dasharray: 60 207; stroke-width: 10; }
      .line2 { stroke-dasharray: 60 60; stroke-width: 10; }
      .line3 { stroke-dasharray: 60 207; stroke-width: 10; }

      .opened .line1 { stroke-dasharray: 90 207; stroke-dashoffset: -134; stroke-width: 10; }
      .opened .line2 { stroke-dasharray: 1 60; stroke-dashoffset: -30; stroke-width: 10; }
      .opened .line3 { stroke-dasharray: 90 207; stroke-dashoffset: -134; stroke-width: 10; }
    `);

    // Adopt both the imported Tailwind stylesheet and component styles
    shadowRoot.adoptedStyleSheets = [tailwindSheet, componentSheet];
    
    this.isOpen = false;
    this.currentColor = 'blue'; // default color
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.applyInitialColor();
    this.applyInitialSize();
  }

  applyInitialColor() {
    // Apply color from attribute if present, otherwise use default
    const color = this.getAttribute('color') || 'blue';
    this.applyColorClasses(color);
  }

  applyInitialSize() {
    // Apply size from attribute if present, otherwise use default
    const size = this.getAttribute('size') || 'md';
    this.applySizeClasses(size);
  }

  getColorClasses(color) {
    // Comprehensive color mapping for Tailwind classes
    const colorMap = {
      // Primary colors
      'blue': { 
        bg: 'bg-blue-900', 
        hover: 'hover:bg-blue-800', 
        focus: 'focus:ring-blue-500',
        active: 'bg-blue-800'
      },
      'red': { 
        bg: 'bg-red-900', 
        hover: 'hover:bg-red-800', 
        focus: 'focus:ring-red-500',
        active: 'bg-red-800'
      },
      'green': { 
        bg: 'bg-green-900', 
        hover: 'hover:bg-green-800', 
        focus: 'focus:ring-green-500',
        active: 'bg-green-800'
      },
      'yellow': { 
        bg: 'bg-yellow-900', 
        hover: 'hover:bg-yellow-800', 
        focus: 'focus:ring-yellow-500',
        active: 'bg-yellow-800'
      },
      'purple': { 
        bg: 'bg-purple-900', 
        hover: 'hover:bg-purple-800', 
        focus: 'focus:ring-purple-500',
        active: 'bg-purple-800'
      },
      'pink': { 
        bg: 'bg-pink-900', 
        hover: 'hover:bg-pink-800', 
        focus: 'focus:ring-pink-500',
        active: 'bg-pink-800'
      },
      'indigo': { 
        bg: 'bg-indigo-900', 
        hover: 'hover:bg-indigo-800', 
        focus: 'focus:ring-indigo-500',
        active: 'bg-indigo-800'
      },
      'gray': { 
        bg: 'bg-gray-900', 
        hover: 'hover:bg-gray-800', 
        focus: 'focus:ring-gray-500',
        active: 'bg-gray-800'
      },
      'slate': { 
        bg: 'bg-slate-900', 
        hover: 'hover:bg-slate-800', 
        focus: 'focus:ring-slate-500',
        active: 'bg-slate-800'
      },
      'orange': { 
        bg: 'bg-orange-900', 
        hover: 'hover:bg-orange-800', 
        focus: 'focus:ring-orange-500',
        active: 'bg-orange-800'
      },
      'teal': { 
        bg: 'bg-teal-900', 
        hover: 'hover:bg-teal-800', 
        focus: 'focus:ring-teal-500',
        active: 'bg-teal-800'
      },
      'cyan': { 
        bg: 'bg-cyan-900', 
        hover: 'hover:bg-cyan-800', 
        focus: 'focus:ring-cyan-500',
        active: 'bg-cyan-800'
      },
      'emerald': { 
        bg: 'bg-emerald-900', 
        hover: 'hover:bg-emerald-800', 
        focus: 'focus:ring-emerald-500',
        active: 'bg-emerald-800'
      }
    };

    return colorMap[color] || colorMap['blue']; // fallback to blue
  }

  applyColorClasses(color) {
    if (!this.button) return;

    // Remove all possible color classes
    const allColorClasses = [
      // Background colors
      'bg-blue-900', 'bg-red-900', 'bg-green-900', 'bg-yellow-900', 'bg-purple-900',
      'bg-pink-900', 'bg-indigo-900', 'bg-gray-900', 'bg-slate-900', 'bg-orange-900',
      'bg-teal-900', 'bg-cyan-900', 'bg-emerald-900',
      // Active background colors
      'bg-blue-800', 'bg-red-800', 'bg-green-800', 'bg-yellow-800', 'bg-purple-800',
      'bg-pink-800', 'bg-indigo-800', 'bg-gray-800', 'bg-slate-800', 'bg-orange-800',
      'bg-teal-800', 'bg-cyan-800', 'bg-emerald-800',
      // Hover colors
      'hover:bg-blue-800', 'hover:bg-red-800', 'hover:bg-green-800', 'hover:bg-yellow-800',
      'hover:bg-purple-800', 'hover:bg-pink-800', 'hover:bg-indigo-800', 'hover:bg-gray-800',
      'hover:bg-slate-800', 'hover:bg-orange-800', 'hover:bg-teal-800', 'hover:bg-cyan-800', 
      'hover:bg-emerald-800',
      // Focus ring colors
      'focus:ring-blue-500', 'focus:ring-red-500', 'focus:ring-green-500', 'focus:ring-yellow-500',
      'focus:ring-purple-500', 'focus:ring-pink-500', 'focus:ring-indigo-500', 'focus:ring-gray-500',
      'focus:ring-slate-500', 'focus:ring-orange-500', 'focus:ring-teal-500', 'focus:ring-cyan-500',
      'focus:ring-emerald-500'
    ];

    this.button.classList.remove(...allColorClasses);

    // Apply new color classes - always use the base state
    const colorClasses = this.getColorClasses(color);
    
    this.button.classList.add(colorClasses.bg, colorClasses.hover, colorClasses.focus);
    this.currentColor = color;
  }

  applySizeClasses(size) {
    if (!this.button) return;

    // Remove old size classes
    this.button.classList.remove('p-1', 'p-2', 'p-3', 'p-4');
    
    const sizes = {
      'sm': 'p-1',
      'md': 'p-2',
      'lg': 'p-3',
      'xl': 'p-4'
    };
    
    if (sizes[size]) {
      this.button.classList.add(sizes[size]);
    }
  }

  render() {
    this.createButton();
    this.createSVG();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.setAttribute('aria-label', 'Toggle menu');
    this.button.setAttribute('aria-expanded', 'false');
    
    // Base classes (non-color related)
    this.button.classList.add(
      'focus:ring-2', 
      'focus:ring-offset-2',
      'p-2', 
      'rounded-md', 
      'transition-all',
      'duration-200',
      'shadow-sm',
      'hover:shadow-md',
      'active:scale-95',
      'border-none',
      'cursor-pointer'
    );
    
    this.shadowRoot.appendChild(this.button);
  }

  createSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 100 100');
    
    // Tailwind classes work on SVG too!
    svg.classList.add('text-white', 'w-6', 'h-6');

    const pathsData = [
      {
        className: 'line line1',
        d: 'M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
      },
      {
        className: 'line line2',
        d: 'M 20,50 H 80'
      },
      {
        className: 'line line3',
        d: 'M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
      }
    ];

    pathsData.forEach(pathData => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', pathData.className);
      path.setAttribute('d', pathData.d);
      svg.appendChild(path);
    });

    this.button.appendChild(svg);
    this.svg = svg;
  }

  addEventListeners() {
    this.button.addEventListener('click', () => {
      this.toggle();
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.svg.classList.add('opened');
      this.button.setAttribute('aria-expanded', 'true');
    } else {
      this.svg.classList.remove('opened');
      this.button.setAttribute('aria-expanded', 'false');
    }

    this.dispatchEvent(new CustomEvent('hamburger-toggle', {
      detail: { isOpen: this.isOpen },
      bubbles: true
    }));
  }

  open() {
    if (!this.isOpen) this.toggle();
  }

  close() {
    if (this.isOpen) this.toggle();
  }

  get opened() {
    return this.isOpen;
  }

  static get observedAttributes() {
    return ['color', 'size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.button) return;
    
    if (name === 'color') {
      this.applyColorClasses(newValue);
    }
    
    if (name === 'size') {
      this.applySizeClasses(newValue);
    }
  }
}

customElements.define('hamburger-button', HamburgerButton);
export default HamburgerButton;