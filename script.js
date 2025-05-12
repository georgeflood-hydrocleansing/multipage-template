/**
 * Dynamic Content Loader based on domain
 * This script loads content dynamically based on the current domain from config.json
 */

// Function to hide the loading overlay
function hideLoadingOverlay() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    // Add fade-out effect
    loadingOverlay.style.opacity = '0';
    loadingOverlay.style.transition = 'opacity 0.5s ease';

    // Remove from DOM after animation completes
    setTimeout(function () {
      loadingOverlay.remove();
    }, 500);
  }
}

// Hide loading overlay when window is fully loaded (all assets including images)
window.onload = function () {
  // Add a small delay to ensure everything is rendered
  setTimeout(hideLoadingOverlay, 300);
};

// Also attempt to hide it if DOMContentLoaded fires but window.onload doesn't
// This serves as a fallback in case of slow-loading resources
document.addEventListener('DOMContentLoaded', function () {
  // Set a timeout to hide the overlay after a reasonable wait time
  // This ensures users aren't stuck with a loading screen if some resource fails to load
  setTimeout(hideLoadingOverlay, 3000);
});

// FAQ data for all service categories
const faqData = {
  liquidWaste: {
    title: 'Liquid Waste Management & Disposal FAQs',
    faqs: [
      {
        question: 'What liquid waste management services do you offer?',
        answer:
          'We provide a comprehensive range of liquid waste management and disposal services, including removal of hazardous and non-hazardous waste, concrete slurry, interceptor cleaning, fuel and oil tank cleaning, groundwater and pond water removal, and fatberg extraction.',
      },
      {
        question: 'Do you handle both hazardous and non-hazardous waste?',
        answer:
          'Yes, we safely remove and dispose of both hazardous and non-hazardous liquid waste from festivals, construction sites, manufacturing facilities and swimming pools, following all current regulations.',
      },
      {
        question: 'How do you remove concrete slurry and interceptor waste?',
        answer:
          'Our specialist team uses powerful vacuum tankers to extract concrete slurry and oily water from interceptors. Each project is scoped with a detailed Risk and Method Statement (RAMS) to ensure safe, compliant disposal.',
      },
      {
        question: 'Can you clean and service fuel and oil tanks?',
        answer:
          'Absolutely. We carry out fuel and oil tank cleaning in line with industry guidelines, safely removing old oil or fuel and preparing tanks for inspection or reuse.',
      },
      {
        question: 'Do you offer groundwater and pond water removal?',
        answer:
          "Yes, we have expert pumping equipment and over 15 years' experience in groundwater and pond water removal, ensuring efficient dewatering for construction, landscaping or maintenance purposes.",
      },
      {
        question: 'How do you tackle fatberg removal?',
        answer:
          'Our powerful super combination tankers break down and remove fatbergs from drainage systems and sewers, restoring flow and preventing blockages.',
      },
      {
        question: 'Are your liquid waste services available 24/7?',
        answer:
          'We operate round the clock, 365 days a year, to provide emergency response and scheduled services for both short-term and long-term contracts.',
      },
      {
        question: 'What specialised vehicles and equipment do you use?',
        answer:
          'Our fleet includes high-capacity vacuum tankers such as Megatron and Terminator, as well as combination units like Wrath of Poseidon and The Hydra, capable of high-pressure jetting and vacuum extraction.',
      },
      {
        question: 'How is collected waste recycled?',
        answer:
          'All liquid waste is processed at our own Wet Waste Recycling Facility, where road sweepings, gully waste, drilling slurry and storm tank residues are treated to recover reusable materials and reduce landfill.',
      },
      {
        question: 'How can I request a quote or book a service?',
        answer:
          'Simply call us on 0800 740 8888 or visit our website to complete an online enquiry form. Our team will respond promptly with a tailored proposal and pricing.',
      },
    ],
    urls: [
      'croydon-waste-recycling.co.uk',
      'emergancyliquidstorage.co.uk',
      'emergency-bulk-storage.co.uk',
      'emergency-liquid-storage.co.uk',
      'emergency-waste-removal.co.uk',
      'environmental-waste.co.uk',
      'environmental-waste.uk',
      'environmentalwaterrecycling.co.uk',
      'hazardwaste.co.uk',
      'hazardouswasteclearance.co.uk',
      'hazardouswasteliquiddisposal.co.uk',
      'hclwaste.com',
      'hydro-cleansing.co',
      'hydro-cleansing.com',
      'hydropressureclean.co.uk',
      'liquid-ingenuity.co.uk',
      'liquid-waste.co.uk',
      'liquid-waste.uk',
      'liquiddisposal.co.uk',
      'liquiddisposal.uk',
      'liquidingenity.co.uk',
      'recycle-waste.uk',
      'tanker-waste.co.uk',
      'waste-logistics.co.uk',
      'waste-removal-tideway.co.uk',
    ],
  },
  pumpStations: {
    title: 'Pump Station & Interceptor Services FAQs',
    faqs: [
      {
        question: 'What pump station services do you offer?',
        answer:
          'We offer comprehensive pump station services including cleaning, regular maintenance, repairs, and emergency call-outs for sewage, lift stations, foul water, surface water, and wastewater pump systems.',
      },
      {
        question: 'How often should pump stations be maintained?',
        answer:
          'Regular maintenance is recommended at least once annually to prevent blockages, reduce the risk of pump failures, and ensure continuous efficient operation.',
      },
      {
        question: 'What does your pump station maintenance involve?',
        answer:
          'Our maintenance service includes emptying waste such as fats, oils, and grease, conducting thorough pump inspections, performing repairs or necessary upgrades, and thoroughly cleaning and refilling the tanks.',
      },
      {
        question: 'What types of interceptors do you service?',
        answer:
          'We service all types of interceptors, including full retention interceptors, bypass interceptors, drain interceptors, grease traps, and petrol interceptors, ensuring they comply with environmental regulations.',
      },
      {
        question: 'Why is interceptor maintenance important?',
        answer:
          'Regular interceptor maintenance is crucial to prevent blockages, avoid environmental contamination, comply with PPG3 regulations, and reduce potential fines and operational disruptions.',
      },
      {
        question: 'Do you offer emergency interceptor services?',
        answer:
          'Yes, our interceptor and pump station services are available 24/7, providing rapid response to emergencies across London, Surrey, Kent, Hampshire, and the Southeast.',
      },
      {
        question:
          'What specialised equipment do you use for interceptor cleaning?',
        answer:
          'Our fleet includes advanced vehicles such as Megatron, Terminator, Wrath of Poseidon, and The Hydra, capable of high-pressure jetting and vacuum extraction, ensuring efficient and thorough cleaning.',
      },
      {
        question:
          'How can I schedule maintenance or request an emergency service?',
        answer:
          'You can contact us directly at 0800 740 8888 or visit our website to schedule a service, request emergency assistance, or obtain further information.',
      },
    ],
    urls: [
      'gully-cleaning.co.uk',
      'gully-cleaning.uk',
      'gullygulper.uk',
      'interceptorcleaning.co.uk',
      'interceptorcleaning.uk',
      'interceptorwaste.uk',
      'london-pump-services.co.uk',
      'london-pump-services.uk',
      'london-pump.co.uk',
      'london-pump.uk',
      'london-pumps.co.uk',
      'london-pumps.uk',
      'londonpumpandplantsales.co.uk',
      'londonpumpandplantsales.com',
      'londonpumpsservices.uk',
      'pumpstationcleaning.co.uk',
      'pumpstationcleaning.uk',
      'pumpstationservices.co.uk',
      'sewage-waste.uk',
      'sewagetreatmentpump.co.uk',
    ],
  },
  roadSweeping: {
    title: 'Road Sweeping Services FAQs',
    faqs: [
      {
        question: 'What road sweeping services do you provide?',
        answer:
          'We provide comprehensive road sweeping services across London and the Southeast, including construction site cleaning, highway maintenance, event venue cleaning, and regular sweeping of car parks and commercial properties.',
      },
      {
        question: 'Are your road sweepers environmentally friendly?',
        answer:
          'Yes, all our road sweepers comply with Euro 6 standards, featuring advanced emissions controls and environmentally sustainable practices.',
      },
      {
        question: 'What specialised road sweeping equipment do you have?',
        answer:
          'We operate specialised vehicles like the Mega Sweep for large-scale cleaning and the Mini Sweep for restricted spaces. We also utilise vacuum tankers and combination units for comprehensive environmental solutions.',
      },
      {
        question: 'Do you manage road sweeping waste responsibly?',
        answer:
          'Absolutely. We own and operate a dedicated Wet Waste Recycling Facility that efficiently recycles waste materials from road sweepings, gully cleaning, drilling slurries, and storm tank residues, adhering strictly to environmental standards.',
      },
      {
        question: 'Are your road sweeping services available for hire 24/7?',
        answer:
          'Yes, we offer 24/7, year-round road sweeping services, suitable for both short-term and long-term projects, ensuring flexibility and responsiveness to client needs.',
      },
      {
        question: 'Do you service areas outside London?',
        answer:
          'Yes, we provide road sweeping services throughout London, Kent, Essex, and across the Southeast, ensuring extensive regional coverage.',
      },
      {
        question: 'How can I contact you for road sweeping services?',
        answer:
          'You can contact us at 0800 740 8888 or visit our website for more information or to request a service quote.',
      },
      {
        question: 'Do you offer solutions for event cleanup?',
        answer:
          'Yes, we provide specialised pre- and post-event road sweeping services to maintain cleanliness and safety at stadiums, arenas, and public event spaces.',
      },
    ],
    urls: [
      'construction-sweepers.co.uk',
      'croydonsweepers.co.uk',
      'event-road-sweepers.co.uk',
      'eventroadsweepers.co.uk',
      'hcl-commercial-bodywork.co.uk',
      'hcl-commercial-bodywork.com',
      'hclsweepers.co.uk',
      'london-sweeperhire.co.uk',
      'london-sweepers.co.uk',
      'mega-sweep.co.uk',
      'mega-sweep.com',
      'mega-sweeper.com',
      'mega-sweepers.com',
      'road-sweeper-waste-disposal.co.uk',
      'road-sweeper.co',
      'road-sweepers.co',
      'road-sweeping-waste.co.uk',
      'roadgullysweeper.co.uk',
      'roadgullysweeper.uk',
      'roadsweeperwaste.co.uk',
    ],
  },
  tunnelCleaning: {
    title: 'Tunnel Cleaning Services FAQs',
    faqs: [
      {
        question: 'What types of tunnel cleaning services do you provide?',
        answer:
          'We offer extensive tunnel cleaning services including sewage network cleaning, pump station maintenance, interceptor cleaning, waste processing, confined space cleaning, and CCTV drainage inspections.',
      },
      {
        question: 'How frequently should tunnels be cleaned?',
        answer:
          'Regular tunnel cleaning depends on usage and environmental factors, but typically annual inspections and cleaning are recommended to maintain optimal functionality and compliance with safety regulations.',
      },
      {
        question: 'Do you perform CCTV inspections for tunnels?',
        answer:
          'Yes, we utilise CCTV drainage inspections to assess tunnel conditions, identify potential issues, and determine necessary maintenance or cleaning requirements.',
      },
      {
        question: 'What specialised equipment do you use for tunnel cleaning?',
        answer:
          'Our fleet includes advanced equipment such as the Mega-Reel, capable of jetting and clearing tunnels up to 1000 metres, ensuring efficient and thorough cleaning without requiring additional support vehicles.',
      },
      {
        question:
          'Can you handle waste disposal from tunnel cleaning operations?',
        answer:
          'Yes, we manage all waste removed during cleaning operations in an environmentally responsible manner, ensuring compliance with regulatory standards.',
      },
      {
        question: 'Are your tunnel cleaning services available 24/7?',
        answer:
          'We provide around-the-clock tunnel cleaning and emergency response services to ensure continuous operation and minimise disruptions.',
      },
      {
        question: 'What measures do you take for safe confined space entry?',
        answer:
          'All confined space work is carried out by trained specialists using industry-approved safety protocols, equipment, and comprehensive risk assessments to ensure the safety of our team and clients.',
      },
      {
        question: 'How do I arrange for tunnel cleaning or an inspection?',
        answer:
          'You can contact us directly by phone at 0800 740 8888 or through our website to schedule an appointment or request further details about our tunnel cleaning services.',
      },
    ],
    urls: [
      'digestercleaning.co.uk',
      'london-tunnels.co.uk',
      'london-tunnels.com',
      'sewagedigester.co.uk',
      'sewerdigester.co.uk',
      'subway-cleaning.co.uk',
      'tunnel-cleaning.com',
      'tunnelcleaning.co.uk',
      'tunnelcleaning.uk',
      'tunnelwaste.co.uk',
      'tunnelwaste.com',
    ],
  },
  general: {
    title: 'Hydro-Cleansing Services FAQs',
    faqs: [
      {
        question: 'What services does Hydro-Cleansing offer?',
        answer:
          'We provide a comprehensive range of environmental services including drain unblocking, liquid waste disposal, CCTV surveys, pump maintenance, road sweeping, and emergency response across London and the Southeast.',
      },
      {
        question: 'Do you operate 24/7?',
        answer:
          'Yes, our control room and emergency response teams operate round-the-clock, 365 days a year, to handle both scheduled maintenance and urgent callouts.',
      },
      {
        question: 'What areas do you cover?',
        answer:
          'We primarily serve London, Surrey, Kent, Essex, and the Southeast, but can arrange nationwide service for large commercial contracts.',
      },
      {
        question: 'How quickly can you respond to emergencies?',
        answer:
          'Our teams aim to be on-site within 60 minutes for most London locations and within 2 hours across the wider Southeast region.',
      },
      {
        question: 'What environmental certifications do you hold?',
        answer:
          'We operate under ISO 14001 Environmental Management, ISO 9001 Quality Management, and maintain all relevant waste carrier and treatment permits.',
      },
      {
        question: 'How can I request a quote?',
        answer:
          'Call our customer service team at 0800 740 8888 or complete our online enquiry form for a detailed, no-obligation quote tailored to your specific requirements.',
      },
    ],
    urls: [
      'hydro-cleansing.com',
      'hydro-cleansing.co',
      'hydrocleansing.net',
      'hydrocleansing.co',
    ],
  },
  uhpwj: {
    title: 'Ultra-High-Pressure Water Jetting (UHPWJ) FAQs',
    faqs: [
      {
        question: 'What is UHPWJ?',
        answer:
          'Water delivered at 20,000–40,000 psi to remove concrete, tar, or heavy scale without chemicals.',
      },
      {
        question: 'Typical applications?',
        answer:
          'Tank cleaning, concrete scarification, graffiti removal, and bridge deck preparation.',
      },
      {
        question: 'Are your operators certified?',
        answer:
          'All engineers hold Water Jetting Association & City & Guilds UHP cards.',
      },
      {
        question: 'Is it environmentally safe?',
        answer:
          'Yes—no abrasive media or solvents; spent water is vacuum-recovered for recycling.',
      },
      {
        question: 'Can you work in confined spaces?',
        answer:
          'We combine UHP heads with breathing apparatus teams for safe confined-space work.',
      },
      {
        question: 'How do I book?',
        answer:
          "Call our specialist jetting line 24/7; we'll scope, quote, and mobilise the right unit.",
      },
    ],
    urls: [
      'uhpwj.co.uk',
      'uhpwj.com',
      'ultrahighpressurewaterjetting.co.uk',
      'ultrahighpressurewaterjetting.com',
      'hydropressureclean.co.uk',
    ],
  },
  cctv: {
    title: 'CCTV Drain Survey FAQs',
    faqs: [
      {
        question: 'Why would I need a CCTV survey?',
        answer:
          'To locate hidden defects, verify new pipework, or satisfy insurance/home-buyer requirements.',
      },
      {
        question: 'What technology do you use?',
        answer:
          'HD pan-and-tilt cameras with laser defect measurement and WinCan reporting software.',
      },
      {
        question: 'How long does a typical survey take?',
        answer:
          'A domestic line can be filmed in under an hour; larger networks may need half-day slots.',
      },
      {
        question: 'Do you map pipe depths and locations?',
        answer:
          'Yes. All surveys include on-screen distance counting and optional GPS-enabled mapping.',
      },
      {
        question: 'Will the survey disrupt my business?',
        answer:
          'Minimal—our units are self-contained and can work outside trading hours if required.',
      },
      {
        question: 'What format is the report delivered in?',
        answer:
          'PDF and MP4 video files, plus a WinCan XML archive if your engineer needs raw data.',
      },
    ],
    urls: [
      'cctvsurvey.co.uk',
      'cctvsurvey.uk',
      'wincan-cctv.co.uk',
      'wincan-london.co.uk',
      'wincan-surveys.co.uk',
      'wincan-surveys.com',
      'mega-cam.com',
      'mega-cam.uk',
      'mega-cctv.co',
      'mega-cctv.co.uk',
    ],
  },
  drainageServices: {
    title: 'Drain Unblocking & Jetting FAQs',
    faqs: [
      {
        question: 'What are the warning signs of a blocked drain?',
        answer:
          'Slow sinks, gurgling toilets, bad odours, or surface flooding mean a blockage is forming.',
      },
      {
        question: 'How fast can Hydro Cleansing attend?',
        answer:
          'We run a 24/7 control room and aim to be on-site within 60 minutes across London & the South-East.',
      },
      {
        question: 'What methods do you use to clear drains?',
        answer:
          'High-pressure water jetting, mechanical cutting, and vacuum extraction—safe for both clay and plastic pipes.',
      },
      {
        question: 'Will unblocking damage my pipework?',
        answer:
          'No. Our equipment is pressure-regulated and operated by trained engineers to prevent pipe erosion or cracks.',
      },
      {
        question: 'Can you provide a post-clearance report?',
        answer:
          'Yes, we can follow up with a CCTV survey and digital report showing the pipe condition.',
      },
      {
        question: 'Do you offer preventative maintenance?',
        answer:
          'We can schedule quarterly or annual cleans to keep commercial and domestic drains flowing freely.',
      },
    ],
    urls: [
      'abc-drainage.com',
      'abc-drainage.uk',
      'abcdrainage.uk',
      'cdrain.co.uk',
      'cdrain.com',
      'croydon-drain-services.co.uk',
      'draineyehire.com',
      'jetting-drains.co.uk',
      'jetting-drians.co.uk',
      'jettingvans.co.uk',
      'jettingvans.com',
    ],
  },
  emergencyWaste: {
    title: 'Emergency Waste Removal FAQs',
    faqs: [
      {
        question: 'What incidents qualify as an emergency?',
        answer:
          'Chemical spills, tanker overturns, blocked sewers, or flood-damaged waste stores.',
      },
      {
        question: 'Response time?',
        answer: 'Crews on the road within 2 hours—24/7/365.',
      },
      {
        question: 'Do you liaise with regulators?',
        answer: 'We handle EA notifications, sampling, and incident reports.',
      },
      {
        question: 'How is waste contained on site?',
        answer:
          'Inflatable booms, over-pack drums, and vacuum recovery limit spread.',
      },
      {
        question: 'Where is the waste taken?',
        answer:
          'To our licensed treatment facility or specialist disposal partners.',
      },
      {
        question: 'Will you restore the area?',
        answer:
          'Full clean-down, surface testing, and "all-clear" documentation provided.',
      },
    ],
    urls: ['emergency-waste-removal.co.uk'],
  },
};

