import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export function FormInputs({ type, formData, onChange, validationError }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const finalValue = inputType === 'checkbox' ? checked : value;
    onChange({
      ...formData,
      [name]: finalValue,
    });
  };

  return (
    <div className="form-inputs-container">
      <label className="section-label">2. Enter Content Details</label>

      {validationError && (
        <div className="validation-error-alert" role="alert">
          <AlertCircle size={18} />
          <span>{validationError}</span>
        </div>
      )}

      {type === 'url' && (
        <div className="form-group">
          <label htmlFor="input-url">Website URL <span className="required">*</span></label>
          <input
            id="input-url"
            type="url"
            name="url"
            className="input-field"
            placeholder="e.g. srmist.edu.in or https://github.com"
            value={formData.url || ''}
            onChange={handleInputChange}
            autoFocus
          />
          <span className="field-hint">Include domain name. http:// or https:// will be prepended automatically if omitted.</span>
        </div>
      )}

      {type === 'text' && (
        <div className="form-group">
          <label htmlFor="input-text">Text Message <span className="required">*</span></label>
          <textarea
            id="input-text"
            name="text"
            className="input-field textarea-field"
            placeholder="Type any plain text, note, or announcement..."
            rows={4}
            value={formData.text || ''}
            onChange={handleInputChange}
            maxLength={2000}
            autoFocus
          />
          <div className="character-count">
            {(formData.text || '').length} / 2000 characters
          </div>
        </div>
      )}

      {type === 'email' && (
        <div className="form-group-stack">
          <div className="form-group">
            <label htmlFor="input-email">Recipient Email Address <span className="required">*</span></label>
            <input
              id="input-email"
              type="email"
              name="email"
              className="input-field"
              placeholder="e.g. contact@gdgsrm.org"
              value={formData.email || ''}
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="input-subject">Email Subject <span className="optional">(Optional)</span></label>
            <input
              id="input-subject"
              type="text"
              name="subject"
              className="input-field"
              placeholder="e.g. GDG SRM Recruitment Inquiry"
              value={formData.subject || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="input-body">Email Body <span className="optional">(Optional)</span></label>
            <textarea
              id="input-body"
              name="body"
              className="input-field textarea-field"
              placeholder="Default email message body..."
              rows={3}
              value={formData.body || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      {type === 'phone' && (
        <div className="form-group">
          <label htmlFor="input-phone">Phone Number <span className="required">*</span></label>
          <input
            id="input-phone"
            type="tel"
            name="phone"
            className="input-field"
            placeholder="e.g. +91 98765 43210"
            value={formData.phone || ''}
            onChange={handleInputChange}
            autoFocus
          />
          <span className="field-hint">Include country code for international calls.</span>
        </div>
      )}

      {type === 'wifi' && (
        <div className="form-group-stack">
          <div className="form-group">
            <label htmlFor="input-ssid">Network Name (SSID) <span className="required">*</span></label>
            <input
              id="input-ssid"
              type="text"
              name="ssid"
              className="input-field"
              placeholder="e.g. SRM_Student_WiFi"
              value={formData.ssid || ''}
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="input-encryption">Security Type</label>
            <select
              id="input-encryption"
              name="encryption"
              className="input-field select-field"
              value={formData.encryption || 'WPA'}
              onChange={handleInputChange}
            >
              <option value="WPA">WPA / WPA2 / WPA3 Personal (Recommended)</option>
              <option value="WEP">WEP (Legacy)</option>
              <option value="nopass">Open Network (No Password)</option>
            </select>
          </div>

          {formData.encryption !== 'nopass' && (
            <div className="form-group">
              <label htmlFor="input-password">Wi-Fi Password <span className="required">*</span></label>
              <div className="password-input-wrapper">
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input-field"
                  placeholder="Network password"
                  value={formData.password || ''}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="hidden"
                checked={Boolean(formData.hidden)}
                onChange={handleInputChange}
              />
              <span>Hidden Wi-Fi Network</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
