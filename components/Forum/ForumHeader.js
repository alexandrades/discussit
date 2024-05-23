import { useRouter } from 'next/router'
import { BiDotsVerticalRounded, BiLeftArrowAlt, BiSend } from 'react-icons/bi'
import { BsStarFill, BsStar } from 'react-icons/bs'
import Image from 'next/image'
import styles from './ForumHeader.module.scss'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext.context'
import Modal from '../Modal/Modal'
import EditarForum from './EditarForm/EditarForum'
import axios from 'axios'
import ForumService from '../../service/Forum.service'
import ComentarioService from '../../service/Comentario.service'
import ComentarioItem, { Comentarios } from '../Comentario/Comentario'

export function ForumHeader({ forum }) {
    const router = useRouter()

    const [conteudo, setConteudo] = useState("")

    const [currentForum, setCurrentForum] = useState(forum)
    const [showForumOptions, setShowForumOptions] = useState(false)
    const [showEditarForum, setShowEditarForum] = useState(false)
    const [showApagarForum, setShowApagarForum] = useState(false)
    const [following, setFollowing] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)
    const { usuario: usuarioLogado, isAutenticado } = useContext(AuthContext)
    const profileOwner = forum.usuario.usuario == usuarioLogado?.usuario

    useEffect(() => {
        axios.get(`http://localhost:3001/forum/${currentForum.idForum}`).then(response => {
            response.data.comentarios = response.data.comentarios.reverse()
            setCurrentForum(response.data)
        })

        ForumService.isFollowing(null, usuarioLogado?.idUsuario, currentForum.idForum).then(response => {
            setFollowing(response)
        })

        ForumService.getFollowersCount(null, currentForum.idForum).then(response => setFollowersCount(response.followersCount))
    }, [currentForum, following])

    function handleConteudoChange(event) {
        setConteudo(event.target.value)
    }

    function handleMouseLeaveForumOptions(event) {
        setShowForumOptions(false)
    }

    function handleClickForumOptions(event) {
        setShowForumOptions(true)
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
        router.push(`/${usuarioLogado.usuario}`)
    }

    async function handleSendComment(event) {
        event.preventDefault()
        const comentario = {
            conteudo,
            idUsuario: usuarioLogado.idUsuario,
            idForum: forum.idForum
        }

        const resultado = await ComentarioService.createComentario(comentario)
        resultado.usuario = {
            idUsuario: usuarioLogado.idUsuario
        }

        const updatedForum = forum
        updatedForum.comentarios.unshift(resultado)

        setConteudo("")
        setCurrentForum(updatedForum)
    }

    async function handleSeguirForumButton(event) {
        const resultado = await ForumService.followForum(null, currentForum.idForum)
        if(resultado) {
            setFollowing(true)
        }
    }

    async function handleDeseguirForumButton(event) {
        const resultado = await ForumService.unfollowForum(null, currentForum.idForum)
        if(resultado.rowsAffected > 0) {
            setFollowing(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.forum_description}>
                <div className={styles.forum_data}>
                    <h1 className="pageTitle"><span onClick={() => router.back()}><BiLeftArrowAlt /></span> {currentForum.titulo}</h1>
                    <small>por: {currentForum.usuario.usuario}</small><br></br>
                    <small>Criado em: {new Date(currentForum.createdAt).toLocaleString('pt-br')}</small><br></br>
                    <small>Atualizado em: {new Date(currentForum.updatedAt).toLocaleString('pt-br')}</small>
                </div>

                <div className={styles.dropdown + " dropdown"}>
                    {!profileOwner && !following &&(
                        <button onClick={handleSeguirForumButton}><BsStar />{followersCount}</button>
                    )}
                    {!profileOwner && following &&(
                        <button onClick={handleDeseguirForumButton}><BsStarFill />{followersCount}</button>
                    )}
                    {profileOwner && (
                        <>
                            <button onClick={handleClickForumOptions}><BiDotsVerticalRounded /></button>
                            {showForumOptions && (
                                <div onMouseLeave={handleMouseLeaveForumOptions} className={styles.dropdownContent}>
                                    <ul>
                                        <button onClick={handleEditForumButton}><li>Editar</li></button>
                                        <button onClick={handleApagarForumButton}><li>Apagar</li></button>
                                    </ul>
                                </div>
                            )}
                        </>
                    )
                    }
                </div>
            </div>
            <hr></hr>
            <div className={styles.comments}>
                <h4 id='comments'>Comentários</h4>
                <div className={styles.new_comment_box}>
                    <form onSubmit={handleSendComment}>
                        <label>Novo comentário</label><br />
                        <textarea id="story" name="story" rows="3" placeholder='Deixe seu comentário aqui ...' onChange={handleConteudoChange} value={conteudo}></textarea>
                        <button type='submit' className={styles.send_button + " button"} disabled={!isAutenticado}>Enviar <BiSend /></button>
                    </form>
                </div>
                <Comentarios comentarios={currentForum.comentarios.reverse()}></Comentarios>
            </div>
            {showEditarForum ? (
                <Modal title={"Editar Fórum"} handleClose={setShowEditarForum}>
                    <EditarForum forum={currentForum} handleClose={setShowEditarForum} ></EditarForum>
                </Modal>
            ) : ''}

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
            ) : ''}
        </div>
    )
}

export default ForumHeader