// Add a global flag to track when FAQs have been loaded by the URL tester
let faqsLoadedByTester = false;

/**
 * Updates the page content based on the domain configuration
 * @param {Object} domainConfig - The configuration for the current domain
 * @param {String} currentDomain - The current domain being accessed
 * @param {Object} allConfig - All domain configurations
 */
function updatePageContent(domainConfig, currentDomain, allConfig) {
  // Site title and meta tags
  document.title = domainConfig.title || 'Hydro Cleansing';

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', domainConfig.text || '');
  }

  // Update hero text
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && domainConfig.title) {
    heroTitle.textContent = domainConfig.title;
  }

  // Update hero description text
  const heroText = document.getElementById('hero-text');
  if (heroText && domainConfig.text) {
    heroText.textContent = domainConfig.text;
  }

  // Update hero image - only change if heroImg path is valid
  // --- hero image swap ---------------------------------------------
  const heroImgEl = document.querySelector('.clip-svg img');
  if (heroImgEl && domainConfig.heroImg?.trim()) {
    let imgPath = domainConfig.heroImg.trim();

    // If it isn't absolute already, make it absolute to the site-root
    // so we don't depend on where the script is executed from.
    if (!imgPath.startsWith('/')) {
      imgPath = '/' + imgPath.replace(/^(\.\/)+/, '');
    }

    heroImgEl.src = imgPath;

    heroImgEl.onerror = () => {
      console.warn(
        `[HCL] Hero image "assets/website-hero-images/liquid-waste.png" failed, falling back.`
      );
      heroImgEl.src = 'assets/website-hero-images/liquid-waste.png';
      heroImgEl.onerror = null; // stop the loop
    };
  }

  // Update "For You" text
  const forYouText = document.getElementById('for-you-text');
  if (forYouText && domainConfig.forYou) {
    forYouText.innerHTML = domainConfig.forYou;
  }

  // Update services section based on domain category
  updateServicesSectionByDomainCategory(currentDomain, allConfig);

  // Load FAQ content for current domain
  loadFAQs(currentDomain);

  // Load gallery content
  if (domainConfig.gallery) {
    loadGallery(domainConfig);
  }

  // Inject Schema markup
  injectSchema(domainConfig, currentDomain);
}

