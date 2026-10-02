import React from 'react';
import { Palette, Sliders, Shield, Layout } from 'lucide-react';

export const PRESETS = [
  { id: 'classic', name: 'Classic Mono', fg: '#000000', bg: '#ffffff', margin: 2 },
  { id: 'midnight', name: 'Midnight', fg: '#1e293b', bg: '#f8fafc', margin: 2 },
  { id: 'ocean', name: 'Ocean Teal', fg: '#0f766e', bg: '#f0fdf4', margin: 2 },
  { id: 'sunset', name: 'Berry Neon', fg: '#9d174d', bg: '#fff1f2', margin: 2 },
  { id: 'emerald', name: 'Emerald', fg: '#065f46', bg: '#ecfdf5', margin: 2 },
  { id: 'cyber', name: 'Warm Amber', fg: '#78350f', bg: '#fefce8', margin: 2 },
  { id: 'darkmode', name: 'Inverted Dark', fg: '#f8fafc', bg: '#0f172a', margin: 2 },
];

export function Customizer({ config, onChange }) {
  const handlePresetSelect = (preset) => {
    onChange({
      ...config,
      fgColor: preset.fg,
      bgColor: preset.bg,
      margin: preset.margin,
    });
  };

  const handleColorChange = (key, value) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="customizer-container">
      <label className="section-label">3. Customize Style & Settings</label>

      {/* Visual Presets */}
      <div className="customizer-block">
        <div className="block-title">
          <Palette size={16} />
          <span>Style Presets</span>
        </div>
        <div className="preset-grid">
          {PRESETS.map((p) => {
            const isSelected = config.fgColor.toLowerCase() === p.fg.toLowerCase() && config.bgColor.toLowerCase() === p.bg.toLowerCase();
            return (
              <button
                key={p.id}
                type="button"
                className={`preset-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => handlePresetSelect(p)}
                title={`Apply ${p.name} style`}
              >
                <span
                  className="preset-preview-dot"
                  style={{ backgroundColor: p.fg, borderColor: p.bg }}
                />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Customization */}
      <div className="customizer-block">
        <div className="block-title">
          <Sliders size={16} />
          <span>Colors</span>
        </div>
        <div className="color-inputs-grid">
          <div className="color-field-group">
            <label htmlFor="fg-color-picker">Foreground (QR Modules)</label>
            <div className="color-picker-wrapper">
              <input
                id="fg-color-picker"
                type="color"
                value={config.fgColor}
                onChange={(e) => handleColorChange('fgColor', e.target.value)}
                className="color-picker-input"
              />
              <input
                type="text"
                value={config.fgColor}
                onChange={(e) => handleColorChange('fgColor', e.target.value)}
                className="input-field color-hex-input"
                maxLength={7}
              />
            </div>
          </div>

          <div className="color-field-group">
            <label htmlFor="bg-color-picker">Background</label>
            <div className="color-picker-wrapper">
              <input
                id="bg-color-picker"
                type="color"
                value={config.bgColor}
                onChange={(e) => handleColorChange('bgColor', e.target.value)}
                className="color-picker-input"
              />
              <input
                type="text"
                value={config.bgColor}
                onChange={(e) => handleColorChange('bgColor', e.target.value)}
                className="input-field color-hex-input"
                maxLength={7}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Size & Margin Controls */}
      <div className="customizer-block">
        <div className="block-title">
          <Layout size={16} />
          <span>Dimensions & Quiet Zone</span>
        </div>

        <div className="range-field-group">
          <div className="range-header">
            <label htmlFor="qr-size-slider">Resolution / Size</label>
            <span className="range-value">{config.size}px × {config.size}px</span>
          </div>
          <input
            id="qr-size-slider"
            type="range"
            min={128}
            max={512}
            step={32}
            value={config.size}
            onChange={(e) => handleColorChange('size', Number(e.target.value))}
            className="range-slider"
          />
        </div>

        <div className="range-field-group" style={{ marginTop: '1rem' }}>
          <div className="range-header">
            <label htmlFor="qr-margin-slider">Quiet Zone (Margin)</label>
            <span className="range-value">{config.margin} modules</span>
          </div>
          <input
            id="qr-margin-slider"
            type="range"
            min={0}
            max={6}
            step={1}
            value={config.margin}
            onChange={(e) => handleColorChange('margin', Number(e.target.value))}
            className="range-slider"
          />
        </div>
      </div>

      {/* Error Correction Level */}
      <div className="customizer-block">
        <div className="block-title">
          <Shield size={16} />
          <span>Error Correction Level</span>
        </div>
        <div className="ecl-buttons-grid">
          {[
            { level: 'L', label: 'L (7%)', desc: 'Low density, high capacity' },
            { level: 'M', label: 'M (15%)', desc: 'Medium (Standard)' },
            { level: 'Q', label: 'Q (25%)', desc: 'High reliability' },
            { level: 'H', label: 'H (30%)', desc: 'Highest error tolerance' },
          ].map((item) => (
            <button
              key={item.level}
              type="button"
              className={`ecl-btn ${config.errorCorrectionLevel === item.level ? 'active' : ''}`}
              onClick={() => handleColorChange('errorCorrectionLevel', item.level)}
              title={item.desc}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
