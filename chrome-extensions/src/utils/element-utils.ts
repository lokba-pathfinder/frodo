/**
 * 특정 Element를 찾는 시점에, CSR, 지연 로딩 등 여러 원인으로
 * 브라우저 DOM 상에서 Element가 존재하는 것을 보장할 수 없어요.
 *
 * 해당 Element가 추가되어야만 하는 경우, DOM 변경을 observe 하면서,
 * selector에 맞는 Element를 찾는 Promise를 반환해요.
 */
export const waitForElementReady = <T extends Element>(selector: string) =>
  new Promise<T>((resolve) => {
    const element = document.querySelector<T>(selector);

    if (element !== null) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const updatedElement = document.querySelector<T>(selector);

      if (updatedElement !== null) {
        resolve(updatedElement);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

export const getSearchParam = (param: string) => {
  const searchParam = new URLSearchParams(document.location.search);

  return searchParam.get(param);
};
