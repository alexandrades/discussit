import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './CadastrarForum.module.scss'
import { useContext, useState } from 'react'
import UsuarioService from '../../../service/Usuario.service'
import { useRouter } from 'next/router'
import ForumService from '../../../service/Forum.service'
import { AuthContext } from '../../../contexts/AuthContext.context'

export default function CadastrarForm({ handleClose }) {

    const router = useRouter()
    const {usuario: usuarioLogado} = useContext(AuthContext)
    const [titulo, setTitulo] = useState("")
    const [error, setError] = useState(null)

    function handleTitulo(event) {
        setTitulo(event.target.value)
    }

    async function submitForm(event) {
        event.preventDefault()
        const resultado = await ForumService.createForum({idUsuario: usuarioLogado.idUsuario, titulo})
        if(resultado.idForum){
            if(handleClose){
                handleClose(false)
                router.reload()
            }
            router.push(`/${usuarioLogado.usuario}`)
        } else {
            setError(resultado)
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
    }

    function clearForm() {
        setTitulo("")
    }

    return (
        <div className={styles.formCadastrar}>
            <form onSubmit={submitForm} method="POST">

                <div className={styles.formGroup}>
                    <label htmlFor="formTitulo">Título</label>
                    <input id="formTitulo" name="formTitulo" type="text" value={titulo} onChange={handleTitulo}></input>
                </div>
                {error && (
                    <div className={styles.formGroup}>
                        <span className={styles.error_message}>{error.error}</span>
                    </div>
                )}

                <div className={styles.formButtons}>
                    <button className="btn" type="button" onClick={clearForm}>Limpar</button>
                    <button className="btn" type="submit">Salvar</button>
                </div>
            </form>

        </div>
    )
}