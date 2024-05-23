import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';
import ForumService from '../../service/Forum.service';
import UsuarioService from '../../service/Usuario.service';

export default function DashboardPage({ meusForuns, foruns }) {

    return (
        <> 
            <Header hide={ {cadastrar: true, entrar: true} }/>
                <Dashboard meusForuns={meusForuns} foruns={foruns}></Dashboard>
            <Footer />
            </>
    )
}

export async function getServerSideProps(context) {
    const {"discussit-token": token} = context.req.cookies

    if(!token) {
        return {
            redirect: {
                destination: '/sign',
                permanent: false
            }
        }
    }

    const usuario = await UsuarioService.getUsuarioData(token)
    if(usuario.usuario != context.params.usuario){
        return {
            redirect: {
                destination: `/${context.params.usuario}/profile`,
                permanent: false
            }
        }
    }

    console.log(usuario.idUsuario)
    
    const meusForuns = await ForumService.getForumByIdUsuario(context, usuario)
    let foruns = await ForumService.getRanking(context)
    foruns == undefined ? foruns = null : foruns
    return {
        props: {
            meusForuns,
            foruns
        }
    }

}