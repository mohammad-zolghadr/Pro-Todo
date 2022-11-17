import React, { useEffect, useRef, useState } from 'react';

import style from './Dialog.module.css';

const Dialog = ({ data }) => {
  const [clsName, setClsName] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    showDialog();
  });

  const showDialog = () => {
    if (data.show) {
      ref.current.style.top = '0%';
      setTimeout(() => {
        ref.current.style.top = '-200%';
      }, 3000);
    }
    data.type
      ? setClsName(`${style.dialogWrapper} ${style.dbgSuccess}`)
      : setClsName(`${style.dialogWrapper} ${style.dbgError}`);
  };

  return (
    <>
      <div ref={ref} className={clsName}>
        <p>{data.message}</p>
      </div>
    </>
  );
};

export { Dialog };
