import { ApolloError } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";

interface AuthFormProps {
  error: ApolloError | undefined;
  handleSubmit: (login: String, password: String, isSigned: Boolean) => void;
}


const AuthForm = ({ error, handleSubmit }: AuthFormProps) => {
  const [isSigned, setIsSigned] = useState<Boolean>(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(login, password, isSigned);
  }

  const verifyPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
    if (e.target.value !== password) {
      e.target.setCustomValidity("Incorrect Password");
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <div className="bg-primary-color text-contrast-color w-[100vw] h-[100vh] flex justify-center items-center">
      <form
        className="flex text-center flex-col relative"
        onSubmit={submit}
      >
        <h2 className="mb-10 text-[1.5rem]">GraphQL Trivia</h2>
        <input
          name="login"
          required
          minLength={2}
          className="bg-transparent mb-5 outline-none"
          placeholder="Login..."
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          name="password"
          required
          minLength={2}
          className="bg-transparent mb-5 outline-none"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isSigned && (
          <input
            name="confirmedPassword"
            required
            minLength={2}
            className="bg-transparent mb-5 outline-none"
            placeholder="Confirm Password..."
            type="password"
            value={confirmedPassword}
            onChange={verifyPassword}
          />
        )}

        <button
          type="submit"
          className="mt-3 bg-secondary-color p-1 rounded focus:opacity-80  hover:opacity-80 transition-opacity ease-linear duration-100"
        >
          {isSigned ? "Sign In" : "Sign Up"}
        </button>

        <button
          onClick={() => setIsSigned((prev) => !prev)}
          className="text-[0.7rem] opacity-70 hover:opacity-90 mt-3 transition-opacity ease-linear duration-300"
        >
          {isSigned ? "Sign Up" : "Sign In"}
        </button>

        {error && (
          <div className="text-sm absolute left-[50%] translate-x-[-50%] bottom-[-30px] w-[100%] text-error-color">{`${error}`}</div>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
