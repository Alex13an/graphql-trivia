import useRefreshAuthQuery from "@/hooks/useRefreshAuthQuery";
import { gql, useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

const MainMenu = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("Nickname");

  const onCompleted = (res: any) => {
    setNickname(res.getUserData.name);
  }

  const GET_PROFILE = gql`
    query {
      getUserData {
        name
        gender
      }
    }
  `;

  const LOGOUT = gql`
    query {
      logoutUser {
        success
      }
    }
  `;

  const { loading, error, data, refetch } = useRefreshAuthQuery(GET_PROFILE, onCompleted);
  const [ logoutUser, { data: successLogout }] = useLazyQuery(LOGOUT, {
    fetchPolicy: 'no-cache',
  });

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem('access_token');
    router.reload(window.location.pathname);
  }

  const handleNickChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const joinLobby = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-primary-color h-[100vh] w-[100vw] flex justify-center items-center">
      <form className="text-center" onSubmit={joinLobby}>
        <div className="flex justify-center items-center flex-col">
          <Image
            src={""}
            alt="your avatar"
            className="w-[150px] h-[150px] border-contrast-color border-[1px] rounded-sm"
          />
          <input
            className="bg-transparent text-center border-transparent focus:border-transparent focus:ring-0 !outline-none text-secondary-color mb-5 mt-3"
            value={nickname}
            onChange={handleNickChange}
            maxLength={30}
            minLength={2}
          />
        </div>
        <ul className="text-contrast-color">
          <li className="text-xl mb-1">
            <button type="submit">Join Lobby</button>
          </li>
          <li className="text-xl mb-1">
            <button onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default MainMenu;
