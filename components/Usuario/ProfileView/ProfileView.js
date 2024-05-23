import Image from 'next/image'
import UsuarioService from '../../../service/Usuario.service'
import styles from './ProfileView.module.scss'
import { BiEditAlt, BiUserCheck, BiUserPlus } from 'react-icons/bi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext.context'
import ListarForuns from '../../Forum/ListarUsuario/Listar'
import { parseCookies } from 'nookies'
import Router from 'next/router'
import Modal from '../../Modal/Modal'
import EditarForm from '../EditarForm/EditarForm'

export default function ProfileView({usuario, foruns}) {

    const [showModal, setShowModal] = useState(false)
    const [following, setFollowing] = useState(false)
    const {usuario: usuarioLogado} = useContext(AuthContext)
    const profileOwner = usuario.usuario == usuarioLogado?.usuario
    const [followersCount, setFollowersCount] = useState(undefined)
    const [followingCount, setFollowingCount] = useState(undefined)

    useEffect(() => {
        console.log(foruns)

        UsuarioService.isFollowing(null, usuarioLogado?.idUsuario, usuario.idUsuario).then(response => {
            setFollowing(response)
        })

        UsuarioService.getFollowersCount(null, usuario.idUsuario).then(response => setFollowersCount(response.followersCount))

        UsuarioService.getFollowingCount(null, usuario.idUsuario).then(response => setFollowingCount(response.followingCount))

        const {"discussit-token": token} = parseCookies()
        
        if(!token){
            Router.push('/sign')
        }

    })

    function handleEditButton(event) {
        setShowModal(true)
    }

    async function handleSeguirButton(event) {
        const resultado = await UsuarioService.followUsuario(null, usuario.idUsuario)
        if(resultado) {
            setFollowing(true)
        }
    }

    async function handleSDeseguirButton(event) {
        const resultado = await UsuarioService.unfollowUsuario(null, usuario.idUsuario)
        console.log(resultado)
        if(resultado == 204) {
            setFollowing(false)
        }
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.mainInfo}>
                <Image src={`http://localhost:3001${usuario.avatar ?? '/public/avatar/defaultAvatar.jpg'}`} width={150} height={150} layout='intrinsic' objectFit='cover'></Image>
                <div className={styles.subMainInfo}>
                    <h4>{usuario.nome}</h4>
                    <small>@{usuario.usuario}</small>
                    {profileOwner && <small>{usuario.email}</small>}
                    <small>Fóruns: {foruns.length}</small>
                    <small>Comentários: {52}</small>
                    {/* <br/> */}
                    <div>
                        <span>{followingCount} Seguindo</span>
                        <span>{followersCount} Seguidores</span>
                    </div>
                </div>
                {profileOwner && <button className="button" onClick={handleEditButton}><BiEditAlt />   Editar</button>}
                {!profileOwner && !following && <button className="button" onClick={handleSeguirButton}><BiUserPlus />   Seguir</button>}
                {!profileOwner && following && <button className="button" onClick={handleSDeseguirButton}><BiUserCheck />   Seguindo</button>}
            </div>

            <div className={styles.generalInfo}>
                <h5>Fóruns criados recentemente</h5>
                <ListarForuns foruns={foruns} limit={8}></ListarForuns>
            </div>
            {showModal ? (
                    <Modal title={"Editar usuário"} handleClose={setShowModal}>
                        <EditarForm usuario={usuarioLogado} handleClose={setShowModal}/>
                    </Modal>
                )
                : ""}
        </div>
    )
}