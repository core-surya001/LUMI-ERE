export const DUMMY_WHATSAPP_NUMBER = '919876543210';
export const DISPLAY_DUMMY_PHONE = '+91 98765 43210';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Alias for convenience
export const formatINR = formatPrice;

export function getWhatsAppOrderUrl(
  productName: string,
  price?: number,
  options?: { size?: string; metal?: string }
): string {
  let message = `Hi, I want to order ${productName}`;
  if (options?.metal) message += ` in ${options.metal}`;
  if (options?.size) message += ` (Size: ${options.size})`;
  if (price) message += ` - ${formatPrice(price)}`;
  
  return `https://wa.me/${DUMMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Alias for convenience
export const generateWhatsAppUrl = (productName: string) => getWhatsAppOrderUrl(productName);

export function getWhatsAppGeneralInquiryUrl(): string {
  const message = `Hi, I would like to inquire about your fine jewelry collection.`;
  return `https://wa.me/${DUMMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
