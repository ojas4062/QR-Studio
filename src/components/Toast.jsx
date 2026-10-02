import React from 'react';
import { CheckCircle } from 'lucide-react';

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <CheckCircle size={18} className="toast-icon" />
      <span>{message}</span>
    </div>
  );
}
