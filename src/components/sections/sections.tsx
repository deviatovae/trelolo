import { WindowAdd } from '../window/windowAdd';
import React, { useEffect, useState } from 'react';
import { useSections } from '../../hooks/useSections';
import { Section } from './section';
import { TaskModalProvider } from '../../context/taskModalContext';
import { TasksProvider } from '../../context/tasksContext';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const Sections = () => {
  const { sections: { items: sections, count }, createSection } = useSections();

  const [showCreateSection, setShowCreateSection] = useState(false);
  const [, setTaskNameInColumnWindow] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', CheckKeyDown);
    return () => {
      document.removeEventListener('keydown', CheckKeyDown);
    };
  }, []);

  const handleClickAddColumn = () => {
    setShowCreateSection(!showCreateSection);
  };

  const checkWindowAddOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (showCreateSection &&
      (!(event.target as HTMLElement).classList.contains('modal-main')) &&
      (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
      setShowCreateSection(false);
    }
  };

  const CheckKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setShowCreateSection(false);
      setTaskNameInColumnWindow(false);
    }
  };

  const handleAddSection = async (name: string) => {
    await createSection({ name });
    setShowCreateSection(false);
  };

  const onTaskDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <TaskModalProvider>
      <section className="project-page__board" onClick={checkWindowAddOutsideClick}>
        <div className="project-page__column-list">
          <DragDropContext onDragEnd={onTaskDragEnd}>
            {sections.map((section, index) => (
              <TasksProvider sectionId={section.id}>
                <Section section={section}></Section>
              </TasksProvider>
            ))}
          </DragDropContext>
          {showCreateSection && <WindowAdd showWindow={showCreateSection} onCreate={handleAddSection} placeholderProps={'Write a column name'} />}
          {!showCreateSection && <div className="project-page__column-list-btn" onClick={handleClickAddColumn}><span>+ Add column</span></div>}
        </div>
      </section>
    </TaskModalProvider>
  );
};
