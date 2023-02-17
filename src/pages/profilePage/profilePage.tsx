import './profilePage.scss';
import { useAuth } from '../../hooks/auth';
import Aside from '../../components/aside/aside';
import { ProfilePerson } from './../../components/profileModal/profilePerson';


export const ProfilePage = () => {

  const { userInfo } = useAuth();

  return (
    <main className="profilePage__wrapper">
        <Aside />
        <section className="profilePage__section">
            <div className="profilePage__header">Profile settings</div>
            <div className="profilePage__content-wrapper">
              <div className="profilePage__content-person">
                <ProfilePerson id={userInfo?.id ?? ''} name={userInfo?.name ?? ''} email={userInfo?.email ?? ''}/>
                <div className="modal-windows__left-right-container">
                    <div className="modal-windows__left">
                      <div className="modal-windows__name-input-container">
                        <div className="modal-windows__name-header">Your full name</div>
                        <input type="text" className="modal-windows__input-name"></input>
                      </div>
                      <div className="modal-windows__color-container">
                        <div className="modal-windows__color-header">Pick color</div>
                        <input type="color" className="modal-windows__palitra"></input>
                      </div>
                      <div className="modal-windows__email-container">
                        <div className="modal-windows__email-header">Email address</div>
                        <input type="text" className="modal-windows__email"></input>
                      </div>
                    </div>
                    <div className="modal-windows__right">
                     <div className="modal-windows__pasword-container">
                       <div className="modal-windows__pasword-header">Change password</div>
                       <input type="pasword" className="modal-windows__pasword"></input>
                       <input type="pasword" className="modal-windows__pasword"></input>
                       <input type="pasword" className="modal-windows__pasword"></input>
                     </div>
                    <div className="modal-windows__save-brn">Save changes</div> 
                  </div>
                </div>
              </div>
            </div>
        
        </section>
    </main>
  );
};

