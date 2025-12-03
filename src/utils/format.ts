// Utilidades para formatear datos

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('es-EC', options);
};

export const formatShortDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('es-EC', options);
};

export const formatAccountNumber = (accountNumber: string): string => {
  return accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const masked = '**** **** **** ' + cleaned.slice(-4);
  return masked;
};

export const getTransactionColor = (type: string): string => {
  switch (type) {
    case 'Transferencia':
      return '#FF6B6B';
    case 'Pago':
      return '#FFA500';
    case 'Depósito':
      return '#4CAF50';
    case 'Retiro':
      return '#FF6B6B';
    default:
      return '#666';
  }
};

