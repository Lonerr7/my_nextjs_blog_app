import { useState } from 'react';

export const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return { isOpen, openPopup, closePopup };
};
