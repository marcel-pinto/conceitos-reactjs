import React from 'react';

export default function Item({id , title, removeRepository}) {
    return (
        <li>
            <h1>{title}</h1>
            <button onClick={() => removeRepository(id)}>
                Remover
            </button>
      </li>
    );
}