/**
 * Valida se um código não é um CEP brasileiro
 * CEP pode ter formato: 00000-000 ou 00000000
 */
export function isValidBarcode(code: string): boolean {
  if (!code) return false;

  // Remove espaços em branco
  const cleanCode = code.trim();

  // Regex para CEP: 5 dígitos, hífen opcional, 3 dígitos
  const cepPattern = /^\d{5}-?\d{3}$/;

  // Se for CEP, retorna false (inválido para nosso propósito)
  if (cepPattern.test(cleanCode)) {
    console.log("CEP detectado e ignorado:", cleanCode);
    return false;
  }

  // Se passou na validação, é um código válido
  return true;
}

/**
 * Verifica se um código é um CEP
 */
export function isCEP(code: string): boolean {
  const cleanCode = code.trim();
  const cepPattern = /^\d{5}-?\d{3}$/;
  return cepPattern.test(cleanCode);
}
