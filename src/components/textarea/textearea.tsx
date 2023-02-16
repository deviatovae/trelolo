import './textarea.scss';

interface TextareaProps {
  placeholder?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: () => void
  value: string
}

export const Textearea = ({ className, placeholder, onChange, onBlur, value }: TextareaProps) => {
  const classes = `textarea ${className}`;

  return (
    <textarea className={classes} placeholder={placeholder} onChange={onChange} onBlur={onBlur} value={value}></textarea>
  );
};