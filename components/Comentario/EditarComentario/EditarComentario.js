import styles from './EditarComentario.module.scss'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ComentarioService from '../../../service/Comentario.service'

export default function EditarComentario({ comentario, handleClose, reloadAfter }) {
    const router = useRouter()
    const [conteudo, setConteudo] = useState(comentario.conteudo)


    function handleConteudo(event) {
        setConteudo(event.target.value)
    }

    async function submitForm(event) {
        event.preventDefault()
        const resultado = await ComentarioService.updateComentario({ idComentario: comentario.idComentario, conteudo })
        if (resultado) {
            reloadAfter && router.reload()
            handleClose(false)

        }
    }

    function clearForm() {
        setNome('')
        setEmail('')
        setSenha('')
    }

    return (
        <div className={styles.formCadastrar}>
            <form onSubmit={submitForm} method="PUT">
                <div className={styles.formGroup}>
                    <label htmlFor="formTitulo">Conteúdo</label>
                    <input
                        id="formConteudo"
                        name="formConteudo"
                        type="text"
                        value={conteudo}
                        onChange={handleConteudo}
                    ></input>
                </div>
                <div className={styles.formButtons}>
                    <button className="btn" type="button" onClick={() => handleClose(false)}>
                        Cancelar
                    </button>
                    <button className="btn" type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    )
}