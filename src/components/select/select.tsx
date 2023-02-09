import ReactSelect, { GroupBase, Props } from 'react-select';

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      {...props}
      styles={{
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          ':hover': {
            backgroundColor: '#cfcbcb',
            borderRadius: '30%',
            cursor: 'pointer',
          }
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          padding: '3px',
          borderRadius: '8px',
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
      }}
    ></ReactSelect>
  );
}
