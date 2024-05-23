import CadastrarForm from '../Forum/CadastrarForum/CadastrarForum'
import styles from './Modal.module.scss'
import { BiX } from 'react-icons/bi'

export default function Modal({handleClose, title, children}) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <h3>{title}</h3>
                <button onClick={() => handleClose(false)}><BiX /></button>
            </div>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    )
}