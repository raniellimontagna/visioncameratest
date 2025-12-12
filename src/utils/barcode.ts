/**
 * Valida se um código não é um CEP brasileiro e tem tamanho mínimo
 * CEP pode ter formato: 00000-000 ou 00000000
 * Códigos com menos de 5 caracteres são ignorados
 */
export function isValidBarcode(code: string): boolean {
  if (!code) return false;

  // Remove espaços em branco
  const cleanCode = code.trim();

  // Ignora códigos com menos de 5 caracteres
  if (cleanCode.length < 5) {
    console.log("Código muito curto ignorado (< 5 caracteres):", cleanCode);
    return false;
  }

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
