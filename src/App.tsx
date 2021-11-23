import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import './App.css';
import Labelline from './components/SalaryChart';
import SalaryForm from './components/SalaryForm';
import SalaryReport from './components/SalaryReport';
import { SalaryReportType } from './types';

function App() {
  const [salaryReport, setSalaryReport] = useState<SalaryReportType>({
    months: [],
  });

  const changeSalaryReport = (data: SalaryReportType) => {
    setSalaryReport(data);
  };

  return (
    <div style={{ backgroundColor: '#F4F5F9' }}>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <Card title="工资计算器" style={{ textAlign: 'center' }}>
            <SalaryForm changeSalaryReport={changeSalaryReport} />
            <SalaryReport dataSource={salaryReport} />
            <Labelline />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
