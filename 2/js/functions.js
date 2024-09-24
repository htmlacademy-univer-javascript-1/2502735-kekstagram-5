// Функция для проверки длины строки
function checkStringLenght(str, maxLength) {
  return str.length <= maxLength;
}
checkStringLenght();

// Функция для проверки, является ли строка палиндромом
function checkPalindrome(str) {
  const processedStr = str.toLowerCase().replaceAll(' ', '');

  const reversedStr = processedStr.split('').reverse().join('');

  return processedStr === reversedStr;
}
checkPalindrome();
