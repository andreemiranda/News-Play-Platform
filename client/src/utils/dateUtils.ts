/**
 * Date utility functions for NewsPlay
 * Handles date formatting and relative time calculations
 */

/**
 * Formats a date string to Brazilian Portuguese locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a date string to short format (DD/MM/YYYY)
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Formats a date string to include time (DD/MM/YYYY às HH:MM)
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  
  const dateStr = date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  const timeStr = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return `${dateStr} às ${timeStr}`;
}

/**
 * Returns relative time string (e.g., "2 horas atrás", "3 dias atrás")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  
  // Convert to different time units
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  // Return appropriate relative time string
  if (diffInMinutes < 1) {
    return 'Agora mesmo';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'} atrás`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'semana' : 'semanas'} atrás`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'} atrás`;
  } else {
    return `${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'} atrás`;
  }
}

/**
 * Checks if a date is today
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

/**
 * Checks if a date is yesterday
 */
export function isYesterday(dateString: string): boolean {
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return date.getDate() === yesterday.getDate() &&
         date.getMonth() === yesterday.getMonth() &&
         date.getFullYear() === yesterday.getFullYear();
}

/**
 * Gets a human-readable date label (Today, Yesterday, or formatted date)
 */
export function getDateLabel(dateString: string): string {
  if (isToday(dateString)) {
    return 'Hoje';
  } else if (isYesterday(dateString)) {
    return 'Ontem';
  } else {
    return formatDate(dateString);
  }
}

/**
 * Formats time only (HH:MM)
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formats month and year (Janeiro 2024)
 */
export function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  });
}

/**
 * Gets the start of day for a date
 */
export function getStartOfDay(date: Date): Date {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
}

/**
 * Gets the end of day for a date
 */
export function getEndOfDay(date: Date): Date {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
}

/**
 * Checks if a date is within the last N days
 */
export function isWithinLastDays(dateString: string, days: number): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
  return diffInDays <= days;
}

/**
 * Formats date for API queries (YYYY-MM-DD)
 */
export function formatForApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parses various date formats and returns a consistent Date object
 */
export function parseDate(dateInput: string | Date): Date {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  
  // Handle WordPress date format
  const date = new Date(dateInput);
  
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date format: ${dateInput}`);
    return new Date();
  }
  
  return date;
}

/**
 * Gets Brazilian timezone offset
 */
export function getBrazilianTime(dateString: string): Date {
  const date = new Date(dateString);
  
  // Brazil is UTC-3 (or UTC-2 during daylight saving time)
  // This is a simplified version - for production, consider using a proper timezone library
  const utcTime = date.getTime();
  const brazilOffset = -3 * 60 * 60 * 1000; // UTC-3 in milliseconds
  
  return new Date(utcTime + brazilOffset);
}
