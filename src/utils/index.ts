import { personalTaxRate } from '../data';
import { MonthReportType, SalaryReportType } from '../types';

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

export function getPersonalTax(
  base: number,
  allowance: number,
  yearend: number,
  socailInsurance: number,
  deductTex: number,
) {
  let totalTax = 0,
    totalIncome = 0;
  const salaryReport: SalaryReportType = { months: [] };
  for (let i = 1; i <= 12; i++) {
    let monthTaxBase =
      (base + allowance - 5000 - socailInsurance - deductTex) * i;
    if (i === 12) monthTaxBase += yearend;

    const taxLevel = getTaxLevel(monthTaxBase);

    const monthTax =
      monthTaxBase >= 0
        ? monthTaxBase * personalTaxRate[taxLevel].rate -
          personalTaxRate[taxLevel].deduct -
          totalTax
        : 0;

    totalTax += monthTax;
    let realIncome = 0;

    if (i < 12) {
      realIncome = monthTaxBase / i + 5000 + deductTex - monthTax;
    } else {
      realIncome =
        (monthTaxBase - yearend) / i + 5000 + deductTex - monthTax + yearend;
    }

    totalIncome += realIncome;

    const monthReport: MonthReportType = {
      key: `reportItem-${i}`,
      month: i.toString(),
      income: realIncome.toFixed(2),
      monthTax: monthTax.toFixed(2),
    };
    salaryReport.months.push(monthReport);
  }
  const totalReport: MonthReportType = {
    key: `reportItem-${13}`,
    month: '总计',
    income: totalIncome.toFixed(2),
    monthTax: totalTax.toFixed(2),
  };

  salaryReport.months.push(totalReport);
  return salaryReport;
}

export function getPersonalChartData(
  totalIncome: number,
  insurance: number,
  housing: number,
  totalTax: number,
) {}

export function getCorporateTax() {}
