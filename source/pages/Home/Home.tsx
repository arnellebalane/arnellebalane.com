import React from 'react';
import {Link} from 'react-router-dom';
import style from './Home.css';

function link(text: string, href: string) {
    return href.startsWith('https://')
        ? <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
        : <Link to={href}>{text}</Link>;
}

export default function Home() {
    const arnelle = link('Arnelle Balane', '/');
    const articles = link('articles', '/articles');
    const projects = link('projects', '/projects');
    const github = link('GitHub', 'https://github.com/arnellebalane');
    const codepen = link('Codepen', 'https://codepen.io/arnellebalane');
    const youtube = link('Youtube', 'https://www.youtube.com/channel/UC3-k6RL1rVSXzHI8IU7u3NA');
    const twitter = link('Twitter', 'https://twitter.com/arnellebalane');
    const stackoverflow = link('StackOverflow', 'https://stackoverflow.com/users/story/1343333');
    const linkedin = link('LinkedIn', 'https://www.linkedin.com/in/arnellebalane/');
    const speakerdeck = link('SpeakerDeck', 'https://speakerdeck.com/arnellebalane');
    const channelfix = link('ChannelFix', 'https://channelfix.com/');

    return (
        <div className={style.home}>
            <p>
                Hi! I&apos;m {arnelle}, a software developer from Cebu, Philippines.
            </p>

            <p>
                I share about things that I am building, recently learned, or
                just random stuff through my {articles}.
            </p>

            <p>
                You can find most of my work in my {github} and {codepen} profiles,
                or in the {projects} page.
            </p>

            <p>
                I also have a {youtube} channel where I occasionally upload
                videos of my talks or screencasts.
            </p>

            <p>
                Right now I’m working as a Frontend Developer for {channelfix},
                a startup company in Cebu.
            </p>

            <p>
                You can also find me through these other
                links- {twitter}, {stackoverflow}, {linkedin}, {speakerdeck}.
            </p>

            <p>Have a great day!</p>
        </div>
    );
}
