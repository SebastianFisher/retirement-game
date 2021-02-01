import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./HomeScreen.css";


export default class HomeScreen extends React.Component {
    render() {
        return (
            <div className="home-screen">
                <header>
                    <h1>Welcome!</h1>
                </header>
                <div className="body">
                    <p>In this engagement, you will experience two different investment strategies for retirement. 
                    Both are intended to grow and distribute wealth over the course of your retirement. They differ 
                    in how they fund retirement spending, how they define risk, and how they allocate and “rebalance” 
                    assets within the portfolio. <br /><br />After an initial “test round” to get used to both strategies, you will play 6 “rounds” with each, 
                    roughly equivalent to six different market paths in retirement per approach. At the start of each round 
                    you will be provided $100 in retirement assets, and in each stage of each round (roughly equivalent to a 
                    single year in retirement) you must “spend” $10.  The goal of the engagement, as you undergo both strategies, 
                    is to reach the end of retirement successfully, i.e. you want to end each “round” with some assets remaining. 
                    On average the rounds will last for five stages but can last as few as four and as many as six.</p>
                    <Link to="./game">
                        <Button variant="danger" className="game-btn"><span>Start</span></Button>
                    </Link>
                </div>
            </div>
        );
    }
}