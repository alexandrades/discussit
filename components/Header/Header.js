import styles from './Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.context'
import Router from 'next/router'

export default function Header({hide}) {
    const {usuario, isAutenticado, logOut} = useContext(AuthContext)

    // useEffect(() => {
    //     const { 'discussit-token': token } = parseCookies()
    //     if(!token) {
    //         setUsuario(null)
    //     }
    // }, [])

    function handleDashboardButton(event) {
      Router.push(`/${usuario.usuario}`)
    }

    function showMenuUsuario() {
      if(usuario) {
        return (
          <>
            <div className={styles.dropdown}>
              <Link href={`/${usuario.usuario}`}><span>{usuario.usuario}</span></Link>
              
              <Image src={`http://localhost:3001${usuario.avatar ?? '/public/avatar/defaultAvatar.jpg'}`} alt="avatar" width={35} height={35} objectFit='cover' layout='intrinsic'/>
              <div className={styles.dropdownContent}>
                <ul>
                <Link href={`/${usuario.usuario}/profile`}><li>Meu perfil</li></Link>
                <Link href={`/${usuario.usuario}/forum`}><li>Meus Fóruns</li></Link>
                <button onClick={() => logOut()}><li>Sair</li></button>
                </ul>
              </div>
            </div>
          </>
        )
      }
    }

    return (
        <header className={styles.header}>
        <Link href="/"><h1>Discuss<span>!t</span></h1></Link>
        <ul className={styles.navigationBar}>
          { !isAutenticado && <Link href="/cadastrar"><li>Cadastrar</li></Link>}
          { !isAutenticado && <Link href="/sign"><li>Entrar</li></Link>}
          { usuario && isAutenticado && showMenuUsuario() }
        </ul>
      </header>
    )
}