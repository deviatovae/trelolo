import { validateName, validatePassword } from './validation';
import { Message } from '../components/languages/messages';

export class UserValidator {
  static validateName = (name: string): string => !validateName(name) ? Message.InvalidUserName : '';

  static validatePassword = (password: string): string => password && !validatePassword(password) ? Message.InvalidPassword : '';

  static validateConfirmPassword = (password: string, confirmPassword: string): string => {
    const isFilled = password || confirmPassword;
    const isConfirmationMatch = password === confirmPassword;

    return isFilled && !isConfirmationMatch ? Message.InvalidPasswordConfirm : '';
  };
}
