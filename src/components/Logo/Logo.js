import React from 'react';
import Tilt from 'react-tilt';
import brain from './Logo.jpg';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 45 }} style={{ height: 180, width: 250 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} alt='Logo' src={brain}></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;