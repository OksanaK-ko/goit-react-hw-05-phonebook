import React from 'react'
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, onChangeFilter}) => {
  return (
    <div className={s.form}>
          <label className={s.label} >
            Find contacts by name
            <input className={s.input}
              type="text"
              value={value}
              onChange={onChangeFilter}
            ></input>
      </label>
      </div>
     )
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;