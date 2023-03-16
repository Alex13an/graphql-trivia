export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthUserResponse = {
  __typename?: 'AuthUserResponse';
  accessToken?: Maybe<Scalars['String']>;
};

export type Gender = {
  __typename?: 'Gender';
  description: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type GetUserDataResponse = {
  __typename?: 'GetUserDataResponse';
  ava?: Maybe<Scalars['String']>;
  gender_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type LogoutUserResponse = {
  __typename?: 'LogoutUserResponse';
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGender?: Maybe<Gender>;
  authUser: AuthUserResponse;
  test?: Maybe<Scalars['String']>;
};


export type MutationAddGenderArgs = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationAuthUserArgs = {
  isSigned: Scalars['Boolean'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUserData: GetUserDataResponse;
  logoutUser: LogoutUserResponse;
  refreshUser: AuthUserResponse;
  test?: Maybe<Scalars['Int']>;
};
