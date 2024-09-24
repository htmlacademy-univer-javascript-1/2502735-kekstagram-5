// Функция для проверки длины строки
function checkStringLenght(str, maxLength) {
  return str.length <= maxLength;
}

// Примеры:
console.log(checkStringLenght('проверяемая строка', 20)); // true
console.log(checkStringLenght('проверяемая строка', 18)); // true
console.log(checkStringLenght('проверяемая строка', 10)); // false

// Функция для проверки, является ли строка палиндромом
function checkPalindrome(str) {
  const processedStr = str.toLowerCase().replaceAll(' ', '');

  const reversedStr = processedStr.split('').reverse().join('');

  return processedStr == reversedStr;
}

// Примеры:
console.log(checkPalindrome('топот')); // true
console.log(checkPalindrome('ДовОд')); // true
console.log(checkPalindrome('Кекс'));  // false
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true
