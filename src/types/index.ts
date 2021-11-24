export interface MonthReportType {
  key: string;
  month: string;
  income: string;
  monthTax: string;
}

export interface SalaryReportType {
  months: MonthReportType[];
}

export interface SalaryChartType {
  item: string;
  count: number;
  percent: number;
}
