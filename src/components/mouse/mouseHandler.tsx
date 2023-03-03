import { RefObject, useEffect } from 'react';

interface MouseHandlerProps {
  elementRef: RefObject<HTMLElement>
  onClickOutside: () => void
}

export const MouseHandler = ({ elementRef, onClickOutside }: MouseHandlerProps) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(e.target as HTMLElement)) {
        return onClickOutside();
      }
    };

    document.addEventListener('mousedown', onClick);

    return () => {
      document.body.removeEventListener('mousedown', onClick);
    };
  });

  return <></>;
};
