import { Errors, List } from '../API/types';
import { Section } from '../types/models';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { castToErrors } from '../utils/errors';
import { SectionService } from '../API/sectionService';

export interface SectionsContextValue {
  sections: List<Section>
  createSection: (name: string) => Promise<(Errors | null)>
}

export const SectionsContext = createContext<SectionsContextValue>({
  sections: {
    items: [],
    count: 0,
  },
  createSection: async () => null
});


export const SectionsProvider = ({ children, projectId }: { projectId: string, children: ReactNode }) => {
  const [sections, setSections] = useState<List<Section>>({
    items: [],
    count: 0
  });

  const fetchSections = useCallback(async (): Promise<Errors | null> => {
    try {
      const { data: sectionItems, errors } = await SectionService.getSections(projectId);
      if (errors) {
        return errors;
      }

      setSections(sectionItems);

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  }, [projectId]);

  const createSection = async (name: string) => {
    try {
      const { data: sectionItem, errors } = await SectionService.createSection(projectId, { name });
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

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <SectionsContext.Provider value={{ sections, createSection }}>{children}</SectionsContext.Provider>
  );
};
