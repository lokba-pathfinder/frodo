import { getSearchParam } from '@src/utils/element-utils';
import { useEffect, useState } from 'react';

/**
 * getSearchParam을 사용하면 페이지 상태 변화에 맞춰 변경되지 않는 문제가 있어요.
 * 'popstate' 이벤트를 등록해 브라우저 기록이 변경될 때 업데이트하도록 구현했어요.
 */
const useSearchParam = (param: string, defaultParam = '') => {
  const [searchParam, setSearchParam] = useState<string>(getSearchParam(param) ?? defaultParam);

  useEffect(() => {
    const handleUpdate = () => setSearchParam(getSearchParam(param) ?? defaultParam);

    window.addEventListener('popstate', handleUpdate);

    return () => {
      window.removeEventListener('popstate', handleUpdate);
    };
  }, [param, defaultParam]);

  return searchParam;
};

export default useSearchParam;
