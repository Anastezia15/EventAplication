import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { BASE_URL } from "../../config";

const Register = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const dateOfBirthRef = useRef<HTMLInputElement | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !loginRef.current ||
      !passwordRef.current ||
      !emailRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current ||
      !dateOfBirthRef.current
    )
      return null;

    const data = {
      username: loginRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
    };

    await axios({
      method: "POST",
      url: `${BASE_URL}/users`,
      responseType: "json",
      data,
    }).then((response) => console.log("response", response));

    setSuccess(true);
  };

  return (
    <div>
      <form onSubmit={registerHandler} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="p-2 rounded bg-blue-100"
          ref={loginRef}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="p-2 rounded bg-blue-100"
          ref={emailRef}
        />
        <input
          type="text"
          name="firsName"
          id="firsName"
          placeholder="First Name"
          className="p-2 rounded bg-blue-100"
          ref={firstNameRef}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          className="p-2 rounded bg-blue-100"
          ref={lastNameRef}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="p-2 rounded bg-blue-100"
          ref={passwordRef}
        />
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          placeholder="Date of Birth"
          className="p-2 rounded bg-blue-100"
          ref={dateOfBirthRef}
        />
        <button type="submit" className="bg-blue-600 text-white p-1 w-20 rounded-sm">
          Register
        </button>
      </form>

      {success && <p className="pt-4 text-green-900">Registered successfully.</p>}
    </div>
  );
};

export default Register;
