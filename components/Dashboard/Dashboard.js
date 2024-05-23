import styles from './Dashboard.module.scss'
import MeusForuns from '../Forum/ListarUsuario/MeusForuns'
import Recomendados from './Recomendados'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard({ meusForuns, foruns }) {
    return (
        <div className={styles.container}>
            <div className={styles.recomendados}>
                <Recomendados foruns={foruns} />
            </div>
            <MeusForuns foruns={meusForuns}></MeusForuns>
        </div>
    )
}