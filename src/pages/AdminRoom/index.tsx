import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import answerImg from '../../assets/images/answer.svg';
import checkImg from '../../assets/images/check.svg';
import deleteImg from '../../assets/images/delete.svg';
import deleteQuestion from '../../assets/images/deleteQuestion.svg';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import ToastAnimated, { ShowToast } from '../../components/Toast';

import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import './styles.scss';

import sun from '../../assets/images/sun.svg';
import moon from '../../assets/images/moon.svg';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

type RoomParams = {
  id: string;
}

function AdminRoom() {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [openModal, setOpenModal] = useState(false);
  const [questionModalId, setQuestionModalId] = useState('');
  const [modalType, setModalType] = useState('');
  const { theme, toggleTheme } = useTheme();

  async function handleDeleteQuestion(questionId: string) {
    setModalType('delete');
    setQuestionModalId(questionId);
    setOpenModal(true);
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  async function handleEndRoom() {
    setModalType('finish');
    setOpenModal(true);
    setModalType('finish');
  }

  async function handleLogOut() {
    await signOut();
    history.push('/');
  }

  return (
    <>
      {openModal && (
        <Modal
          isModalVisible={openModal}
          setIsModalVisible={setOpenModal}
          imgURL={deleteQuestion}
          questionId={questionModalId}
          roomId={roomId}
          type={modalType}
        />
      )}
      <div id="page-room" className={theme}>
        <ToastAnimated />
        <header>
          <div className="content">
            <img src={logoImg} alt="Logo letmeask" />
            <div>
              <RoomCode code={roomId} />
              <Button
                isOutlined
                onClick={handleEndRoom}
              >
                Encerrar sala
              </Button>
              {user && (
              <Button
                onClick={handleLogOut}
              >
                Sair
              </Button>
              )}

              <button onClick={toggleTheme} className="button-theme">
                <img src={(theme === 'light') ? sun : moon} alt="Buttom theme" />
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className={`room-title ${theme}`}>
            <h1>
              Sala
              {' '}
              {title}
            </h1>
            {questions.length > 0 && (
            <span>
              {questions.length}
              {' '}
              pergunta(s)
            </span>
            )}
          </div>

          <div className="question-list">
            {questions.map((question) => (
              <Question
                key={question.id}
                author={question.author}
                content={question.content}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))}
          </div>
        </main>
      </div>

    </>
  );
}

export { AdminRoom };
