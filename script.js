/**
 * Dynamic Content Loader based on domain
 * This script loads content dynamically based on the current domain from config.json
 */

// Add this near the top of the file, with the other global variables
let contentSuccessfullyLoaded = false;
let contentLoadingInProgress = false;
let isRestoringContent = false;

// Global observer instances
let faqObserverInstance = null;
let copyrightObserverInstance = null;
let titleObserverInstance = null;
let heroTitleObserverInstance = null; // Added for hero-title
let heroTextObserverInstance = null; // Added for hero-text

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
  setTimeout(hideLoadingOverlay, 400);
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
    title: 'Things to Know',
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
      'environmental-waste.co.uk',
      'environmental-waste.uk',
      'environmentalwaterrecycling.co.uk',
      'hazardwaste.co.uk',
      'hazardouswasteclearance.co.uk',
      'hazardouswasteliquiddisposal.co.uk',
      'hclwaste.com',
      'liquid-ingenuity.co.uk',
      'liquid-waste.co.uk',
      'liquid-waste.uk',
      'liquiddisposal.co.uk',
      'liquiddisposal.uk',
      'liquidingenity.co.uk',
      'recycle-waste.uk',
      'tanker-waste.co.uk',
      'waste-logistics.co.uk',
      'bentonite-slurry.co.uk',
      'bentonite-slurry.uk',
      'bentoniteremoval.co.uk',
      'bentoniteremoval.uk',
      'bulk-tanker.com',
      'bulktanker.co.uk',
      'combination-unit.com',
      'combinationunit.co.uk',
      'combinationunit.uk',
      'combinationunittanker.uk',
      'construction-liquid.org',
      'croydon-waste-services.co.uk',
      'digestercleaning.co.uk',
      'drilling-mud-storage.co.uk',
      'drilling-slurry.co.uk',
      'drilling-slurry.uk',
      'drillingmud-storage.co.uk',
      'drillingmud.co.uk',
      'drillingmud.uk',
      'drillingslurry.co.uk',
      'drillingslurry.uk',
      'environmentalwaterrecycling.uk',
      'fatbergremoval.blog',
      'fatbergremoval.com',
      'fatbergremoval.london',
      'fatbergremoval.net',
      'fatbergremoval.org.uk',
      'fatbergremoval.uk',
      'fatbergremoval.website',
      'frackingwatertanks.co.uk',
      'fracktankuk.co.uk',
      'fractankuk.co.uk',
      'ground-water.co.uk',
      'ground-water.org.uk',
      'hcl-haulage.co.uk',
      'hcl-haulage.com',
      'hcl-logistics.co.uk',
      'hcl-logistics.com',
      'hcllogistics.co.uk',
      'hcllogistics.com',
      'hcltransport.co.uk',
      'hcltransportation.co.uk',
      'jetvactanker.co.uk',
      'jetvactanker.uk',
      'london-food-waste.co.uk',
      'manholeemptying.co.uk',
      'manholeemptying.uk',
      'marine-waste-management.co.uk',
      'mega-float.co.uk',
      'mega-float.uk',
      'mega-heat.co.uk',
      'mega-heat.com',
      'megafloat.co.uk',
      'mobile-incinerator-services.co.uk',
      'mobileheatedtank.co.uk',
      'mobilewaterstorage.co.uk',
      'portable-liquid-storage-tanks.co.uk',
      'portable-storage-tanks.co.uk',
      'septicwaste.co.uk',
      'septicwaste.uk',
      'sewagedigester.co.uk',
      'sewagedisposal.co.uk',
      'sewagetanker.com',
      'sewagetankers.co.uk',
      'sewerage-waste.co.uk',
      'sewerage-waste.com',
      'sewerdigester.co.uk',
      'super-sucker-tanker.co.uk',
      'supercombinationunit.uk',
      'tanker-hire.com',
      'terminator-genisys.co.uk',
      'wastetankers.co.uk',
    ],
  },
  pumpStations: {
    title: 'Things to Know',
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
      'diesel-interceptors.co.uk',
      'drainpumps.co.uk',
      'fuel-interceptors.co.uk',
      'fuelinterceptors.co.uk',
      'gullygulper.co.uk',
      'oil-interceptor.co.uk',
      'petrol-interceptor.co.uk',
      'temporarysitepumps.co.uk',
    ],
  },
  roadSweeping: {
    title: 'Things to Know',
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
      'clean-my-carpark.co.uk',
      'construction-sweepers.co.uk',
      'croydonsweepers.co.uk',
      'event-road-sweepers.co.uk',
      'eventroadsweepers.co.uk',
      'hclsweepers.co.uk',
      'local-roadsweepers.co.uk',
      'london-sweeperhire.co.uk',
      'london-sweepers.co.uk',
      'mega-sweep.co.uk',
      'mega-sweep.com',
      'mega-sweep.uk',
      'mega-sweeper.com',
      'mega-sweepers.com',
      'road-sweeper-waste-disposal.co.uk',
      'road-sweeper.co',
      'road-sweepers.co',
      'road-sweeping-waste.co.uk',
      'roadsweeperwaste.co.uk',
      'sweeperwaste.co.uk',
      'construction-cleaning.co.uk',
      'event-cleanup.co.uk',
      'festival-cleanup.co.uk',
      'festivalcleanup.co.uk',
      'forecourt-cleansing.co.uk',
      'forecourtcleansing.co.uk',
      'major-event-cleanup.co.uk',
      'majoreventcleanup.co.uk',
      'roadgullysweeper.co.uk',
      'roadgullysweeper.uk',
    ],
  },
  tunnelCleaning: {
    title: 'Things to Know',
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
      'london-tunnels.co.uk',
      'london-tunnels.com',
      'mega-reel.co.uk',
      'mega-reel.com',
      'mega-reel.uk',
      'megareel.co.uk',
      'subway-cleaning.co.uk',
      'super-sewer-london.co.uk',
      'supersewerlondon.co.uk',
      'tunnel-cleaning.com',
      'tunnelcleaning.co.uk',
      'tunnelcleaning.uk',
      'tunnelwaste.co.uk',
      'tunnelwaste.com',
      'waste-removal-tideway.co.uk',
      'confinedspacework.co.uk',
      'confinedspacework.uk',
      'cross-rail.co.uk',
      'cross-rail.com',
      'crossrail-cleaning.co.uk',
      'crossrail-servicing.co.uk',
      'crossrail-servicing.com',
      'crossrail-waste.co.uk',
      'crossrail-waste.com',
    ],
  },
  general: {
    title: 'Things to Know',
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
      'akisv.com',
      'cleansafe-services.co.uk',
      'cleansafe-services.com',
      'construction-services.co',
      'disinfecting.co.uk',
      'foggingservice.co.uk',
      'hrdro-cleansing.com',
      'hydro-cleansing.london',
      'london-cleaning-services.co.uk',
      'london-industrial-services.co.uk',
      'london-industrial-services.com',
      'sanitizing.co.uk',
      'thames-water-services.co.uk',
    ],
  },
  uhpwj: {
    title: 'Things to Know',
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
    title: 'Things to Know',
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
      'draineyehire.com',
      'mega-cam.co',
      'mega-cam.co.uk',
      'mega-cam.com',
      'mega-cam.uk',
      'mega-cctv.co',
      'mega-cctv.co.uk',
      'wincan-cctv.co.uk',
      'wincan-london.co.uk',
      'wincan-surveys.co.uk',
      'wincan-surveys.com',
    ],
  },
  drainageServices: {
    title: 'Things to Know',
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
      'jetting-drains.co.uk',
      'jetting-drians.co.uk',
      'jettingvans.co.uk',
      'jettingvans.com',
      'blockeddrains-london.com',
      'drainlining.co',
      'sewagemaintenance.co.uk',
      'sewageservice.co.uk',
      'sewercleansing.co.uk',
      'sewerdrains.co.uk',
      'sewerdrains.uk',
      'sewerjetting.co.uk',
      'uvline.co.uk',
      'uvlinging.co.uk',
    ],
  },
  emergencyWaste: {
    title: 'Things to Know',
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
    urls: [
      'emergency-waste-removal.co.uk',
      'emergencyflood.co.uk',
      'emergencyflood.uk',
      'flood-cleanup-services.co.uk',
      'flood-cleanup.uk',
      'flood-damage-control.co.uk',
      'spill-graud.co.uk',
      'spill-guard.co.uk',
    ],
  },
};

