import './colorPicker.scss';
import { HuePicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ selectedColor, onColorChange }: ColorPickerProps) => {

  const handleColorChange = (color: ColorResult) => {
    const colorPickerExample = document.querySelector('.profilePage__color-picer-example') as HTMLElement;
    const newColor = `hsl(${color.hsl.h}, 60%, 50%)`;
    colorPickerExample.style.backgroundColor = newColor;
    onColorChange(newColor);
  };

    return (
      <div className="color-picker__wrapper">
        <HuePicker color={selectedColor} onChange={handleColorChange} />
      </div>
    );
  };
  
  