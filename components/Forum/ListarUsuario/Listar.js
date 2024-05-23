import styles from './Listar.module.scss'
import UsuarioService from '../../../service/Usuario.service'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ForumService from '../../../service/Forum.service'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import ForumCard from '../ForumCard/ForumCard'


export default function ListarForuns({ foruns, limit }) {

    return (
        <div className={styles.listUsuarios}>
            <div className={styles.itens}>
                {foruns.reverse().map((forum) => limit == undefined && <ForumCard forum={forum} reloadAfter={true}/>)}
                {foruns.reverse().map((forum, index) => limit != undefined && index < limit && <ForumCard forum={forum} reloadAfter={true} />)}
            </div>
        </div>
    )
}