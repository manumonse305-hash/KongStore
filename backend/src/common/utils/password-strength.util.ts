export enum PasswordStrength {
  DEBIL = 'DEBIL',
  MEDIA = 'MEDIA',
  FUERTE = 'FUERTE',
}
export function evaluarPassword(
  password: string,
): PasswordStrength {

  let score = 0;

  if (password.length >= 8) score++;

  if (/[a-z]/.test(password)) score++;

  if (/[A-Z]/.test(password)) score++;

  if (/\d/.test(password)) score++;

  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return PasswordStrength.DEBIL;
  }

  if (score <= 4) {
    return PasswordStrength.MEDIA;
  }

  return PasswordStrength.FUERTE;
}