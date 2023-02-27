import { WindowAdd } from '../window/windowAdd';
import React, { useEffect, useState } from 'react';
import { useSections } from '../../hooks/useSections';
import { TaskModalProvider } from '../../context/taskModalContext';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Section } from './section';
import { DnDType } from '../../types/types';
import { useTasks } from '../../hooks/useTasks';
import { PreloaderCircle } from '../preloader/preloaderCircle';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';

export const Sections = () => {

  const { trans } = useTranslate();

  const { sections: { items: sections }, createSection, moveSection, isFetchingSection } = useSections();
  const { moveTask, isTasksFetching } = useTasks();

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

  const closeAddSection = () => {
    setShowCreateSection(false);
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

  const onTaskDragEnd = async ({ draggableId, source, destination, type }: DropResult) => {
    const fromSectionId = source.droppableId;
    const toSectionId = destination?.droppableId || fromSectionId;
    const curIndex = source.index;
    const toIndex = destination?.index ?? curIndex;

    switch (type) {
      case DnDType.Task:
        return moveTask(draggableId, toSectionId, toIndex).then((errors) => {
          if (errors) {
            console.error(errors);
          }
        });
      case DnDType.Section:
        return moveSection(draggableId, toIndex).then((errors) => {
          if (errors) {
            console.error(errors);
          }
        });
    }
  };

  return (
    <TaskModalProvider>
      <section className="project-page__board">
        <PreloaderCircle isLoading={isFetchingSection || isTasksFetching}>
          <div className="project-page__column-list">
            <DragDropContext onDragEnd={onTaskDragEnd}>
              <Droppable droppableId="sections" direction="horizontal" type={DnDType.Section}>
                {provided => (
                  <div className="columns-drop-container"
                       {...provided.droppableProps}
                       ref={provided.innerRef}>
                    {sections.map((section, idx) => (
                      <Section key={section.id} section={section} idx={idx}></Section>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {showCreateSection && <WindowAdd
                showWindow={showCreateSection}
                onCreate={handleAddSection}
                onClickOutside={closeAddSection}
                placeholderProps={trans(Message.WriteAColumnName)}
            />}
            {!showCreateSection && <div className="project-page__column-list-btn" onClick={handleClickAddColumn}><span>+ {trans(Message.AddColumn)}</span></div>}
          </div>
        </PreloaderCircle>
      </section>
    </TaskModalProvider>
  );
};
