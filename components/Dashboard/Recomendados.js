import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.context'
import ForumCard from '../Forum/ForumCard/ForumCard'
import styles from './Recomendados.module.scss'

export default function Recomendados({foruns}) {
    const {usuario: usuarioLogado} = useContext(AuthContext)

    return (
        <div className={styles.container}>
            <h2>Recomendados</h2>
            <div className={styles.itens}>
                {foruns?.map((forum, index) => {
                    if(index < 4){
                        return (
                            <ForumCard forum={forum} key={index}></ForumCard>
                        )
                    }
                })}
            </div>
        </div>
    )
}