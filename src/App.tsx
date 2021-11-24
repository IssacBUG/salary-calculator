import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import './App.css';
import SalaryChart from './components/SalaryChart';

import SalaryForm from './components/SalaryForm';
import SalaryReport from './components/SalaryReport';
import { SalaryChartType, SalaryReportType } from './types';

function App() {
  const [salaryReport, setSalaryReport] = useState<SalaryReportType>({
    months: [],
  });

  const [salaryChart, setSalaryChart] = useState<SalaryChartType[]>([]);

  const changeSalaryReport = (data: SalaryReportType) => {
    setSalaryReport(data);
  };

  const changeSalaryChart = (data: SalaryChartType[]) => {
    setSalaryChart(data);
  };

  return (
    <div style={{ backgroundColor: '#F4F5F9' }}>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <Card title="工资计算器" style={{ textAlign: 'center' }}>
            <SalaryForm
              changeSalaryReport={changeSalaryReport}
              changeSalaryChart={changeSalaryChart}
            />
            <div style={{ marginTop: '36px' }}>
              <SalaryReport dataSource={salaryReport} />
            </div>
            <SalaryChart data={salaryChart} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
