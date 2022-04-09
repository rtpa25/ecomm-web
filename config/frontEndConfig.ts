/** @format */

import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfoConfig';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        getRedirectionURL: async (context) => {
          if (context.action === 'SUCCESS') {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath;
            }

            return '/products';
          }
          return undefined;
        },
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
