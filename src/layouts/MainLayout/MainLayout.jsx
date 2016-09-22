import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import styles from './MainLayout.less';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <h1>Spring Annotation</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <h2>注解搜索</h2>
          <Link to="/anno" >注解</Link><br />
          <h2>筛选:</h2>
          <Link to="/">All</Link><br />
          <Link to="/completed">Completed</Link><br />
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <div className={styles.foot}>
        Built with react, react-router, ant-tool, css-modules, antd...
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
