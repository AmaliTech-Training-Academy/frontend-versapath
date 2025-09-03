export function hasMinLength(password: string, min: number = 8): boolean {
  return password.length >= min;
}

export function hasUppercase(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasLowercase(password: string): boolean {
  return /[a-z]/.test(password);
}

export function hasNumber(password: string): boolean {
  return /[0-9]/.test(password);
}

export function hasSpecialChar(password: string): boolean {
  return /[^A-Za-z0-9]/.test(password);
}
