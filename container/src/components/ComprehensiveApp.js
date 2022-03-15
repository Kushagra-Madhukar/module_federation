import {mount} from 'comprehensive/ComprehensiveApp';
import React, {useRef, useEffect} from 'react';

const ComprehensiveApp = () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
    }, []);

    return <div ref={ref} />;
}

export default ComprehensiveApp;