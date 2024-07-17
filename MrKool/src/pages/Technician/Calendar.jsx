import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Badge } from 'antd';

const Schedule = () => {
  const { schedule } = useSelector((state) => state.schedule);

  const getListData = (value) => {
    const date = value.format('YYYY-MM-DD');
    return schedule[date] || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.status} text={item.customerName} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default Schedule;
