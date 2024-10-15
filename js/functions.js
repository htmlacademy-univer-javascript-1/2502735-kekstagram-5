function checkStringLenght(str, maxLength) {
  return str.length <= maxLength;
}
checkStringLenght();

function checkPalindrome(str) {
  const processedStr = str.toLowerCase().replaceAll(' ', '');

  const reversedStr = processedStr.split('').reverse().join('');

  return processedStr === reversedStr;
}
checkPalindrome();

function formatStrInMinutes(timeStr) {
  const parts = timeStr.split(':');

  return Number(parts[0]) * 60 + Number(parts[1] || 0);
}

function workingDay(startWork, endWork, meetingTime, duration) {
  const startWorkMin = formatStrInMinutes(startWork);
  const endWorkMin = formatStrInMinutes(endWork);
  const meetingTimeMin = formatStrInMinutes(meetingTime);
  const durationMin = meetingTimeMin + duration;

  if (meetingTimeMin >= startWorkMin && durationMin <= endWorkMin) {
    return true;
  } else {
    return false;
  }
}
workingDay();
