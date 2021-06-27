/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import './styles.scss';
import cx from 'classnames';
import { useTheme } from '../../hooks/useTheme';

type QuestionProps ={
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

function Question({
  content, author, children, isHighLighted = false, isAnswered = false,
}: QuestionProps) {
  const { theme } = useTheme();

  return (
    <div className={cx(
      `question ${theme}`,
      { answered: isAnswered },
      { highlighted: isHighLighted && !isAnswered },
    )}
    >
      <p>{content}</p>

      <footer>
        <div className={`user-info ${theme}`}>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  );
}

export { Question };
