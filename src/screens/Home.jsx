import React from 'react';
import Page from '../templates/page.jsx';

export default function Home(props) {
    return (
        <Page>
            <div className="flex-fill p-4">
                <h1 className="display-4 font-weight-bold">Welcome to the Library!</h1>
                <p>Conteúdo principal do site vai aqui.</p>
            </div>
        </Page>
    );
}