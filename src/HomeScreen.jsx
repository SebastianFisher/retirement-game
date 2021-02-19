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
                    <p>We’re exploring how retirees navigate market risks in their retirement journey.
                    In this exercise, your task is to rebalance your retirement portfolios at the end
                    each “year,” and your goal is to end the journey without running out of funds. You
                    will make 6 journeys in total. In each, you will begin with $100 net worth and will
                    be required to spend $20 each “year” to support your retirement, but each journey
                    will vary in length (number of “years”) and composition of market returns.
                    Treat each journey as if it was the only journey you’ll make. That is,
                    each journey is independent and unrelated to the others. <br />
                    In the first half of the exercise, you will make your allocation decisions in the
                    Planning Strategy A framework and the second half will be played in the Strategy
                    B framework. There will be practice rounds to get familiar with each strategy.</p>
                    <Link to="./game">
                        <Button variant="danger" className="game-btn"><span>Start</span></Button>
                    </Link>
                </div>
            </div>
        );
    }
}