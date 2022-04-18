import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

