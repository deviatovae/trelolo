import Button from '../../components/button/button';
import { getInitials } from '../../utils/format';
import { IconColorProvider } from '../../utils/iconColorProvider';

interface UserIconProps {
    id?: string
    userId: string
    className?: string
    children: string
}

export const UserIcon = ({ id, userId, children }: UserIconProps) => {
    const bgColor = IconColorProvider.getHSLColor(userId, 60, 50);

    return (
      <Button id={id} className="header__user" bgColor={bgColor}>{getInitials(children)}</Button>
    );
};
