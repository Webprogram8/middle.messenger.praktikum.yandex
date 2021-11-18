export function rangeLeft(start: number, limit?: number, step?: number) {
  if (limit === undefined) {
    limit = start;
    start = 0;
  }

  if (step === undefined) {
    step = start < limit ? 1 : -1;
  }

  const result = [];
  let current = start;
  while (
    (step > 0 && current >= start && current < limit) ||
    (step < 0 && current <= start && current > limit) ||
    (step === 0 && result.length < limit - 1)
  ) {
    result.push(current);
    current += step;
  }
  return result;
}

export function rangeRight(start: number, end?: number, step?: number) {
  return rangeLeft(start, end, step).reverse();
}

export function range(
  start: number,
  end?: number,
  step?: number,
  isRight?: boolean
) {
  const result = rangeLeft(start, end, step);
  return isRight ? result.reverse() : result;
}
