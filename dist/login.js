// Funkcja do walidacji formularza
async function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Regex do walidacji emaila
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Regex do walidacji hasła
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Walidacja CAPTCHA
  const captchaResponse = grecaptcha.getResponse();
  if (captchaResponse.length === 0) {
      alert("Potwierdź, że nie jesteś robotem!");
      return false;
  }

  // Walidacja emaila
  if (!emailPattern.test(email)) {
      alert("Proszę wprowadzić poprawny adres e-mail.");
      return false;
  }

  // Walidacja hasła
  if (!passwordPattern.test(password)) {
      alert("Hasło musi zawierać co najmniej 8 znaków, w tym 1 literę, 1 cyfrę i 1 znak specjalny.");
      return false;
  }

  // Szyfrowanie hasła
  const hashedPassword = await hashPassword(password);
  console.log("Zaszyfrowane hasło:", hashedPassword);

  // Zamiana hasła w formularzu na jego zaszyfrowaną wersję
  const passwordField = document.getElementById('password');
  passwordField.value = hashedPassword;

  alert("Formularz przesłany pomyślnie!");
  return true; // Formularz przechodzi walidację
}

// Funkcja do szyfrowania hasła za pomocą SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
