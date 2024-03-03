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

/**
 * firebase storage에 저장하는 용도의 파일 path + 파일명 리턴
 */
export function formatFilePath(fileName: string): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const formattedFileName = `${year}/${month}/${day}/${hours}${minutes}${seconds}_img_${fileName}`;
  return formattedFileName;
}
