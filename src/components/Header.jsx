import React from 'react';
import { QrCode, Sun, Moon, Sparkles } from 'lucide-react';

export function Header({ theme, toggleTheme }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">
          <QrCode className="icon" size={28} />
        </div>
        <div className="brand-text">
          <h1>
            QR Studio <span className="badge">GDG SRM</span>
          </h1>
          <p>Create, Customize & Export High-Quality QR Codes</p>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={18} className="theme-icon sun" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} className="theme-icon moon" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
