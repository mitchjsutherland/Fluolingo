import React from 'react';

function LetterTiles({ letter, isGuessed }) {

    return (

        <div className="letterTile">
            {isGuessed ? letter : ''}
        </div>

    );

}

export default LetterTiles;