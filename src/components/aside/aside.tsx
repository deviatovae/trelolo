
import './aside.scss';


export const Aside = () => {
  return (
    <aside className="aside__container">
        <div className="aside__tasks-team">
          <div className="tasks-team">My tasks</div>
          <div className="tasks-team">My team</div>
        </div>
        <div className="aside__projects">
          <div className="projects__my-projects">My-projects
            <span className="projects__plus">+</span>
          </div>
          <ul className="projects__list">
            <li className="projects__item">trelolo</li>
            <li className="projects__item">my project</li>
          </ul>
        </div>
    </aside>
  );
};

export default Aside;
