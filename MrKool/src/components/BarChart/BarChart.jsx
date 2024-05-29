import React from 'react';
import { BarChart as RechartBarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
const data = [
  { name: 'Tháng 6', 'Tổng đơn hàng': 4000, 'Tổng doanh thu': 2400, amt: 2400 },
  { name: 'Tháng 7', 'Tổng đơn hàng': 3000, 'Tổng doanh thu': 1398, amt: 2210 },
  { name: 'Tháng 8', 'Tổng đơn hàng': 2000, 'Tổng doanh thu': 9800, amt: 2290 },
  { name: 'Tháng 9', 'Tổng đơn hàng': 2780, 'Tổng doanh thu': 3908, amt: 2000 },
  { name: 'Tháng 10', 'Tổng đơn hàng': 1890, 'Tổng doanh thu': 4800, amt: 2181 },
  { name: 'Tháng 11', 'Tổng đơn hàng': 2390, 'Tổng doanh thu': 3800, amt: 2500 },
  { name: 'Tháng 12', 'Tổng đơn hàng': 3490, 'Tổng doanh thu': 4300, amt: 2100 },
];
const BarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Tổng doanh thu" fill="#8884d8" />
        <Bar dataKey="Tổng đơn hàng" fill="#82ca9d" />
      </RechartBarChart>
    </ResponsiveContainer>
  );
};

BarChart.propTypes = {
  isDashboard: PropTypes.bool,
};

export default BarChart;
