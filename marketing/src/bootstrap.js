import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Mount function to start up app
const mount = el => {
    ReactDOM.render(<App/>, el);
}

//If we are in dev and in isolation, call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot) {
        mount(devRoot);
    }
}

//We are running through container and should export the mount function
export { mount };