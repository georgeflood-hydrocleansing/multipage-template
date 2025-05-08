// Script to extract all URLs from faqData in script.js
const fs = require('fs');

// Read the script.js file
fs.readFile('ave-html/script.js', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Extract all urls arrays using regex
  const urlRegex = /urls:\s*\[([\s\S]*?)\]/g;
  let match;
  const allUrls = [];

  while ((match = urlRegex.exec(data)) !== null) {
    // Extract the content inside the square brackets
    const urlsString = match[1];

    // Extract individual URLs from the string
    const urlMatches = urlsString.match(/'([^']+)'/g);

    if (urlMatches) {
      // Clean up the quotes and add to the result
      urlMatches.forEach(url => {
        allUrls.push(url.replace(/'/g, ''));
      });
    }
  }

  // Print all URLs as a list
  console.log(allUrls.join('\n'));
});
