import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { useSelector } from 'react-redux';
import ballPic from '../photos/ball.png';
import 'notyf/notyf.min.css';

function ForgetPassword() {
  const notyf = new Notyf();

  const navigate = useNavigate();

  const baseUrl = useSelector((state: any) => state.baseUrl);

  const email = useRef<string | any>('');
  const password = useRef<string | any>('');
  const nameOfPet = useRef<string | any>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/login/forgetPassword`, {
        email: email.current.value,
        nameOfPet: nameOfPet.current.value,
        newPassword: password.current.value,
      });
      navigate('/');
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
      <div className="login">
        <p className="loginIntro">Forget password</p>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            placeholder="email"
            className="inputL"
            ref={email}
            required={true}
          />
          <input
            type="text"
            placeholder="new password"
            className="inputL"
            ref={password}
            required={true}
          />
          <input
            type="text"
            placeholder="name of your pet"
            className="inputL"
            ref={nameOfPet}
            required={true}
          />
          <button id="changePasswordBtn" type="submit" className="buttonl">
            Change password
          </button>
        </form>
        <button type="button" className="buttonl" onClick={() => navigate('/')}>
          Back to login
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
