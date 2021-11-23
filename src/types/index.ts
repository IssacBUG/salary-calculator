export interface MonthReportType {
  key: string;
  month: number;
  income: number;
  monthTax: number;
}

export interface SalaryReportType {
  months: MonthReportType[];
}

export interface SalaryChartType {
  item: string;
  count: number;
  percent: number;
}
