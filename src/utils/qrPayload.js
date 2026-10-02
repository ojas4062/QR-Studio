/**
 * Utility functions for generating standardized QR code string payloads.
 */

// Helper to escape special characters in Wi-Fi SSIDs and passwords according to the ZXing QR spec
export const escapeWifiString = (str = '') => {
  return str.replace(/([\\;:,])/g, '\\$1');
};

/**
 * Constructs the formatted payload string based on the QR code type.
 * @param {string} type - 'url' | 'text' | 'email' | 'phone' | 'wifi'
 * @param {object} data - Input form values
 * @returns {string} Formatted QR payload
 */
export const buildQRPayload = (type, data) => {
  if (!data) return '';

  switch (type) {
    case 'url': {
      let url = (data.url || '').trim();
      if (!url) return '';
      // Default to https:// if protocol is missing
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }

    case 'text': {
      return (data.text || '').trim();
    }

    case 'email': {
      const recipient = (data.email || '').trim();
      if (!recipient) return '';
      const subject = (data.subject || '').trim();
      const body = (data.body || '').trim();

      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);

      const queryString = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${recipient}${queryString}`;
    }

    case 'phone': {
      const phone = (data.phone || '').trim();
      if (!phone) return '';
      // Strip spaces or non-standard characters for tel link
      const sanitizedPhone = phone.replace(/[^\d+]/g, '');
      return `tel:${sanitizedPhone || phone}`;
    }

    case 'wifi': {
      const ssid = (data.ssid || '').trim();
      if (!ssid) return '';
      const authType = data.encryption || 'WPA'; // 'WPA', 'WEP', 'nopass'
      const password = data.password || '';
      const hidden = Boolean(data.hidden);

      const escapedSsid = escapeWifiString(ssid);
      const escapedPassword = authType === 'nopass' ? '' : escapeWifiString(password);

      return `WIFI:S:${escapedSsid};T:${authType};P:${escapedPassword};H:${hidden ? 'true' : 'false'};;`;
    }

    default:
      return '';
  }
};
