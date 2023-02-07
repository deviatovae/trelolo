import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';

export const Main = () => {
  return (
    <main className="main-wrapper">
        <Aside />
        <section className='main__section'>
            < Greeting />
        <div className='main-section-your-project'>
прожект
        </div>
        <div className='main-section-img'>
картинка
        </div>
        </section>
    </main>
  );
};

