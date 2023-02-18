import './profilePage.scss';
import { useAuth } from '../../hooks/auth';
import Aside from '../../components/aside/aside';
import { ProfilePerson } from './../../components/profileModal/profilePerson';


export const ProfilePage = () => {

  const { userInfo } = useAuth();

  return (
    <main className="profilePage__wrapper">
        <Aside />
        <section className="profilePage__section-wrapper">
          <div className="profilePage__section">
            <div className="profilePage__header">Profile settings</div>
            <div className="profilePage__content-wrapper">
                <div className="profilePage__person-wrapper">
                <ProfilePerson id={userInfo?.id ?? ''} name={userInfo?.name ?? ''} email={userInfo?.email ?? ''}/>
                </div>
                <div className="profilePage__left-right-container">
                    <div className="profilePage__left-side">
                      <div className="profilePage__name-input-container">
                        <div className="profilePage__name-header">Your full name</div>
                        <input type="text" value={userInfo?.name} className="profilePage__input-name profilePage-inputs"></input>
                      </div>
                      <div className="profilePage__color-container">
                        <div className="profilePage__color-header">Pick color</div>
                        <input type="color" className="profilePage__palitra"></input>
                      </div>
                      <div className="profilePage__email-container">
                        <div className="profilePage__email-header">Email address</div>
                        <input type="text" value={userInfo?.email} className="profilePage__email profilePage-inputs"></input>
                      </div>
                    </div>
                    <div className="profilePage__right-side">
                    <div className="profilePage__pasword-header">Change password</div>
                     <div className="profilePage__pasword-container">
                       <input type="pasword" placeholder="Enter current password" className="profilePage__pasword profilePage-inputs"></input>
                       <input type="pasword" placeholder="Enter new password" className="profilePage__pasword profilePage-inputs"></input>
                       <input type="pasword" placeholder="Confirm password" className="profilePage__pasword profilePage-inputs"></input>
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

