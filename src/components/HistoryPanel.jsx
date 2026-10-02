import React, { useState } from 'react';
import { History, Trash2, RotateCcw, Link, FileText, Mail, Phone, Wifi, Clock } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

const TYPE_ICONS = {
  url: Link,
  text: FileText,
  email: Mail,
  phone: Phone,
  wifi: Wifi,
};

export function HistoryPanel({ history, onReuse, onDeleteItem, onClearAll }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const getItemLabel = (item) => {
    const { type, formData, payload } = item;
    if (type === 'url') return formData?.url || payload;
    if (type === 'text') return formData?.text ? (formData.text.length > 35 ? formData.text.slice(0, 35) + '...' : formData.text) : payload;
    if (type === 'email') return formData?.email ? `Email to: ${formData.email}` : payload;
    if (type === 'phone') return formData?.phone ? `Call: ${formData.phone}` : payload;
    if (type === 'wifi') return formData?.ssid ? `Wi-Fi: ${formData.ssid}` : payload;
    return payload;
  };

  return (
    <div className="history-panel-container">
      <div className="history-header">
        <div className="history-title">
          <History size={18} />
          <h3>Recent History</h3>
          <span className="history-count-pill">{history.length}</span>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            className="clear-all-btn"
            onClick={() => setIsModalOpen(true)}
            title="Clear all saved history"
          >
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty-state">
          <Clock size={32} className="empty-icon" />
          <p>No recent QR codes saved yet.</p>
          <span className="empty-subtext">Generated QR codes will automatically or manually save here.</span>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => {
            const Icon = TYPE_ICONS[item.type] || Link;
            return (
              <div key={item.id} className="history-card">
                <div className="history-card-main">
                  <div className="history-type-badge">
                    <Icon size={14} />
                    <span className="badge-type-name">{item.type.toUpperCase()}</span>
                  </div>
                  <div className="history-payload-text" title={item.payload}>
                    {getItemLabel(item)}
                  </div>
                  <div className="history-meta">
                    <span className="history-time">{formatDate(item.createdAt)}</span>
                    {item.customization && (
                      <span
                        className="history-color-dot"
                        style={{
                          backgroundColor: item.customization.fgColor,
                          borderColor: item.customization.bgColor,
                        }}
                        title={`FG: ${item.customization.fgColor}, BG: ${item.customization.bgColor}`}
                      />
                    )}
                  </div>
                </div>

                <div className="history-card-actions">
                  <button
                    type="button"
                    className="history-action-btn reuse-btn"
                    onClick={() => onReuse(item)}
                    title="Load into editor"
                  >
                    <RotateCcw size={14} />
                    <span>Reuse</span>
                  </button>
                  <button
                    type="button"
                    className="history-action-btn delete-btn"
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete item"
                    aria-label="Delete history item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Clear QR History?"
        message="Are you sure you want to delete all saved QR codes from browser storage? This action cannot be undone."
        onConfirm={() => {
          onClearAll();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
