import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  
  // Ensure createdAt is a Date object
  const createdAtDate = new Date(createdAt);

  // Calculate the difference in milliseconds
  const diff = now.getTime() - createdAtDate.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(diff / 1000);

  // Define time intervals
  const intervals: { label: string; seconds: number }[] = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  // Find the appropriate interval
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  // If less than a minute
  return 'just now';
};


export const formatLargeNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString(); // Return the number as is if it's less than 1000
  } else if (num < 1000000) {
    // Convert to K for thousands
    return (num / 1000).toFixed(1) + 'K';
  } else if (num < 1000000000) {
    // Convert to M for millions
    return (num / 1000000).toFixed(1) + 'M';
  } else {
    // Convert to B for billions
    return (num / 1000000000).toFixed(1) + 'B';
  }
};