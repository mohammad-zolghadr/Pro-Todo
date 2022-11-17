import React, { useEffect, useState } from 'react';

// Css
import style from './Work.module.css';

// Icons
import clockOn from '../assets/image/clock-on.png';
import checkOn from '../assets/image/check-on.png';
import checkOff from '../assets/image/check-off.png';
import trash from '../assets/image/trash.svg';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { doneWork, undoneWork, removeWork } from '../redux/workAdding/workAddAction';

const Work = ({ data }) => {
  // Control Show Limited Character
  const [descControll, setDescControll] = useState({ desc: '', showPoints: true });

  const { id, title, time, priority, isDone, desc } = data;
  const [isDoneState, setIsDoneState] = useState(isDone);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setDescControll({ desc: desc.substring(0, 100), showPoints: true });
  }, []);

  const setPriority = (priority) => {
    switch (priority) {
      case 'high':
        return 'خیلی مهم';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'خیلی کم';
    }
  };

  const doWorkHandler = () => {
    isDoneState ? dispatch(undoneWork(data)) : dispatch(doneWork(data));
    setIsDoneState(state.workList.find((e) => e.id === id).isDone);
  };

  const removeWorkHandler = () => {
    dispatch(removeWork(data));
  };

  return (
    <>
      <div
        className={isDoneState ? `${style.wlWrapper} ${style.wlDone}` : style.wlWrapper}
      >
        <h2>{title}</h2>
        <span className={style.priorityLabel}>{setPriority(priority)}</span>
        <div className={style.wlClock}>
          <img src={clockOn} alt="clock" />
          <span>{time} ساعت</span>
        </div>
        <p>
          {descControll.desc}
          <span
            className={style.wlShowMore}
            onClick={() => {
              setDescControll({ desc: desc, showPoints: false });
            }}
          >
            {descControll.showPoints && descControll.desc && <> ....</>}
          </span>
        </p>
        <div className={style.wlDoOrRemove}>
          <img
            className={style.wlCheck}
            src={isDoneState ? checkOn : checkOff}
            onClick={doWorkHandler}
            alt="checked"
          />
          <img
            className={style.wlTrash}
            src={trash}
            onClick={removeWorkHandler}
            alt="trash"
          />
        </div>
      </div>
    </>
  );
};

export default Work;
