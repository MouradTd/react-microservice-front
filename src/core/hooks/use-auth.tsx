import {useAppSelector} from './redux-hooks';

const useAuth = () => {
  const auth = useAppSelector(state => state.auth);
  return auth;
};

export default useAuth;
