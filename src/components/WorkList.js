import React, { useEffect } from 'react';
import useTitle from '../hooks/useTitle';
import { Link } from 'react-router-dom';

// Css
import style from './WorkList.module.css';

// Icons
import emptyListIco from '../assets/image/emptyList.svg';

// Components
import Work from './Work';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorks } from '../redux/workAdding/workAddAction';

const WorkList = () => {
  useEffect(() => {
    // Get All WorkList From LocalStorage And Put It Into Store(Redux)
    dispatch(getAllWorks());
  }, []);

  useTitle('لیست کار ها');

  const dispatch = useDispatch();
  const loadedItems = useSelector((state) => state);

  return (
    <>
      <div className={style.wlContainer}>
        {loadedItems.workList.length > 0 ? (
          loadedItems.workList.map((item) => {
            return <Work key={item.id} data={item} />;
          })
        ) : (
          <div className={style.wlEmptyList}>
            <img src={emptyListIco} alt="Empty List" />
            <p>لیست کارهات خالیه دوست من!</p>
            <Link to="/add-work">
              <button>اضافه کردن کار جدید</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkList;
