import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from '../contexts/AuthContext.context'

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
