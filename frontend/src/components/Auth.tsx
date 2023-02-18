import { FormEvent, useState } from "react";

const Auth = () => {
  const [isSignedUp, setIsSignedUp] = useState<Boolean>(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(login, password);
  }

  return (
    <div className="bg-primary-color text-contrast-color w-[100vw] h-[100vh] flex justify-center items-center">
      <form className="flex text-center flex-col" onSubmit={handleSubmit}>
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
          className="bg-transparent mb-8 outline-none"
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-secondary-color p-1 rounded focus:opacity-80  hover:opacity-80 transition-opacity ease-linear duration-100"
        >
          {isSignedUp ? "Sign In" : "Sign Up"}
        </button>

        <button
          onClick={() => setIsSignedUp((prev) => !prev)}
          className="text-[0.7rem] opacity-70 hover:opacity-90 mt-3 transition-opacity ease-linear duration-300"
        >
          {isSignedUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
