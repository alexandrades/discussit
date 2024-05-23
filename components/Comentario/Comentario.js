import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { AuthContext } from "../../contexts/AuthContext.context"
import styles from "./Comentario.module.scss"
import ComentarioItem from "./ComentarioItem"

export function Comentarios({ comentarios }) {
    const { usuario: usuarioLogado } = useContext(AuthContext)



    return (comentarios.reverse().map(comment => {

        return (
            <ComentarioItem key={comment.idComentario} comentario={comment}></ComentarioItem>
        )
    })
    )
}

export default Comentarios