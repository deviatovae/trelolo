import Button from '../../components/button/button';
import { getInitials } from '../../utils/format';

interface UserIconProps {
    bgColor?: string
    className?: string
    children: string
}
export const UserIcon = ({ bgColor, children }: UserIconProps) => {
    return (
      <Button className="header__user" bgColor={bgColor}>{getInitials(children)}</Button>
    );
};
