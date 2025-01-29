import React from 'react';
import Page from '../templates/page.jsx';

export default function HomeScreen(props) {
    return (
        <Page>
            <div className="flex-fill p-4">
                <h1 className="display-4 font-weight-bold">Bem-vindo à Livraria!</h1>
                <p>Conteúdo principal do site vai aqui.</p>
            </div>
        </Page>
    );
}