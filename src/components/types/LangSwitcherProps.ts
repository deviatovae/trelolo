import { ChangeEvent } from 'react';

export interface LangSwitcherProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
}

