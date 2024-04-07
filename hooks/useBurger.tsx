import { useState } from 'react';

export const useBurger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return { isMenuOpen, toggleMenuHandler, closeMenu };
};
