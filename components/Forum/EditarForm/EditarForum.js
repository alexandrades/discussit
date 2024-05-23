import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './EditarForum.module.scss'
import { useEffect, useState } from 'react'
import UsuarioService from '../../../service/Usuario.service'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import ForumService from '../../../service/Forum.service'
import { parseCookies } from 'nookies'

export default function EditarForum({ forum, handleClose, reloadAfter }) {
  const router = useRouter()
  const [titulo, setTitulo] = useState(forum.titulo)


  function handleTitulo(event) {
    setTitulo(event.target.value)
  }

  async function submitForm(event) {
    event.preventDefault()
    const resultado = await ForumService.updateForum({ idForum: forum.idForum, idUsuario: forum.idUsuario, titulo })
    if (resultado) {
      reloadAfter && Router.reload()
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
          <label htmlFor="formTitulo">Título</label>
          <input
            id="formTitulo"
            name="formTitulo"
            type="text"
            value={titulo}
            onChange={handleTitulo}
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