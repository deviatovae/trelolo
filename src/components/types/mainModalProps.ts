import React from 'react';

export interface MainModalProps {
    onClickOutside: (event: React.MouseEvent) => void,
    ShowModal: boolean,
    onCreateProject: (inputValue: string) => void;
  }