// Add a global flag to track when FAQs have been loaded by the URL tester
let faqsLoadedByTester = false;

/**
 * Debug utilities to help diagnose loading issues
 */
const DEBUG = {
  logs: [],
  init: function () {
    // Check if debug mode is enabled via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const isDebugMode = urlParams.get('debug') === 'true';

    // Make the debug panel visible if in debug mode
    if (isDebugMode) {
      const debugPanel = document.getElementById('debug-panel');
      if (debugPanel) {
        debugPanel.classList.add('visible');
      }

      // Override console.log and other methods to capture in our debug panel
      const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
      };

      console.log = function () {
        DEBUG.addLog('log', arguments);
        originalConsole.log.apply(console, arguments);
      };

      console.warn = function () {
        DEBUG.addLog('warn', arguments);
        originalConsole.warn.apply(console, arguments);
      };

      console.error = function () {
        DEBUG.addLog('error', arguments);
        originalConsole.error.apply(console, arguments);
      };
    }

    // Also update loading message
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.textContent = 'Checking configuration...';
    }
  },

  addLog: function (level, args) {
    const debugPanel = document.getElementById('debug-panel');
    if (!debugPanel) return;

    // Convert args to array
    const argsArray = Array.from(args).map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg) : arg
    );

    // Create log entry
    const logText = argsArray.join(' ');
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${level.toUpperCase()}] ${logText}`;

    // Style based on level
    if (level === 'warn') {
      logEntry.style.color = 'yellow';
    } else if (level === 'error') {
      logEntry.style.color = 'red';
    }

    // Add to panel
    debugPanel.appendChild(logEntry);

    // Auto-scroll to bottom
    debugPanel.scrollTop = debugPanel.scrollHeight;

    // Store log
    this.logs.push({
      level,
      text: logText,
      time: new Date().toISOString(),
    });
  },

  updateLoadingMessage: function (message) {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.textContent = message;
    }
    console.log(`Loading status: ${message}`);
  },
};

// Initialize debug tools
document.addEventListener('DOMContentLoaded', function () {
  DEBUG.init();
});

// Add this function to update the copyright
function updateCopyrightWithTitle(title) {
  const websiteTitleElement = document.getElementById('website-title');
  if (websiteTitleElement && title) {
    websiteTitleElement.textContent = title;
    console.log(`Updated copyright with title: ${title}`);
  }
}

/**
 * Updates the page content based on the domain configuration
 * @param {Object} domainConfig - The configuration for the current domain
 * @param {String} currentDomain - The current domain being accessed
 * @param {Object} allConfig - All domain configurations
 */
function updatePageContent(domainConfig, currentDomain, allConfig) {
  // Site title and meta tags
  document.title = domainConfig.title || 'Hydro Cleansing';

  // Also update the copyright with the title
  updateCopyrightWithTitle(domainConfig.title);

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
    console.log(`Updating hero image to: ${domainConfig.heroImg}`);

    let imgPath = domainConfig.heroImg.trim();

    // If it isn't absolute already, make it absolute to the site-root
    if (
      !imgPath.startsWith('/') &&
      !imgPath.startsWith('http') &&
      !imgPath.startsWith('./')
    ) {
      imgPath = '/' + imgPath;
    }

    // Also update the figure's background-image which is what's actually shown
    const figure = heroImgEl.closest('figure');
    if (figure) {
      figure.style.backgroundImage = `url('${imgPath}')`;
    }

    // Update the img src as well
    heroImgEl.src = imgPath;

    // Set up error handling in case the image fails to load
    heroImgEl.onerror = () => {
      console.warn(
        `Hero image "${imgPath}" failed to load, falling back to default.`
      );

      // Try the fallback image
      const fallbackPath = 'assets/website-hero-images/liquid-waste.png';
      heroImgEl.src = fallbackPath;

      // Also update the figure background
      if (figure) {
        figure.style.backgroundImage = `url('${fallbackPath}')`;
      }

      // Prevent infinite error loop
      heroImgEl.onerror = null;
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

  // Check elements after updating content
  setTimeout(checkElements, 1000);
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

let galleryLightbox = null; // keep a reference so we can destroy/rebuild
function initLightbox() {
  if (galleryLightbox) galleryLightbox.destroy(); // clean previous instance
  galleryLightbox = GLightbox({
    selector: '.glbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
  });
}

/**
 * Loads and displays FAQs for the current domain
 * @param {String} domain - The current domain
 * @param {Boolean} isFromTester - Whether this call comes from the URL tester
 */
function loadFAQs(domain, isFromTester = false) {
  // If content is already loaded and this is not a tester call, try to restore from localStorage first

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

  // Store FAQs in localStorage for persistence

  // Apply the FAQs to the page
  applyFAQsToPage(matchedFaqData, domain);
}

// New function to apply FAQs to the page
function applyFAQsToPage(matchedFaqData, domain) {
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
          <p class="font-size-18 lh-15 mb-55" id="for-you-text">${
            faq.answer
          }</p>
        </div>
      </div>
    `;

    accordionElement.appendChild(accordionItem);
  });

  console.log(
    `FAQ section successfully updated for domain category: ${matchedFaqData.title}`
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
    <div class="ld-pf-item ld-pf-light pf-details-inside pf-details-full
                pf-details-h-mid pf-details-v-mid title-size-32 ld-pf-semiround">
      <div class="ld-pf-inner">
        <div class="ld-pf-image">
          <figure style="background-image:url('${imageSrc}');">
            <img src="${imageSrc}" alt="${img.alt || 'Gallery image'}" />
          </figure>
        </div>
  
        <div></div>
  
  
        <!-- the important bit ↓ -->
        <a href="${imageSrc}"
           class="liquid-overlay-link glbox"
           data-gallery="works"
           data-title="${img.title || ''}">
        </a>
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
  initLightbox(); // make the new tiles clickable
}

