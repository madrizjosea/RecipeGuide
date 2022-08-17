import React, { Component } from 'react';
import spinner from '../../assets/loading-icon.gif';
import s from './Loader.module.css';
export default class Loader extends Component {
  render() {
    return <img className={s.spinner} src={spinner} alt="Loading..." />;
  }
}
