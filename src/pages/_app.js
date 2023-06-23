// import '@/styles/globals.css'
import MainLayout from '@/layout/MainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return <MainLayout>
    <Component {...pageProps} />
    <ToastContainer />
  </MainLayout>
}
