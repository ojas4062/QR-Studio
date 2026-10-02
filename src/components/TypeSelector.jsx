import React from 'react';
import { Link, FileText, Mail, Phone, Wifi } from 'lucide-react';

const QR_TYPES = [
  { id: 'url', label: 'Website URL', icon: Link, description: 'Link to any website address' },
  { id: 'text', label: 'Plain Text', icon: FileText, description: 'Plain text message or notes' },
  { id: 'email', label: 'Email', icon: Mail, description: 'Pre-filled email message' },
  { id: 'phone', label: 'Phone Call', icon: Phone, description: 'Direct phone dial number' },
  { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi, description: 'Instant Wi-Fi connection QR' },
];

export function TypeSelector({ activeType, onSelectType }) {
  return (
    <div className="type-selector-container">
      <label className="section-label">1. Select QR Code Content Type</label>
      <div className="type-grid" role="tablist" aria-label="QR Code Content Types">
        {QR_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`type-tab-button ${isActive ? 'active' : ''}`}
              onClick={() => onSelectType(type.id)}
            >
              <Icon size={20} className="tab-icon" />
              <div className="tab-text">
                <span className="tab-title">{type.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
