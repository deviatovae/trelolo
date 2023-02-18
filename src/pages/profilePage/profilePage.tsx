import './profilePage.scss';
import { useAuth } from '../../hooks/auth';
import Aside from '../../components/aside/aside';
import { ProfilePerson } from './../../components/profileModal/profilePerson';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../components/languages/messages';
import { useTranslate } from '../../hooks/useTranslate';



export const ProfilePage = () => {

  const { userInfo } = useAuth();
  const { trans } = useTranslate();

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
                        <input type="text" value={userInfo?.name} className="profilePage__input-name profilePage-inputs"></input>
                      </div>
                      <div className="profilePage__color-container">
                        <div className="profilePage__color-header">
                        <FormattedMessage id={Message.PickColor} />
                        </div>
                        <input type="color" className="profilePage__palitra"></input>
                      </div>
                      <div className="profilePage__email-container">
                        <div className="profilePage__email-header">
                        <FormattedMessage id={Message.EmailAddress} />
                        </div>
                        <input type="text" disabled value={userInfo?.email} className="profilePage__email profilePage-inputs"></input>
                      </div>
                    </div>
                    <div className="profilePage__right-side">
                    <div className="profilePage__pasword-header">
                      <FormattedMessage id={Message.ChangePassword} />
                    </div>
                     <div className="profilePage__pasword-container">
                       <input 
                         type="pasword" 
                         placeholder={trans(Message.EnterCurrentPassword)}
                         className="profilePage__pasword profilePage-inputs">
                       </input>
                       <input 
                         type="pasword" 
                         placeholder={trans(Message.EnterNewPassword)}
                         className="profilePage__pasword profilePage-inputs">
                        </input>
                       <input 
                        type="pasword" 
                        placeholder={trans(Message.ConfirmPassword)}
                        className="profilePage__pasword profilePage-inputs">
                       </input>
                     </div>
                    <button className="profilePage__save-btn">Save changes</button> 
                  </div>
                </div>
            </div>
          </div>
        </section>
    </main>
  );
};

