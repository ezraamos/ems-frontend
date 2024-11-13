import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAuthHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
} as const;

export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
};

export const verifyUser = async () => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.get(`${apiBaseUrl}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.success;
    }
  } catch (error) {
    console.log('error verifying user', error);
  }
};
