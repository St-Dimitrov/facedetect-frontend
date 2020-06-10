import React, { Component } from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageURL, box }) => {
    //console.log('check', imageURL)
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol,}}></div>
            </div>
        </div>
    );
}

export default FaceDetection;