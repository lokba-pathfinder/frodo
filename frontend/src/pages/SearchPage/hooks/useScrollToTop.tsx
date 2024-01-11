import { useEffect, useRef } from 'react';

const useScrollToTop = <T extends HTMLElement>(...depsElements: unknown[]) => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (containerRef === null || containerRef.current === null) return;

    containerRef.current.scrollTop = 0;
  }, [...depsElements]);

  return containerRef;
};

export default useScrollToTop;
