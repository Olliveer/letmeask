import { useHistory } from 'react-router-dom';
import { database } from '../../services/firebase';
import { Button } from '../Button';
import { ShowToast } from '../Toast';

import './styles.scss';

type IModalProps = {
  imgURL: string;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  roomId: string | undefined;
  questionId: string | undefined;
  type: string;
}

function Modal({
  imgURL,
  isModalVisible,
  setIsModalVisible,
  roomId,
  questionId,
  type,
}: IModalProps) {
  const history = useHistory();

  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove().then(() => {
      ShowToast({ type: 'success', message: 'Question deleted' });
    });

    setIsModalVisible(false);
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    }).then(() => {
      ShowToast({ type: 'success', message: 'Room deleted' });
    });

    history.push('/');
  }

  return (
    <div className="overlay">
      <div>
        <img src={imgURL} alt="Remover" />
        <h1>{(type === 'delete') ? 'Remover pergunta' : 'Encerrar Sala'}</h1>
        {(type === 'delete') ? (
          <span>Tem certeza que deseta remover a pergunta?</span>
        ) : (
          <span>Tem certeza que deseta encerrar sala?</span>
        )}

        <div>
          <Button onClick={() => setIsModalVisible(false)}>
            Cancelar
          </Button>

          <Button onClick={(type === 'delete') ? handleDeleteQuestion : handleEndRoom}>
            {(type === 'delete') ? 'Sim, remover' : 'Sim, encerrar'}
          </Button>
        </div>

      </div>
    </div>
  );
}

export { Modal };
