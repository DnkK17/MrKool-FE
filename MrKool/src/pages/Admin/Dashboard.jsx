import React from 'react';
import { Card, Row, Col, Button, List } from 'antd';
import StatBox from '../../components/StatBox/StaBox';
import BarChart from '../../components/BarChart/BarChart';
import { DownloadOutlined } from '@ant-design/icons';


const data = [
  { id: '01e4dsa', name: 'johndoe', date: '2021-09-01', amount: '$43.95' },
  { id: '0315dsaa', name: 'jackdower', date: '2022-04-01', amount: '$133.45' },
  { id: '01e4dsa', name: 'aberdjohnny', date: '2021-09-01', amount: '$43.95' }
];

const Dashboard = () => {
  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress={0.30}
            increase="+5%"
          />            </Col>
        <Col span={6}>
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress={0.30}
            increase="+5%"
          />              </Col>
        <Col span={6}>
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress={0.30}
            increase="+5%"
          />              </Col>
        <Col span={6}>
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress={0.30}
            increase="+5%"
          />
        </Col>
        <Col span={14}>
          <Card title={'Revenue Generated'} bordered={false} style={{ marginTop: 16 }}>
            <BarChart isDashboard={true} />
            <Button type="primary" style={{ marginTop: 16 }} icon={<DownloadOutlined />}>
              Download Reports
            </Button>
          </Card></Col>


        <Col span={10}>
          <Card title="Recent Transactions" bordered={false} style={{ marginTop: 16 }}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.id}</a>}
                    description={`${item.name} - ${item.date}`}
                  />
                  <div className='color'>{item.amount}</div>
                </List.Item>
              )}
            />
          </Card></Col>
      </Row>
    </div>

  );
};

export default Dashboard;
