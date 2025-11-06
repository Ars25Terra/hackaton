export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDateRange(days: number = 7): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

export function formatDate(dateStr: string, locale: string = 'en-US'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function getCurrentTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function isShowtimePast(date: string, startTime: string): boolean {
  const today = getTodayDate();
  
  if (date < today) return true;
  if (date > today) return false;
  
  return startTime < getCurrentTime();
}

export function isDateToday(date: string): boolean {
  return date === getTodayDate();
}

