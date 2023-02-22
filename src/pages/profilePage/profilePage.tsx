import './profilePage.scss';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { ProfilePerson } from './../../components/profileModal/profilePerson';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../components/languages/messages';
import { useTranslate } from '../../hooks/useTranslate';
import { ColorPicker } from '../../components/colorPicker/colorPicker';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { IconColorProvider } from '../../utils/iconColorProvider';


export const ProfilePage = () => {

  const { userInfo, updatedUser, updatedColor, getColor } = useAuth();
  
  const { trans } = useTranslate();
  const [newName, setNewName] = useState(userInfo?.name);


  const bgColor = IconColorProvider.getHSLColor(userInfo?.id ?? '', 60, 50);
  const [selectedColor, setSelectedColor] = useState(bgColor);
  
  const colorStockExempel = () => {
    const colorPickerExample = document?.querySelector('.profilePage__color-picer-example') as HTMLElement;
    if (colorPickerExample) {
      colorPickerExample.style.backgroundColor = selectedColor;
    }
  };

  useEffect(() => {
    colorStockExempel();
  }, []);


  const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handlePasswordChange = () => {

  };

  const handleNewPasswordChange = () => {

  };

  const handleConfirmPasswordChange = () => {

  };

  const extractValСolor = (color: string) => {
    const regex = /^hsl\((\d+(\.\d+)?)/;
    const matches = color.match(regex);
    if (matches) {
      return Math.round(+matches[1]);
    }
  };

  const handleSaveBtn = () => {
    updatedUser(newName ?? '');

    const color = extractValСolor(selectedColor);
    if (color) {
      updatedColor(color);
    }
    // bgColor = getColor();
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };


  return (
      <section className="profilePage__section-wrapper">
        <div className="profilePage__section">
          <div className="profilePage__header">
          <FormattedMessage id={Message.ProfileSettings} />
          </div>
          <div className="profilePage__content-wrapper">
              <div className="profilePage__person-wrapper">
              <ProfilePerson id={userInfo?.id ?? ''} name={userInfo?.name ?? ''} email={userInfo?.email ?? ''}/>
              </div>
              <div className="profilePage__left-right-container">
                  <div className="profilePage__left-side">
                    <div className="profilePage__name-input-container">
                      <div className="profilePage__name-header">
                      <FormattedMessage id={Message.YourFullName} />
                      </div>
                      <Input type="text"
                        value={newName ?? ''}
                        onChange={handleNameChange}
                        className="profilePage__input-name profilePage-inputs"
                      />
                    </div>
                    <div className="profilePage__color-container">
                      <div className="profilePage__color-header">
                      <FormattedMessage id={Message.PickColor} />
                      </div>
                      <div className="profilePage__color-picer-example"
                      >
                      </div>
                      <ColorPicker
                        selectedColor={selectedColor}
                        onColorChange={handleColorChange}
                        />
                    </div>
                    <div className="profilePage__email-container">
                      <div className="profilePage__email-header">
                      <FormattedMessage id={Message.EmailAddress} />
                      </div>
                      <Input type="text"
                        value={userInfo?.email ?? ''}
                        disabled
                        className="profilePage__email profilePage-inputs"
                      />
                    </div>
                  </div>
                  <div className="profilePage__right-side">
                  <div className="profilePage__pasword-header">
                    <FormattedMessage id={Message.ChangePassword} />
                  </div>
                   <div className="profilePage__pasword-container">
                    <Input type="password"
                      value={''}
                      placeholder={trans(Message.EnterCurrentPassword)}
                      className="profilePage__pasword profilePage-inputs"
                      onChange={handlePasswordChange}
                    />
                    <Input type="password"
                      value={''}
                      placeholder={trans(Message.EnterNewPassword)}
                      className="profilePage__pasword profilePage-inputs"
                      onChange={handleNewPasswordChange}
                    />
                    <Input type="password"
                      value={''}
                      placeholder={trans(Message.EnterPasswordConfirm)}
                      className="profilePage__pasword profilePage-inputs"
                      onChange={handleConfirmPasswordChange}
                    />
                   </div>
                   <Button 
                     className="profilePage__save-btn"
                    //  disabled
                    onClick={handleSaveBtn}
                    >
                    {trans(Message.SaveChanges)}
                  </Button>
                </div>
              </div>
          </div>
        </div>
      </section>
  );
};

