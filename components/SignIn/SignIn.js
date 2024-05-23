import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext.context"
import styles from "./SignIn.module.scss"

export default function SignIn() {

    const {signIn} = useContext(AuthContext)
    const router = useRouter()
    const [usuario, setUsuario] = useState("alexandrade")
    const [senha, setSenha] = useState("alex")
    const [error, setError] = useState(null)

    function handleUsuario(event) {
        setUsuario(event.target.value)
    }

    function handleSenha(event) {
        setSenha(event.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const resultado = await signIn({username: usuario, senha})
        if(resultado) {
            setError(resultado.data)
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.formLogin}>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={styles.formGroup}>
                        <label>Usuario:</label>
                        <input type="text" name="formUsuario" id="formUsuario" onChange={handleUsuario} value={usuario}></input>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Senha:</label>
                        <input type="password" name="formSenha" id="formSenha" onChange={handleSenha} value={senha}></input>
                    </div>
                    {error && (
                        <div className={styles.formGroup}>
                            <span className={styles.error_message}>{error.message}</span>
                        </div>
                    )}

                    <div className={styles.formButtons}>
                        <button className="btn" type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}