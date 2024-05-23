import Image from 'next/image';
import Footer from '../../../components/Footer/Footer';
import ForumHeader from '../../../components/Forum/ForumHeader';
import Header from '../../../components/Header/Header';
import ProfileView from '../../../components/Usuario/ProfileView/ProfileView';
import ForumService from '../../../service/Forum.service';
import UsuarioService from '../../../service/Usuario.service';

export default function ProfilePage({ usuario, foruns }) {


  return (
    <>
        <Header hide={ {editar: true} }/>

        <ProfileView usuario={usuario} foruns={foruns}></ProfileView>

        <Footer />
        </>
  )
}

export async function getServerSideProps(context) {
    const usuario = await UsuarioService.getUsuarioByUsuario(context)
    const foruns = await ForumService.getForunsByUsuario(context)
    return {
        props: {
            usuario,
            foruns
        }
    }
}