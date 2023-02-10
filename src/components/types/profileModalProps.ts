import { User } from '../../types/models';
import React from 'react';

export interface ProfileModalProps {
    onClickOutside: (event: React.MouseEvent) => void,
    ShowModal: boolean,
    avatarName: string,
    userInfo: User | null,
    logout: () => void
  }
