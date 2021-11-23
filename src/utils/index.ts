import { personalTaxRate } from '../data';

export function range(start: number, end: number) {
  return new Array(end - start + 1)
    .fill(0)
    .map((value, index) => index + start);
}

export function getTaxLevel(income: number) {
  let taxLevel = 0;
  for (let i = personalTaxRate.length - 1; i >= 0; i--) {
    if (income > personalTaxRate[i].income) {
      taxLevel = i;
      break;
    }
  }
  return taxLevel;
}
