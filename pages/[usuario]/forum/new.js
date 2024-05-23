import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import CadastrarForum from '../../../components/Forum/CadastrarForum/CadastrarForum'

export default function CadastrarForumPage() {
    return (
        <>
        <Header hide={ {cadastrar: true} }/>

        <h1 className="pageTitle">Criar Fórum</h1>
        <hr></hr>

        <CadastrarForum />

        <Footer />
        </>

    )
}