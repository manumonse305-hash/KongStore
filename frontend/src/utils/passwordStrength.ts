export const evaluarPassword = (password: string): string => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return 'DEBIL';
  }
  if (score <= 4) {
    return 'MEDIA';
  }
  return 'FUERTE';
};