$(function () {
  $('#storeLead').validate({
    rules: {
      name: { required: true },
      email: { required: true, email: true },
      mobile: { required: true },
      message: { required: false },
    },
    messages: {
      name: 'Please enter your name',
      email: 'Please enter a valid email address',
      mobile: 'Please enter your mobile number',
      message: 'Please enter a message',
    },
    submitHandler: function (form) {
      const $form = $(form);
      const formData = $form.serialize();
      const $submitBtn = $('#submitButton'); // Use the button by ID

      $submitBtn.prop('disabled', true);

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Sending...',
          text: 'Please wait while we process your request.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      fetch('https://hydro-cleansing.com/api/capture-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      })
        .then(response => {
          if (!response.ok)
            throw new Error('Server returned ' + response.status);
          return response.text();
        })
        .then(data => {
          Swal.fire({
            title: 'Thank you!',
            html: 'Your message has been sent.<br>If you need us urgently, call <b><a href="tel:08007408888">0800 740 8888</a></b>.',
            icon: 'success',
          }).then(() => {
            form.reset();
            $submitBtn.prop('disabled', false);
          });
        })
        .catch(err => {
          console.error('Form submission error:', err);
          Swal.fire(
            'Error',
            'There was a problem sending your message. Please try again later.',
            'error'
          );
          $submitBtn.prop('disabled', false);
        });

      return false;
    },
  });
});

