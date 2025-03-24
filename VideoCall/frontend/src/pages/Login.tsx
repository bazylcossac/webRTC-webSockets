import { useEffect, useRef } from "react";
import styles from "../styles/loginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../utils/connectToWs";

function Login() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.mainText}>
          <h1 className={styles.heading}>Video Talker</h1>
          <p className={styles.paragraph}>Get on Board</p>
        </div>

        <form className={styles.formContainer}>
          <input
            type="text"
            ref={inputRef}
            className={styles.nameInput}
            onChange={(e) => dispatch(setUserName(e.target.value))}
          />
          <button
            className={styles.enterBtn}
            onClick={(e) => {
              e.preventDefault();
              registerNewUser(username);
              navigate("/dashboard");
            }}
          >
            Start using Video Talker
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
