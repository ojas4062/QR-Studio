import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { TypeSelector } from './components/TypeSelector';
import { FormInputs } from './components/FormInputs';
import { Customizer } from './components/Customizer';
import { QRPreview } from './components/QRPreview';
import { HistoryPanel } from './components/HistoryPanel';
import { Toast } from './components/Toast';

import { buildQRPayload } from './utils/qrPayload';
import { validateForm } from './utils/validation';
import { loadHistory, saveHistoryItem, deleteHistoryItem, clearAllHistory } from './utils/storage';

const DEFAULT_CUSTOMIZATION = {
  size: 256,
  fgColor: '#000000',
  bgColor: '#ffffff',
  margin: 2,
  errorCorrectionLevel: 'M',
};

const DEFAULT_FORM_DATA = {
  url: 'https://github.com',
  text: '',
  email: '',
  subject: '',
  body: '',
  phone: '',
  ssid: '',
  encryption: 'WPA',
  password: '',
  hidden: false,
};

export function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('qr_studio_theme') || 'dark';
  });

  // Active QR type: url, text, email, phone, wifi
  const [activeType, setActiveType] = useState('url');

  // Form input data state
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  // Customizer options state
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);

  // Recent History state from localStorage
  const [history, setHistory] = useState(() => loadHistory());

  // Toast message state
  const [toastMessage, setToastMessage] = useState(null);

  // Update root HTML attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qr_studio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast trigger helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  // Handle QR type tab change
  const handleTypeSelect = (type) => {
    setActiveType(type);
  };

  // Calculate live payload string
  const payload = useMemo(() => {
    return buildQRPayload(activeType, formData);
  }, [activeType, formData]);

  // Perform form validation
  const validation = useMemo(() => {
    return validateForm(activeType, formData);
  }, [activeType, formData]);

  // Function to save current state to history
  const handleSaveToHistory = useCallback(() => {
    if (!validation.isValid || !payload) return;

    const newItem = {
      id: Date.now().toString(),
      type: activeType,
      formData: { ...formData },
      payload,
      customization: { ...customization },
      createdAt: new Date().toISOString(),
    };

    const updated = saveHistoryItem(newItem);
    setHistory(updated);
  }, [validation.isValid, payload, activeType, formData, customization]);

  // Handle Reuse item from History
  const handleReuseHistory = (item) => {
    if (!item) return;
    setActiveType(item.type);
    if (item.formData) {
      setFormData((prev) => ({
        ...prev,
        ...item.formData,
      }));
    }
    if (item.customization) {
      setCustomization(item.customization);
    }
    showToast(`Loaded saved ${item.type.toUpperCase()} QR settings!`);
  };

  // Handle single item delete from History
  const handleDeleteHistoryItem = (id) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    showToast('Deleted item from history.');
  };

  // Handle clear all history
  const handleClearAllHistory = () => {
    const updated = clearAllHistory();
    setHistory(updated);
    showToast('All QR history cleared.');
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main Container */}
      <main className="main-content-grid">
        {/* Left Column: Generator Controls */}
        <section className="controls-column">
          <div className="card shadow-sm">
            <TypeSelector activeType={activeType} onSelectType={handleTypeSelect} />
            <div className="divider" />
            <FormInputs
              type={activeType}
              formData={formData}
              onChange={setFormData}
              validationError={!validation.isValid ? validation.error : null}
            />
          </div>

          <div className="card shadow-sm style-card">
            <Customizer config={customization} onChange={setCustomization} />
          </div>
        </section>

        {/* Right Column: Preview & History */}
        <section className="preview-column">
          <div className="sticky-preview-wrapper">
            <QRPreview
              payload={payload}
              type={activeType}
              isValid={validation.isValid}
              customization={customization}
              onSaveToHistory={handleSaveToHistory}
              showToast={showToast}
            />

            <div className="card shadow-sm history-card-wrapper">
              <HistoryPanel
                history={history}
                onReuse={handleReuseHistory}
                onDeleteItem={handleDeleteHistoryItem}
                onClearAll={handleClearAllHistory}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          <strong>QR Studio</strong> &bull; Built for GDG on Campus SRM Recruitments 2026–27
        </p>
      </footer>

      {/* Floating Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