/**
 * Updates the Services section title and description based on domain category
 * @param {String} domain - The current domain
 * @param {Object} allConfig - All domain configurations
 */
function updateServicesSectionByDomainCategory(domain, allConfig) {
  // Get the category of the current domain
  const category = getDomainCategory(domain);

  // Select the services section elements to update
  const servicesTitleElement = document.querySelector('.fancy-title h2');
  const servicesDescriptionElement = document.querySelector(
    '.font-size-18.lh-15.mb-55'
  );

  if (servicesTitleElement && servicesDescriptionElement) {
    switch (category) {
      case 'waste-disposal':
        servicesTitleElement.innerHTML =
          '<strong>Waste Disposal</strong> Solutions';
        servicesDescriptionElement.textContent =
          'We provide comprehensive waste management services for businesses and individuals. Our experienced team ensures safe, efficient, and environmentally responsible disposal of all types of waste, from general refuse to hazardous materials.';
        break;

      case 'cctv':
        servicesTitleElement.innerHTML =
          '<strong>CCTV</strong> Survey Services';
        servicesDescriptionElement.textContent =
          'Our advanced CCTV survey services provide detailed inspection of drains, sewers, and pipework. Using the latest technology, we identify blockages, damage, and potential issues to develop targeted solutions.';
        break;

      case 'pump-services':
        servicesTitleElement.innerHTML = '<strong>Pump</strong> Services';
        servicesDescriptionElement.textContent =
          'We offer comprehensive pump installation, maintenance, and emergency repair services across London. Our professional team keeps your systems running efficiently, preventing costly downtime and water damage.';
        break;

      case 'liquid-storage':
        servicesTitleElement.innerHTML =
          '<strong>Liquid Storage</strong> Solutions';
        servicesDescriptionElement.textContent =
          'From emergency liquid containment to long-term storage solutions, we provide secure, compliant storage options for all types of liquids. Our portable and fixed storage systems meet the highest industry standards.';
        break;

      case 'drainage':
        servicesTitleElement.innerHTML = '<strong>Drainage</strong> Solutions';
        servicesDescriptionElement.textContent =
          'Our expert drainage services cover everything from emergency unblocking to planned maintenance and repairs. We use the latest equipment to ensure your drains flow freely and efficiently.';
        break;

      case 'sweeper-services':
        servicesTitleElement.innerHTML =
          '<strong>Road Sweeping</strong> Services';
        servicesDescriptionElement.textContent =
          'Our professional road sweeping services keep your premises, roads, and event spaces clean and presentable. From regular maintenance to emergency cleanup, our fleet of sweepers delivers exceptional results.';
        break;

      case 'cleaning-services':
        servicesTitleElement.innerHTML = '<strong>Cleansing</strong> Services';
        servicesDescriptionElement.textContent =
          'We provide specialized cleaning services for a wide range of industries and applications. From hydro cleansing to industrial cleaning, our team delivers thorough, efficient, and environmentally sound solutions.';
        break;

      default:
        // Keep the default content if no category matches
        break;
    }
  }
}

