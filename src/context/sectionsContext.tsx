import { Errors, List, SectionCreateData } from '../API/types';
import { Section } from '../types/models';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { castToErrors } from '../utils/errors';
import { SectionService } from '../API/sectionService';

export interface SectionsContextValue {
  sections: List<Section>
  createSection: (data: SectionCreateData) => Promise<(Errors | null)>
  deleteSection: (id: string) => Promise<(Errors | null)>
  isFetchingSection: boolean
}

export const SectionsContext = createContext<SectionsContextValue>({
  sections: {
    items: [],
    count: 0,
  },
  createSection: async () => null,
  deleteSection: async () => null,
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

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <SectionsContext.Provider value={{ sections, createSection, deleteSection, isFetchingSection }}>{children}</SectionsContext.Provider>
  );
};
