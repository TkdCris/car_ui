
export function setToken(token: string) {
  document.cookie = `token=${token}; path=/; Secure; HttpOnly`;
}

export function setCookie(name: string, value: string, hours: number): void {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/; Secure`;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  return cookies[name] || null; // Retorna o valor do cookie ou null se não encontrado
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`;
}
