import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import LoadingScreen from '../screens/LoadingScreen';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/home'), 2500);
    return () => clearTimeout(timer);
  }, []);
  return <LoadingScreen />;
}
