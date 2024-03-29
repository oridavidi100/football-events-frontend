import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducer/actions/action';
import { getCookie } from '../service/servicesfunc';
import { Notyf } from 'notyf';
import ballPic from '../photos/ball.png';
import './style/login.css';
import 'notyf/notyf.min.css';

function Login() {
  const notyf = new Notyf();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUrl = useSelector((state: any) => state.baseUrl);

  const email = useRef<string | any>('');
  const password = useRef<string | any>('');

  useEffect(() => {
    //function that check if the user is logged in before

    if (getCookie('accessToken')) {
      const config = {
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      };
      axios
        .post(`${baseUrl}/api/login`, {}, config)
        .then(res => {
          dispatch(setUser(res.data));
          navigate('/HomePage');
        })
        .catch(err => {
          console.log(err.response.data.error);
        });
    }
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    try {
      e.preventDefault();
      const res = await axios.post(`${baseUrl}/api/login`, {
        email: email.current.value,
        password: password.current.value,
      });

      dispatch(setUser(res.data.body));
      document.cookie =
        'accessToken' + '=' + res.data.accessToken + ';expires=' + '120';
      navigate('/HomePage');
    } catch (err: any) {
      notyf.error(err.response.data.error);
    }
  };

  return (
    <div className="loginDiv">
      <div className="webIntro">
        <div className="webIntroDiv">Ori's football app</div>
        <div>
          <img className="imgIntro" src={ballPic} alt="ssss" />
        </div>
      </div>
      <div className="shape"></div>
      <div className="login">
        <p className="loginIntro">Login</p>
        <form className="loginForm" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="email "
            ref={email}
            required={true}
            className="inputL"
          />
          <input
            className="inputL"
            type="password"
            placeholder="password"
            ref={password}
            required={true}
          />
          <button type="submit" className="buttonl" id="loginBtn">
            Login
          </button>
        </form>
        <button
          className="buttonl"
          type="button"
          onClick={() => navigate('/forgetpassword')}
        >
          Forgot password ?
        </button>
        <p>
          <span className="hasAccount">Don't have an account yet ?</span>
          <button
            style={{
              marginLeft: '1em',
              display: 'inline',
            }}
            className="buttonl"
            type="button"
            onClick={() => navigate('/register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
