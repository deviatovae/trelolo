import { useContext } from 'react';
import { SectionsContext } from '../context/sectionsContext';

export const useSections = () => useContext(SectionsContext);