// Update copyright year
document.addEventListener('DOMContentLoaded', function () {
  // Set the copyright year and website title separately
  const websiteTitleElement = document.getElementById('website-title');
  const copyrightElement = document.getElementById('copyright-year');

  let websiteTitle = '';

  // Try to get from localStorage first

  // If we couldn't get it from localStorage, use document.title
  if (!websiteTitle && document.title) {
    // Extract just the main part of the title (in case it has additional text)
    websiteTitle = document.title.split('|')[0].trim();
    websiteTitle = websiteTitle.split('-')[0].trim();
  }

  // If we still don't have a title, use a default
  if (!websiteTitle) {
    const currentDomain = window.location.hostname || 'Hydro Cleansing';
    websiteTitle = currentDomain.replace(/^www\./, '');
  }

  // Set the website title and copyright year separately
  if (websiteTitleElement) {
    websiteTitleElement.textContent = websiteTitle;
  }

  if (copyrightElement) {
    copyrightElement.textContent = new Date().getFullYear().toString();
  }

  // Initialize dynamic content based on current domain
  initializeDynamicContent();
});

// Update the updateCopyrightWithTitle function to match
function updateCopyrightWithTitle(title) {
  const websiteTitleElement = document.getElementById('website-title');
  if (websiteTitleElement && title) {
    websiteTitleElement.textContent = title;
    console.log(`Updated copyright with title: ${title}`);
  }
}

// Dynamic title configuration
function updatePageTitle() {
  // Skip if content has already been successfully loaded
  if (contentSuccessfullyLoaded) {
    console.log('Content already loaded, skipping title update');
    return;
  }

  const currentDomain = window.location.hostname;

  // If on localhost or file protocol, use a test domain for development
  const effectiveDomain =
    currentDomain === 'localhost' ||
    currentDomain === '127.0.0.1' ||
    window.location.protocol === 'file:'
      ? faqData.general &&
        faqData.general.urls &&
        faqData.general.urls.length > 0
        ? faqData.general.urls[0]
        : 'hydro-cleansing.com'
      : currentDomain;

  const configPaths = [
    './config.json',
    '../config.json',
    '/config.json',
    '/ave-html/config.json',
  ];

  const loadConfig = async () => {
    for (const path of configPaths) {
      try {
        console.log(`Attempting to load title from: ${path}`);
        const response = await fetch(path);
        if (response.ok) {
          const config = await response.json();
          // If we have a specific config for this domain, use it
          if (config[effectiveDomain]) {
            document.title = config[effectiveDomain].title;
            console.log(`Title updated to: ${config[effectiveDomain].title}`);
          } else {
            // Fallback to the first available config
            const firstDomain = Object.keys(config)[0];
            document.title = config[firstDomain].title;
            console.log(`Using fallback title: ${config[firstDomain].title}`);
          }
          return;
        }
      } catch (error) {
        console.warn(`Failed to load config from ${path}:`, error);
      }
    }
    // Fallback title if no config is loaded
    document.title = 'Ave HTML Template';
    console.log('Using default fallback title');
  };

  loadConfig();
}

// Call updatePageTitle immediately to set title as soon as possible
updatePageTitle();

// Also ensure it runs on DOMContentLoaded as a fallback
document.addEventListener('DOMContentLoaded', updatePageTitle);

// Function to test if a URL is accessible
async function isUrlAccessible(url) {
  try {
    DEBUG.updateLoadingMessage(`Testing URL accessibility: ${url}`);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn(`URL ${url} is not accessible:`, error);
    return false;
  }
}

