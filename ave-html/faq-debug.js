// FAQ Debug script
console.log('FAQ Debug script loaded');

// Function to check if the faqData object exists and what it contains
function debugFAQData() {
  console.log('--------- FAQ DEBUG INFO ---------');

  // Check if faqData exists
  if (typeof window.faqData === 'undefined') {
    console.error('Error: faqData is not defined in the global scope');
    return;
  }

  console.log('faqData object found with these categories:');
  const categories = Object.keys(window.faqData);
  console.log(categories);

  console.log('First category sample:', categories[0]);
  const firstCategory = window.faqData[categories[0]];
  console.log('- title:', firstCategory.title);
  console.log('- # of FAQs:', firstCategory.faqs?.length || 0);

  // Check accordion element
  const accordion = document.getElementById('accordion-2');
  if (accordion) {
    console.log('Accordion found:', accordion);
    console.log(
      'Current accordion content:',
      accordion.innerHTML.substring(0, 100) + '...'
    );
  } else {
    console.error('Accordion element #accordion-2 not found!');
  }

  // Check section headings
  const sectionHeadings = document.querySelectorAll('header.fancy-heading h2');
  if (sectionHeadings.length > 0) {
    console.log('Found', sectionHeadings.length, 'section headings');
    sectionHeadings.forEach((h, i) => {
      console.log(`Heading ${i}:`, h.textContent);
    });
  } else {
    console.error(
      'No section headings found matching selector: header.fancy-heading h2'
    );
  }

  console.log('-------------------------------');
}

// Run debug after page loads
window.addEventListener('load', function () {
  console.log('Page fully loaded, running FAQ debug...');

  // Only run debug if FAQs weren't loaded by tester
  if (typeof faqsLoadedByTester === 'undefined' || !faqsLoadedByTester) {
    console.log('Running FAQ debug...');

    // Check if faqData is available
    if (typeof window.faqData === 'undefined') {
      console.error('faqData not found in window object!');
    } else {
      console.log('faqData categories:', Object.keys(window.faqData));
    }

    // Check accordion
    const accordion = document.getElementById('accordion-2');
    if (accordion) {
      console.log('Found accordion-2 element');
      console.log(
        'Current accordion contents:',
        accordion.children.length,
        'items'
      );
    } else {
      console.error('accordion-2 element not found!');
    }
  } else {
    console.log('Skipping FAQ debug - FAQs already loaded by domain tester');
  }

  // Check if loadFAQs exists
  if (typeof window.loadFAQs === 'function') {
    console.log('loadFAQs function exists');
  } else {
    console.error('loadFAQs function not found in global scope!');
  }
});
