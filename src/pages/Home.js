import React from 'react';
import Layout from '../components/Layout';
import '../css/Home.css';
import {Link} from "react-router-dom";

const Home = () => (
    <Layout>
        <div className="home-container">
            <h2 className="home-title">Welcome to Team Management System</h2>
            <p className="home-description">
                Explore your options below to view team details or player profiles.
            </p>
            <div className="button-container">
                <Link to="/team" className="custom-button view-team">View Team</Link>
                <Link to="/player" className="custom-button view-player">View Player</Link>
            </div>
        </div>
    </Layout>
);

export default Home;
