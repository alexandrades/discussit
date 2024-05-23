import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './CadastrarForm.module.scss'
import { useState } from 'react'
import UsuarioService from '../../../service/Usuario.service'
import Router, { useRouter } from 'next/router'

export default function CadastrarForm() {

    const router = useRouter()
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [avatar, setAvatar] = useState(null)

    function handleNome(event) {
        setNome(event.target.value)
    }

    function handleEmail(event) {
        setEmail(event.target.value)

    }

    function handleUsuario(event) {
        setUsuario(event.target.value)
    }

    function handleSenha(event) {
        setSenha(event.target.value)

    }

    function handleAvatar(event) {
        setAvatar(event.target.files[0])

    }

    async function submitForm(event) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('formAvatar', avatar)
        formData.append('formNome', nome)
        formData.append('formEmail', email)
        formData.append('formSenha', senha)
        formData.append('formUsuario', usuario)
        const resultado = await UsuarioService.createUsuario(formData)

        if(resultado.idUsuario) {
            Router.push('/sign')
        }
    }

    function clearForm() {
        setNome("")
        setEmail("")
        setSenha("")
        setAvatar("")
        setUsuario("")
    }

    return (
        <div className={styles.formCadastrar}>
            <form onSubmit={submitForm} method="POST" encType='multipart/form-data'>

            <div className={styles.formGroup}>
                    <label for="formNome">Nome</label>
                    <input id="formNome" name="formNome" type="text" value={nome} onChange={handleNome}></input>
                </div>

                <div className={styles.formGroup}>
                    <label for="formUsuario">Usuario</label>
                    <input id="formUsuario" name="formUsuario" type="text" value={usuario} onChange={handleUsuario}></input>
                </div>

                <div className={styles.formGroup}>
                    <label for="formEmail">Email</label>
                    <input id="formEmail"name="formEmail" type="email" value={email} onChange={handleEmail}></input>
                    <small>Não iremos compartilhar seu email com ninguém</small>
                </div>

                <div className={styles.formGroup}>
                <label for="formSenha">Senha</label>
                <input id="formSenha" name="formSenha" type="password" value={senha} onChange={handleSenha}></input>
                </div>

                <div className={styles.formGroup}>
                <label for="formAvatar">Avatar</label>
                <input id="formAvatar" name="formAvatar" type="file" onChange={handleAvatar}></input>
                </div>

                <div className={styles.formButtons}>
                    <button className="btn" type="button" onClick={clearForm}>Limpar</button>
                    <button className="btn" type="submit">Cadastrar</button>
                </div>
            </form>

        </div>
    )
}