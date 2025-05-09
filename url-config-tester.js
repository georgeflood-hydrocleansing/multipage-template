/**
 * URL Config Tester
 *
 * This script loads the config.json data and allows dynamically switching
 * between different domains to preview content for each configuration.
 */

class UrlConfigTester {
  constructor() {
    this.configData = null;
    this.currentDomain = null;
    this.initialized = false;

    // Bind methods
    this.init = this.init.bind(this);
    this.loadConfig = this.loadConfig.bind(this);
    this.createDomainSelector = this.createDomainSelector.bind(this);
    this.switchDomain = this.switchDomain.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.applyDomainStyles = this.applyDomainStyles.bind(this);
  }

  /**
   * Initialize the tester
   */
  async init() {
    if (this.initialized) return;

    // Create UI container
    this.createInterface();

    // Load configuration
    await this.loadConfig();

    // Create domain selector
    if (this.configData) {
      this.createDomainSelector();
      this.setupEventListeners();
      this.initialized = true;
    }
  }

  /**
   * Load configuration data from config.json
   */
  async loadConfig() {
    console.log('Attempting to load config.json...');

    // Try multiple loading methods in sequence
    try {
      await this.loadConfigWithFetch();
    } catch (fetchError) {
      console.warn('Fetch method failed:', fetchError);

      try {
        await this.loadConfigWithXhr();
      } catch (xhrError) {
        console.error('All loading methods failed');

        // Use a fallback static configuration
        this.createFallbackConfig();
        this.showInfo(
          'Using fallback configuration - config.json could not be loaded. Check console for details.'
        );
      }
    }
  }

