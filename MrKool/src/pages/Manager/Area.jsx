import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { getAreas, clearError } from '../../redux/slice/areaSlice';

const AreaListPage = () => {
  const dispatch = useDispatch();
  const { areas, loading, error } = useSelector(state => state.area);

  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const columns = [
    { title: 'Area ID', dataIndex: 'id', key: 'id' },
    { title: 'Area Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link to={`/area/${record.id}`}>View Details</Link>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Table dataSource={areas} columns={columns} rowKey="id" />
    </div>
  );
};

export default AreaListPage;
