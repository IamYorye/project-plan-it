import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };
    register(
      accountData,
      `${process.env.REACT_APP_API_HOST}/api/accounts`
    );
    e.target.reset();
    navigate("/");
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Signup</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className ="mb-3">
            <label className="form-label">First Name</label>
            <input name="first_name" type="text" className="form-control" onChange={e => {
                setFirstName(e.target.value)
            }} />
          </div>
        <div className ="mb-3">
            <label className="form-label">Last Name</label>
            <input name="last_name" type="text" className="form-control" onChange={e => {
                setLastName(e.target.value)
            }} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