/**
 * Updates the service cards based on domain category
 * @param {String} domain - The current domain
 */
function updateServiceCardsByDomainCategory(domain) {
  // Try to get the config for this domain
  fetch('config.json')
    .then(res => res.json())
    .then(config => {
      let domainConfig = config[domain] || config[domain.replace(/^www\./, '')];

      // fallback for localhost or file:// protocol
      if (
        !domainConfig &&
        (domain === 'localhost' ||
          domain === '127.0.0.1' ||
          window.location.protocol === 'file:')
      ) {
        domainConfig = config[Object.keys(config)[0]];
      }

      // Find the services section to update - only update the first service row
      // This preserves the original template content
      const servicesRow = document.querySelector('#services .row');

      if (!servicesRow) return;

      // If services array is present in config, use it to update appropriate service cards
      if (
        domainConfig &&
        Array.isArray(domainConfig.services) &&
        domainConfig.services.length > 0
      ) {
        // Only update the specific cards with service info
        // Find all the service card heading elements
        const cardHeadings = document.querySelectorAll('.iconbox .contents h3');
        const cardDescriptions = document.querySelectorAll(
          '.iconbox .contents p'
        );

        if (cardHeadings.length >= 4 && cardDescriptions.length >= 4) {
          // Update only the first 4 services from config.json
          const servicesToUse = domainConfig.services.slice(0, 4);

          // Update the content of existing service cards
          for (let i = 0; i < Math.min(servicesToUse.length, 4); i++) {
            cardHeadings[i].textContent = servicesToUse[i].title;
            cardDescriptions[i].textContent = servicesToUse[i].desc;

            // If icon is specified in the service, update it
            if (servicesToUse[i].icon) {
              const iconContainer = cardHeadings[i]
                .closest('.iconbox')
                .querySelector('.iconbox-icon-container');
              if (iconContainer) {
                // Create a properly sized and styled icon
                // Use SVG background with Font Awesome icon overlay
                iconContainer.innerHTML = `
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="22" fill="#f42958" opacity=".1"/>
                    <circle cx="24" cy="24" r="16" fill="#f42958" opacity=".2"/>
                  </svg>
                  <i class="${servicesToUse[i].icon}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; color: #f42958;"></i>
                `;

                // Ensure proper positioning
                iconContainer.style.position = 'relative';
                iconContainer.style.display = 'inline-block';
              }
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error loading service configuration:', error);
    });
}

/**
 * Updates service cards with the provided services array
 * @param {Array} services - Array of service objects with title, desc, and icon properties
 */
function updateServiceCards(services) {
  if (!Array.isArray(services) || services.length === 0) return;

  // Find all the service card heading elements
  const cardHeadings = document.querySelectorAll('.iconbox .contents h3');
  const cardDescriptions = document.querySelectorAll('.iconbox .contents p');

  if (cardHeadings.length >= 4 && cardDescriptions.length >= 4) {
    // Update only the first 4 services from the array
    const servicesToUse = services.slice(0, 4);

    // Update the content of existing service cards
    for (let i = 0; i < Math.min(servicesToUse.length, 4); i++) {
      cardHeadings[i].textContent = servicesToUse[i].title;
      cardDescriptions[i].textContent = servicesToUse[i].desc;

      // If icon is specified in the service, update it
      if (servicesToUse[i].icon) {
        const iconContainer = cardHeadings[i]
          .closest('.iconbox')
          .querySelector('.iconbox-icon-container');
        if (iconContainer) {
          // Create a properly sized and styled icon
          // Use SVG background with Font Awesome icon overlay
          iconContainer.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="#f42958" opacity=".1"/>
              <circle cx="24" cy="24" r="16" fill="#f42958" opacity=".2"/>
            </svg>
            <i class="${servicesToUse[i].icon}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; color: #f42958;"></i>
          `;

          // Ensure proper positioning
          iconContainer.style.position = 'relative';
          iconContainer.style.display = 'inline-block';
        }
      }
    }
  }
}

/**
 * Loads and displays FAQs for the current domain
 * @param {String} domain - The current domain
 * @param {Boolean} isFromTester - Whether this call comes from the URL tester
 */
function loadFAQs(domain, isFromTester = false) {
  console.log(`Attempting to load FAQs for domain: ${domain}`);

  // If FAQs have been loaded by the tester and this is not a tester call, skip it
  if (faqsLoadedByTester && !isFromTester) {
    console.log('Skipping FAQ load - already set by domain tester');
    return;
  }

  // If this is from the tester, mark FAQs as loaded by tester
  if (isFromTester) {
    faqsLoadedByTester = true;
  }

  // Find which FAQ category applies to this domain using regex patterns
  const categoryMatchers = {
    liquidWaste: u =>
      /(liquid|waste)/i.test(u) &&
      !/hazard|interceptor|tanker|storage|emergency|body|logistics|tunnel|sweep|gully|drill|uv|hcl/i.test(
        u
      ),
    hazardousWaste: u => /hazard/i.test(u),
    emergencyStorage: u =>
      /(storage|tank|float|bulk)/i.test(u) && !/sewage|digest/i.test(u),
    pumpStations: u => /pump|station/i.test(u) && !/sewage/i.test(u),
    roadSweeping: u => /sweep|sweeper/i.test(u) && !/gully/i.test(u),
    drainageServices: u =>
      /drains?|jet/i.test(u) &&
      !/cctv|ultra|mega|pressure|tunnel|sweep|survey|pump|gully/i.test(u),
    cctv: u => /cctv|wincan|survey/i.test(u),
    uhpwj: u => /uhpwj|ultra|highpressure|hydropressure/i.test(u),
    interceptors: u => /interceptor|petrol|diesel|fuel/i.test(u),
    tunnelCleaning: u => /tunnel|sewage|sewer|cross|tideway|subway/i.test(u),
    gullyCleaning: u => /gully/i.test(u),
    digesterCleaning: u => /digester|anaerobic/i.test(u),
    drillingMud: u => /drilling|mud|slurry/i.test(u),
    septicTanks: u => /septic|cesspit/i.test(u),
    floodServices: u => /flood|damage/i.test(u),
    confinedSpace: u => /confined|rescue|space/i.test(u),
    constructionCleaning: u => /construction|event|festival|carpark/i.test(u),
    sanitizingServices: u =>
      /disinfect|sanitiz|clean/i.test(u) &&
      !/hydro|drain|pump|sweep|gully|tunnel/i.test(u),
    groundwater: u =>
      /ground|environmental|water|recycl/i.test(u) &&
      !/sweep|waste|tank/i.test(u),
    tankerHire: u => /tanker|bulk/i.test(u) && !/waste|sweep/i.test(u),
    commercialBodywork: u =>
      /bodywork|fleet|commercial|hcl/i.test(u) && !/waste|sweep|pump/i.test(u),
    wasteHaulage: u => /logistics|haulage/i.test(u),
    uvPipeLining: u => /uv|lining/i.test(u),
    emergencyWaste: u => /emergency-waste-removal/i.test(u),
    general: u => /hydro|cleansing/i.test(u),
  };

  let faqCategory = null;
  let matchedFaqData = null;

  // Try to find a matching category using our regex patterns
  for (const category in categoryMatchers) {
    if (categoryMatchers[category](domain)) {
      faqCategory = category;
      matchedFaqData = faqData[category];
      console.log(`Found matching FAQ category: ${category}`);
      break;
    }
  }

  // If no category matches via regex, try the original matching method as fallback
  if (!faqCategory || !matchedFaqData) {
    for (const category in faqData) {
      const urls = faqData[category].urls;
      if (urls && urls.includes(domain)) {
        faqCategory = category;
        matchedFaqData = faqData[category];
        console.log(`Found matching FAQ category via URL list: ${category}`);
        break;
      }
    }
  }

  // If still no FAQ category matches, use the general category if available, otherwise exit
  if (!faqCategory || !matchedFaqData) {
    if (faqData.general) {
      faqCategory = 'general';
      matchedFaqData = faqData.general;
      console.log(`Using general FAQs for domain: ${domain}`);
    } else {
      console.log(`No matching FAQ category found for domain: ${domain}`);
      return;
    }
  }

  // Find the accordion by its specific ID
  const accordionElement = document.getElementById('accordion-2');
  if (!accordionElement) {
    console.error("FAQ accordion section with ID 'accordion-2' not found");
    return;
  }

  // Find the parent section containing this accordion
  const accordionSection = accordionElement.closest('.vc_row');
  if (!accordionSection) {
    console.error('Parent FAQ section not found');
    return;
  }

  // Update the section title - find the heading that says "Content underline"
  const sectionHeadings = document.querySelectorAll('header.fancy-heading h2');
  let sectionTitle = null;

  // Find the heading that contains "Content underline"
  for (const heading of sectionHeadings) {
    if (heading.textContent.includes('Content underline')) {
      sectionTitle = heading;
      break;
    }
  }

  if (sectionTitle) {
    sectionTitle.textContent = matchedFaqData.title;
  }

  // Clear existing accordion items
  accordionElement.innerHTML = '';

  // Create a unique ID prefix for this accordion to avoid conflicts
  const accordionId = `accordion-${domain.replace(
    /[^a-z0-9]/gi,
    '-'
  )}-${Date.now().toString(36)}`;

  // Add new FAQ items
  matchedFaqData.faqs.forEach((faq, index) => {
    const isActive = index === 0;
    const accordionItem = document.createElement('div');
    accordionItem.className = `accordion-item panel ${
      isActive ? 'active' : ''
    }`;

    const itemId = `${accordionId}-${index}`;

    accordionItem.innerHTML = `
      <div class="accordion-heading" role="tab" id="${itemId}-heading">
        <h4 class="accordion-title font-size-19">
          <a class="${isActive ? '' : 'collapsed'}" 
             data-toggle="collapse" 
             data-parent="#accordion-2" 
             href="#${itemId}-panel" 
             aria-expanded="${isActive ? 'true' : 'false'}" 
             aria-controls="${itemId}-panel">
            ${faq.question}
            <span class="accordion-expander">
              <i class="icon-arrows_circle_plus"></i>
              <i class="icon-arrows_circle_minus"></i>
            </span>
          </a>
        </h4>
      </div>
      <div id="${itemId}-panel" 
           class="accordion-collapse collapse ${isActive ? 'in' : ''}" 
           role="tabpanel" 
           aria-labelledby="${itemId}-heading">
        <div class="accordion-content">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;

    accordionElement.appendChild(accordionItem);
  });

  console.log(
    `FAQ section successfully updated for domain category: ${faqCategory}`
  );
}

/**
 * Determines the category of a domain based on its name
 * @param {String} domain - The domain name
 * @return {String} The category of the domain
 */
function getDomainCategory(domain) {
  domain = domain.toLowerCase();

  // Use a prioritized list of matchers to ensure more specific matches take precedence
  const categoryTests = [
    // Specific domains that might match multiple patterns
    { test: d => d === 'sewage-waste.uk', category: 'pump-services' },
    {
      test: d => d === 'emergency-waste-removal.co.uk',
      category: 'emergencyWaste',
    },
    { test: d => d === 'hydropressureclean.co.uk', category: 'uhpwj' },

    // Then check more general patterns
    {
      test: d => /interceptor|petrol|diesel|fuel/i.test(d),
      category: 'pump-services',
    },
    {
      test: d => /pump|station/i.test(d) && !/sewage/i.test(d),
      category: 'pump-services',
    },
    { test: d => /cctv|survey|wincan|cam/i.test(d), category: 'cctv' },
    {
      test: d => /tunnel|sewage|sewer|cross|tideway|subway/i.test(d),
      category: 'tunnelCleaning',
    },
    {
      test: d => /drain|sewer|jetting|gully/i.test(d) && !/cctv|sweep/i.test(d),
      category: 'drainage',
    },
    { test: d => /gully/i.test(d), category: 'drainage' },
    {
      test: d => /sweep|road-sweeper|sweeper|clean-my-carpark/i.test(d),
      category: 'roadSweeping',
    },
    {
      test: d => /storage|liquid|tank|float|emergency/i.test(d),
      category: 'liquid-storage',
    },
    {
      test: d => /waste|disposal|recycling|hazardous/i.test(d),
      category: 'waste-disposal',
    },
    {
      test: d => /uhpwj|ultra|highpressure|hydropressure/i.test(d),
      category: 'uhpwj',
    },
    {
      test: d => /clean|hydro|wash|sanitizing/i.test(d),
      category: 'cleaning-services',
    },
  ];

  // Check each test in order until we find a match
  for (const { test, category } of categoryTests) {
    if (test(domain)) return category;
  }

  // Default category if none of the above
  return 'general-services';
}

// Inject JSON-LD schema into document head for SEO
function injectSchema(domainConfig, domain) {
  // ProfessionalService schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: domainConfig.title,
    url: window.location.origin,
    description: domainConfig.text,
  };
  const serviceScript = document.createElement('script');
  serviceScript.type = 'application/ld+json';
  serviceScript.text = JSON.stringify(serviceSchema);
  document.head.appendChild(serviceScript);

  // FAQPage schema if available
  let matchedFaq = null;
  for (const cat in faqData) {
    if (faqData[cat].urls && faqData[cat].urls.includes(domain)) {
      matchedFaq = faqData[cat];
      break;
    }
  }
  if (matchedFaq && Array.isArray(matchedFaq.faqs)) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: matchedFaq.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
  }
}

/**
 * Dynamically populate the Works gallery based on domainConfig.gallery or placeholders.
 * @param {Object} domainConfig
 */
function loadGallery(domainConfig) {
  console.log('Loading gallery for domain config:', domainConfig.title);
  const galleryContainer = document.querySelector('.liquid-portfolio-list-row');
  console.log('Gallery container found:', !!galleryContainer);

  if (!galleryContainer) {
    console.error('Gallery container not found');
    return;
  }

  // Destroy existing masonry instance if it exists
  if (typeof jQuery !== 'undefined') {
    const $gallery = jQuery(galleryContainer);
    // Check if masonry exists and destroy it
    if ($gallery.data('isotope')) {
      console.log('Destroying existing masonry instance');
      $gallery.isotope('destroy');
    }

    // Also check for liquidMasonry data attribute
    if ($gallery.data('plugin_liquidMasonry')) {
      console.log('Cleaning up existing liquidMasonry instance');
      $gallery.data('plugin_liquidMasonry', null);
    }
  }

  // Clear existing items while keeping grid-stamp elements
  const gridStamps = galleryContainer.querySelectorAll('.grid-stamp');
  galleryContainer.innerHTML = '';

  // Re-add grid stamps
  gridStamps.forEach(stamp => {
    galleryContainer.appendChild(stamp.cloneNode(true));
  });

  // Get gallery images from config or fallback
  const images =
    Array.isArray(domainConfig.gallery) && domainConfig.gallery.length > 0
      ? domainConfig.gallery
      : [
          {
            src: 'assets/demo/portfolio/placeholder1.jpg',
            alt: 'Placeholder image 1',
            title: 'Placeholder title 1',
          },
          {
            src: 'assets/demo/portfolio/placeholder2.jpg',
            alt: 'Placeholder image 2',
            title: 'Placeholder title 2',
          },
          {
            src: 'assets/demo/portfolio/placeholder3.jpg',
            alt: 'Placeholder image 3',
            title: 'Placeholder title 3',
          },
        ];

  console.log('Gallery images to load:', images.length);

  // Add grid stamp as first element
  const firstStamp = document.createElement('div');
  firstStamp.className =
    'lqd-column col-md-4 col-sm-6 col-xs-12 grid-stamp creative-masonry-grid-stamp';
  galleryContainer.appendChild(firstStamp);

  // Add image items
  images.forEach((img, index) => {
    console.log(`Loading image ${index + 1}:`, img.src);

    // Fix relative paths if needed
    const imageSrc = img.src.replace(/^\.\//, '').replace(/^\.\.\//, '');

    const col = document.createElement('div');
    col.className = 'lqd-column col-md-4 col-sm-6 col-xs-12 masonry-item';
    col.innerHTML = `
      <div class="ld-pf-item ld-pf-light pf-details-inside pf-details-full pf-details-h-mid pf-details-v-mid title-size-32 ld-pf-semiround">
        <div class="ld-pf-inner">
          <div class="ld-pf-image">
            <figure style="background-image: url('${imageSrc}'); background-size: cover; background-position: center; height: 280px;">
              <img src="${imageSrc}" alt="${
      img.alt || 'Gallery image'
    }" style="width: 100%; height: 100%; object-fit: cover; visibility: hidden;" />
            </figure>
          </div>
          <div class="ld-pf-bg bg-gradient-primary-bl opacity-08"></div>
          <div class="ld-pf-details">
            <div class="ld-pf-details-inner">
              <h3 class="ld-pf-title h4 font-weight-semibold">${
                img.title || ''
              }</h3>
            </div>
          </div>
          <a href="#" class="liquid-overlay-link"></a>
        </div>
      </div>`;
    galleryContainer.appendChild(col);

    // Add a right grid stamp after the second image
    if (index === 1) {
      const rightStamp = document.createElement('div');
      rightStamp.className =
        'lqd-column col-md-4 col-sm-6 col-xs-12 grid-stamp creative-masonry-grid-stamp is-right';
      galleryContainer.appendChild(rightStamp);
    }
  });

  console.log('Gallery loading complete');

  // Re-initialize masonry if needed
  if (
    typeof jQuery !== 'undefined' &&
    typeof jQuery.fn.liquidMasonry === 'function'
  ) {
    console.log('Re-initializing masonry layout');
    setTimeout(() => {
      const $gallery = jQuery(galleryContainer);

      // Make sure container is visible before initializing
      $gallery.css('opacity', '0');
      $gallery.liquidMasonry();

      // Fade it in after initialization to avoid layout jumps
      setTimeout(() => {
        $gallery.css({
          opacity: '1',
          transition: 'opacity 0.3s ease',
        });
      }, 50);
    }, 100);
  }
}

// Contact form handler
$(document).ready(function () {
  // Target the contact form
  const contactForm = $('.contact-form form');

  // Only proceed if we found the contact form
  if (contactForm.length === 0) {
    console.log('Contact form not found on this page');
    return;
  }

  console.log('Contact form found, setting up handler');

  // Set form submission to the correct endpoint
  contactForm.attr('action', 'https://hydro-cleansing.com/api/capture-leads');

  // Handle form submission
  contactForm.on('submit', function (e) {
    e.preventDefault(); // Stop normal form submission

    console.log('Form submitted, preparing data');

    // Create URL-encoded form data string (the old-fashioned way)
    const formData = contactForm.serialize();

    // Show loading message
    let loadingMessage;
    if (typeof Swal !== 'undefined') {
      loadingMessage = Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we process your request',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      alert('Sending your message...');
    }

    // Log what we're about to send for debugging
    console.log('Sending data to API:', formData);

    // Create a fallback solution using regular form submission
    const fallbackSubmit = function () {
      console.log('Trying fallback form submission');
      // Store indication we're coming back from a form submit
      localStorage.setItem('formSubmitted', 'true');

      // Set form to use POST method
      contactForm.attr('method', 'POST');

      // Submit form the old-fashioned way
      contactForm[0].submit();
    };

    // Try submitting via fetch API (modern approach)
    fetch('https://hydro-cleansing.com/api/capture-leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Server returned ' + response.status);
        }
        return response.text();
      })
      .then(data => {
        console.log('Success response:', data);

        // Show success message
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Thank you!',
            html: 'If you need us urgently please call us on <br><b><a href="tel:08007408888" style="color: #e55f36; text-decoration: none; font-size: 20px">0800 740 8888</a></b>',
            icon: 'success',
          });
        } else {
          alert('Thank you for your message! We will contact you shortly.');
        }

        // Reset the form
        contactForm[0].reset();
      })
      .catch(error => {
        console.error('Form submission error:', error);

        // Try fallback submission method
        fallbackSubmit();
      });
  });

  // Check if we just returned from a form submission via fallback
  if (localStorage.getItem('formSubmitted') === 'true') {
    // Clear the flag
    localStorage.removeItem('formSubmitted');

    // Show success message
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Thank you!',
        html: 'If you need us urgently please call us on <br><b><a href="tel:08007408888" style="color: #e55f36; text-decoration: none; font-size: 20px">0800 740 8888</a></b>',
        icon: 'success',
      });
    } else {
      alert('Thank you for your message! We will contact you shortly.');
    }
  }
});

// Update copyright year
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('copyright-year').textContent =
    new Date().getFullYear();
});

// Dynamic title configuration
function updatePageTitle() {
  const currentDomain = window.location.hostname;
  const configPaths = [
    './config.json',
    '../config.json',
    '/config.json',
    '/ave-html/config.json',
  ];

  const loadConfig = async () => {
    for (const path of configPaths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          const config = await response.json();
          // If we have a specific config for this domain, use it
          if (config[currentDomain]) {
            document.title = config[currentDomain].title;
          } else {
            // Fallback to the first available config
            const firstDomain = Object.keys(config)[0];
            document.title = config[firstDomain].title;
          }
          return;
        }
      } catch (error) {
        console.warn(`Failed to load config from ${path}:`, error);
      }
    }
    // Fallback title if no config is loaded
    document.title = 'Ave HTML Template';
  };

  loadConfig();
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', updatePageTitle);
