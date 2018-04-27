import './index.css';

if (process.env.NODE_ENV === 'production') {
    require('./scripts/google-analytics').initialize();
}
