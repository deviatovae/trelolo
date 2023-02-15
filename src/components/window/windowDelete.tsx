
import './windowDelete.scss';

interface WindowDeleteProps {
    deleteColumn: () => void;
  }

export const WindowDelete = ({ deleteColumn }: WindowDeleteProps ) => {

  const handleDeleteColumn = () => {
    // deleteColumn();
  };

  const checkKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
    // deleteColumn();
    }
  };

  return (
    <div className="window-delete" onKeyDown={checkKeyDown}>
      <div className="window-delete__container">
        <div className="window-delete__text">
          are you sure?
        </div>
        <button className="window-delete__btn" onClick={handleDeleteColumn}>Delete</button>
      </div>
    </div>
  );
};
