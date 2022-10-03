import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const newPasswordInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCeiwYugbAn4Ugx-PQzHj3tx2Jh0VynIdc',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        header: { 'Content-Type': 'application/json' },
      }
    ).then(res => {
      history.replace('/');
    });
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
