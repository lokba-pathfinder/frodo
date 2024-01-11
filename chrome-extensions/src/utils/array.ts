// 배열의 뒤에서부터 조건에 부합하는 첫번째 원소를 찾아서 반환합니다.
// Array.findLast 사용 시 TS2339: Property 'findLast' does not exist ... 오류가 발생해서 구현했어요.
export const findLast = <T>(array: T[], condition: (item: T) => boolean): T | undefined => {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (condition(array[i])) {
      return array[i];
    }
  }

  return undefined;
};
