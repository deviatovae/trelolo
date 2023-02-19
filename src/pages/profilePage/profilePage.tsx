import './profilePage.scss';
import { useAuth } from '../../hooks/auth';
import Aside from '../../components/aside/aside';
import { ProfilePerson } from './../../components/profileModal/profilePerson';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../components/languages/messages';
import { useTranslate } from '../../hooks/useTranslate';
import { ColorPicker } from '../../components/colorPicer/colorPicker';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

export const ProfilePage = () => {

  const { userInfo } = useAuth();
  const { trans } = useTranslate();
  // const [showColorPicker, setShowColorPicker] = useState(false);

  // const handlePickerBtnClick = () => {
  //   setShowColorPicker(!showColorPicker); 
  // };

  const handleNameChange = () => {

  };

  const handlePasswordChange = () => {

  };

  const handleNewPasswordChange = () => {

  };

  const handleConfirmPasswordChange = () => {

  };

  return (
    <main className="profilePage__wrapper">
      <Aside />
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
                        value={userInfo?.name ?? ''}
                        onChange={handleNameChange}
                        className="profilePage__input-name profilePage-inputs"
                      />
                    </div>
                    <div className="profilePage__color-container">
                      <div className="profilePage__color-header">
                      <FormattedMessage id={Message.PickColor} />
                      </div>
                      <div className="profilePage__color-picer-btn" 
                        // onClick={handlePickerBtnClick}
                        >
                      </div>
                      <ColorPicker />
                      {/* {showColorPicker && <ColorPicer />} */}
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
                    >
                    {trans(Message.SaveChanges)}
                  </Button>
                </div>
              </div>
          </div>
        </div>
        </section>
    </main>
  );
};

