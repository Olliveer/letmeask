import compyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={compyImg} alt="Copy roomm code" />
      </div>

      <span>
        Sala #
        {code}
      </span>
    </button>
  );
}

export { RoomCode };