  /**
   * Load config with fetch API
   */
  async loadConfigWithFetch() {
    const paths = [
      './config.json',
      '../config.json',
      '/config.json',
      '/ave-html/config.json',
    ];

    for (const path of paths) {
      try {
        console.log(`Trying to fetch from: ${path}`);
        const response = await fetch(path);

        if (response.ok) {
          console.log(`Successfully fetched from: ${path}`);
          this.configData = await response.json();
          console.log(`Loaded ${Object.keys(this.configData).length} domains`);
          return;
        } else {
          console.warn(
            `Failed to fetch from ${path}: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.warn(`Error fetching from ${path}:`, error.message);
      }
    }

    throw new Error('Could not load config with fetch from any path');
  }

  /**
   * Load config with XMLHttpRequest (works in older browsers)
   */
  loadConfigWithXhr() {
    return new Promise((resolve, reject) => {
      const paths = [
        './config.json',
        '../config.json',
        '/config.json',
        '/ave-html/config.json',
      ];
      let pathIndex = 0;

      const tryLoad = () => {
        if (pathIndex >= paths.length) {
          return reject(new Error('XHR: All paths failed'));
        }

        const path = paths[pathIndex];
        console.log(`XHR: Trying ${path}`);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'json';

        xhr.onload = () => {
          if (xhr.status === 200) {
            console.log(`XHR: Success from ${path}`);
            this.configData = xhr.response || JSON.parse(xhr.responseText);
            console.log(
              `XHR: Loaded ${Object.keys(this.configData).length} domains`
            );
            resolve();
          } else {
            console.warn(`XHR: Failed from ${path}: ${xhr.status}`);
            pathIndex++;
            tryLoad();
          }
        };

        xhr.onerror = () => {
          console.warn(`XHR: Error from ${path}`);
          pathIndex++;
          tryLoad();
        };

        xhr.send();
      };

      tryLoad();
    });
  }

  /**
   * Create a fallback static config for testing
   */
  createFallbackConfig() {
    console.warn('Using fallback static configuration');

    this.configData = {
      'example.com': {
        title: 'Example Domain',
        text: 'This is a fallback configuration for testing when config.json cannot be loaded',
        services: [
          {
            title: 'Web Design',
            desc: 'Professional website design services',
            icon: 'fa-solid fa-laptop-code',
          },
          {
            title: 'Marketing',
            desc: 'Digital marketing solutions',
            icon: 'fa-solid fa-bullhorn',
          },
          {
            title: 'Support',
            desc: '24/7 technical support',
            icon: 'fa-solid fa-headset',
          },
        ],
        testimonials: [
          {
            text: 'Great service! Highly recommended.',
            author: 'John Doe, Company CEO',
          },
        ],
      },
    };

    return this.configData;
  }

  /**
   * Create the UI interface
   */
  createInterface() {
    // Create container
    const container = document.createElement('div');
    container.id = 'url-tester-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      padding: 15px;
      z-index: 9999;
      width: 350px;
      max-width: 90vw;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      transform: translateX(110%);
    `;

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'url-tester-toggle';
    toggleButton.innerHTML = '<i class="fa fa-globe"></i> Domain Tester';
    toggleButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: #0d6efd;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 15px;
      cursor: pointer;
      font-weight: bold;
    `;

    // Create content
    const content = document.createElement('div');
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h4 style="margin: 0; font-size: 16px;">Domain Tester</h4>
        <button id="url-tester-close" style="background: none; border: none; cursor: pointer; font-size: 18px;">×</button>
      </div>
      <div id="domain-selector-container" style="margin-bottom: 15px;">
        <p>Loading domains...</p>
      </div>
      <div id="domain-info" style="margin-top: 10px; display: none;">
        <h5 id="domain-title" style="margin-top: 0; margin-bottom: 8px; font-size: 14px;"></h5>
        <p id="domain-description" style="margin: 0; font-size: 12px; color: #666;"></p>
      </div>
    `;

    // Append to DOM
    container.appendChild(content);
    document.body.appendChild(container);
    document.body.appendChild(toggleButton);

    // Toggle button click handler
    toggleButton.addEventListener('click', () => {
      if (container.style.transform === 'translateX(0px)') {
        container.style.transform = 'translateX(110%)';
      } else {
        container.style.transform = 'translateX(0px)';
      }
    });

    // Close button click handler
    const closeButton = document.getElementById('url-tester-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        container.style.transform = 'translateX(110%)';
      });
    }

    // Override console for debug panel
    this.setupConsoleOverride();
  }

  /**
   * Override console methods to show in debug panel
   */
  setupConsoleOverride() {
    const oldConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
    };

    const addLogToDebug = (type, args) => {
      // Ensure the UI exists
      const debugContainer = document.getElementById('url-tester-debug');
      if (!debugContainer) return;

      // Create log element
      const logEl = document.createElement('div');
      logEl.className = `log-${type}`;
      logEl.style.cssText = `
        padding: 5px;
        margin: 3px 0;
        font-size: 12px;
        font-family: monospace;
        border-left: 3px solid ${
          type === 'log' ? '#888' : type === 'warn' ? '#ff9800' : '#f44336'
        };
        background: ${
          type === 'log' ? '#f5f5f5' : type === 'warn' ? '#fff3e0' : '#ffebee'
        };
        overflow-wrap: break-word;
      `;

      // Convert args to string
      let text = '';
      for (const arg of args) {
        if (typeof arg === 'object') {
          try {
            text += JSON.stringify(arg) + ' ';
          } catch (e) {
            text += String(arg) + ' ';
          }
        } else {
          text += String(arg) + ' ';
        }
      }

      logEl.textContent = text;
      debugContainer.appendChild(logEl);

      // Scroll to bottom
      debugContainer.scrollTop = debugContainer.scrollHeight;

      // Limit to 50 entries
      while (debugContainer.children.length > 50) {
        debugContainer.removeChild(debugContainer.firstChild);
      }
    };

    // Override console methods
    console.log = (...args) => {
      oldConsole.log(...args);
      addLogToDebug('log', args);
    };

    console.warn = (...args) => {
      oldConsole.warn(...args);
      addLogToDebug('warn', args);
    };

    console.error = (...args) => {
      oldConsole.error(...args);
      addLogToDebug('error', args);
    };
  }

  /**
   * Create domain selector
   */
  createDomainSelector() {
    const container = document.getElementById('domain-selector-container');
    if (!container) return;

    if (!this.configData || Object.keys(this.configData).length === 0) {
      container.innerHTML = '<p>No domains available</p>';
      return;
    }

    const select = document.createElement('select');
    select.id = 'domain-selector';
    select.className = 'form-control';
    select.style.cssText = `
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ced4da;
      font-size: 14px;
    `;

    // Add options
    const domains = Object.keys(this.configData);
    for (const domain of domains) {
      const option = document.createElement('option');
      option.value = domain;
      option.textContent = domain;
      select.appendChild(option);
    }

    container.innerHTML = '';
    container.appendChild(select);

    select.addEventListener('change', () => {
      this.switchDomain(select.value);
    });

    // Initialize with first domain or from hash
    const domainFromHash = window.location.hash.substring(1);
    if (domainFromHash && this.configData[domainFromHash]) {
      select.value = domainFromHash;
      this.switchDomain(domainFromHash);
    } else {
      this.switchDomain(domains[0]);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Handle hash changes to switch domain
    window.addEventListener('hashchange', () => {
      const domain = window.location.hash.substring(1);
      if (domain && this.configData[domain]) {
        const select = document.getElementById('domain-selector');
        if (select) select.value = domain;
        this.switchDomain(domain);
      }
    });
  }

  /**
   * Switch to a different domain
   */
  switchDomain(domain) {
    if (!domain || !this.configData[domain]) return;

    this.currentDomain = domain;

    // Update hash without scrolling
    const scrollPos = window.scrollY;
    window.location.hash = domain;
    window.scrollTo(0, scrollPos);

    // Update domain info display
    const domainInfo = document.getElementById('domain-info');
    const domainTitle = document.getElementById('domain-title');
    const domainDescription = document.getElementById('domain-description');

    domainInfo.style.display = 'block';
    domainTitle.textContent = this.configData[domain].title;
    domainDescription.textContent = this.configData[domain].text;

    // Update content
    this.updateContent();

    // Apply domain-specific styles
    this.applyDomainStyles();

    console.log(`Domain switched to: ${this.currentDomain}`);

    // Update service cards with icons from config
    try {
      console.log('Updating service cards with icons from config...');
      const domainConfig = this.configData[this.currentDomain];
      if (domainConfig && Array.isArray(domainConfig.services)) {
        this.updateServices(domainConfig.services);
      }
    } catch (e) {
      console.error('Error updating service cards:', e);
    }

    // Load dynamic FAQs after content update
    try {
      loadFAQs(this.currentDomain, true);
    } catch (e) {
      console.error('Error loading FAQs after domain switch:', e);
    }
    // Load dynamic gallery images after domain switch
    try {
      if (
        typeof loadGallery === 'function' &&
        this.configData[this.currentDomain]
      ) {
        const domainConfig = this.configData[this.currentDomain];
        loadGallery(domainConfig);
      }
    } catch (galleryError) {
      console.error('Error loading gallery after domain switch:', galleryError);
    }

    // Update the hero image for this domain
    try {
      if (
        this.configData[this.currentDomain] &&
        this.configData[this.currentDomain].heroImg
      ) {
        console.log('==== UPDATING HERO IMAGE ====');

        // Get the path from config and ensure it's in relative format
        let imgPath = this.configData[this.currentDomain].heroImg.trim();
        if (!imgPath.startsWith('./') && !imgPath.startsWith('/')) {
          imgPath = './assets/website-hero-images/' + imgPath;
        } else if (imgPath.startsWith('/')) {
          imgPath = '.' + imgPath;
        }

        console.log('Hero image path:', imgPath);

        // Function to update the hero image
        const updateHeroImage = () => {
          // Find the hero image by ID
          const heroImg = document.getElementById('hero-img');

          if (heroImg) {
            // Set up error handler first
            heroImg.onerror = () => {
              console.error(`Failed to load hero image: ${imgPath}`);
              const fallback = './assets/website-hero-images/liquid-waste.png';
              heroImg.src = fallback;
              console.log('Fallback image set to:', fallback);

              // Update figure background if available
              const figure = heroImg.closest('figure');
              if (figure) {
                figure.style.backgroundImage = `url('${fallback}') !important`;
                figure.style.backgroundSize = 'cover !important';
                figure.style.backgroundPosition = 'center center !important';
                figure.style.overflow = 'hidden !important';

                // Update custom CSS with fallback
                const style = document.createElement('style');
                style.textContent = `
                  .forced-hero-figure {
                    background-image: url('${fallback}') !important;
                    background-size: cover !important;
                    background-position: center center !important;
                  }
                  .forced-hero-figure img {
                    visibility: visible !important;
                    display: block !important;
                  }
                `;
                document.head.appendChild(style);

                console.log(
                  'Updated figure background with fallback image and added custom CSS'
                );
              }
            };

            // Update the image source
            heroImg.src = imgPath;
            console.log('Updated hero image source to:', imgPath);

            // Ensure the image is visible and not overridden
            heroImg.style.visibility = 'visible !important';
            heroImg.style.display = 'block !important';
            heroImg.style.width = '100% !important';
            heroImg.style.height = '100% !important';
            heroImg.style.objectFit = 'contain !important';
            heroImg.style.position = 'relative !important';
            heroImg.style.zIndex = '10 !important';

            // Find the figure container if it exists
            const figure = heroImg.closest('figure');
            if (figure) {
              // Update the background image with aggressive overrides
              figure.style.backgroundImage = `url('${imgPath}') !important`;
              figure.style.backgroundSize = 'cover !important';
              figure.style.backgroundPosition = 'center center !important';
              figure.style.overflow = 'hidden !important';

              // Remove any theme attributes that might interfere
              figure.removeAttribute('data-responsive-bg');
              figure.removeAttribute('data-responsive-bg-img');

              // Add a custom class for additional styling if needed
              figure.classList.add('forced-hero-figure');

              // Inject custom CSS to ensure the image displays
              const style = document.createElement('style');
              style.textContent = `
                .forced-hero-figure {
                  background-image: url('${imgPath}') !important;
                  background-size: cover !important;
                  background-position: center center !important;
                }
                .forced-hero-figure img {
                  visibility: visible !important;
                  display: block !important;
                }
              `;
              document.head.appendChild(style);

              console.log(
                'Updated figure background with hero image and added custom CSS'
              );
            } else {
              console.warn('Figure container not found for hero image');
            }
          } else {
            console.error('Hero image element not found with ID hero-img');
          }

          console.log('==== HERO IMAGE UPDATE COMPLETE ====');
        };

        // Wait for the window to fully load before updating the image
        if (document.readyState === 'complete') {
          updateHeroImage();
        } else {
          window.addEventListener('load', updateHeroImage);
          console.log('Waiting for window.onload to update hero image');
        }
      }
    } catch (heroError) {
      console.error('Error updating hero image:', heroError);
    }
  }

  /**
   * Update page content based on current domain
   */
  updateContent() {
    if (!this.currentDomain) return;

    const data = this.configData[this.currentDomain];

    // Update title (without "| Hydro-Cleansing")
    document.title = data.title.replace(/\s*\|\s*Hydro-Cleansing/gi, '');

    // Update main heading - first try the specific ID, then fallback to general selectors
    const dynamicTitleArea = document.getElementById('dynamic-title-area');
    if (dynamicTitleArea) {
      const titleSpan = dynamicTitleArea.querySelector('.ld-fh-txt');
      if (titleSpan) {
        titleSpan.textContent = data.title;
      } else {
        dynamicTitleArea.textContent = data.title;
      }
    } else {
      // Fallback to general selectors
      const mainHeadings = document.querySelectorAll('h1, .h1');
      if (mainHeadings.length > 0) {
        mainHeadings[0].textContent = data.title;
      }
    }

    // Update subheading or description text - first try the specific ID, then fallback
    const dynamicTextArea = document.getElementById('dynamic-text-area');
    if (dynamicTextArea) {
      const textSpan = dynamicTextArea.querySelector('.ld-fh-txt');
      if (textSpan) {
        textSpan.textContent = data.text;
      } else {
        dynamicTextArea.textContent = data.text;
      }
    } else {
      // Fallback to general selectors
      const descriptions = document.querySelectorAll(
        '.lead, p.subtitle, .subtitle'
      );
      if (descriptions.length > 0) {
        descriptions[0].textContent = data.text;
      }
    }

    // Update the forYou content if it exists
    const forYouText = document.getElementById('for-you-text');
    if (forYouText && data.forYou) {
      forYouText.innerHTML = data.forYou;
    }

    // Update services if the HTML structure exists
    if (data.services) {
      this.updateServices(data.services);
    }

    // Update testimonials if the HTML structure exists
    if (data.testimonials) {
      this.updateTestimonials(data.testimonials);
    }

    console.log(`Domain switched to: ${this.currentDomain}`);
  }

  /**
   * Update services section
   */
  updateServices(services) {
    // Look for services container with class indicators
    const serviceContainers = document.querySelectorAll(
      '.services, .features, #services, .iconbox-container, .service-cards'
    );

    if (serviceContainers.length === 0) return;

    // Find service items within the first container
    const container = serviceContainers[0];
    const serviceItems = container.querySelectorAll(
      '.service, .feature, .iconbox, .card, .service-item'
    );

    if (serviceItems.length === 0) return;

    // Update each service item up to the available items
    const limit = Math.min(services.length, serviceItems.length);
    console.log(`Updating ${limit} service cards with icons`);

    for (let i = 0; i < limit; i++) {
      const item = serviceItems[i];
      const service = services[i];

      // Update title
      const title = item.querySelector('h3, h4, h5, .title, .card-title');
      if (title) title.textContent = service.title;

      // Update description
      const description = item.querySelector('p, .description, .card-text');
      if (description) description.textContent = service.desc;

      // Update icon if it exists and service has an icon property
      if (service.icon) {
        // First find the icon container
        const iconContainer = item.querySelector('.iconbox-icon-container');
        if (iconContainer) {
          console.log(
            `Updating service card ${i + 1} icon to: ${service.icon}`
          );

          // Handle Liquid theme iconbox format by recreating the icon element
          // Clear existing content
          iconContainer.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="#f42958" opacity=".1"/>
              <circle cx="24" cy="24" r="16" fill="#f42958" opacity=".2"/>
            </svg>
            <i class="${service.icon}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; color: #f42958;"></i>
          `;

          // Ensure proper positioning
          iconContainer.style.position = 'relative';
          iconContainer.style.display = 'inline-block';
        } else {
          // If no specific iconbox container found, look for any icon element
          const iconElement = item.querySelector(
            'i.fa, i.fas, i.far, i.fab, i.icon'
          );
          if (iconElement) {
            console.log(`Found generic icon element for service ${i + 1}`);

            // Remove all existing FA classes
            const classesToRemove = Array.from(iconElement.classList).filter(
              cls =>
                cls.startsWith('fa-') ||
                cls === 'fa' ||
                cls === 'fas' ||
                cls === 'far' ||
                cls === 'fab'
            );

            classesToRemove.forEach(cls => iconElement.classList.remove(cls));

            // Add new FA classes
            service.icon.split(' ').forEach(cls => {
              iconElement.classList.add(cls);
            });

            console.log(`Updated icon classes to: ${service.icon}`);
          }
        }
      }
    }
  }

  /**
   * Update testimonials section
   */
  updateTestimonials(testimonials) {
    // Look for testimonials container
    const testimonialContainers = document.querySelectorAll(
      '.testimonials, #testimonials, .testimonial-section'
    );

    if (testimonialContainers.length === 0) return;

    // Find testimonial items
    const container = testimonialContainers[0];
    const testimonialItems = container.querySelectorAll(
      '.testimonial, .testimonial-item, .blockquote, .review'
    );

    if (testimonialItems.length === 0) return;

    // Update each testimonial up to the available items
    const limit = Math.min(testimonials.length, testimonialItems.length);

    for (let i = 0; i < limit; i++) {
      const item = testimonialItems[i];
      const testimonial = testimonials[i];

      // Update text
      const text = item.querySelector(
        'p, .testimonial-text, blockquote, .text'
      );
      if (text) text.textContent = `"${testimonial.text}"`;

      // Update author
      const author = item.querySelector(
        '.author, .testimonial-author, cite, footer, .name'
      );
      if (author) author.textContent = testimonial.author;
    }
  }

  /**
   * Apply domain-specific styles
   */
  applyDomainStyles() {
    // This could be extended to apply custom CSS for each domain
    // For now it's a placeholder for potential customization
  }

  /**
   * Show error message
   */
  showError(message) {
    const selectorContainer = document.getElementById(
      'domain-selector-container'
    );
    selectorContainer.innerHTML = `
      <div style="color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 4px;">
        ${message}
      </div>
    `;
  }

  /**
   * Show info message
   */
  showInfo(message) {
    const selectorContainer = document.getElementById(
      'domain-selector-container'
    );
    selectorContainer.innerHTML = `
      <div style="color: #0c5460; background-color: #d1ecf1; padding: 10px; border-radius: 4px; margin-bottom: 15px;">
        ${message}
      </div>
    `;

    // If we have a fallback config, create the selector
    if (this.configData && Object.keys(this.configData).length > 0) {
      this.createDomainSelector();
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const tester = new UrlConfigTester();
  window.urlTester = tester; // Make available globally

  // Initialize with slight delay to ensure the page is fully loaded
  setTimeout(() => {
    tester.init();
  }, 500);
});
