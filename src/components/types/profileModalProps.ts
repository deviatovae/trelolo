import { User } from '../../types/models';
import React from 'react';

export interface ProfileModalProps {
  onClickOutside: (event: React.MouseEvent) => void,
  ShowModal: boolean,
  userInfo: User,
  logout: () => void
}
