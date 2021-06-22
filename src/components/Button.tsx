/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: PropsButton) {
  return (
    <button className="button" {...props} />
  );
}
