import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export function generateMockHealthData() {
  return {
    heartRate: 72 + Math.floor(Math.random() * 20),
    sleep: 7 + Math.random() * 2,
    steps: 8000 + Math.floor(Math.random() * 4000),
    stress: Math.floor(Math.random() * 10) + 1,
  }
}