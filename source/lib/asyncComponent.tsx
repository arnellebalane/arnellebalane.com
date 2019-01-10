import React from 'react';

export default function asyncComponent(WrappedComponent) {
    return props => (
        <React.Suspense fallback={<p>Loading...</p>}>
            <WrappedComponent {...props} />
        </React.Suspense>
    );
}
