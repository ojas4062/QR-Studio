import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title">
            <AlertTriangle className="modal-icon-danger" size={20} />
            <h3>{title}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onCancel} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-btn secondary-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="modal-btn danger-btn" onClick={onConfirm}>
            Yes, Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
