'use client';
import { AppContextProvider } from '../src/context/AppContextProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
