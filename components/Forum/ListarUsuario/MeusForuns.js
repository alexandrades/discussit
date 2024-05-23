import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BiMessageAdd } from 'react-icons/bi'
import { AuthContext, AuthProvider } from '../../../contexts/AuthContext.context'
import Modal from '../../Modal/Modal'
import CadastrarForm from '../CadastrarForum/CadastrarForum'
import ListarForuns from './Listar'
import styles from './MeusForuns.module.scss'

export default function MeusForuns({foruns}) {
    const {usuario, isAutenticado} = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)

    function handleNewForumButton(event) {
        setShowModal(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_header}>
                <h2>Meus Fóruns</h2>
                <button className={"button"} onClick={handleNewForumButton}><BiMessageAdd />  Novo fórum</button>
            </div>
            <div className={styles.itens}>
                <ListarForuns foruns={foruns} limit={8} ></ListarForuns>
            </div>
            { showModal ? 
                (<Modal title={"Criar Fórum"} handleClose={setShowModal} >
                    <CadastrarForm handleClose={setShowModal} />
                </Modal>) : ""}
            
        </div>
    )
}