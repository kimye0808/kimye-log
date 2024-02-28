/**
 * 날짜 형식 'YYYY-MM-DD'로 변환하여 string 리턴
 */
export function formatDate(time: Date): string {
  const year = time.getFullYear();
  const month = ("0" + (time.getMonth() + 1)).slice(-2);
  const day = ("0" + time.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

/**
 * 정규표현식을 사용하여 날짜 형식이 'YYYY-MM-DD'인지 확인
 */
export function isValidDateFormat(dateString: string) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormat.test(dateString);
}
