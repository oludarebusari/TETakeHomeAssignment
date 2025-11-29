import { config } from 'dotenv';
import { Credentials } from '../../types';

config();

export const validCredentials: Credentials = {
  username: process.env.SAUCEDEMO_USERNAME || 'standard_user',
  password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
};

export const invalidCredentials: Credentials = {
  username: 'invalid_user',
  password: 'wrong_password',
};
