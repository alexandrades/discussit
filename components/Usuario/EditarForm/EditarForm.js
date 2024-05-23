import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './EditarForm.module.scss'
import { useContext, useEffect, useState } from 'react'
import UsuarioService from '../../../service/Usuario.service'
import axios from 'axios'
import  Router, { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { AuthContext } from '../../../contexts/AuthContext.context'

export default function EditarForm({ usuario, handleClose }) {
  const router = useRouter()
  const {usuario: usuarioLogado, setUsuario} = useContext(AuthContext)
  const [user, setUser] = useState(usuario.usuario)
  const [nome, setNome] = useState(usuario.nome)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaAtual, setSenhaAtual] = useState('')
  
  useEffect(() => {
    if(usuario) {
      setNome(usuarioLogado.nome)
      setUser(usuarioLogado.usuario)
      setEmail(usuarioLogado.email)
      setSenha(usuarioLogado.senha)
    }
  }, [user])

  function handleNome(event) {
    setNome(event.target.value)
  }

  function handleUsuario(event) {
    setUser(event.target.value)
  }

  function handleEmail(event) {
    setEmail(event.target.value)
  }

  function handleSenha(event) {
    setSenha(event.target.value)
  }

  function handleSenhaAtual(event) {
    setSenhaAtual(event.target.value)
  }

  async function handleSalvarButton(event) {
    event.preventDefault()

    const usuarioAtualizado = {}
    usuarioAtualizado.idUsuario = usuario.idUsuario
    if(nome != '') usuarioAtualizado.nome = nome
    if(email != '') usuarioAtualizado.email = email
    if(senha != '') usuarioAtualizado.senha = senha

    try{
      const resultado = await UsuarioService.updateUsuario(usuarioAtualizado)
      if(resultado[0] == 1 && handleClose) {
          handleClose(false)
      }
      Router.push(`/${usuario.usuario}/profile`)
    } catch(error) {
      console.log(error)
    }
  }

  async function handleExcluirButton(event) {
    event.preventDefault()
    try{
      await UsuarioService.deleteUsuario(usuario.usuario)
      destroyCookie({}, 'discussit-token')
      setUsuario(null)
      Router.push('/')
    } catch(error) {
      console.log(error)
    }
  }

  function clearForm() {
    setNome('')
    setEmail('')
    setSenha('')
  }

  return (
    <div className={styles.formCadastrar}>
      <form onSubmit={handleSalvarButton} method="PUT">
        <div className={styles.formGroup}>
          <label htmlFor="formNome">Nome</label>
          <input
            id="formNome"
            name="formNome"
            type="text"
            value={nome}
            onChange={handleNome}
          ></input>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="formUsuario">Usuario</label>
          <input
            id="formUsuario"
            name="formUsuario"
            type="text"
            value={user}
            onChange={handleUsuario}
          ></input>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="formEmail">Email</label>
          <input
            id="formEmail"
            name="formEmail"
            type="email"
            value={email}
            onChange={handleEmail}
          ></input>
          <small>Não iremos compartilhar seu email com ninguém</small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="formSenha">Nova Senha</label>
          <input
            id="formSenha"
            name="formSenha"
            type="password"
            value={senha}
            onChange={handleSenha}
          ></input>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="formSenha">Senha atual</label>
          <input
            id="formSenhaAtual"
            name="formSenhaAtual"
            type="password"
            value={senhaAtual}
            onChange={handleSenhaAtual}
          ></input>
        </div>

        <div className={styles.formButtons}>
          <button className="btn" type="button" onClick={handleExcluirButton}>
            Excluir Usuario
          </button>
          <button className="btn" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}