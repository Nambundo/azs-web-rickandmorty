/**
 * Gera um número pseudo-aleatório determinístico a partir de uma string (ex: um ID).
 * Isso garante que dados mockados (rating, bio, etc.) sejam sempre os mesmos
 * para o mesmo item, sem precisar persistir nada.
 */
export function seededHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededFloat(seed: string, min: number, max: number): number {
  const hash = seededHash(seed);
  const normalized = (hash % 1000) / 1000;
  return min + normalized * (max - min);
}

export function seededInt(seed: string, min: number, max: number): number {
  return Math.floor(seededFloat(seed, min, max + 1));
}

export function seededPick<T>(seed: string, items: T[]): T {
  const index = seededHash(seed) % items.length;
  return items[index];
}
