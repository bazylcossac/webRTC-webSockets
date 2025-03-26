import { FormEvent, useState } from "react";
import { setUsername } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleRegisterUser } from "../utils/wssConnection";

function Login() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setUsername(user));
    handleRegisterUser(user);
    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border-1 border-black m-2"
        />
        <button type="submit">get in</button>
      </form>
    </div>
  );
}

export default Login;
