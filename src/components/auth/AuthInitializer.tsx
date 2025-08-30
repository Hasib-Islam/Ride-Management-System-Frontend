import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetProfileQuery } from '@/store/api/authApi';
import { setUser, initializeAuth } from '@/store/slices/authSlice';

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const { token, isInitialized } = useAppSelector((state) => state.auth);

  const hasValidToken =
    token && token !== 'undefined' && token !== 'cookie-based';

  const { data: profileResponse, error } = useGetProfileQuery(undefined, {
    skip: !hasValidToken || isInitialized,
  });

  console.log('AuthInitializer:', {
    token,
    isInitialized,
    hasValidToken,
    profileResponse,
    error,
  });

  useEffect(() => {
    console.log('AuthInitializer effect running');
    if (hasValidToken && profileResponse?.success && profileResponse.data) {
      console.log('Setting user from profile:', profileResponse.data);
      dispatch(setUser(profileResponse.data));
    } else if (!hasValidToken || error) {
      console.log('No valid token or error, initializing auth');
      dispatch(initializeAuth());
    }
  }, [hasValidToken, profileResponse, error, dispatch]);

  return null;
}
