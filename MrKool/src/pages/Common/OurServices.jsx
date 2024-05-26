// OurServices.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Pagination, Spin } from 'antd';
import { fetchProduct, setCurrentPage, setPageSize } from '../../redux/slice/productSlice';

const OurServices = () => {
  const dispatch = useDispatch();
  const { product, loading, currentPage, totalPages, pageSize } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, currentPage, pageSize]);


  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageSizeChange = (_, size) => {
    dispatch(setPageSize(size));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div>
      <h2>Our Services</h2>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={product}
            pagination={false}
            rowKey="id"
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalPages * pageSize}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
          />
        </>
      )}
    </div>
  );
};

export default OurServices;