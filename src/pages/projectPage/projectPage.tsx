import './projectPage.scss';
import Aside from '../../components/aside/aside';
import { useState, useEffect } from 'react';
import { Modal } from '../../components/modal/modal';

export const ProjectPage = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', CheckKeyDown);
    return () => {
    document.removeEventListener('keydown', CheckKeyDown);
    };
  }, []);

  const handleUserIconClick = () => {
    setShowModal(!showModal);
  };

  const checkModalOtsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (showModal && 
      (!(event.target as HTMLElement).classList.contains('modal-main')) &&
      (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
      setShowModal(false);
    }
  };

  const CheckKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
  };

  const handleAddColumn = (inputValue: string) => {
      setColumns([...columns, inputValue]);
      setShowModal(false);
  };

  const increaseWidth = (columnsLength: number) => `${390 + 250 * columnsLength}px`;

  return (
    <div className="project-page__container _container wrapper" onClick={checkModalOtsideClick} >
      <Aside></Aside>
      <section className='project-page__section'>
        <h4>trelolo</h4>
        <div className='project-page__projects-wrapper'>
          <div className='project-page__column-list' style={{ width: increaseWidth(columns.length) }}>

          {columns.map((project, index) => (
            <div key={index} className='project-page__column-list-item'>{project}</div>
          ))}
  
          {showModal ? (
            <Modal ShowModal={showModal} onCreateProject={handleAddColumn} placeholderProps={'Write a column name'}/>
          ) : (
            <div className='project-page__column-list-btn' onClick={handleUserIconClick}>+ Add column</div>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};
  