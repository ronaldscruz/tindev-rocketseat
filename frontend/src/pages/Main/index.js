import React from 'react';

export default function Main({ match }){
    return(
        <div className="main-container">
            <h1>Hello, World!</h1>
            <p>Your ID is: {match.params.id}</p>
        </div>
    );
}