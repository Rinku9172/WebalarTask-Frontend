import React from 'react';
import '../App.css';
import Boards from './Boards';

const Home = (props) => {
    const { showAlert } = props;
    return (
        <div>
            <Boards showAlert={showAlert} />
        </div>
    );
};

export default Home;
