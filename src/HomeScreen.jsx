import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./HomeScreen.css";


export default class HomeScreen extends React.Component {
    render() {
        return (
            <div className="home-screen">
                <header>
                    <h1>Welcome to PIMCO'S Retirement Risk Simulator!</h1>
                </header>
                <div className="body">
                    <p>We’re exploring how retirees navigate market risks in retirement.
                    In this simulation, you will make six distinct retirement “journeys” in total. 
                    In each, you will begin with $100 in portfolio assets and will withdraw $20 each “year” 
                    to fund your annual spending. Each journey will vary in length (the number of “years”) and 
                    market returns will differ each year. Your goal is to end the journey without running out of funds. 
                    Treat each retirement journey as if it were the only one you’ll make. That is, each journey 
                    is independent and unrelated to the others. To test your resilience to market risk, we will examine 
                    your reactions in the context of two distinct investment strategies.   <br />
                    There will be one practice round to familiarize you with each planning strategy before you begin. </p>
                    <Link to="./game">
                        <Button variant="danger" className="game-btn"><span>Continue</span></Button>
                    </Link>
                </div>
            </div>
        );
    }
}