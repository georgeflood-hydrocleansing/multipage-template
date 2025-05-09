// Production domain content loader
// This script automatically detects the current domain and loads the appropriate content
document.addEventListener('DOMContentLoaded', function () {
  console.log('Production domain loader running...');

  // Get the current domain (hostname)
  const currentDomain = window.location.hostname;
  console.log('Current domain detected:', currentDomain);

  // Load config data
  fetch('./config.json')
    .then(response => response.json())
    .then(configData => {
      // Store config data globally for other scripts to access
      window.configData = configData;

      // Check if the current domain exists in our config
      if (configData[currentDomain]) {
        console.log('Configuration found for domain:', currentDomain);
        loadDomainContent(currentDomain, configData[currentDomain]);
      } else {
        // Fallback to default domain if the current one isn't in our config
        // This handles cases like IP addresses, localhost, or new domains
        console.log('Domain not found in config, using default content');
        const defaultDomain = Object.keys(configData)[0]; // Using first domain as default
        loadDomainContent(defaultDomain, configData[defaultDomain]);
      }
    })
    .catch(error => {
      console.error('Error loading configuration:', error);
    });

  // Function to load domain-specific content
  function loadDomainContent(domain, domainConfig) {
    console.log('Loading content for:', domain);

    // Set page title
    if (domainConfig.title) {
      document.title = domainConfig.title;
    }

    // Load hero section content
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `<span class="ld-fh-txt">${
        domainConfig.title || ''
      }</span>`;
    }

    const heroText = document.getElementById('hero-text');
    if (heroText) {
      heroText.innerHTML = `<span class="ld-fh-txt">${
        domainConfig.text || ''
      }</span>`;
    }

    // Load "for you" text
    const forYouText = document.getElementById('for-you-text');
    if (forYouText && domainConfig.forYou) {
      forYouText.innerHTML = domainConfig.forYou;
    }

    // Load hero image if defined
    const heroImg = document.getElementById('hero-img');
    if (heroImg && domainConfig.heroImg) {
      heroImg.src = domainConfig.heroImg;
    }

    // Load services if defined
    if (domainConfig.services && domainConfig.services.length > 0) {
      loadServices(domainConfig.services);
    }

    // Load gallery if defined
    if (domainConfig.gallery && domainConfig.gallery.length > 0) {
      loadGallery(domainConfig.gallery);
    }

    // Load video if defined
    if (domainConfig.video) {
      const videoLinks = document.querySelectorAll('a.fresco');
      videoLinks.forEach(link => {
        if (
          domainConfig.video.includes('youtube.com') ||
          domainConfig.video.includes('youtu.be')
        ) {
          link.href = domainConfig.video;
        }
      });
    }

    // Load FAQs if they exist
    if (domainConfig.faqs) {
      loadFAQs(domain);
    }

    console.log('Domain content loaded successfully');
  }

  // Function to load services
  function loadServices(services) {
    const serviceContainers = document.querySelectorAll('.iconbox');
    if (serviceContainers.length > 0) {
      services.forEach((service, index) => {
        if (index < serviceContainers.length) {
          const container = serviceContainers[index];

          // Set title
          const title = container.querySelector('h3');
          if (title) {
            title.textContent = service.title;
          }

          // Set description
          const desc = container.querySelector('p');
          if (desc) {
            desc.textContent = service.desc;
          }

          // Set icon if it exists
          const iconContainer = container.querySelector(
            '.iconbox-icon-container'
          );
          if (iconContainer && service.icon) {
            // Clear existing icon
            iconContainer.innerHTML = '';

            // Create new icon
            const icon = document.createElement('i');
            icon.className = service.icon;
            iconContainer.appendChild(icon);
          }
        }
      });
    }
  }

  // Function to load gallery
  function loadGallery(gallery) {
    const galleryItems = document.querySelectorAll('.ld-pf-item');
    if (galleryItems.length > 0) {
      gallery.forEach((item, index) => {
        if (index < galleryItems.length) {
          const container = galleryItems[index];

          // Set image
          const image = container.querySelector('img');
          if (image && item.src) {
            image.src = item.src;
            image.alt = item.alt || '';
          }

          // Set background image
          const figure = container.querySelector('figure');
          if (figure && item.src) {
            figure.style.backgroundImage = `url('${item.src}')`;
          }

          // Set title
          const title = container.querySelector('.ld-pf-title');
          if (title) {
            title.textContent = item.title || '';
          }
        }
      });
    }
  }

  // Function to load FAQs - if you have a FAQ section
  function loadFAQs(domain) {
    const accordion = document.getElementById('accordion-2');
    if (!accordion) return;

    // Make this available globally for FAQ fix script
    window.faqData = window.configData;
    window.faqsLoadedByDomainLoader = true;

    const faqData = window.configData[domain].faqs;
    if (!faqData || !faqData.length) return;

    // Update FAQ section title if it exists
    const faqSection = document.querySelector('header.fancy-heading h2');
    if (faqSection) {
      faqSection.textContent = 'Frequently Asked Questions';
    }

    // Clear existing accordion items
    accordion.innerHTML = '';

    // Add new FAQ items
    faqData.forEach((faq, index) => {
      const isActive = index === 0;
      const accordionItem = document.createElement('div');
      accordionItem.className = `accordion-item panel ${
        isActive ? 'active' : ''
      }`;

      accordionItem.innerHTML = `
        <div class="accordion-heading" role="tab" id="accordion-collapse-heading-${index}">
          <h4 class="accordion-title font-size-19">
            <a class="${isActive ? '' : 'collapsed'}" 
               data-toggle="collapse" 
               data-parent="#accordion-2" 
               href="#accordion-collapse-panel-${index}" 
               aria-expanded="${isActive ? 'true' : 'false'}" 
               aria-controls="accordion-collapse-panel-${index}">
              ${faq.question}
              <span class="accordion-expander">
                <i class="icon-arrows_circle_plus"></i>
                <i class="icon-arrows_circle_minus"></i>
              </span>
            </a>
          </h4>
        </div>
        <div id="accordion-collapse-panel-${index}" 
             class="accordion-collapse collapse ${isActive ? 'in' : ''}" 
             role="tabpanel" 
             aria-labelledby="accordion-collapse-heading-${index}">
          <div class="accordion-content">
            <p>${faq.answer}</p>
          </div>
        </div>
      `;

      accordion.appendChild(accordionItem);
    });
  }
});
