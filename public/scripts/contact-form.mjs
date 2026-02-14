const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      formMessage.textContent = 'Messaggio inviato con successo! Ti risponderò presto.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    } catch (error) {
      formMessage.textContent = "Errore nell'invio del messaggio. Riprova più tardi.";
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block';
    }
  });
}