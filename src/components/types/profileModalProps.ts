import { UserInfo } from '../../API/types';

export interface ProfileModalProps {
    onClickOutside: (event: React.MouseEvent) => void,
    ShowModal: boolean,
    avatarName: string,
    userInfo: UserInfo | null,
    logout: () => void
  }