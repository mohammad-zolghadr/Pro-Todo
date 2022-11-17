import React from 'react';
import useTitle from '../hooks/useTitle';

const NotFound = () => {
  useTitle('صفحه پیدا نشد');

  return <div>آدرس رو اشتباه زدی داداش!</div>;
};

export default NotFound;
