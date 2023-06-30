import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthProvider } from './shared/contexts';
import { Footer, Header } from './shared/components';
import { AuthService } from './shared/services/api/auth/AuthService';
import { Environment } from './shared/environment';
import { Api } from './shared/services/api/axios-config';

export const App = () => {
  setInterval(() => {
    const refreshToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__REFRESH_TOKEN);
    if(refreshToken){
        AuthService.refreshToken(refreshToken).then(result => {
            if(result instanceof Error){
                console.log(result.message);
            }else{
                localStorage.setItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
                localStorage.setItem(Environment.LOCAL_STORAGE_KEY__REFRESH_TOKEN, result.refreshToken);
                localStorage.setItem(Environment.LOCAL_STORAGE_KEY__USER_DATA, JSON.stringify(result.userData));
                Api.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
            }
        })
    }
  }, 105000);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <main className='flex flex-col min-h-screen scrollbar-default' id='top'>
          <AppRoutes/>
        </main>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}