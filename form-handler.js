// Basic form handler script
document.addEventListener('DOMContentLoaded', function () {
  console.log('Form handler loaded successfully');

  const contactForm = document.querySelector(
    'form[action="assets/php/mailer.php"]'
  );
  if (contactForm) {
    console.log('Contact form found and handler attached');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Form submission intercepted');

      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('input[type="submit"]');
      const originalBtnValue = submitBtn.value;

      // Disable button and show loading state
      submitBtn.value = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual AJAX in production)
      setTimeout(function () {
        console.log('Form data:', Object.fromEntries(formData));

        // Show success message
        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for your inquiry. We will get back to you shortly.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.value = originalBtnValue;
        submitBtn.disabled = false;
      }, 1500);
    });
  } else {
    console.warn('Contact form not found on page');
  }
});
