import './colorPicker.scss';
import { HuePicker } from 'react-color';

export const ColorPicker = () => {
    return (
      <div className="color-picker__wrapper">
        <HuePicker />
      </div>
    );
  };
  
  