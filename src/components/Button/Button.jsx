import css from './Button.module.css';

import React from 'react';

export const Button = ({ onClick, checkLastPage }) => {
  return (
    <div className={css.buttonSection}>
      <button
        className={`${css.button} ${checkLastPage ? css.hidden : ''}`}
        type="button"
        onClick={() => onClick()}
      >
        Load more
      </button>
    </div>
  );
};
