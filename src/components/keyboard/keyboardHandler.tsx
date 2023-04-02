import { ReactNode, useEffect } from 'react';

interface KeyboardHandlerProps {
  keys?: string[]
  onKeyEvent?: (key: string) => void
  onEnter?: () => void
  onEsc?: () => void
  children?: ReactNode
}

export const KeyboardHandler = ({ keys, onKeyEvent, onEnter, onEsc, children }: KeyboardHandlerProps) => {
  useEffect(() => {
    const handleKey = (key: string, fn?: () => void) => {
      if (keys && !keys.includes(key)) {
        return;
      }
      if (onKeyEvent) {
        onKeyEvent(key);
      }
      if (fn) {
        fn();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      switch (key) {
        case 'Escape':
          handleKey(key, onEsc);
          break;
        case 'Enter':
          handleKey(key, onEnter);
          break;
        default:
          handleKey(key);
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [keys, onEnter, onEsc, onKeyEvent]);

  return <>{children}</>;
};
