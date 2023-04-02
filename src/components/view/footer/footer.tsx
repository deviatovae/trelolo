import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper _container">
        <a className="github-link" href="https://github.com/deviatovae" target="_blank" rel="noreferrer">deviatovae</a>
        <a className="github-link" href="https://github.com/AlexeiKozlovskiy" target="_blank" rel="noreferrer">alexeikozlovskiy</a>
        <a className="github-link" href="https://github.com/kira-zaytseva" target="_blank" rel="noreferrer">kira-zaytseva</a>
        <a className="footer__school-link" href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <p className="footer__school-img"></p>
        </a>
        <span className="footer__year">2023</span>
      </div>
    </footer>
  );
};

export default Footer;
