import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CadastrarForm from '../components/Usuario/CadastrarForm/CadastrarForm'

export default function CadastrarUsuario() {
    return (
        <>
        <Header hide={ {cadastrar: true} }/>

        <h1 className="pageTitle">Cadastrar Usuário</h1>
        <hr></hr>

        <CadastrarForm />

        <Footer />
        </>

    )
}