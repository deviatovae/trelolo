import './textarea.scss';

interface TextareaProps {
  placeholder?: string
  className?: string
}

export const Textearea = ({ className, placeholder }: TextareaProps) => {
  const classes = `textarea ${className}`;

  return (
    <textarea className={classes} placeholder={placeholder}></textarea>
  );
};