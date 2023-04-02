export interface ModalProps {
  showWindow: boolean
  onCreate: (inputValue: string) => void
  onClickOutside: () => void
  placeholderProps: string
}
