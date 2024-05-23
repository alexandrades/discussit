import styles from './ForumCard.module.scss'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AuthContext } from '../../../contexts/AuthContext.context'
import Modal from '../../Modal/Modal'
import EditarForum from '../EditarForm/EditarForum'
import Router from 'next/router'
import axios from 'axios'
import ForumService from '../../../service/Forum.service'


export default function ForumCard({ forum, reloadAfter }) {
    const [showCardOptions, setShowCardOptions] = useState(false)
    const [showEditarForum, setShowEditarForum] = useState(false)
    const [showApagarForum, setShowApagarForum] = useState(false)
    const {usuario: usuarioLogado} = useContext(AuthContext)
    const forumOwner = usuarioLogado?.idUsuario == forum.idUsuario

    console.log(forum.usuario)

    function handleClickCardOptions(event) {
        setShowCardOptions(true)
    }

    function handleMouseLeaveCardOptions(event) {
        setShowCardOptions(false)
    }

    function handleEditForumButton(event) {
        setShowEditarForum(true)
    }

    function handleApagarForumButton(event) {
        setShowApagarForum(true)
    }

    async function handleConfirmDeletion(event) {
        await ForumService.deleteForum(null, forum.idForum)
        // setShowApagarForum(false)
        Router.reload()
    }

    return (
        <div className={styles.item} key={forum.idForum}>
            <div className={styles.item_content}>
                {forumOwner && (
                    <div className={styles.dropdown}>
                        <button onClick={handleClickCardOptions}><BiDotsVerticalRounded/></button>
                        {showCardOptions && (
                            <div onMouseLeave={handleMouseLeaveCardOptions} className={styles.dropdownContent}>
                                <ul>
                                    <button onClick={handleEditForumButton}><li>Editar</li></button>
                                    <button onClick={handleApagarForumButton}><li>Apagar</li></button>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {!forumOwner && (
                    <div className={styles.dropdown}>
                        <button onClick={handleClickCardOptions}><BiDotsVerticalRounded/></button>
                        {showCardOptions && (
                            <div onMouseLeave={handleMouseLeaveCardOptions} className={styles.dropdownContent}>
                                <ul>
                                    <li>No actions</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <Link href={`/${forum.usuario}/forum/${forum.idForum}`}>
                    <div>
                        <p>{forum.titulo}</p>
                        <small>By <b>{forum.usuario.usuario ?? forum.usuario}</b></small><br></br>
                        <small>Created in {new Date(forum.createdAt).toLocaleString('pt-br')}</small><br></br>
                        <small>Last update {new Date(forum.updatedAt).toLocaleString('pt-br')}</small>
                    </div>
                </Link>
            </div>

            {showEditarForum ? (
                <Modal title={"Editar Fórum"} handleClose={setShowEditarForum}>
                    <EditarForum forum={forum} handleClose={setShowEditarForum} reloadAfter={reloadAfter} ></EditarForum>
                </Modal>
            ): ''}

            {showApagarForum ? (
                <Modal title={"Editar Fórum"} handleClose={setShowApagarForum}>
                    <>
                    <p className={styles.confirmation_message}>Tem certeza que deseja deletear esta discussão permanentemente?</p>
                    <div className={styles.formButtons}>
                        <button className="btn" type="button" onClick={() => setShowApagarForum(false)}>
                            Cancelar
                        </button>
                        <button className="btn" type="submit" onClick={async () => await handleConfirmDeletion()}>
                            Confirmar
                        </button>
                    </div>
                    </>
                </Modal>
            ): ''}
        </div>
    )
}