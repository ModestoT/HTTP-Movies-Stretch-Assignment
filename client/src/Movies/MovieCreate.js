import React from 'react';

function MovieCreate(props) {
    return (
        <form onSubmit={props.createMovie}>
            <input
                type="text"
                name="title"
                value={props.title}
                placeholder="Title"
                onChange={props.handleInput}
            />
            <input
                type="text"
                name="director"
                value={props.director}
                placeholder="Director"
                onChange={props.handleInput}
            />
            <input
                type="text"
                name="metascore"
                value={props.metascore}
                placeholder="Metascore"
                onChange={props.handleInput}
            />
            <input
                type="text"
                name="stars"
                value={props.stars}
                placeholder="Stars"
                onChange={props.handleInput}
            />
            <button>Add Movie</button>
        </form>
    );
}

export default MovieCreate;