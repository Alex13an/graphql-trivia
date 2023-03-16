import { FormEvent, SetStateAction, useState } from "react";
import { gql } from "@apollo/client";
import useRefreshAuthMutation from "@/hooks/useRefreshAuthMutation";

interface GenderFormProps {
  setIsFormOpen: (value: SetStateAction<boolean>) => void;
}

const CREATE_GENDER = gql`
mutation AddGender($title: String!, $description: String!) {
  addGender(title: $title, description: $description) {
    id
    title
    description
  }
}
`;

const GenderForm = ({ setIsFormOpen }: GenderFormProps) => {
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');


  const { data, error, loading, setData } = useRefreshAuthMutation(CREATE_GENDER);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    setData({ variables: { title: gender, description }});
    setIsFormOpen(false);
  }

  return (
    <form onSubmit={submitForm} className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary-color w-[50vw] h-[50vh] z-10 text-contrast-color flex items-center flex-col justify-center">
      <h2 className="mb-7">Add your gender</h2>
      <input
        type="text"
        placeholder="Gender..."
        required
        minLength={2}
        className="bg-transparent mb-5 outline-none"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <div className="h-15">
        <textarea
          placeholder="Description..."
          className="bg-transparent mb-5 outline-none resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="bg-secondary-color p-2 rounded-md" type="submit">
        Add Gender
      </button>
      <button
        className="underline text-[0.7rem] opacity-70 hover:opacity-90 mt-2 transition-opacity ease-linear duration-300"
        onClick={() => setIsFormOpen(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default GenderForm;
