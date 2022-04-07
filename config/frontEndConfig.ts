/** @format */

import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfoConfig';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: 'username', //place holder for username
                label: 'Username',
                placeholder: 'username goes here',
              },
            ],
          },
        },
      }),
      SessionReact.init(),
    ],
  };
};
