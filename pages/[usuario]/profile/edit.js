import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react'
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import EditarForm from '../../../components/Usuario/EditarForm/EditarForm';
import UsuarioService from '../../../service/Usuario.service';

export default function EditarUsuarioPage({ usuario }) {


  return (
    <>
        <Header hide={ {editar: true} }/>

        <h1 className="pageTitle">Editar Usuário</h1>
        <hr></hr>

        <EditarForm usuario={usuario}/>

        <Footer />
        </>
  )
}
export async function getServerSideProps(context) {
  const {"discussit-token": token} = context.req.cookies
  const usuario = await UsuarioService.getUsuarioData(token)
    return {
        props: {
            usuario
        }
    }
}