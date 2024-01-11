import { useEffect, useRef } from 'react';

const useScrollToHighlight = <T extends HTMLElement>(
  selector: string,
  ...depsElements: unknown[]
) => {
  const containerRef = useRef<T | null>(null);

  // target이 container의 범위 내에 포함되는지 여부를 반환합니다.
  const isInScrollableArea = (container: DOMRect, target: DOMRect) =>
    target.top >= container.top &&
    target.left >= container.left &&
    target.bottom <= container.bottom &&
    target.right <= container.right;

  const scrollToHighlight = () => {
    const container = containerRef?.current;
    const target = container?.querySelector(selector);

    if (container === null || target === null || target === undefined) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // 하이라이트 된 대상이 현재 화면에 보인다면 추가적으로 스크롤을 하지 않도록 처리했어요.
    if (isInScrollableArea(containerRect, targetRect)) {
      return;
    }

    target.scrollIntoView({ block: 'center' });
  };

  useEffect(() => {
    scrollToHighlight();
  }, [selector, ...depsElements]);

  return { scrollToHighlight, containerRef };
};

export default useScrollToHighlight;
