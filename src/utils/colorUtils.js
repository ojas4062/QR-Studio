/**
 * Helper utilities for analyzing color contrast and QR scan reliability.
 */

// Converts Hex color string (#RRGGBB) to RGB object
export const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return { r: 0, g: 0, b: 0 };
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

// Calculates relative luminance for WCAG contrast formula
export const getLuminance = ({ r, g, b }) => {
  const normalize = (val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
};

/**
 * Computes contrast ratio between two hex colors.
 * @param {string} foregroundHex
 * @param {string} backgroundHex
 * @returns {object} { ratio: number, isReliable: boolean, warning: string | null }
 */
export const checkScanReliability = (foregroundHex, backgroundHex) => {
  const fgRgb = hexToRgb(foregroundHex);
  const bgRgb = hexToRgb(backgroundHex);

  const l1 = getLuminance(fgRgb);
  const l2 = getLuminance(bgRgb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  const roundedRatio = Math.round(ratio * 10) / 10;

  if (foregroundHex.toLowerCase() === backgroundHex.toLowerCase()) {
    return {
      ratio: roundedRatio,
      isReliable: false,
      warning: 'Foreground and background colors are identical. The QR code will be completely invisible.'
    };
  }

  if (ratio < 2.5) {
    return {
      ratio: roundedRatio,
      isReliable: false,
      warning: 'Low contrast detected! Most phone cameras will fail to scan this QR code.'
    };
  }

  if (ratio < 4.0) {
    return {
      ratio: roundedRatio,
      isReliable: true,
      warning: 'Moderate contrast. Scanning might be slow in dim lighting conditions.'
    };
  }

  return {
    ratio: roundedRatio,
    isReliable: true,
    warning: null
  };
};
