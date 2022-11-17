import React from 'react';
import useTitle from '../hooks/useTitle';

// Css
import style from './Dashboard.module.css';

// Icon
import developingIco from '../assets/image/developing.svg';

const Dashboard = () => {
  useTitle('داشبورد');

  return (
    <div className={style.dashWrapper}>
      <img src={developingIco} alt="Developing Page" />
      <p>
        این صفحه هنوز تکمیل نشده <br /> ولی قراره که نتایج کارهات رو اینجا تحلیل کنیم!
      </p>
    </div>
  );
};

export default Dashboard;
