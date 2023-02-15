import { WindowAdd } from '../window/windowAdd';
import React, { useEffect, useState } from 'react';
import { useSections } from '../../hooks/useSections';
import { TaskModalProvider } from '../../context/taskModalContext';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TasksProvider } from '../../context/tasksContext';
import { Section } from './section';

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
            <Droppable droppableId="sections" direction="horizontal" type="section">
              {provided => (
                <div className="columns-drop-container"
                     {...provided.droppableProps}
                     ref={provided.innerRef}>
                  {sections.map((section, index) => (
                    <TasksProvider sectionId={section.id}>
                      <Section section={section}></Section>
                    </TasksProvider>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {showCreateSection && <WindowAdd showWindow={showCreateSection} onCreate={handleAddSection} placeholderProps={'Write a column name'} />}
          {!showCreateSection && <div className="project-page__column-list-btn" onClick={handleClickAddColumn}><span>+ Add column</span></div>}
        </div>
      </section>
    </TaskModalProvider>
  );
};
