
import './windowDelete.scss';
import { useEffect } from 'react';

interface WindowDeleteProps {
    deleteColumn: () => void;
  }

export const WindowDelete = ({ deleteColumn }: WindowDeleteProps ) => {

  useEffect(() => {
    document.addEventListener('keydown', checkKeyDown);
    return () => {
      document.removeEventListener('keydown', checkKeyDown);
    };
  });

  const handleDeleteColumn = () => {
    deleteColumn();
  };

  const checkKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
    deleteColumn();
    }
  };

  return (
    <div className="window-delete">
      <div className="window-delete__container">
        <div className="window-delete__text">
          are you sure?
        </div>
        <button className="window-delete__btn" onClick={handleDeleteColumn}>Delete</button>
      </div>
    </div>
  );
};
