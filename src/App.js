import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';

import {
  Button,
  Form,
  InputNumber,
  Radio,
  Col,
  Row,
  Statistic,
  Card
} from 'antd';


const App = () => {
  const handleChange = () => {
    form.submit();

  };

  const onFinish = (values) => {
    let v = values;

    console.log(values);
    let result = window.physicalTestCalculator(v.gender ?? '', v.grade ?? '', {
      weight: v.weight ?? null,
      height: v.height ?? null,
      vital_capacity: v.vital_capacity ?? null,
      sit_and_reach: v.sit_and_reach ?? null,
      standing_long_jump: v.standing_long_jump ?? null,
      race_50m: v.race_50m ?? null,
      pull_up: v.pull_up ?? null,
      race_1000m: v.race_1000m ?? null,
      sit_up: v.sit_up ?? null,
      race_800m: v.race_800m ?? null
    });
    if (typeof (result.performance.bmi) === "undefined") setBMI("Unknown");
    else setBMI(result.performance.bmi + " (" + result.grade.bmi + ")");
    if (result.aggregate.score === 0) setScore("Unknown");
    else setScore(result.aggregate.score + " (" + result.grade.aggregate + ")");
    console.log(result);
  };

  const [form] = Form.useForm();
  const [socre, setScore] = useState("Unknown");
  const [BMI, setBMI] = useState("Unknown");

  return (
    <div style={{
      padding: 24,
      minHeight: 380,
      maxWidth: 800,
      marginInline: 'auto'
    }}>

      {/* extra={<a href="https://imwcr.cn/">More</a>}  */}
      <Card type="inner" title="大学生体测成绩计算器 / Physical Test Score Calculator">
        <p>Thanks to Github project: Polaris-cn/physical-test-calculator</p>
        {/* <p>Thanks to Hosting provider: LGU.ICU</p> */}
        <p>All datas are processed offline. Feel free to use.</p>
        <p>Bug fixed: the grade of BMI had been fixed.</p>
      </Card>
      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="结果 / Result"
      >
        <Row gutter={16} style={{ textAlign: 'center' }}>
          <Col span={12}>
            <Statistic title="BMI" value={BMI} />
          </Col>
          <Col span={12}>
            <Statistic title="分数 / Score" value={socre} />
          </Col>
        </Row>
      </Card>

      <Card
        style={{
          marginTop: 16
        }}
        type="inner" title="成绩填写 / Grades">
        <Form
          name="physical-test"

          onValuesChange={handleChange}
          onFinish={onFinish}
          form={form}
        >

          <Form.Item
            name="gender"
            label="性别 / Gender"
          >
            <Radio.Group>
              <Radio.Button value="male">男 / Male</Radio.Button>
              <Radio.Button value="female">女 / Female</Radio.Button>
            </Radio.Group>
          </Form.Item>


          <Form.Item
            name="grade"
            label="年级 / Grade"
          >
            <Radio.Group>
              <Radio.Button value="freshman">大一 / Freshman</Radio.Button>
              <Radio.Button value="sophomore">大二 / Sophomore</Radio.Button>
              <Radio.Button value="junior">大三 / Junior</Radio.Button>
              <Radio.Button value="senior">大四 / Senior</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="身高 / Height">
            <Form.Item name="height" noStyle>
              <InputNumber min={100} max={300} />
            </Form.Item>
            <span className="ant-form-text"> cm</span>
          </Form.Item>

          <Form.Item label="体重 / Weight">
            <Form.Item name="weight" noStyle>
              <InputNumber min={10} />
            </Form.Item>
            <span className="ant-form-text"> kg</span>
          </Form.Item>

          <Form.Item label="肺活量 / Vital Capacity">
            <Form.Item name="vital_capacity" noStyle>
              <InputNumber min={10} />
            </Form.Item>
            <span className="ant-form-text"> mL</span>
          </Form.Item>

          <Form.Item label="坐位体前屈 / Sit and Reach">
            <Form.Item name="sit_and_reach" noStyle>
              <InputNumber />
            </Form.Item>
            <span className="ant-form-text"> cm</span>
          </Form.Item>

          <Form.Item label="立定跳远 / Standing Long Jump">
            <Form.Item name="standing_long_jump" noStyle>
              <InputNumber min={0} />
            </Form.Item>
            <span className="ant-form-text"> cm</span>
          </Form.Item>

          <Form.Item label="50米跑 / 50-meter Race">
            <Form.Item name="race_50m" noStyle>
              <InputNumber min={0} />
            </Form.Item>
            <span className="ant-form-text"> s</span>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >

            {({ getFieldValue }) => getFieldValue('gender') === 'female' ?
              <>
                <Form.Item label="仰卧起坐 / Sit Up">
                  <Form.Item name="sit_up" noStyle>
                    <InputNumber min={0} />
                  </Form.Item>
                  <span className="ant-form-text"> times</span>
                </Form.Item>

                <Form.Item label="800米跑 / 800-meter Race">
                  <Form.Item name="race_800m" noStyle>
                    <InputNumber min={0} />
                  </Form.Item>
                  <span className="ant-form-text"> s</span>
                </Form.Item>
              </>
              :
              <>
                <Form.Item label="引体向上 / Pull Up">
                  <Form.Item name="pull_up" noStyle>
                    <InputNumber min={0} />
                  </Form.Item>
                  <span className="ant-form-text"> times</span>
                </Form.Item>

                <Form.Item label="1000米跑 / 1000-meter Race">
                  <Form.Item name="race_1000m" noStyle>
                    <InputNumber min={0} />
                  </Form.Item>
                  <span className="ant-form-text"> s</span>
                </Form.Item>
              </>
            }
          </Form.Item>






          <Form.Item>
            <Button type="primary" block onClick={() => {
              form.submit();
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>


    </div >
  );
};

export default App;
