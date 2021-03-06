import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleIconImg from '../../assets/images/google-icon.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import ToastAnimated, { ShowToast } from '../../components/Toast';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';
import './styles.scss';

export function Home() {
  const { signInWithGoogle, user } = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState('');
  const { theme } = useTheme();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = database.ref(`rooms/${roomCode}`).get();

    if (!(await roomRef).exists()) {
      ShowToast({ type: 'error', message: 'Room does not exists' });
      return;
    }

    if ((await roomRef).val().endedAt) {
      ShowToast({ type: 'error', message: 'Room already closed' });
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <ToastAnimated />
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />

        <strong>Crie salas de Q&amp;A ao-vivo</strong>

        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <Button
            type="submit"
            className="create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleIconImg} alt="google icon" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">
            ou entre em um sala
          </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
