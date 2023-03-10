import { Link } from 'react-router-dom';
import './logo.scss';
import { Route } from '../../router/routes';

export const Logo = ({ textDisplay = '' }) => {
    const logoTextStyles = `logo-text ${textDisplay}`;

    return (
        <Link to={Route.WELCOME} className="logo-wrapper">
            <div className="logo">
                <div className="logo1"></div>
                <div className="logo2"></div>
                <div className="logo3"></div>
            </div>
            <span className={logoTextStyles}>trelolo</span>
        </Link>
    );

};
