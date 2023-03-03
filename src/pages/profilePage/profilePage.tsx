import './profilePage.scss';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { ProfilePerson } from '../../components/profileModal/profilePerson';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../components/languages/messages';
import { useTranslate } from '../../hooks/useTranslate';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { PreloaderCircle } from '../../components/preloader/preloaderCircle';
import { UserColorPicker } from '../../components/userColorPicker/userColorPicker';
import { IconColorProvider } from '../../utils/iconColorProvider';
import { FieldChanges } from '../../types/types';
import { UpdateUserData } from '../../API/types';
import { useFieldValidator } from '../../hooks/validation';
import { UserValidator } from '../../utils/userValidator';


export const ProfilePage = () => {
  const { userInfo, updateUser, isFetchingUser, isInProgress } = useAuth();
  const { validate } = useFieldValidator();
  const { trans } = useTranslate();

  const [name, setName] = useState<FieldChanges>({ value: '', error: '', isChanged: false });
  const [currentPassword, setCurrentPassword] = useState<FieldChanges>({ value: '', error: '', isChanged: false });
  const [newPassword, setNewPassword] = useState<FieldChanges>({ value: '', error: '', isChanged: false });
  const [confirmPassword, setConfirmPassword] = useState<FieldChanges>({ value: '', error: '', isChanged: false });
  const [colorHue, setColorHue] = useState<FieldChanges<number>>({ value: 0, error: '', isChanged: false });
  const userIconHue = userInfo?.colorHue || IconColorProvider.getUserHue(userInfo?.id || '');

  const mainFields = [name, colorHue];
  const fields = mainFields.concat([currentPassword, newPassword, confirmPassword]);
  const hasErrors = !!fields.filter(({ error }) => !!error).length;
  const isMainFieldsChanged = mainFields.some(({ isChanged }) => isChanged);
  const isPasswordChanged = currentPassword.value || newPassword.value || confirmPassword.value;
  const allPasswordFieldsComplete = !isPasswordChanged || (currentPassword.value && newPassword.value && confirmPassword.value);
  const isSaveDisabled = isInProgress || hasErrors || (!isMainFieldsChanged && !isPasswordChanged) || !allPasswordFieldsComplete;

  useEffect(() => {
    setName((prev) => ({ ...prev, value: userInfo?.name || '', isChanged: false }));
    setColorHue((prev) => ({ ...prev, value: userIconHue, isChanged: false }));
  }, [userIconHue, userInfo]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName({ value, error: trans(UserValidator.validateName(value)), isChanged: value !== userInfo?.name });
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = value || (!newPassword.value && !confirmPassword.value);
    setCurrentPassword({ value, error: !isValid ? trans(Message.EnterCurrentPassword) : '', isChanged: !!value });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!currentPassword.value) {
      setCurrentPassword(prev => ({ ...prev, error: value ? trans(Message.EnterCurrentPassword) : '' }));
    }
    setConfirmPassword(prev => ({ ...prev, error: confirmPassword.value ? trans(UserValidator.validateConfirmPassword(value, confirmPassword.value)) : '' }));
    setNewPassword({ value, error: trans(UserValidator.validatePassword(value)), isChanged: !!value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword({ value, error: trans(UserValidator.validateConfirmPassword(newPassword.value, value)), isChanged: !!value });
  };

  const handleColorChange = (color: number) => {
    setColorHue({ value: color, error: '', isChanged: color !== userIconHue });
  };

  const handleSaveBtn = async () => {
    const data: UpdateUserData = {};

    if (name.isChanged) {
      data.name = name.value;
    }
    if (currentPassword.isChanged) {
      data.currentPassword = currentPassword.value;
    }
    if (newPassword.isChanged) {
      data.password = newPassword.value;
    }
    if (colorHue.isChanged) {
      data.colorHue = colorHue.value;
    }

    const errors = await updateUser(data);
    if (errors) {
      validate(errors, {
        name: setName,
        currentPassword: setCurrentPassword,
        password: setNewPassword,
      });
    } else {
      setCurrentPassword(prev => ({ ...prev, value: newPassword.value, isChanged: false }));
      setNewPassword({ value: '', error: '', isChanged: false });
      setConfirmPassword({ value: '', error: '', isChanged: false });
    }
  };


  return (
    <PreloaderCircle isLoading={isFetchingUser}>
      <section className="profilePage__section-wrapper">
        <div className="profilePage__section">
          <div className="profilePage__header">
            <FormattedMessage id={Message.ProfileSettings} />
          </div>
          <div className="profilePage__content-wrapper">
            <div className="profilePage__person-wrapper">
              {userInfo && <ProfilePerson user={userInfo} />}
            </div>
            <div className="profilePage__left-right-container">
              <div className="profilePage__left-side">
                <div className="profilePage__name-input-container">
                  <div className="profilePage__name-header">
                    <FormattedMessage id={Message.YourFullName} />
                  </div>
                  <Input
                    type="text"
                    value={name.value}
                    error={name.error}
                    onChange={handleNameChange}
                    className="profilePage__input-name profilePage-inputs"
                    maxLength={30}
                  />
                </div>
                <div className="profilePage__color-container">
                  <div className="profilePage__color-header">
                    <FormattedMessage id={Message.PickColor} />
                  </div>
                  <UserColorPicker
                    hue={colorHue.value}
                    onColorChange={handleColorChange}
                  />
                </div>
                <div className="profilePage__email-container">
                  <div className="profilePage__email-header">
                    <FormattedMessage id={Message.EmailAddress} />
                  </div>
                  <Input
                    type="email"
                    value={userInfo?.email ?? ''}
                    disabled
                    className="profilePage__email profilePage-inputs"
                  />
                </div>
              </div>
              <div className="profilePage__right-side">
                <div className="profilePage__password-header">
                  <FormattedMessage id={Message.ChangePassword} />
                </div>
                <div className="profilePage__password-container">
                  <Input
                    type="password"
                    value={currentPassword.value}
                    error={currentPassword.error}
                    placeholder={trans(Message.EnterCurrentPassword)}
                    className="profilePage__password profilePage-inputs"
                    onChange={handleCurrentPasswordChange}
                  />
                  <Input
                    type="password"
                    value={newPassword.value}
                    error={newPassword.error}
                    placeholder={trans(Message.EnterNewPassword)}
                    className="profilePage__password profilePage-inputs"
                    onChange={handleNewPasswordChange}
                  />
                  <Input
                    type="password"
                    value={confirmPassword.value}
                    error={confirmPassword.error}
                    placeholder={trans(Message.EnterPasswordConfirm)}
                    className="profilePage__password profilePage-inputs"
                    onChange={handleConfirmPasswordChange}
                  />
                  <Button
                    className="profilePage__save-btn"
                    disabled={isSaveDisabled}
                    onClick={handleSaveBtn}
                    isLoading={isInProgress}
                  >
                    {trans(Message.SaveChanges)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PreloaderCircle>
  );
};

