import React from 'react';
import Page from '../templates/page.jsx';
import { FaGithub } from "react-icons/fa6";

export default function Home(props) {
    return (
        <Page>
            <div className="flex-fill p-4">
                <h1 className="display-4 font-weight-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Welcome to the Library!
                </h1>
                <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Explore the source code for the <strong>Library App</strong> below:
                </p>

                <div className="mt-4">
                    <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}><FaGithub /> GitHub Repositories</h3>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                        <li className="mb-2">
                            <a
                                href="https://github.com/Zoratoo/LibraryApp-frontend"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none text-primary"
                                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px' }}
                            >
                                Frontend Repository
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="https://github.com/Zoratoo/api-LibraryApp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none text-primary"
                                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px' }}
                            >
                                Backend Repository
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Page>
    );
}
