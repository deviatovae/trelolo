import React from 'react';
import './footer.scss';


const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__dev">
          <a className="github-link" href="https://github.com/deviatovae" target="_blank" rel="noreferrer">deviatovae</a>
        </div>
        <div className="footer__dev">
          <a className="github-link" href="https://github.com/AlexeiKozlovskiy" target="_blank" rel="noreferrer">alexeikozlovskiy</a>
        </div>
        <div className="footer__dev">
          <a className="github-link" href="https://github.com/kira-zaytseva" target="_blank" rel="noreferrer">kira-zaytseva</a>
        </div>
      <div className="footer__school">
        <a className="footer__school-link" href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <p className="footer__school-img"></p>
        </a>
      </div>
      <div className="footer__year">2023</div>
    </footer>
  );
};

export default Footer;
