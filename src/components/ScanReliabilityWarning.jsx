import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { checkScanReliability } from '../utils/colorUtils';

export function ScanReliabilityWarning({ fgColor, bgColor }) {
  const result = checkScanReliability(fgColor, bgColor);

  if (result.warning) {
    return (
      <div className={`scan-warning-card ${result.isReliable ? 'warning-moderate' : 'warning-severe'}`} role="alert">
        <AlertTriangle className="warning-icon" size={20} />
        <div className="warning-content">
          <strong>Scan Reliability Notice ({result.ratio}:1 contrast ratio)</strong>
          <p>{result.warning}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scan-success-badge">
      <CheckCircle2 size={16} className="success-icon" />
      <span>Optimal Contrast ({result.ratio}:1 ratio) &bull; High Scan Reliability</span>
    </div>
  );
}
