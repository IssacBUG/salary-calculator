import { Col, Row, Table } from 'antd';
import { SalaryReportType } from '../types';

interface SalaryReportProps {
  dataSource: SalaryReportType;
}

const SalaryReport: React.FC<SalaryReportProps> = ({ dataSource = {} }) => {
  const columns = [
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
    },
    { title: '税后收入', dataIndex: 'income', key: 'income' },
    { title: '应扣预缴税', dataIndex: 'monthTax', key: 'monthTax' },
  ];

  const { months = [] } = dataSource;

  return (
    <>
      <Table dataSource={months} columns={columns}></Table>
    </>
  );
};

export default SalaryReport;
