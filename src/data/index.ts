export const personalTaxRate = [
  {
    income: 0,
    rate: 0.03,
    deduct: 0,
  },
  {
    income: 36000,
    rate: 0.1,
    deduct: 2520,
  },
  {
    income: 144000,
    rate: 0.2,
    deduct: 16920,
  },
  {
    income: 300000,
    rate: 0.25,
    deduct: 31920,
  },
  {
    income: 420000,
    rate: 0.3,
    deduct: 52920,
  },
  {
    income: 660000,
    rate: 0.35,
    deduct: 85920,
  },
  {
    income: 960000,
    rate: 45,
    deduct: 181920,
  },
];

export const personalInsuranceAndHousingOptions = [
  { label: '养老保险金', value: 0.08 },
  { label: '医疗保险金', value: 0.02 },
  { label: '失业保险金', value: 0.005 },
  { label: '基本住房公积金', value: 0 },
  { label: '补充住房公积金', value: 0 },
];

export const companyInsuranceAndHousingOptions = [
  { label: '养老保险金', value: 0.08 },
  { label: '医疗保险金', value: 0.02 },
  { label: '失业保险金', value: 0.005 },
  { label: '基本住房公积金', value: 0 },
  { label: '补充住房公积金', value: 0 },
  { label: '工伤保险金', value: 0.002 },
  { label: '生育保险金', value: 0.012 },
];

export const educationDeductionOptions = [
  { label: '不符合，扣除0元', value: 0 },
  { label: '一个孩子，夫妻各扣除500元', value: 500 },
  { label: '一个孩子，仅有一方扣除1000元', value: 1000 },
  { label: '两个孩子，夫妻各扣除1000元', value: 1000 },
  { label: '两个孩子，仅有一方扣除2000元', value: 2000 },
];

export const continuingDeductionOptions = [
  { label: '不符合，扣除0元', value: 0 },
  { label: '接受学历教育中，扣除400', value: 400 },
];

export const supportDeductionOptions = [
  { label: '不符合，扣除0元', value: 0 },
  { label: '独生子女，扣除2000元', value: 2000 },
  { label: '二兄弟姐妹分摊，扣除1000元', value: 1000 },
  { label: '三兄弟姐妹分摊，扣除666.7元', value: 666.7 },
  { label: '四兄弟姐妹分摊，扣除500元', value: 500 },
  { label: '五兄弟姐妹分摊，扣除400元', value: 400 },
  { label: '六兄弟姐妹分摊，扣除333.3元', value: 333.3 },
  { label: '七兄弟姐妹分摊，扣除285.7元', value: 285.7 },
  { label: '八兄弟姐妹分摊，扣除250元', value: 250 },
  { label: '九兄弟姐妹分摊，扣除222.2元', value: 222.2 },
  { label: '十兄弟姐妹分摊，扣除200元', value: 200 },
];

export const houseDeductionOptions = [
  { label: '不符合，扣除0元', value: 0 },
  { label: '夫妻各扣除500元', value: 500 },
  { label: '仅由一方扣除1000元', value: 1000 },
];

export const tenancyDeductionOptions = [
  { label: '不符合，扣除0元', value: 0 },
  { label: '所在城市户籍人口少于100万，扣除800元', value: 800 },
  { label: '所在城市户籍人口超过100万，扣除1100元', value: 1100 },
  { label: '直辖市、省会城市、计划单列市，扣除1500元', value: 1500 },
];

export const cities = [
  {
    label: '北京',
    value: '北京',
    housingRange: [2320, 28221],
    insuranceRange: [5360, 28221],
  },
  {
    label: '天津',
    value: '天津',
    insuranceRange: [3930, 20331],
    housingRange: [2050, 25983],
  },
  {
    label: '上海',
    value: '上海',
    housingRange: [2480, 31014],
    insuranceRange: [5975, 31014],
  },
  {
    label: '南京',
    value: '南京',
    housingRange: [2280, 34500],
    insuranceRange: [3800, 20586],
  },
  {
    label: '杭州',
    value: '杭州',
    housingRange: [1660, 32077],
    insuranceRange: [3957, 19783],
  },
  {
    label: '深圳',
    value: '深圳',
    housingRange: [2200, 34860],
    insuranceRange: [2200, 22941],
  },
  {
    label: '广州',
    value: '广州',
    insuranceRange: [4588, 22941],
    housingRange: [2100, 33786],
  },
  {
    label: '西安',
    value: '西安',
    insuranceRange: [3121, 16749],
    housingRange: [1950, 24829],
  },
  {
    label: '成都',
    value: '成都',
    insuranceRange: [3416, 17317],
    housingRange: [1650, 25499],
  },
  {
    label: '苏州',
    value: '苏州',
    insuranceRange: [3368, 19335],
    housingRange: [1650, 25499],
  },
  {
    label: '厦门',
    value: '厦门',
    insuranceRange: [3676, 18379],
    housingRange: [1650, 25499],
  },
  {
    label: '其他',
    value: '其他',
    housingRange: [2320, 28221],
    insuranceRange: [5360, 28221],
  },
];
