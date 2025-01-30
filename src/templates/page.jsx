import React from 'react';
import Navibar from './navbar';

export default function Page(props) {
    return (
        <div className="d-flex">
            <div style={{
                position: 'fixed', 
                boxShadow: '2px 0 5px rgba(0,0,0,0.4)',
            }}>
                <Navibar />
            </div>
            
            <div className="pagina-content flex-grow-1" style={{ marginLeft: '250px', marginBottom: '50px' }}>
                {props.children}
            </div>
        </div>
    );
}
