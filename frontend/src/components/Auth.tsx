import { useState } from "react";

const Auth = () => {
  const [isSignedUp, setIsSignedUp] = useState<Boolean>(true);

  return (
    <div className="bg-primary-color text-contrast-color w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="flex text-center flex-col">
        <h2 className="mb-10 text-[1.5rem]">GraphQL Trivia</h2>

        <input
          className="bg-transparent mb-5 outline-none"
          placeholder="Login..."
          type="text"
        />

        <input
          className="bg-transparent mb-8 outline-none"
          placeholder="Password..."
          type="password"
        />

        <button className="bg-secondary-color p-1 rounded">
          {isSignedUp ? "Sign In" : "Sign Up"}
        </button>

        <button
          onClick={() => setIsSignedUp((prev) => !prev)}
          className="text-[0.7rem] text-contrast-color text-opacity-40 mt-3"
        >
          {isSignedUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
