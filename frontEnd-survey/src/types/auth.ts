export interface PostRegister {
  username: string
  name: string
  agency: string
  description: string
  tnc: boolean
}

export interface Agency {
  id: string;
  name: string;
}

export interface GovUserProfile {
  govId: string;
  name: string;
  username: string;
}

export interface PostAccount {
  username: string
  password: string
}

export interface UserProfile extends Omit<GovUserProfile, 'govId' | 'name'>{
  govId: string;
  email: string;
  name: string;
  description: string;
  created: string;
  agencyId: {
    id: string;
    name: string;
  }
}

export interface UserAuthStorage{
  token: string;
  userProfile: UserProfile
}

export enum ViewPageStates {
  Home = 'home',
  Register = 'register',
  Login = 'login'
}
export type ViewPage = ViewPageStates;

export enum ResponseState {
  Success = 'success',
  Created = 'created'
}

export enum StorageKeys {
  Auth = 'auth',
  UserProfile = 'userProfile'
}
