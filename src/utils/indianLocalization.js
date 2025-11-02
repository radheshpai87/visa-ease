/**
 * Indian Market Localization Utilities
 * - Date formatting (DD/MM/YYYY)
 * - Currency formatting (₹ INR)
 * - Phone number formatting (+91)
 */

/**
 * Format date in Indian format: DD/MM/YYYY
 * @param {string|Date} dateString - Date to format
 * @param {object} options - Optional formatting options
 * @returns {string} Formatted date string
 */
export const formatIndianDate = (dateString, options = {}) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  };

  return date.toLocaleDateString('en-IN', defaultOptions);
};

/**
 * Format date in long Indian format: DD MMM YYYY (e.g., 15 Jan 2025)
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date string
 */
export const formatIndianDateLong = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('en-IN', { 
    day: '2-digit',
    month: 'short',
    year: 'numeric' 
  });
};

/**
 * Format date and time in Indian format
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatIndianDateTime = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const datePart = date.toLocaleDateString('en-IN', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const timePart = date.toLocaleTimeString('en-IN', { 
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return `${datePart}, ${timePart}`;
};

/**
 * Format time in Indian format (12-hour with AM/PM)
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted time string
 */
export const formatIndianTime = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  return date.toLocaleTimeString('en-IN', { 
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format currency in Indian Rupees (₹)
 * @param {number} amount - Amount to format
 * @param {boolean} showDecimals - Whether to show decimal places
 * @returns {string} Formatted currency string
 */
export const formatIndianCurrency = (amount, showDecimals = false) => {
  if (amount === null || amount === undefined) return '₹0';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  });

  return formatter.format(amount);
};

/**
 * Format large numbers with Indian numbering system (Lakhs, Crores)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatIndianNumber = (num) => {
  if (num === null || num === undefined) return '0';
  
  return num.toLocaleString('en-IN');
};

/**
 * Format phone number with Indian country code
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatIndianPhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it starts with 91 (India country code)
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  // If 10 digits, assume Indian number
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
};

/**
 * Get Indian states list
 * @returns {Array} List of Indian states
 */
export const getIndianStates = () => [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

/**
 * Validate Indian PAN card format
 * @param {string} pan - PAN number to validate
 * @returns {boolean} Whether PAN is valid
 */
export const validateIndianPAN = (pan) => {
  if (!pan) return false;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
};

/**
 * Validate Indian Aadhaar format
 * @param {string} aadhaar - Aadhaar number to validate
 * @returns {boolean} Whether Aadhaar is valid
 */
export const validateIndianAadhaar = (aadhaar) => {
  if (!aadhaar) return false;
  const cleaned = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
};

/**
 * Format Indian Aadhaar number with spaces
 * @param {string} aadhaar - Aadhaar number to format
 * @returns {string} Formatted Aadhaar
 */
export const formatIndianAadhaar = (aadhaar) => {
  if (!aadhaar) return '';
  const cleaned = aadhaar.replace(/\s/g, '');
  if (cleaned.length === 12) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
  }
  return aadhaar;
};

/**
 * Convert date to Indian Standard Time (IST)
 * @param {string|Date} dateString - Date to convert
 * @returns {Date} Date in IST
 */
export const toIST = (dateString) => {
  const date = new Date(dateString);
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
};

/**
 * Get Indian business hours info
 * @returns {object} Business hours information
 */
export const getIndianBusinessHours = () => ({
  workingDays: 'Monday to Friday',
  hours: '9:30 AM to 6:00 PM IST',
  timezone: 'Indian Standard Time (IST)',
  utcOffset: '+05:30'
});

export default {
  formatIndianDate,
  formatIndianDateLong,
  formatIndianDateTime,
  formatIndianTime,
  formatIndianCurrency,
  formatIndianNumber,
  formatIndianPhone,
  getIndianStates,
  validateIndianPAN,
  validateIndianAadhaar,
  formatIndianAadhaar,
  toIST,
  getIndianBusinessHours
};
