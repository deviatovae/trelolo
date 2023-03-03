import { Errors, List, SectionCreateData, SectionUpdateData } from '../API/types';
import { Section } from '../types/models';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { castToErrors } from '../utils/errors';
import { SectionService } from '../API/sectionService';

export interface SectionsContextValue {
  sections: List<Section>
  createSection: (data: SectionCreateData) => Promise<(Errors | null)>
  updateSection: (sectionId: string, data: SectionCreateData) => Promise<Errors | null>
  deleteSection: (id: string) => Promise<(Errors | null)>
  moveSection: (id: string, position: number) => Promise<Errors | null>
  isFetchingSection: boolean
}

export const SectionsContext = createContext<SectionsContextValue>({
  sections: {
    items: [],
    count: 0,
  },
  createSection: async () => null,
  updateSection: async () => null,
  deleteSection: async () => null,
  moveSection: async () => null,
  isFetchingSection: false,
});


export const SectionsProvider = ({ children, projectId }: { projectId: string, children: ReactNode }) => {
  const [sections, setSections] = useState<List<Section>>({
    items: [],
    count: 0
  });

  const [isFetchingSection, setIsFetchingSection] = useState<boolean>(true);

  const fetchSections = useCallback(async (): Promise<Errors | null> => {
    try {
      const { data: sectionItems, errors } = await SectionService.getSections(projectId);
      if (errors) {
        return errors;
      }

      setSections(sectionItems);
      setIsFetchingSection(false);
      return null;
    } catch (e) {
      return castToErrors(e);
    }
  }, [projectId]);

  const createSection = async (data: SectionCreateData) => {
    try {
      const { data: sectionItem, errors } = await SectionService.createSection(projectId, data);
      if (errors) {
        return errors;
      }

      setSections(({ items, count }) => ({
        items: [...items, sectionItem],
        count: count + 1,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const updateSection = async (sectionId: string, data: SectionUpdateData) => {
    try {
      const { data: sectionItem, errors } = await SectionService.updateSection(sectionId, data);
      if (errors) {
        return errors;
      }

      setSections((prev) => {
        return {
          ...prev,
          items: prev.items.map((el) => el.id === sectionItem.id ? sectionItem : el),
        };
      });

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const deleteSection = async (id: string): Promise<Errors | null> => {
    try {
      const { errors } = await SectionService.deleteSection(id);
      if (errors) {
        return errors;
      }

      setSections(({ items, count }) => ({
        items: [...items.filter((section) => section.id !== id)],
        count: count - 1,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const moveSection = async (id: string, toIndex: number) => {
    try {
      setSections((prevSections) => {
        const fromIndex = prevSections.items.findIndex(({ id: sectionId }) => sectionId === id);
        const isSamePosition = fromIndex === toIndex;

        if (isSamePosition) {
          return { ...prevSections };
        }

        const sectionItems = [...prevSections.items];
        const [movedTask] = sectionItems.splice(fromIndex, 1);
        sectionItems.splice(toIndex, 0, movedTask);

        return {
          ...prevSections,
          items: [...sectionItems]
        };
      });

      const { errors } = await SectionService.moveSection(id, toIndex + 1);
      return errors;
    } catch (e) {
      return castToErrors(e);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <SectionsContext.Provider value={{ sections, createSection, updateSection, moveSection, deleteSection, isFetchingSection }}>{children}</SectionsContext.Provider>
  );
};
