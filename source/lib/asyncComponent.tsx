import React from 'react';

export default function asyncComponent(WrappedComponent) {
    return function AsyncComponent(props) {
        return (
            <React.Suspense fallback={<p>Loading...</p>}>
                <WrappedComponent {...props} />
            </React.Suspense>
        );
    };
}
