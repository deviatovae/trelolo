import Button from '../../components/button/button';

interface UserIconProps {
    bgColor?: string
    className?: string
    children: string
}
export const UserIcon = ({ bgColor, children }: UserIconProps) => {
    return (
      <Button className="header__user" bgColor={bgColor}>{children}</Button>
    );
};
