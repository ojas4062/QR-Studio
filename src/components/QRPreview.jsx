import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, BookmarkPlus, QrCode as QrIcon, AlertCircle } from 'lucide-react';
import { ScanReliabilityWarning } from './ScanReliabilityWarning';

export function QRPreview({
  payload,
  type,
  isValid,
  customization,
  onSaveToHistory,
  showToast,
}) {
  const canvasRef = useRef(null);
  const [renderError, setRenderError] = useState(null);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { size, fgColor, bgColor, margin, errorCorrectionLevel } = customization;

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!payload || !isValid) {
      // Clear canvas if payload is empty or invalid
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setRenderError(null);
      return;
    }

    setRenderError(null);

    const options = {
      width: size,
      margin: margin,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrectionLevel,
    };

    QRCode.toCanvas(canvasRef.current, payload, options, (err) => {
      if (err) {
        console.error('Error generating QR code:', err);
        setRenderError('Failed to generate QR code. The payload might be too long for the selected error correction level.');
      }
    });
  }, [payload, isValid, size, fgColor, bgColor, margin, errorCorrectionLevel]);

  // Handle PNG Download
  const handleDownload = () => {
    if (!canvasRef.current || !isValid || !payload) return;

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadLink.download = `qr-studio-${type}-${timestamp}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      if (showToast) showToast('PNG downloaded successfully!');
    } catch (err) {
      console.error('Download failed:', err);
      if (showToast) showToast('Failed to download image.');
    }
  };

  // Copy payload text to clipboard
  const handleCopyPayload = async () => {
    if (!payload || !isValid) return;

    try {
      await navigator.clipboard.writeText(payload);
      setCopiedPayload(true);
      if (showToast) showToast('QR payload copied to clipboard!');
      setTimeout(() => setCopiedPayload(false), 2000);
    } catch (err) {
      console.error('Clipboard write failed:', err);
      if (showToast) showToast('Failed to copy to clipboard.');
    }
  };

  // Save to History manually
  const handleSave = () => {
    if (!isValid || !payload) return;
    onSaveToHistory();
    setSavedSuccess(true);
    if (showToast) showToast('Saved to Recent History!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="qr-preview-container">
      <div className="preview-header">
        <h3>Live QR Preview</h3>
        <span className="preview-subtitle">Real-time vector canvas renderer</span>
      </div>

      <div className="preview-card">
        {/* Canvas / Placeholder display */}
        <div className="canvas-wrapper" style={{ backgroundColor: bgColor }}>
          {isValid && payload && !renderError ? (
            <canvas ref={canvasRef} className="qr-canvas" />
          ) : (
            <div className="canvas-placeholder">
              <QrIcon size={48} className="placeholder-icon" />
              <p>{renderError ? renderError : 'Enter valid details on the left to render your QR code'}</p>
            </div>
          )}
        </div>

        {/* Scan Contrast Warnings */}
        {isValid && payload && (
          <div className="warning-container-wrapper">
            <ScanReliabilityWarning fgColor={fgColor} bgColor={bgColor} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="preview-actions">
          <button
            type="button"
            className="action-btn primary-btn"
            disabled={!isValid || !payload || Boolean(renderError)}
            onClick={handleDownload}
          >
            <Download size={18} />
            <span>Download PNG</span>
          </button>

          <button
            type="button"
            className="action-btn secondary-btn"
            disabled={!isValid || !payload || Boolean(renderError)}
            onClick={handleCopyPayload}
            title="Copy QR text payload to clipboard"
          >
            {copiedPayload ? <Check size={18} className="success-check" /> : <Copy size={18} />}
            <span>{copiedPayload ? 'Copied!' : 'Copy Data'}</span>
          </button>

          <button
            type="button"
            className="action-btn secondary-btn"
            disabled={!isValid || !payload || Boolean(renderError)}
            onClick={handleSave}
            title="Save this QR to history"
          >
            {savedSuccess ? <Check size={18} className="success-check" /> : <BookmarkPlus size={18} />}
            <span>{savedSuccess ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
