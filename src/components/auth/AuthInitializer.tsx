import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useGetProfileQuery } from '@/store/api/authApi';
import { setUser, initializeAuth } from '@/store/slices/authSlice';

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  const {
    data: profileResponse,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetProfileQuery(undefined);

  useEffect(() => {
    if (isSuccess && profileResponse?.success && profileResponse.data) {
      dispatch(setUser(profileResponse.data));
    } else if (isError) {
      dispatch(initializeAuth());
    } else if (!isLoading && !isSuccess) {
      dispatch(initializeAuth());
    }
  }, [profileResponse, error, isLoading, isSuccess, isError, dispatch]);

  return null;
}
