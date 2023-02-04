import { ChangeEvent } from 'react';

export interface LangSwitcherProps {
  currentLocale: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
    
