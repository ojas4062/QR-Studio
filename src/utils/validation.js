/**
 * Input validation helpers for QR Studio forms.
 * Returns an object: { isValid: boolean, error: string | null }
 */

export const validateForm = (type, data) => {
  if (!data) {
    return { isValid: false, error: 'Please enter details to generate a QR code.' };
  }

  switch (type) {
    case 'url': {
      const url = (data.url || '').trim();
      if (!url) {
        return { isValid: false, error: 'URL is required.' };
      }
      // Simple regex test for web address domain format
      const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=#]*)?$/i;
      if (!urlPattern.test(url)) {
        return { isValid: false, error: 'Please enter a valid website web address (e.g., example.com or https://example.com).' };
      }
      return { isValid: true, error: null };
    }

    case 'text': {
      const text = (data.text || '').trim();
      if (!text) {
        return { isValid: false, error: 'Text content cannot be empty.' };
      }
      if (text.length > 2000) {
        return { isValid: false, error: 'Text is too long. Please keep it under 2000 characters for optimal scanning.' };
      }
      return { isValid: true, error: null };
    }

    case 'email': {
      const email = (data.email || '').trim();
      if (!email) {
        return { isValid: false, error: 'Email address is required.' };
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address (e.g., user@example.com).' };
      }
      return { isValid: true, error: null };
    }

    case 'phone': {
      const phone = (data.phone || '').trim();
      if (!phone) {
        return { isValid: false, error: 'Phone number is required.' };
      }
      const phonePattern = /^\+?[\d\s\-()]{7,20}$/;
      if (!phonePattern.test(phone)) {
        return { isValid: false, error: 'Please enter a valid phone number (at least 7 digits).' };
      }
      return { isValid: true, error: null };
    }

    case 'wifi': {
      const ssid = (data.ssid || '').trim();
      if (!ssid) {
        return { isValid: false, error: 'Wi-Fi Network Name (SSID) is required.' };
      }
      const encryption = data.encryption || 'WPA';
      const password = data.password || '';

      if (encryption !== 'nopass' && !password) {
        return { isValid: false, error: 'Password is required for encrypted Wi-Fi networks.' };
      }
      if (encryption === 'WPA' && password.length < 8) {
        return { isValid: false, error: 'WPA/WPA2 passwords must be at least 8 characters long.' };
      }
      return { isValid: true, error: null };
    }

    default:
      return { isValid: false, error: 'Unknown QR code type.' };
  }
};
