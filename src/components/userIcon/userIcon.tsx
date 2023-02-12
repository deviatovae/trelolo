import Button from '../../components/button/button';
import { getInitials } from '../../utils/format';
import { IconColorProvider } from '../../utils/iconColorProvider';

interface UserIconProps {
    userId: string
    className?: string
    children: string
}

export const UserIcon = ({ userId, children }: UserIconProps) => {
    const bgColor = IconColorProvider.getHSLColor(userId, 60, 50);

    return (
      <Button className="header__user" bgColor={bgColor}>{getInitials(children)}</Button>
    );
};
