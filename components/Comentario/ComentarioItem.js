import Image from "next/image"
import Link from "next/link"
import Router from "next/router"
import { useContext, useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { AuthContext } from "../../contexts/AuthContext.context"
import ComentarioService from "../../service/Comentario.service"
import Modal from "../Modal/Modal"
import styles from './ComentarioItem.module.scss'
import EditarComentario from "./EditarComentario/EditarComentario"

export function ComentarioItem({ comentario }) {
    const {usuario: usuarioLogado} = useContext(AuthContext)
    const [showForumOptions, setShowForumOptions] = useState(false)
    const [showEditarComentario, setShowEditarComentario] = useState(false)
    const [showApagarComentario, setShowApagarComentario] = useState(false)
    const commentOwner = usuarioLogado?.idUsuario == comentario.usuario.idUsuario

    function handleClickForumOptions(event) {
        setShowForumOptions(true)
    }

    function handleMouseLeaveForumOptions(event) {
        setShowForumOptions(false)
    }

    function handleEditComentarioButton(event) {
        setShowEditarComentario(true)
    }

    function handleApagarComentarioButton(event) {
        setShowApagarComentario(true)
    }

    async function handleConfirmDeletion(event) {
        await ComentarioService.deleteComentario(null, comentario.idComentario)
        Router.reload()
    }

    return(
        <div className={styles.comment_box} key={comentario.idComentario}>

            <div className={styles.comment_img_profile}>
                <Image src={`https://discussit-api.onrender.com${comentario.usuario.avatar ?? '/public/avatar/defaultAvatar.jpg'}`} alt="avatar" width={60} height={60} objectFit='cover' fill={"true"} />
            </div>
            <div className={styles.comment_content}>
                <div>
                    <Link href={`https://discussit-tan.vercel.app/${comentario.usuario.usuario}/profile`}><h5>{comentario.usuario.usuario}</h5></Link>
                    <p>{comentario.conteudo}</p>
                    <small>Criado em: {new Date(comentario.createdAt).toLocaleString('pt-br')}</small>{" - "}
                    <small>Atualizado em: {new Date(comentario.updatedAt).toLocaleString('pt-br')}</small>
                </div>
                <div className={styles.dropdown + " dropdown"}>
                    {commentOwner && (
                        <>
                            <button onClick={handleClickForumOptions}><BiDotsVerticalRounded /></button>
                            {showForumOptions && (
                                <div onMouseLeave={handleMouseLeaveForumOptions} className={styles.dropdownContent}>
                                    <ul>
                                        <button onClick={handleEditComentarioButton}><li>Editar</li></button>
                                        <button onClick={handleApagarComentarioButton}><li>Apagar</li></button>
                                    </ul>
                                </div>
                            )}
                        </>
                    )
                    }
                </div>
            </div>
            {showEditarComentario ? (
                <Modal title={"Editar Comentário"} handleClose={setShowEditarComentario}>
                    <EditarComentario comentario={comentario} handleClose={setShowEditarComentario} ></EditarComentario>
                </Modal>
            ): ''}

            {showApagarComentario ? (
                <Modal title={"Apagar Comentário"} handleClose={setShowApagarComentario}>
                    <>
                    <p className={styles.confirmation_message}>Tem certeza que deseja deletear este comentário permanentemente?</p>
                    <div className={styles.formButtons}>
                        <button className="btn" type="button" onClick={() => setShowApagarComentario(false)}>
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

export default ComentarioItem