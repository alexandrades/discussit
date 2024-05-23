import Footer from '../../../../components/Footer/Footer';
import ForumHeader from '../../../../components/Forum/ForumHeader';
import Header from '../../../../components/Header/Header';
import ForumService from '../../../../service/Forum.service';

export default function EditarUsuarioPage({ forum }) {


  return (
    <>
        <Header hide={ {editar: true} }/>

        <ForumHeader forum={forum} ></ForumHeader>

        <Footer />
        </>
  )
}

export async function getServerSideProps(context) {
    const forum = await ForumService.getForumById(context)
    return {
        props: {
            forum
        }
    }
}