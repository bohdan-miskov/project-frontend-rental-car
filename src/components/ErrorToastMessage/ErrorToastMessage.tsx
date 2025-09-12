import { useEffect } from 'react';
import toast from 'react-hot-toast';
import type { Props } from './ErrorToastMessage.types';

const toastStyleOptions = {
  background: '#1e1e2f',
  color: '#fff',
  border: '1px solid #ef4444',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: '500',
  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
};

const toastIconThemeOptions = {
  primary: '#ef4444',
  secondary: '#fff',
};

export default function ErrorToastMessage({
  children,
  duration = 5000,
}: Props) {
  useEffect(() => {
    if (!children) return;

    toast.error(String(children), {
      duration,
      style: toastStyleOptions,
      iconTheme: toastIconThemeOptions,
    });
  }, [children, duration]);

  return null;
}