// Initialize all dynamic content based on domain
function initializeDynamicContent() {
  // If content has already been successfully loaded, don't reload it
  if (contentSuccessfullyLoaded) {
    console.log(
      'Content already successfully loaded, skipping reinitialization'
    );
    // Still hide the loading overlay in case it's still showing
    setTimeout(hideLoadingOverlay, 300);
    return;
  }

  // If content loading is already in progress, don't start a second process
  if (contentLoadingInProgress) {
    console.log(
      'Content loading already in progress, skipping duplicate initialization'
    );
    return;
  }

  // Set the loading lock
  contentLoadingInProgress = true;

  const currentDomain = window.location.hostname;

  console.log(`Initializing dynamic content for domain: ${currentDomain}`);
  DEBUG.updateLoadingMessage(`Initializing for domain: ${currentDomain}`);

  // If on localhost or file protocol, use a test domain for development
  const effectiveDomain =
    currentDomain === 'localhost' ||
    currentDomain === '127.0.0.1' ||
    window.location.protocol === 'file:'
      ? faqData.general &&
        faqData.general.urls &&
        faqData.general.urls.length > 0
        ? faqData.general.urls[0]
        : 'hydro-cleansing.com'
      : currentDomain;

  DEBUG.updateLoadingMessage(`Using effective domain: ${effectiveDomain}`);

  // Add loading classes to elements that will be updated
  document.getElementById('hero-title')?.classList.add('content-loading');
  document.getElementById('hero-text')?.classList.add('content-loading');
  document
    .querySelectorAll('.iconbox .contents h3')
    .forEach(el => el.classList.add('content-loading'));
  document
    .querySelectorAll('.iconbox .contents p')
    .forEach(el => el.classList.add('content-loading'));

  // Load config from all possible locations
  const configPaths = [
    './config.json',
    '../config.json',
    '/config.json',
    '/ave-html/config.json',
    'https://hydro-cleansing.com/config.json', // Fallback to main domain if local configs fail
  ];

  let configLoaded = false;

  // Try to load the config from each path
  const loadConfigAndUpdateContent = async () => {
    try {
      // First check which config URLs are accessible
      const accessibleConfigPaths = [];

      DEBUG.updateLoadingMessage('Checking accessible config paths...');

      for (const path of configPaths) {
        if (path.startsWith('http')) {
          // For absolute URLs, check if they're accessible first
          const isAccessible = await isUrlAccessible(path);
          if (isAccessible) {
            accessibleConfigPaths.push(path);
          }
        } else {
          // For relative paths, we'll try to fetch them directly
          accessibleConfigPaths.push(path);
        }
      }

      console.log(
        `Accessible config paths: ${accessibleConfigPaths.join(', ')}`
      );
      DEBUG.updateLoadingMessage(
        `Found ${accessibleConfigPaths.length} accessible config paths`
      );

      // Now try to load from accessible paths
      for (const path of accessibleConfigPaths) {
        if (configLoaded) continue;

        try {
          console.log(`Attempting to load config from: ${path}`);
          DEBUG.updateLoadingMessage(`Loading config from: ${path}`);

          const response = await fetch(path);

          if (response.ok) {
            const allConfig = await response.json();

            if (!allConfig || Object.keys(allConfig).length === 0) {
              console.warn(`Config loaded from ${path} is empty or invalid`);
              DEBUG.updateLoadingMessage(
                `Config from ${path} is empty or invalid`
              );
              continue;
            }

            let domainConfig = allConfig[effectiveDomain];

            // If no exact match, try without www
            if (!domainConfig && effectiveDomain.startsWith('www.')) {
              const domainWithoutWww = effectiveDomain.replace(/^www\./, '');
              DEBUG.updateLoadingMessage(
                `Trying domain without www: ${domainWithoutWww}`
              );
              domainConfig = allConfig[domainWithoutWww];
            }

            // If still no match, use the first domain in the config
            if (!domainConfig) {
              const firstDomain = Object.keys(allConfig)[0];
              DEBUG.updateLoadingMessage(
                `No config for ${effectiveDomain}, using ${firstDomain}`
              );
              domainConfig = allConfig[firstDomain];
              console.log(
                `No config found for ${effectiveDomain}, using ${firstDomain} instead`
              );
            }

            if (domainConfig) {
              console.log(`Config loaded successfully for ${effectiveDomain}`);
              DEBUG.updateLoadingMessage(
                `Config loaded successfully, updating content...`
              );

              // Update all content with the loaded config
              updatePageContent(domainConfig, effectiveDomain, allConfig);
              updateServiceCardsByDomainCategory(effectiveDomain);
              loadFAQs(effectiveDomain);
              if (domainConfig.gallery) {
                loadGallery(domainConfig);
              }
              configLoaded = true;
              // Set the global flag to indicate content has been successfully loaded
              contentSuccessfullyLoaded = true;
              // Store the config in localStorage for future use
              // Remove loading classes
              document.querySelectorAll('.content-loading').forEach(el => {
                el.classList.remove('content-loading');
              });

              DEBUG.updateLoadingMessage('Content updated successfully');
              break;
            }
          }
        } catch (error) {
          console.warn(`Error loading config from ${path}:`, error);
          DEBUG.updateLoadingMessage(
            `Error loading from ${path}: ${error.message}`
          );
        }
      }

      // If no config was loaded from any source, try to at least load FAQs and services
      if (!configLoaded) {
        console.warn(
          'Failed to load config from any source, using fallback functionality'
        );
        DEBUG.updateLoadingMessage('Using fallback configuration');

        // Create a minimal fallback config for this domain
        const fallbackConfig = {
          title: document.title || effectiveDomain,
          text: 'Professional environmental services',
          services: [
            {
              title: 'Professional Services',
              desc: 'Expert solutions for your environmental needs',
              icon: 'fa-solid fa-star',
            },
            {
              title: '24/7 Support',
              desc: 'Round the clock assistance when you need it most',
              icon: 'fa-solid fa-clock',
            },
            {
              title: 'Quality Guarantee',
              desc: 'We stand behind all our work with quality assurance',
              icon: 'fa-solid fa-check',
            },
            {
              title: 'Eco-Friendly',
              desc: 'Environmentally responsible practices and solutions',
              icon: 'fa-solid fa-leaf',
            },
          ],
        };

        // Use the fallback config for minimal styling
        updatePageContent(fallbackConfig, effectiveDomain, {
          [effectiveDomain]: fallbackConfig,
        });

        // Still try to load domain-specific FAQs and services
        loadFAQs(effectiveDomain);
        updateServiceCardsByDomainCategory(effectiveDomain);

        // Set the global flag to indicate content has been loaded (even with fallback)
        contentSuccessfullyLoaded = true;

        // Remove loading classes
        document.querySelectorAll('.content-loading').forEach(el => {
          el.classList.remove('content-loading');
        });
      }
    } catch (error) {
      console.error('Unexpected error in content loading:', error);
    } finally {
      // Always release the lock when done, whether successful or not
      contentLoadingInProgress = false;

      // Hide loading overlay once everything is done
      DEBUG.updateLoadingMessage('Finalizing and hiding loading overlay...');
      setTimeout(hideLoadingOverlay, 500);
    }
  };

  loadConfigAndUpdateContent();
}

