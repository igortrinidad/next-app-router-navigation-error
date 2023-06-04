/* eslint-disable @next/next/no-page-custom-font */
import { getServerSideCookie } from '@/util/cookies-server-side';
import '../styles/main.scss'
import MainClientComponent from './MainClientComponent'
export default function RootLayout({ children }: any) {

  const generalStoreCookie = getServerSideCookie('general-store')

  const darkMode = generalStoreCookie ? generalStoreCookie.darkMode : false

  return (
    <html className={darkMode ? 'dark' : 'light'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body-class bg-standart">

        <div className="w-screen h-auto min-h-[100vh] max-h-none">
          { children }
        </div>

        <MainClientComponent />
      </body>
    </html>
  );
}