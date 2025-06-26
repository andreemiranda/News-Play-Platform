/**
 * Text utility functions for NewsPlay
 * Handles text processing, formatting, and manipulation
 */

/**
 * Strips HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags
  const withoutTags = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = withoutTags;
  const decoded = textarea.value;
  
  // Clean up extra whitespace
  return decoded.replace(/\s+/g, ' ').trim();
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  
  // Find the last space before the max length to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0 && lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Extracts excerpt from content with smart truncation
 */
export function createExcerpt(content: string, maxLength: number = 160): string {
  const cleanText = stripHtml(content);
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Try to end at a sentence
  const truncated = cleanText.substring(0, maxLength);
  const lastSentence = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );
  
  if (lastSentence > maxLength * 0.6) {
    return truncated.substring(0, lastSentence + 1);
  }
  
  // Fall back to word boundary
  return truncateText(cleanText, maxLength);
}

/**
 * Converts text to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Capitalizes the first letter of each word
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Capitalizes only the first letter of the text
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Removes extra whitespace and normalizes line breaks
 */
export function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize line breaks
    .replace(/\r/g, '\n') // Convert remaining \r to \n
    .replace(/\n{3,}/g, '\n\n') // Max 2 consecutive line breaks
    .replace(/[ \t]+/g, ' ') // Normalize spaces and tabs
    .trim();
}

/**
 * Counts words in a text
 */
export function countWords(text: string): number {
  const cleanText = stripHtml(text).trim();
  if (!cleanText) return 0;
  
  return cleanText.split(/\s+/).length;
}

/**
 * Estimates reading time in minutes
 */
export function estimateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const wordCount = countWords(text);
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Highlights search terms in text with HTML
 */
export function highlightSearchTerms(text: string, searchTerms: string): string {
  if (!text || !searchTerms) return text;
  
  const terms = searchTerms
    .toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 2) // Only highlight terms longer than 2 characters
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape regex special characters
  
  if (terms.length === 0) return text;
  
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

/**
 * Extracts text content from HTML while preserving some formatting
 */
export function htmlToPlainText(html: string): string {
  if (!html) return '';
  
  // Convert some HTML elements to plain text equivalents
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Checks if text contains any of the search terms
 */
export function containsSearchTerms(text: string, searchTerms: string): boolean {
  if (!text || !searchTerms) return false;
  
  const lowerText = text.toLowerCase();
  const terms = searchTerms.toLowerCase().split(/\s+/);
  
  return terms.some(term => term.length > 2 && lowerText.includes(term));
}

/**
 * Formats large numbers (e.g., 1000 -> 1k, 1000000 -> 1M)
 */
export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  
  const units = ['', 'k', 'M', 'B'];
  const unitIndex = Math.floor(Math.log10(num) / 3);
  const scaledNum = num / Math.pow(1000, unitIndex);
  
  return `${scaledNum.toFixed(scaledNum < 10 ? 1 : 0)}${units[unitIndex]}`;
}

/**
 * Sanitizes text input to prevent XSS
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/&/g, '&amp;');
}

/**
 * Extracts the first image URL from HTML content
 */
export function extractFirstImage(html: string): string | null {
  if (!html) return null;
  
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  
  return match ? match[1] : null;
}

/**
 * Removes specific HTML tags while keeping content
 */
export function stripSpecificTags(html: string, tags: string[]): string {
  if (!html || !tags.length) return html;
  
  const tagPattern = tags.join('|');
  const regex = new RegExp(`<\\/?(?:${tagPattern})(?:\\s[^>]*)?>`, 'gi');
  
  return html.replace(regex, '');
}

/**
 * Converts URLs in text to clickable links
 */
export function linkifyUrls(text: string): string {
  if (!text) return '';
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Generates a random string for IDs
 */
export function generateId(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats text for meta descriptions (removes special characters, limits length)
 */
export function formatMetaDescription(text: string, maxLength: number = 160): string {
  const clean = stripHtml(text)
    .replace(/[^\w\s.-]/g, '') // Remove special characters except periods and hyphens
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  return truncateText(clean, maxLength);
}
