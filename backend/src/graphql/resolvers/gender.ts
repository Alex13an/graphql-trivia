import { createGender } from "../../service/genderService";
import { Gender, MutationAddGenderArgs } from "../generated/graphqlTypes";

const gender = {
  Query: {
    test: () => null,
  },
  Mutation: {
    addGender: async (_: never, { title, description }: MutationAddGenderArgs): Promise<Gender> => {
      const newGender = await createGender(title, description);

      return newGender;
    },
  },
};

export default gender;
