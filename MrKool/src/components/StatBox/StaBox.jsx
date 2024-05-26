import React from 'react';
import { Card, Typography, Progress } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'; // Import PropTypes

const { Title, Text } = Typography;

const StatBox = ({ title, subtitle, progress, increase }) => {
  return (
    <Card style={{ width: 200, textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <UserAddOutlined style={{ fontSize: '26px', color: '#52c41a' }} />
          <Title level={4}>{title}</Title>
        </div>
        {progress && (
          <div>
            <Progress type="circle" percent={progress * 100} width={50} />
          </div>
        )}
      </div>
      <Text style={{ fontSize: 24 }}>{subtitle}</Text>
      <Text style={{ fontSize: 16 }}>{increase}</Text>
    </Card>
  );
};
StatBox.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and must be a string
  subtitle: PropTypes.string.isRequired, // Value is required and must be a string
  progress: PropTypes.number,
  increase: PropTypes.string,
};
export default StatBox;
