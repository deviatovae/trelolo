
import './aside.scss';


export const Aside = () => {
  return (
    <aside className="aside__container">
        <div className="aside__tasks-team">
          {/* <div className="tasks-team">My tasks</div> */}
          <div className="tasks-team">
            <div className="tasks-team__logo"></div>
            My team
          </div>
        </div>
        <div className="aside__projects">
          <div className="projects__my-projects">
          <span className="projects__logo"></span>
            My projects
            <span className="projects__plus">+</span>
          </div>
          <ul className="projects__list">
            <li className="projects__item"><span>trelolo</span></li>
            <li className="projects__item"><span>my project</span></li>
          </ul>
        </div>
    </aside>
  );
};

export default Aside;
