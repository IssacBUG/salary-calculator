import { Button, Col, Form, Input, Radio, Row, Select } from 'antd';
import { useState } from 'react';
import {
  cities,
  continuingDeductionOptions,
  educationDeductionOptions,
  houseDeductionOptions,
  personalTaxRate,
  supportDeductionOptions,
  tenancyDeductionOptions,
} from '../data';
import { MonthReportType, SalaryChartType, SalaryReportType } from '../types';

import { getTaxLevel, range } from '../utils';

const cityMap = new Map();

cities.forEach((value, index) => {
  cityMap.set(value.label, index);
});

interface SalaryFormProps {
  changeSalaryReport: (data: SalaryReportType) => void;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ changeSalaryReport }) => {
  const [form] = Form.useForm();

  const [cityIndex, setCityIndex] = useState(0);

  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [includeHousing, setIncludeHousing] = useState(false);
  const [includeSpecialDeduction, setIncludeSpecialDeduction] = useState(false);
  const [supportDeductionType, setSupportDeductionType] = useState(0);

  const onRegionChange = (value: string) => {
    const index = cityMap.has(value) ? cityMap.get(value) : cities.length - 1;
    form.setFieldsValue({
      minInsuranceBase: cities[index].insuranceRange[0],
      maxInsuranceBase: cities[index].insuranceRange[1],
      minHousingBase: cities[index].housingRange[0],
      maxHousingBase: cities[index].housingRange[1],
    });
    setCityIndex(index);
  };

  const onInsuranceChange = (e: any) => {
    const value = e.target.value;
    if (typeof value === 'boolean') {
      setIncludeInsurance(value);
    }
  };

  const onHousingChange = (e: any) => {
    const value = e.target.value;
    if (typeof value === 'boolean') {
      setIncludeHousing(value);
    }
  };

  const onSpecialDeductionChange = (e: any) => {
    const value = e.target.value;
    if (typeof value === 'boolean') {
      setIncludeSpecialDeduction(value);
    }
  };

  const onSupportDeductionTypeChange = (value: number) => {
    setSupportDeductionType(value);
  };

  const onFinish = () => {
    const salaryReport: SalaryReportType = {
      months: [],
    };
    const salaryChart: SalaryChartType[] = [];

    let base = form.getFieldValue('base'),
      housingRate = form.getFieldValue('housingRate') / 100,
      insuranceBase = base,
      housingBase = base;

    const insuranceRange = cities[cityIndex].insuranceRange,
      housingRange = cities[cityIndex].housingRange;

    if (base < insuranceRange[0]) {
      insuranceBase = insuranceRange[0];
    } else if (base > insuranceRange[1]) {
      insuranceBase = insuranceRange[1];
    }

    if (base < housingRange[0]) {
      housingBase = housingRange[0];
    } else if (base > housingRange[1]) {
      housingBase = housingRange[1];
    }

    const deductTaxOptions: Record<string, number> = form.getFieldsValue([
      'educationDeduction',
      'continuingDeduction',
      'supportDeduction',
      'houseDeduction',
      'tenancyDeduction',
    ]);

    const deductTax = Object.keys(deductTaxOptions).reduce((pre, cur) => {
      const curVal = deductTaxOptions[cur] ? pre + deductTaxOptions[cur] : 0;
      console.log(curVal);
      return pre + curVal;
    }, 0);

    let totalTax = 0;

    for (let i = 1; i <= 12; i++) {
      let monthBase = base - 5000;

      const housing = housingBase * housingRate;
      const insurance = insuranceBase * 0.105;

      if (includeHousing) monthBase -= housing;

      if (includeInsurance) monthBase -= insurance;

      const realBase = monthBase + 5000;

      if (includeSpecialDeduction) monthBase -= deductTax;

      const taxLevel = getTaxLevel(monthBase * i);

      const monthTax =
        monthBase * i * personalTaxRate[taxLevel].rate -
        personalTaxRate[taxLevel].deduct -
        totalTax;

      totalTax += monthTax;

      const monthReport: MonthReportType = {
        key: `reportItem-${i}`,
        month: i,
        income: realBase - monthTax,
        monthTax,
      };

      salaryReport.months.push(monthReport);
    }
    changeSalaryReport(salaryReport);
  };

  const onReset = () => {
    changeSalaryReport({ months: [] });
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="salary-form"
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item label="选择城市" name="region" rules={[{ required: false }]}>
          <Select defaultValue={'北京'} onChange={onRegionChange}>
            {cities.map((value: any) => (
              <Select.Option value={value.value}>{value.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="税前基本工资"
          name="base"
          rules={[{ required: true, message: '' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="其他补贴" name="allowance">
          <Input placeholder="每月房补、餐补之类不参与社保与公积金计算的补贴" />
        </Form.Item>
        <Form.Item label="年终奖金额" name="yearend">
          <Input></Input>
        </Form.Item>
        <Form.Item label="是否缴纳社保" name="includeInsurance">
          <Radio.Group
            name="radiogroup"
            defaultValue={false}
            onChange={onInsuranceChange}
          >
            <Row>
              <Col span={8}>
                <Radio value={true}>是</Radio>
              </Col>
              <Col span={8} offset={4}>
                <Radio value={false}>否</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        {includeInsurance ? (
          <Form.Item label="社保缴纳基数">
            <Input.Group compact style={{ width: '100%' }}>
              <Form.Item
                name="minInsuranceBase"
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 12px)',
                }}
              >
                <Input
                  placeholder="下限"
                  defaultValue={cities[cityIndex].insuranceRange[0]}
                />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name="maxInsuranceBase"
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 12px)',
                }}
              >
                <Input
                  placeholder="上限"
                  defaultValue={cities[cityIndex].insuranceRange[1]}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        ) : null}
        <Form.Item label="是否缴纳公积金" name="includeHousing">
          <Radio.Group
            name="radiogroup"
            defaultValue={false}
            onChange={onHousingChange}
          >
            <Row>
              <Col span={8}>
                <Radio value={true}>是</Radio>
              </Col>
              <Col span={8} offset={4}>
                <Radio value={false}>否</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        {includeHousing ? (
          <>
            <Form.Item label="公积金缴纳基数" name="housingBase">
              <Form.Item
                name="minHousingBase"
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 12px)',
                }}
              >
                <Input
                  placeholder="下限"
                  defaultValue={cities[cityIndex].housingRange[0]}
                />
              </Form.Item>
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  lineHeight: '32px',
                  textAlign: 'center',
                }}
              >
                -
              </span>
              <Form.Item
                name="maxHousingBase"
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 12px)',
                }}
              >
                <Input
                  placeholder="上限"
                  defaultValue={cities[cityIndex].housingRange[1]}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="公积金缴存比例" name="housingRate">
              <Select defaultValue={5}>
                {range(5, 12).map((value, index) => (
                  <Select.Option key={'housingRate' + index} value={value}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : null}
        <Form.Item label="是否包含专项扣除" name="includeSpecialDeduction">
          <Radio.Group
            name="radiogroup"
            defaultValue={false}
            onChange={onSpecialDeductionChange}
          >
            <Row>
              <Col span={8}>
                <Radio value={true}>是</Radio>
              </Col>
              <Col span={8} offset={4}>
                <Radio value={false}>否</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        {includeSpecialDeduction ? (
          <>
            <Form.Item label="子女教育扣除" name="educationDeduction">
              <Select defaultValue={0}>
                {educationDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={'educationDeduction' + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="继续教育扣除" name="continuingDeduction">
              <Select defaultValue={0}>
                {continuingDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={'continuingDeduction' + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="赡养老人扣除" name="supportDeductionType">
              <Select defaultValue={0} onChange={onSupportDeductionTypeChange}>
                <Select.Option value={0}>指定分摊</Select.Option>
                <Select.Option value={1}>约定分摊</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="赡养老人扣除数额" name="supportDeduction">
              {supportDeductionType === 0 ? (
                <Select>
                  {supportDeductionOptions.map((value, index) => (
                    <Select.Option
                      key={'supportDeduction' + index}
                      value={value.value}
                    >
                      {value.label}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input></Input>
              )}
            </Form.Item>
            <Form.Item label="住房贷款利息扣除" name="houseDeduction">
              <Select defaultValue={0}>
                {houseDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={'houseDeduction' + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="住房租金扣除" name="tenancyDeduction">
              <Select defaultValue={0}>
                {tenancyDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={'tenancyDeduction' + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : null}
      </Form>
      <Row>
        <Col span={8} offset={4}>
          <Button type="primary" onClick={onFinish}>
            计算
          </Button>
        </Col>
        <Col span={8}>
          <Button onClick={onReset}>重置</Button>
        </Col>
      </Row>
    </>
  );
};

export default SalaryForm;
