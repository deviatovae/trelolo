import ReactSelect, { GroupBase, Props, StylesConfig } from 'react-select';
import './select.scss';
import { SelectOption } from '../../types/types';

export default function Select<
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  const styles: StylesConfig<Option, IsMulti, Group> = {
    multiValueRemove: (baseStyles, { data: option }) => ({
      ...baseStyles,
      ':hover': {
        backgroundColor: '#c2c9ff',
        borderRadius: '30%',
        cursor: 'pointer',
      },
      ...(option.isFixed ? { display: 'none' } : {})
    }),
    multiValue: (baseStyles, { data: option }) => ({
      ...baseStyles,
      padding: '3px',
      borderRadius: '8px',
      ...(option.isFixed ? { backgroundColor: '#e6e6e6' } : { backgroundColor: '#6d82ff33' })
    }),
    multiValueLabel: (baseStyles, { data: option }) => ({
      ...baseStyles,
      ...(option.isFixed ? { paddingRight: 6 } : {})
    }),
    indicatorsContainer: (baseStyles, state) => ({
      ...baseStyles,
        cursor: 'pointer',
    }),
    control: (baseStyles, state) => {
      return ({
        ...baseStyles,
        minHeight: '45px',
        borderRadius: '6px',
        boxShadow: state.isFocused ? '0 0 0 1px #015fcc' : '#cfcbcb',
        borderColor: state.isFocused ? '#015fcc' : '#cfcbcb',
      });
    },
  };

  return (
    <ReactSelect {...props} styles={styles}></ReactSelect>
  );
}
