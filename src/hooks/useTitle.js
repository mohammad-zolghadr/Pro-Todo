import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | با برنامه باش`;
  }, []);
};

export default useTitle;
