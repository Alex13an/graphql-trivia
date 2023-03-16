import useRefreshAuthQuery from "@/hooks/useRefreshAuthQuery";
import { gql, useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import GenderSelector from "./GenderSelector";

const MainMenu = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("Nickname");

  const onCompleted = (res: any) => {
    setNickname(res.getUserData.name);
  };

  const GET_PROFILE = gql`
    query {
      getUserData {
        name
        gender_id
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

  const { loading, error, data, refetch } = useRefreshAuthQuery(
    GET_PROFILE,
    onCompleted
  );
  const [logoutUser, { data: successLogout }] = useLazyQuery(LOGOUT, {
    fetchPolicy: "no-cache",
  });

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("access_token");
    router.reload();
  };

  const handleNickChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const joinLobby = () => {
    console.log('123');
  };

  return (
    <div className="bg-primary-color h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="text-center">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={""}
            alt="your avatar"
            className="w-[150px] h-[150px] border-contrast-color border-[1px] rounded-sm"
          />
          <input
            className="bg-transparent text-center border-transparent focus:border-transparent focus:ring-0 !outline-none text-secondary-color mt-3"
            value={nickname}
            onChange={handleNickChange}
            maxLength={30}
            minLength={2}
          />
          <GenderSelector />
        </div>
        <ul className="text-contrast-color mt-5">
          <li className="text-xl mb-1">
            <button onClick={joinLobby}>Join Lobby</button>
          </li>
          <li className="text-xl mb-1">
            <button onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;
