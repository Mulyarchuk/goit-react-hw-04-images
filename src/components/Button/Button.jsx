import React from 'react';
import PropTypes from 'prop-types';
import scc from './Button.module.css';

export const Button = ({ nextPage }) => {
  return(
      <button type="button" className={scc.Button} onClick={nextPage}>
        Load more
      </button>
  )
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};