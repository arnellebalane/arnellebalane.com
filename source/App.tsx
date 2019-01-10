import React, {useState, useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import asyncComponent from './lib/asyncComponent.tsx';
import style from './App.css';

const Home = asyncComponent(React.lazy(() => import('./pages/Home/Home.tsx')));
const Articles = asyncComponent(React.lazy(() => import('./pages/Articles/Articles.tsx')));
const Projects = asyncComponent(React.lazy(() => import('./pages/Projects/Projects.tsx')));
const Repositories = asyncComponent(React.lazy(() => import('./pages/Repositories/Repositories.tsx')));
const Events = asyncComponent(React.lazy(() => import('./pages/Events/Events.tsx')));

function App(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => props.history.listen(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }));

    const mainContentClasses = [
        style.content,
        isMenuOpen && style.hidden
    ].filter(Boolean).join(' ');

    return (
        <div className={style.wrapper}>
            <Header
                isMenuOpen={isMenuOpen}
                onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            />

            <main className={mainContentClasses}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/articles" exact component={Articles} />
                    <Route path="/projects" exact component={Projects} />
                    <Route path="/repositories" exact component={Repositories} />
                    <Route path="/events" exact component={Events} />
                </Switch>
            </main>

            <Footer />
        </div>
    );
}

export default withRouter(App);
