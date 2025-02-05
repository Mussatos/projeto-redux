import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { deleteAddress, fetchUsers, fetchUserById } from '../../redux/user/slice';
import { useState } from 'react';

export function Home() {

  const dispatch = useDispatch();

  const { user, users, loading, userById } = useSelector((rootReducer) => rootReducer.user) //utilizando o reducer 

  const [userId, setUserId] = useState('');

  function handleDeleteAddress() {

    dispatch(deleteAddress());

    alert("Endereço deletado com sucesso!");

  }

  function handleFetchUsers() {
    dispatch(fetchUsers());
  }

  function handleFetchUserById() {
    dispatch(fetchUserById(userId))
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.nav}>
          {user === null &&
            <Link to="/" className={styles.link}>
              Login
            </Link>
          }
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? user.name : 'Visitante'}, bem vindo!
            </h1>

            {user &&
              <span>Email: {user.email}</span>
            }

            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location}, n {user.address.number}</p>

                  <button onClick={handleDeleteAddress}>Deletar endereço</button>
                </div>
              </>
            )

            }

            <hr />
            <br />

            <h2>Lista de usuários</h2>
            <button className={styles.fetchButton} onClick={handleFetchUsers}>Buscar usuários</button>

            {loading && <strong>Carregando usuários...</strong>}

            {!loading && users.map((item) => {
              return (
                <div key={item.id}>
                  <p>ID: {item.id} | {item.name}</p>
                </div>
              )
            })}
            <br />
            <hr />
            <br />

            <h2>Buscar um usuário pelo ID</h2>

            <input className={styles.fetchInputId}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder='Digite o ID...' />

            <button className={styles.fetchButton} onClick={handleFetchUserById}>Buscar usuário</button>
            
            {
              userById !== '' &&
              <div key={userById.id}>
                <p>ID: {userById.id} | {userById.name}</p>
              </div>
            }

            <br />
          </div>

        </main >
      </div >
    </>
  )
}
