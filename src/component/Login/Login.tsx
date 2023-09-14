import React, {ChangeEvent, useState} from 'react';
import {useAuth} from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, currentUser} = useAuth()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value)
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleLoginAction = async () => {
    try {
      return await login(email, password)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
    {!currentUser && (
    <div className={"login__form-wrapper"}>
      <form action="#" className={"login__form"}>
        <div className="login__form-section">
          <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Email</label>
          <input style={{color: "red"}} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="email" placeholder={"Email"} onChange={handleEmailChange} value={email} required={true}/>
        </div>
        <div className="login__form-section">
          <label htmlFor="">Password</label>
          <input style={{color: "red"}} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} onChange={handlePasswordChange} type="password" placeholder={"Password"}/>
        </div>
        <button onClick={handleLoginAction} type={"button"}>Log In</button>
      </form>
    </div>
    ) || (<></>)}
    </>
  );
}

export default Login;