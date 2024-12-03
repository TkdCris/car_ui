export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const sanitizedCPF = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem exatamente 11 dígitos
  if (sanitizedCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (ex: "111.111.111-11")
  if (/^(\d)\1+$/.test(sanitizedCPF)) return false;

  // Função para calcular os dígitos verificadores
  const calculateDigit = (cpfSlice: string, weight: number): number => {
    const sum = cpfSlice
      .split('')
      .reduce((acc, digit, index) => acc + parseInt(digit) * (weight - index), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calcula o primeiro dígito verificador
  const firstDigit = calculateDigit(sanitizedCPF.slice(0, 9), 10);
  if (firstDigit !== parseInt(sanitizedCPF[9])) return false;

  // Calcula o segundo dígito verificador
  const secondDigit = calculateDigit(sanitizedCPF.slice(0, 10), 11);
  if (secondDigit !== parseInt(sanitizedCPF[10])) return false;

  return true;
}
