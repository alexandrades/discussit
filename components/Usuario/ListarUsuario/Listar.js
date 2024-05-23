import { Accordion } from 'react-bootstrap'
import styles from './Listar.module.scss'
import UsuarioService from '../../../service/Usuario.service'
import { useEffect, useState } from 'react'
import Link from 'next/link'


function ListarUsuarios(props) {
    const [usuarios, setUsuarios] = useState(props.usuarios)

    const removeItem = async (idUsuario) => {
        const resultado = await UsuarioService.deleteUsuario(idUsuario)
        if(resultado === 204) {
            const usuariosAtualizados = usuarios.filter(usuario => usuario.idUsuario != idUsuario)
            setUsuarios(usuariosAtualizados)
        }
    }


    return (
        <div className={styles.listUsuarios}>
            <Accordion className="usuario-item">
                {
                    usuarios?.map((usuario, index) => 
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                            <span>{usuario.idUsuario} - {usuario.nome}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Usuario: {usuario.usuario}</p>
                            <p>Email: {usuario.email}</p>
                            <p>Senha: {usuario.senha}</p>
                            <button onClick={() => removeItem(usuario.idUsuario)}>Deletar</button>
                            <button><Link href={`/usuario/${usuario.idUsuario}/editar`}>Editar</Link></button>
                        </Accordion.Body>
                    </Accordion.Item>
                    )
                }
            </Accordion>
        </div>
    )
}

export default ListarUsuarios