// Add a debug function to check key elements
function checkElements() {
  console.log('---- CHECKING KEY ELEMENTS ----');

  // Check copyright element
  const copyrightElement = document.getElementById('copyright-year');
  console.log('Copyright element exists:', !!copyrightElement);
  if (copyrightElement) {
    console.log('Copyright text:', copyrightElement.textContent);
    console.log('Copyright parent:', copyrightElement.parentElement.outerHTML);
  }

  // Check FAQ accordion
  const accordionElement = document.getElementById('accordion-2');
  console.log('FAQ accordion exists:', !!accordionElement);
  if (accordionElement) {
    console.log(
      'FAQ accordion children count:',
      accordionElement.children.length
    );
  }

  console.log('---- END ELEMENT CHECK ----');
}

// Call this function after DOM is loaded and after content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Existing code...

  // Run the element check on load
  setTimeout(checkElements, 1000);
  // Attach mutation observers
  setTimeout(observeCriticalElements, 1200);
});

// Add a MutationObserver to watch for unwanted changes
function observeCriticalElements() {
  // Helper to log mutations
  function logMutations(mutationsList, observer, label) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        console.warn(`[MutationObserver] ${label} changed!`, mutation);
      }
    }
  }

  // Observe FAQ accordion
  const faqAccordion = document.getElementById('accordion-2');
  if (faqAccordion) {
    const faqObserver = new MutationObserver((mutationsList, observer) => {
      logMutations(mutationsList, observer, 'FAQ Accordion');
    });
    faqObserver.observe(faqAccordion, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    console.log('FAQ accordion observer attached');
  }

  // Observe copyright/title
  const copyright = document.getElementById('copyright-year');
  const websiteTitle = document.getElementById('website-title');
  if (copyright) {
    const copyrightObserver = new MutationObserver(
      (mutationsList, observer) => {
        logMutations(mutationsList, observer, 'Copyright Year');
      }
    );
    copyrightObserver.observe(copyright, {
      childList: true,
      characterData: true,
    });
    console.log('Copyright observer attached');
  }
  if (websiteTitle) {
    const titleObserver = new MutationObserver((mutationsList, observer) => {
      logMutations(mutationsList, observer, 'Website Title');
    });
    titleObserver.observe(websiteTitle, {
      childList: true,
      characterData: true,
    });
    console.log('Website title observer attached');
  }
}

