import { WindowAdd } from '../window/windowAdd';
import React, { useEffect, useState } from 'react';
import { useSections } from '../../hooks/sections';
import { Section } from './section';
import { TaskModalProvider } from '../../context/taskModalContext';

export const Sections = () => {
  const { sections: { items: sections, count }, createSection } = useSections();

  const [columnNameWindow, setColumnNameWindow] = useState(false);
  const [, setTaskNameInColumnWindow] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', CheckKeyDown);
    return () => {
      document.removeEventListener('keydown', CheckKeyDown);
    };
  }, []);

  const handleClickAddColumn = () => {
    setColumnNameWindow(!columnNameWindow);
  };

  // const checkWindowAddOtsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (columnNameWindow &&
  //     (!(event.target as HTMLElement).classList.contains('modal-main')) &&
  //     (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
  //     setColumnNameWindow(false);
  //   }
  //
  //   if (taskNameInColumnWindow &&
  //     (!(event.target as HTMLElement).classList.contains('window-add-task__input')) &&
  //     (!(event.target as HTMLElement).classList.contains('window-add-task')) &&
  //     (!(event.target as HTMLElement).classList.contains('window-add-task__buttons-container'))) {
  //     setTaskNameInColumnWindow(false);
  //   }
  // };

  const CheckKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setColumnNameWindow(false);
      setTaskNameInColumnWindow(false);
    }
  };

  const handleAddColumn = async (inputValue: string) => {
    await createSection(inputValue);
    // setTasks({ ...tasks, [inputValue]: [] });
    setColumnNameWindow(false);
  };

  const increaseWidth = () => `${390 + 290 * count}px`;

  return (
    <TaskModalProvider>
      <section className="project-page__section">
        <div className="project-page__projects-wrapper">
          <div className="project-page__column-list" style={{ width: increaseWidth() }}>

            {sections.map((section, index) => (
              <Section key={index} section={section} tasks={[section.id]}></Section>
            ))}

            {columnNameWindow && <WindowAdd showWindow={columnNameWindow} onCreateProject={handleAddColumn} placeholderProps={'Write a column name'} />}
            {!columnNameWindow && <div className="project-page__column-list-btn" onClick={handleClickAddColumn}><span>+ Add column</span></div>}
          </div>
        </div>
      </section>
    </TaskModalProvider>
  );
};
