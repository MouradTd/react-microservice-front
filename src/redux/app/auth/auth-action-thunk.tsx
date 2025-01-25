import {LoginCreds, authService} from '@/api';
import {AppThunk} from '@/redux/store';

class AuthActionThunk {
  login(creds: LoginCreds): AppThunk {
    return async (dispatch, state) => {
      try {
        const res = await authService.login(creds);
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export const authActionThunk = new AuthActionThunk();
