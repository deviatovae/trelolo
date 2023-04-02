import './preloaderCircle.scss';
import { ReactNode } from 'react';

interface PreloaderCircleProps {
  isLoading?: boolean
  children?: ReactNode
}

export const PreloaderCircle = ({ children, isLoading }: PreloaderCircleProps) => {
  if (isLoading || isLoading === undefined) {
    return (
      <div className="preloader-circle">
        <div className="preloader-circle__circle"></div>
      </div>
    );
  }

  return <>{children}</>;
};
