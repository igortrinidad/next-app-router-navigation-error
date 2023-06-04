import { cookies } from 'next/headers';

export function getServerSideCookie(key: string): any {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key) as any
  return cookie ? JSON.parse(cookie.value).state : undefined
}