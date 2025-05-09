// EMERGENCY CONTENT LOADER
// This script forces content to display regardless of domain detection issues
console.log('EMERGENCY CONTENT LOADER STARTED');

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM is ready - forcing content to display');

  // Force load hero image
  forceLoadImage('hero-img', './assets/website-hero-images/liquid-waste.png');

  // Force load any other missing images
  document.querySelectorAll('img[src]').forEach(img => {
    if (!img.complete || img.naturalHeight === 0) {
      console.log('Forcing reload of image:', img.src);
      const originalSrc = img.src;
      img.src = '';
      setTimeout(() => {
        img.src = originalSrc;
      }, 50);
    }
  });

  // Make sure hero title is visible
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.style.visibility = 'visible';
    heroTitle.style.opacity = '1';

    // If empty, add default content
    if (!heroTitle.innerText.trim()) {
      heroTitle.innerHTML =
        '<span class="ld-fh-txt">Welcome to Hydro Cleansing</span>';
      console.log('Forced hero title content');
    }
  }

  // Make sure hero text is visible
  const heroText = document.getElementById('hero-text');
  if (heroText) {
    heroText.style.visibility = 'visible';
    heroText.style.opacity = '1';

    // If empty, add default content
    if (!heroText.innerText.trim()) {
      heroText.innerHTML =
        '<span class="ld-fh-txt">Professional drainage and cleaning services throughout London and the South East.</span>';
      console.log('Forced hero text content');
    }
  }

  // Remove loading overlay if present
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
    console.log('Removed loading overlay');
  }

  // Add status indicator
  addStatusIndicator();

  console.log('EMERGENCY CONTENT LOADING COMPLETE');
});

// Helper function to force load an image
function forceLoadImage(imageId, defaultSrc) {
  const img = document.getElementById(imageId);
  if (img) {
    console.log('Found image element:', imageId);

    // Force reload the image
    const originalSrc = img.src;
    img.src = defaultSrc || originalSrc;

    // Force display properties
    img.style.display = 'block';
    img.style.visibility = 'visible';
    img.style.opacity = '1';

    // Log when image loads
    img.onload = function () {
      console.log('Image loaded successfully:', imageId);
    };

    img.onerror = function () {
      console.error('Image failed to load:', imageId, img.src);
      // Try one more time with the original source
      if (img.src !== originalSrc) {
        console.log('Trying original source as fallback');
        img.src = originalSrc;
      }
    };
  } else {
    console.warn('Image element not found:', imageId);
  }
}

// Add a status indicator to show the fix is working
function addStatusIndicator() {
  const indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.bottom = '20px';
  indicator.style.right = '20px';
  indicator.style.padding = '10px 15px';
  indicator.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
  indicator.style.color = 'white';
  indicator.style.borderRadius = '5px';
  indicator.style.fontFamily = 'Arial, sans-serif';
  indicator.style.zIndex = '9999';
  indicator.style.fontSize = '14px';
  indicator.textContent = 'Content Fix Applied';
  document.body.appendChild(indicator);

  // Remove after 10 seconds
  setTimeout(() => {
    indicator.style.display = 'none';
  }, 10000);
}
