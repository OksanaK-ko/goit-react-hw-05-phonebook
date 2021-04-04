import React from 'react';
import s from './Alert.module.css';

const Alert = () => (
  <div className={s.alertBox}>
    <h2 className={s.alert}>Contact already exists!</h2>
  </div>
);

export default Alert;
