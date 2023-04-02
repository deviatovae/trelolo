import './userColorPicker.scss';
import { ColorResult, HSLColor, HuePicker } from 'react-color';
import React, { useEffect, useState } from 'react';
import { IconColorProvider } from '../../utils/iconColorProvider';

interface ColorPickerProps {
  hue: number;
  onColorChange: (color: number) => void;
}

export const UserColorPicker = ({ hue, onColorChange }: ColorPickerProps) => {
  const [color, setColor] = useState<HSLColor>(IconColorProvider.toHslColor(hue));

  useEffect(() => {
    setColor(IconColorProvider.toHslColor(hue));
  }, [hue]);

  const handleColorChange = ({ hsl: { h } }: ColorResult) => {
    setColor(IconColorProvider.toHslColor(h));
    onColorChange(Math.trunc(h));
  };

  return (
    <>
      <div className="profilePage__color-picker-example" style={{ backgroundColor: IconColorProvider.hslToString(color) }}></div>
      <div className="color-picker__wrapper">
        <HuePicker color={color} onChange={handleColorChange} />
      </div>
    </>
  );
};