// Add a function to restore content
function restoreCriticalContent() {
  if (isRestoringContent) return;
  isRestoringContent = true;
  console.log('[AutoRestore] Attempting to restore critical content...');

  let domainConfig = null;

  // Restore Hero Title and Text if domainConfig is available
  if (domainConfig) {
    // Restore document.title
    if (
      domainConfig.title &&
      typeof domainConfig.title === 'string' &&
      domainConfig.title.trim() !== ''
    ) {
      document.title = domainConfig.title.trim();
      console.log(
        `[AutoRestore] Document title restored to: ${document.title}`
      );
    } else {
      // Fallback for document.title if not in domainConfig
      const currentDomainForTitle =
        window.location.hostname || 'Hydro Cleansing';
      document.title = currentDomainForTitle.replace(/^www\./, '');
      console.warn(
        `[AutoRestore] Document title restored to fallback: ${document.title}`
      );
    }

    const heroTitleElement = document.getElementById('hero-title');
    if (heroTitleElement) {
      if (
        domainConfig.title &&
        typeof domainConfig.title === 'string' &&
        domainConfig.title.trim() !== ''
      ) {
        heroTitleElement.textContent = domainConfig.title.trim();
        console.log('[AutoRestore] Hero title restored.');
      } else {
        heroTitleElement.textContent = 'Welcome'; // Fallback hero title
        console.warn(
          '[AutoRestore] Hero title restored to fallback "Welcome".'
        );
      }
    } else {
      console.warn('[AutoRestore] Hero title element (hero-title) not found.');
    }

    const heroTextElement = document.getElementById('hero-text');
    if (heroTextElement) {
      if (
        domainConfig.text &&
        typeof domainConfig.text === 'string' &&
        domainConfig.text.trim() !== ''
      ) {
        heroTextElement.textContent = domainConfig.text.trim();
        console.log('[AutoRestore] Hero text restored.');
      } else {
        heroTextElement.textContent = 'Your default description here.'; // Fallback hero text
        console.warn(
          '[AutoRestore] Hero text restored to fallback description.'
        );
      }
    } else {
      console.warn('[AutoRestore] Hero text element (hero-text) not found.');
    }
  } else {
    console.warn(
      '[AutoRestore] Cannot restore hero elements or document.title without domainConfig.'
    );
    // Attempt to restore document.title with a basic fallback even if domainConfig is missing
    const currentDomainForTitle = window.location.hostname || 'Hydro Cleansing';
    document.title =
      document.title || currentDomainForTitle.replace(/^www\./, ''); // Keep existing or use domain
    const heroTitleElement = document.getElementById('hero-title');
    if (heroTitleElement && !heroTitleElement.textContent.trim())
      heroTitleElement.textContent = `${domainConfig.title}`;
    const heroTextElement = document.getElementById('hero-text');
    if (heroTextElement && !heroTextElement.textContent.trim())
      heroTextElement.textContent = 'Content loading...';
  }

  // Restore website title in footer and copyright year
  try {
    let websiteTitleText = '';
    if (
      domainConfig &&
      domainConfig.title &&
      typeof domainConfig.title === 'string' &&
      domainConfig.title.trim() !== ''
    ) {
      websiteTitleText = domainConfig.title.trim();
    } else if (document.title) {
      // Fallback to current document.title if needed
      websiteTitleText = document.title.split('|')[0].trim();
      websiteTitleText = websiteTitleText.split('-')[0].trim();
    } else {
      // Ultimate fallback
      const currentDomain = window.location.hostname || 'Hydro Cleansing';
      websiteTitleText = currentDomain.replace(/^www\./, '');
    }

    const websiteTitleElement = document.getElementById('website-title'); // Footer title
    const copyrightElement = document.getElementById('copyright-year');

    if (websiteTitleElement && websiteTitleText) {
      websiteTitleElement.textContent = websiteTitleText;
    } else if (websiteTitleElement) {
      websiteTitleElement.textContent =
        window.location.hostname || 'Site Title'; // Fallback
    }

    if (copyrightElement) {
      copyrightElement.textContent = new Date().getFullYear().toString();
    }
    console.log(
      '[AutoRestore] Footer website title and copyright year updated/restored.'
    );
  } catch (e) {
    console.error(
      '[AutoRestore] Error restoring footer website title/copyright:',
      e
    );
  }
}

