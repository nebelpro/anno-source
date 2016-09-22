import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory,hashHistory } from 'react-router';
import App from '../components/App';
import Routes from '../routes/index.jsx';

ReactDOM.render(<Routes history={hashHistory} />, document.getElementById('root'));
