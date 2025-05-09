// Force FAQ loading script - Add this to bottom of your HTML before </body>
document.addEventListener('DOMContentLoaded', function () {
  console.log('FAQ Fix script running...');

  // Wait 2 seconds for everything to be fully loaded
  setTimeout(function () {
    // Only try to fix FAQs if they haven't already been set by the tester
    if (typeof faqsLoadedByTester === 'undefined' || !faqsLoadedByTester) {
      // Attempt to manually load FAQs
      console.log('Attempting to force-load FAQs...');
      try {
        const currentDomain = window.location.hostname || '127.0.0.1';
        if (typeof loadFAQs === 'function') {
          loadFAQs(currentDomain);
          console.log('FAQs manually loaded for domain:', currentDomain);
        } else {
          console.error('loadFAQs function not found');
        }
      } catch (error) {
        console.error('Error in FAQ fix script:', error);
      }
    } else {
      console.log('Skipping FAQ fix - FAQs already loaded by domain tester');
    }

    // Manual update of FAQ section if specific elements are found
    const accordionElement = document.getElementById('accordion-2');
    if (accordionElement) {
      console.log('Found accordion-2 element');

      // Find a matching FAQ category
      let matchFound = false;

      // Try to show any available FAQ set as a fallback
      if (window.faqData) {
        for (const category in window.faqData) {
          if (matchFound) break;

          const faqSet = window.faqData[category];
          if (faqSet && faqSet.faqs && faqSet.faqs.length > 0) {
            console.log('Using fallback FAQ category:', category);

            // Update section title if possible
            const sectionHeadings = document.querySelectorAll(
              'header.fancy-heading h2'
            );
            for (const heading of sectionHeadings) {
              if (heading.textContent.includes('Content underline')) {
                heading.textContent =
                  faqSet.title || 'Frequently Asked Questions';
                break;
              }
            }

            // Clear existing accordion items
            accordionElement.innerHTML = '';

            // Add FAQ items
            faqSet.faqs.forEach((faq, index) => {
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
                     class="accordion-collapse collapse ${
                       isActive ? 'in' : ''
                     }" 
                     role="tabpanel" 
                     aria-labelledby="accordion-collapse-heading-${index}">
                  <div class="accordion-content">
                    <p>${faq.answer}</p>
                  </div>
                </div>
              `;

              accordionElement.appendChild(accordionItem);
            });

            matchFound = true;
            console.log('FAQ section manually populated');
          }
        }
      } else {
        console.error('faqData not found in window object!');
      }
    } else {
      console.error('accordion-2 element not found!');
    }
  }, 2000);
});
