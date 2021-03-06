import { min } from "@antv/util";
import { Button, Col, Collapse, Form, Input, Radio, Row, Select } from "antd";
import { useState } from "react";
import {
  cities,
  continuingDeductionOptions,
  educationDeductionOptions,
  houseDeductionOptions,
  supportDeductionOptions,
  tenancyDeductionOptions,
} from "../data";
import { SalaryChartType, SalaryReportType } from "../types";

import { getPersonalChartData, getPersonalTax, range } from "../utils";

const cityMap = new Map();

cities.forEach((value, index) => {
  cityMap.set(value.label, index);
});

interface SalaryFormProps {
  changeSalaryReport: (data: SalaryReportType) => void;
  changeSalaryChart: (data: SalaryChartType[]) => void;
}

const SalaryForm: React.FC<SalaryFormProps> = ({
  changeSalaryReport,
  changeSalaryChart,
}) => {
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
    if (typeof value === "boolean") {
      setIncludeInsurance(value);
    }
  };

  const onHousingChange = (e: any) => {
    const value = e.target.value;
    if (typeof value === "boolean") {
      setIncludeHousing(value);
    }
  };

  const onSpecialDeductionChange = (e: any) => {
    const value = e.target.value;
    if (typeof value === "boolean") {
      setIncludeSpecialDeduction(value);
    }
  };

  const onSupportDeductionTypeChange = (value: number) => {
    setSupportDeductionType(value);
  };

  const onFinish = () => {
    let base = parseFloat(form.getFieldValue("base")),
      allowance = parseFloat(form.getFieldValue("allowance")),
      yearend = parseFloat(form.getFieldValue("yearend")),
      housingRate = parseFloat(form.getFieldValue("housingRate")) / 100,
      insuranceBase = base,
      housingBase = base;

    const minInsuranceBase = parseFloat(form.getFieldValue("minInsuranceBase")),
      maxInsuranceBase = parseFloat(form.getFieldValue("maxInsuranceBase")),
      minHousingBase = parseFloat(form.getFieldValue("minHousingBase")),
      maxHousingBase = parseFloat(form.getFieldValue("maxHousingBase"));

    if (base < minInsuranceBase) {
      insuranceBase = minInsuranceBase;
    } else if (base > maxInsuranceBase) {
      insuranceBase = maxInsuranceBase;
    }

    if (base < minHousingBase) {
      housingBase = minHousingBase;
    } else if (base > maxHousingBase) {
      housingBase = maxHousingBase;
    }

    const deductTaxOptions: Record<string, number> = form.getFieldsValue([
      "educationDeduction",
      "continuingDeduction",
      "supportDeduction",
      "houseDeduction",
      "tenancyDeduction",
    ]);

    const deductTax = Object.keys(deductTaxOptions).reduce((pre, cur) => {
      const curVal = deductTaxOptions[cur] ? pre + deductTaxOptions[cur] : 0;
      console.log(curVal);
      return pre + curVal;
    }, 0);

    const insurance = includeInsurance ? insuranceBase * 0.105 : 0;
    const housing = includeHousing ? housingBase * housingRate : 0;

    const salaryReport: SalaryReportType = getPersonalTax(
      base,
      allowance,
      yearend,
      insurance + housing,
      deductTax
    );

    changeSalaryReport(salaryReport);
    const lastIndex = salaryReport.months.length - 1;

    const { income: totalIncome, monthTax: totalTax } =
      salaryReport.months[lastIndex];
    console.log("totalTax");
    const salaryChart: SalaryChartType[] = getPersonalChartData(
      base,
      parseFloat(totalIncome),
      parseFloat(totalTax),
      housingRate,
      0,
      includeInsurance,
      includeHousing
    );
    changeSalaryChart(salaryChart);
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
        <Form.Item label="????????????" name="region" rules={[{ required: false }]}>
          <Select defaultValue={"??????"} onChange={onRegionChange}>
            {cities.map((value: any) => (
              <Select.Option value={value.value}>{value.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="??????????????????"
          name="base"
          initialValue={5000}
          rules={[{ required: true, message: "" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="????????????" name="allowance" initialValue={0}>
          <Input placeholder="?????????????????????????????????????????????????????????????????????" />
        </Form.Item>
        <Form.Item label="???????????????" name="yearend" initialValue={0}>
          <Input />
        </Form.Item>
        <Form.Item
          label="??????????????????"
          name="includeInsurance"
          initialValue={false}
        >
          <Radio.Group name="radiogroup" onChange={onInsuranceChange}>
            <Row>
              <Col span={8}>
                <Radio value={true}>???</Radio>
              </Col>
              <Col span={8} offset={4}>
                <Radio value={false}>???</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        {includeInsurance ? (
          <Form.Item label="??????????????????">
            <Input.Group compact style={{ width: "100%" }}>
              <Form.Item
                name="minInsuranceBase"
                initialValue={cities[cityIndex].insuranceRange[0]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 12px)",
                }}
              >
                <Input placeholder="??????" />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                -
              </span>
              <Form.Item
                name="maxInsuranceBase"
                initialValue={cities[cityIndex].insuranceRange[1]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 12px)",
                }}
              >
                <Input placeholder="??????" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        ) : null}
        <Form.Item
          label="?????????????????????"
          name="includeHousing"
          initialValue={false}
        >
          <Radio.Group name="radiogroup" onChange={onHousingChange}>
            <Row>
              <Col span={8}>
                <Radio value={true}>???</Radio>
              </Col>
              <Col span={8} offset={4}>
                <Radio value={false}>???</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        {includeHousing ? (
          <>
            <Form.Item label="?????????????????????">
              <Input.Group compact style={{ width: "100%" }}>
                <Form.Item
                  name="minHousingBase"
                  initialValue={cities[cityIndex].housingRange[0]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                  }}
                >
                  <Input placeholder="??????" />
                </Form.Item>
                <span
                  style={{
                    display: "inline-block",
                    width: "24px",
                    lineHeight: "32px",
                    textAlign: "center",
                  }}
                >
                  -
                </span>
                <Form.Item
                  name="maxHousingBase"
                  initialValue={cities[cityIndex].housingRange[1]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)",
                  }}
                >
                  <Input placeholder="??????" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="?????????????????????"
              name="housingRate"
              initialValue={5}
            >
              <Select>
                {range(5, 12).map((value, index) => (
                  <Select.Option key={"housingRate" + index} value={value}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : null}
        <Form.Item
          label="????????????????????????"
          name="includeSpecialDeduction"
          initialValue={false}
        >
          <Radio.Group name="radiogroup" onChange={onSpecialDeductionChange}>
            <Row>
              <Col span={8}>
                <Radio value={true}>???</Radio>
              </Col>
              <Col span={8} offset={4}>
                <Radio value={false}>???</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
        {includeSpecialDeduction ? (
          <>
            <Form.Item
              label="??????????????????"
              name="educationDeduction"
              initialValue={0}
            >
              <Select>
                {educationDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={"educationDeduction" + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="??????????????????"
              name="continuingDeduction"
              initialValue={0}
            >
              <Select>
                {continuingDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={"continuingDeduction" + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="??????????????????"
              name="supportDeductionType"
              initialValue={0}
            >
              <Select onChange={onSupportDeductionTypeChange}>
                <Select.Option value={0}>????????????</Select.Option>
                <Select.Option value={1}>????????????</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="????????????????????????"
              name="supportDeduction"
              initialValue={0}
            >
              {supportDeductionType === 0 ? (
                <Select>
                  {supportDeductionOptions.map((value, index) => (
                    <Select.Option
                      key={"supportDeduction" + index}
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
            <Form.Item
              label="????????????????????????"
              name="houseDeduction"
              initialValue={0}
            >
              <Select>
                {houseDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={"houseDeduction" + index}
                    value={value.value}
                  >
                    {value.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="??????????????????"
              name="tenancyDeduction"
              initialValue={0}
            >
              <Select>
                {tenancyDeductionOptions.map((value, index) => (
                  <Select.Option
                    key={"tenancyDeduction" + index}
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
            ??????
          </Button>
        </Col>
        <Col span={8}>
          <Button onClick={onReset}>??????</Button>
        </Col>
      </Row>
    </>
  );
};

export default SalaryForm;
