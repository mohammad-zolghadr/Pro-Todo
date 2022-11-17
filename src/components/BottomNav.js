import React, { useEffect, useState } from 'react';

// SPA
import { Link, useLocation } from 'react-router-dom';

// Style & Icons
import s from './BottomNav.module.css';
import addOn from '../assets/image/add-on.png';
import addOff from '../assets/image/add-off.png';
import workListOn from '../assets/image/work-list-on.png';
import workListOff from '../assets/image/work-list-off.png';
import dashboardOn from '../assets/image/dashboard-on.png';
import dashboardOff from '../assets/image/dashboard-off.png';

const BottomNav = () => {
  const [add, setAdd] = useState({ src: addOn, className: s.bnItemOn });
  const [work, setWork] = useState({ src: workListOff, className: s.bnItemOff });
  const [dashboard, setDashboard] = useState({
    src: dashboardOff,
    className: s.bnItemOff,
  });
  const location = useLocation();

  useEffect(() => {
    // change color with url
    setNavColor(location.pathname.replace('/', ''));
    console.log(location.pathname.replace('/', ''));
  }, [location.pathname]);

  const setNavColor = (navClicked) => {
    switch (navClicked) {
      case 'add-work':
        setAdd({ src: addOn, className: s.bnItemOn });
        setWork({ src: workListOff, className: s.bnItemOff });
        setDashboard({ src: dashboardOff, className: s.bnItemOff });
        break;
      case 'work-list':
        setAdd({ src: addOff, className: s.bnItemOff });
        setWork({ src: workListOn, className: s.bnItemOn });
        setDashboard({ src: dashboardOff, className: s.bnItemOff });
        break;
      case 'dashboard':
      case '':
        setAdd({ src: addOff, className: s.bnItemOff });
        setWork({ src: workListOff, className: s.bnItemOff });
        setDashboard({ src: dashboardOn, className: s.bnItemOn });
        break;
      default:
        setAdd({ src: addOff, className: s.bnItemOff });
        setWork({ src: workListOff, className: s.bnItemOff });
        setDashboard({ src: dashboardOff, className: s.bnItemOff });
    }
  };

  return (
    <>
      <div className={s.bnWrapper}>
        <Link
          to="/dashboard"
          className={s.bnItem}
          onClick={() => setNavColor('dashboard')}
        >
          <img src={dashboard.src} alt="icon" />
          <span className={dashboard.className}>داشبورد</span>
        </Link>

        <Link to="/add-work" className={s.bnItem} onClick={() => setNavColor('add-work')}>
          <img src={add.src} alt="icon" />
          <span className={add.className}>اضافه کردن</span>
        </Link>

        <Link
          to="/work-list"
          className={s.bnItem}
          onClick={() => setNavColor('work-list')}
        >
          <img src={work.src} alt="icon" />
          <span className={work.className}>لیست کارها</span>
        </Link>
      </div>
    </>
  );
};

export default BottomNav;