// Update the MutationObserver to auto-restore content and manage instances
function observeCriticalElements() {
  // Disconnect previous observers if they exist
  if (faqObserverInstance) faqObserverInstance.disconnect();
  if (copyrightObserverInstance) copyrightObserverInstance.disconnect();
  if (titleObserverInstance) titleObserverInstance.disconnect();
  if (heroTitleObserverInstance) heroTitleObserverInstance.disconnect(); // Added
  if (heroTextObserverInstance) heroTextObserverInstance.disconnect(); // Added

  faqObserverInstance = null;
  copyrightObserverInstance = null;
  titleObserverInstance = null;
  heroTitleObserverInstance = null; // Added
  heroTextObserverInstance = null; // Added

  // Helper to log mutations and trigger auto-restore
  function logMutationsAndRestore(mutationsList, observer, label) {
    if (isRestoringContent) return;
    let needsRestore = false;
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'childList' &&
        (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
      ) {
        console.warn(
          `[MutationObserver] ${label} childList changed!`,
          mutation
        );
        needsRestore = true;
      } else if (mutation.type === 'characterData') {
        if (
          mutation.target.textContent &&
          mutation.target.textContent.trim() === ''
        ) {
          // Check if target exists
          console.warn(
            `[MutationObserver] ${label} characterData changed (became empty)!`,
            mutation
          );
          needsRestore = true;
        }
      }
    }
    if (needsRestore) {
      console.log(
        `[MutationObserver] ${label} needs restore, triggering restoreCriticalContent.`
      );
      restoreCriticalContent();
    }
  }

  // Observe Hero Title
  const heroTitleEl = document.getElementById('hero-title');
  if (heroTitleEl) {
    heroTitleObserverInstance = new MutationObserver(
      (mutationsList, observer) => {
        logMutationsAndRestore(mutationsList, observer, 'Hero Title');
      }
    );
    heroTitleObserverInstance.observe(heroTitleEl, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    console.log('Hero Title observer attached/re-attached.');
  } else {
    console.warn('Hero Title element (hero-title) not found for observer.');
  }

  // Observe Hero Text
  const heroTextEl = document.getElementById('hero-text');
  if (heroTextEl) {
    heroTextObserverInstance = new MutationObserver(
      (mutationsList, observer) => {
        logMutationsAndRestore(mutationsList, observer, 'Hero Text');
      }
    );
    heroTextObserverInstance.observe(heroTextEl, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    console.log('Hero Text observer attached/re-attached.');
  } else {
    console.warn('Hero Text element (hero-text) not found for observer.');
  }

  // Observe FAQ accordion
  const faqAccordion = document.getElementById('accordion-2');
  if (faqAccordion) {
    faqObserverInstance = new MutationObserver((mutationsList, observer) => {
      logMutationsAndRestore(mutationsList, observer, 'FAQ Accordion');
    });
    faqObserverInstance.observe(faqAccordion, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    console.log('FAQ accordion observer attached/re-attached.');
  }

  // Observe copyright/title
  const copyright = document.getElementById('copyright-year');
  if (copyright) {
    copyrightObserverInstance = new MutationObserver(
      (mutationsList, observer) => {
        logMutationsAndRestore(mutationsList, observer, 'Copyright Year');
      }
    );
    copyrightObserverInstance.observe(copyright, {
      childList: true,
      characterData: true,
    });
    console.log('Copyright observer attached/re-attached.');
  }
  const websiteTitleEl = document.getElementById('website-title'); // Footer title
  if (websiteTitleEl) {
    titleObserverInstance = new MutationObserver((mutationsList, observer) => {
      logMutationsAndRestore(mutationsList, observer, 'Footer Website Title'); // Clarified label
    });
    titleObserverInstance.observe(websiteTitleEl, {
      childList: true,
      characterData: true,
    });
    console.log('Footer website title observer attached/re-attached.');
  }
}

setInterval(() => {
  // Check if FAQ or copyright/title is missing or empty
  const faq = document.getElementById('accordion-2');
  const copyright = document.getElementById('copyright-year');
  const websiteTitle = document.getElementById('website-title'); // Footer title
  const heroTitle = document.getElementById('hero-title');
  const heroText = document.getElementById('hero-text');

  let criticalContentMissing = false;

  if (!faq || faq.children.length === 0) {
    console.warn('[Watchdog] FAQ content missing or empty.');
    criticalContentMissing = true;
  }
  if (!copyright || !copyright.textContent.trim()) {
    console.warn('[Watchdog] Copyright year missing or empty.');
    criticalContentMissing = true;
  }
  if (!websiteTitle || !websiteTitle.textContent.trim()) {
    console.warn('[Watchdog] Footer Website title missing or empty.');
    criticalContentMissing = true;
  }
  if (!heroTitle || !heroTitle.textContent.trim()) {
    console.warn('[Watchdog] Hero title missing or empty.');
    criticalContentMissing = true;
  }
  if (!heroText || !heroText.textContent.trim()) {
    console.warn('[Watchdog] Hero text missing or empty.');
    criticalContentMissing = true;
  }

  // Also check document.title (can't check if it's "empty" easily, but can check if it's a generic default)
  try {
    if (storedConfigJSON) {
      const dConfig = JSON.parse(storedConfigJSON);
      if (dConfig && dConfig.title && document.title !== dConfig.title.trim()) {
        console.warn(
          `[Watchdog] Document.title ("${
            document.title
          }") differs from stored config title ("${dConfig.title.trim()}").`
        );
        criticalContentMissing = true;
      }
    } else if (
      document.title === 'Hydro Cleansing' ||
      document.title === '' ||
      document.title === window.location.hostname
    ) {
      // If no stored config, check against known undesirable defaults
      console.warn(
        `[Watchdog] Document.title ("${document.title}") appears to be a generic default.`
      );
      criticalContentMissing = true;
    }
  } catch (e) {}
}); // every 3 seconds
