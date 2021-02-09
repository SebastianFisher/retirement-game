import React from 'react';
import { Button } from "react-bootstrap";
import Portfolio from "./Portfolio.jsx";
import RebalanceSlider from "./RebalanceSlider.jsx";
import pic1 from "./images/market-increase.png";
import pic2 from "./images/market-decrease.png";
import "./Game.css";

function GameRules(props) {
    let rulesBtn = <Button variant="danger" onClick={props.onClick}>Continue</Button>
    if (props.version === 1) {
        return (
            <div className="game-rules">
                <h4>Strategy A:</h4>
                <p>Strategy A is a <span className="underline">traditional, theory-based approach</span> to retirement investing.
                It involves a fixed allocation to stocks and bonds along with automatic annual rebalancing of the portfolio back
                to the original, fixed allocation. </p>
                <ul className="rules-list">
                    <li>
                        Your $100 of financial assets are placed in a single balanced
                        portfolio (e.g., half is allocated to risky assets like stocks,
                        and the other half allocated to safe assets like bonds).
                    </li>
                    <li>
                        Each year you withdraw $10 for spending predetermined spending amounts
                        from the portfolio, drawing down the risky and safe assets together pro rata,
                        in proportion to the underlying allocation.
                    </li>
                    <li>
                        At the end of each year, regardless of how the markets performed, the default
                        advice is to "rebalance" the portfolio is automatically “rebalanced,” back to its initial
                        allocation (e.g. 50% stocks, 50% bonds) after the retiree withdraws that year’s spending amount.
                        The player may alternatively choose not to rebalance or even move to an entirely different allocation.
                    </li>
                </ul>
                {rulesBtn}
            </div>
        )
    } else if (props.version === 2) {
        return (
            <div className="game-rules">
                <h4>Strategy B:</h4>
                <p>Strategy A is a <span className="underline">modern, behavior-based approach</span> to retirement investing.
                It involves a bond-oriented allocation dedicated to support near-term spending needs and an equity allocation
                for longer-term growth. The growth portfolio replenishes the spending portfolio only when markets are accommodative.</p>
                <ul className="rules-list">
                    <li>
                        Your $100 of financial assets are placed in two separate portfolios, each dedicated to a
                        specific purpose. One of these portfolios consists of safe assets like bonds which are less
                        exposed to market movements. This portfolio is used to support your annual spending allowance
                        over a set period of years.
                    </li>
                    <li>
                        Each year you withdraw $10 for spending from the safe portfolio. The safe portfolio is not
                        impacted by the markets.
                    </li>
                    <li>
                        The other portfolio consists of risky assets like stocks, and is dedicated to long term growth
                        and is not drawn on directly to support spending.
                    </li>
                    <li>At the end of each year, if the market did not go down, the default advice is to replenish
                    the safe portfolio with one year's spending ($10) from the growth portfolio. The player may alternatively
                    choose to replenish more or less or even move money from the safe portfolio to the growth portfolio
                    regardless of market performance.</li>
                </ul>
                {rulesBtn}
            </div>
        )
    }
}

function GameInfo(props) {
    if (props.version === 1) {
        return (
            <div className="info">
                <Portfolio balance={props.balance} result={props.marketResult} title={"Investment Portfolio"} equities={props.potA} cash={props.potB} />
                <p style={{ fontSize: 22 }}>
                    Round: {props.round}<br />
                    Path: {props.pathNum + 1}<br />
                </p>
            </div>
        );
    } else if (props.version === 2) {
        return (
            <div className="info">
                <Portfolio balance={props.potA} result={props.marketResult} title={"Growth Portfolio"} />
                <Portfolio balance={props.potB} title={"Spending Portfolio"} result={props.spendResult} />
                <p style={{ fontSize: 22 }}>
                    Round: {props.round}<br />
                    Path: {props.pathNum + 1}<br />
                    Total Wealth: ${props.balance.toFixed(2)}<br />
                </p>
            </div>
        );
    }
}

function MarketInfo(props) {



    let result;
    let increased = props.change > 0;
    let newPotA = props.potA + props.change;
    let advice;
    if (increased) {
        result = `The markets went up and your equities increased in value from $${props.potA.toFixed(2)} to $${newPotA.toFixed(2)}. `;
        if (props.version === 2) {
            advice = "Since the market went up, we advise that you shift $10 into your spending portfolio to cover another year of spending.";
        }
    } else {
        result = `The markets went down and your equities decreased in value from $${props.potA.toFixed(2)} to $${newPotA.toFixed(2)}. `;
        if (props.version === 2) {
            advice = "Since the market went down, we advise that you leave your allocation between portfolios as is.";
        }
    }
    if (props.version === 1) {
        advice = "We advise that you shift your portfolio back to the default 50/50 allocation.";
    }

    let increaseOrDecrease = increased ? 'increase' : 'decrease';
    let info;
    if (props.version === 1) {
        info = `After the market ${increaseOrDecrease}, $10 was taken from your portfolio to account for living expenses. `;
    } else {
        info = `After the market ${increaseOrDecrease}, $10 was taken from your spending portfolio to account for living expenses. Your current portfolio balance is shown above. `;
    }

    result += info + advice;

    let bgImage = increased ? pic1 : pic2;

    if (props.end) {
        return (
            <div>
                <div className="market-info">
                    <img src={bgImage} alt={`market ${increaseOrDecrease}`} />
                    <div className="results-container"><p className="results">{result}</p></div>
                </div>
                <Button variant="danger" onClick={props.continueToEnd}>Game Over! Continue</Button>
            </div>
        )
    }

    return (
        <div>
            <div className="market-info">
                <img src={bgImage} alt={`market ${increaseOrDecrease}`} />
                <div className="results-container"><p className="results">{result}</p></div>
            </div>
            <Button variant="danger" onClick={props.takeAdvice}>Take the Advice</Button>
            <Button variant="danger" onClick={props.rebalance}>Choose Your Own Reallocation</Button>
            <Button variant="danger" onClick={props.continue}>Don't Reallocate</Button>
        </div>
    );
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        let numRounds = 4;
        for (let i = 0; i < 2; ++i) {
            numRounds += Math.floor(Math.random() * 2);
        }

        this.firstVersion = Math.floor(Math.random() * 2 + 1);

        this.paths = [[-0.2, 0.2, -0.2, 0.3, 0.1, -0.2], [-0.3, 0.2, 0, 0.4, .1, 0.3], [0.1, 0.1, 0, 0.2, 0, 0.1], [0.1, 0.1, 0, 0.2, 0.2], [0.1, 0.2, 0.1, 0, -0.1, 0], [-0.1, -.4, -.2, 0.4, 0.4, 0.2], [0.2, -.2, .3, .3, .2, .1], [-.2, .3, .3, 0, .2, 0], [0.3, 0.1, 0.2, 0.3, 0.1, 0.2], [0.1, 0.1, 0.1, 0.1, -0.1, 0.2]];

        this.initialState = {
            balance: 100.0,
            potA: 50.0,
            potB: 50.0,
            round: 1,
            marketResult: "",
            spendResult: "",
            allocation: 50
        };

        // Sets states with values for the balance, round, and rounds
        this.state = { ...this.initialState, gameNum: 0, stage: "rules", pathsUsed: [], numRounds: numRounds, version: this.firstVersion };

        // bind necessary methods
        this.doneReadingRules = this.doneReadingRules.bind(this);
        this.changePath = this.changePath.bind(this);
        this.markets = this.markets.bind(this);
        this.continue = this.continue.bind(this);
        this.doRebalance = this.doRebalance.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleRebalanceOver = this.handleRebalanceOver.bind(this);
        this.takeAdvice = this.takeAdvice.bind(this);
        this.changeToChoices = this.changeToChoices.bind(this);
        this.continueToEnd = this.continueToEnd.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.nextGame = this.nextGame.bind(this);
    }

    // choose a random path
    changePath() {
        this.setState(state => {
            let path;
            const copyPathsUsed = state.pathsUsed.slice();
            if (state.gameNum === 0 || state.gameNum === 7) {
                path = 9;
            } else if (state.gameNum > 0 && state.gameNum < 7) {
                // copy the paths used array and add a randomly chosen path to it from paths 1-6
                path = Math.floor(Math.random() * 6);
                while (copyPathsUsed.includes(path)) {
                    path = Math.floor(Math.random() * 6);
                }
                copyPathsUsed.push(path);
            } else {
                if (state.gameNum === 8) {
                    copyPathsUsed.splice(0, copyPathsUsed.length);
                }
                // choose a random path either 5, 1, 0, 6, 7, or, 8
                const possPaths = [5, 1, 0, 6, 7, 8];
                path = possPaths[Math.floor(Math.random() * possPaths.length)];
                while (copyPathsUsed.includes(path)) {
                    path = Math.floor(Math.random() * possPaths.length);
                }
                copyPathsUsed.push(path);
            }

            // return updated state
            return {
                path: path,
                pathsUsed: copyPathsUsed
            }
        });
    }

    // spend function
    spend() {
        this.setState(state => ({
            initPotB: state.potB,
            potBAfterSpend: state.potB - 10,
            spendResult: "decrease"
        }));

        this.setState(state => ({
            potB: state.potB - 10,
            balance: state.balance - 10
        }));
    }

    // Simulates action of the markets on your balance
    markets() {
        // Simulate action of the market and create a state property for the result
        let result = this.paths[this.state.path][this.state.round - 1] + 1;

        this.setState({ marketResult: result > 1 ? "increase" : "decrease" });

        // update appropriate values in state for the market result
        this.setState(state => ({
            gainOrLoss: state.potA * result - state.potA,
            potA: Number.parseFloat((state.potA * result).toFixed(2)),
            initPotA: state.potA,
            potAAfterMarket: state.potA + Number.parseFloat((state.potA * result - state.potA).toFixed(2))
        }));
        this.setState(state => ({ balance: state.potA + state.potB }));

        // Set the state to choices and call the spend method 
        this.spend();
        this.changeToChoices(); // changes to the right stage of choices depending on whether the game should end
    }

    changeToChoices() {
        let stage;
        if (this.state.round === this.state.numRounds || this.state.roundsLeft === 1) {
            stage = "choices-end";
        } else {
            stage = "choices";
        }
        this.setState({ stage: stage });
    }

    // changes stage when done reading rules
    doneReadingRules() {
        this.setState({ stage: "market" });

        // change path after done reading rules
        this.changePath();
    }

    // method to continue after markets and do nothing
    continue() {
        this.setState(state => ({ round: state.round + 1, stage: "market" }));
    }

    // open rebalance slider
    doRebalance() {
        this.setState({ rebalance: true, stage: "rebalance" });
    }

    // Handles the change to the allocation value when the rebalance slider is moved
    handleSlide(value) {
        this.setState({ allocation: value })
        this.rebalance();
    }

    // Rebalances the pot based on the allocation value (ranges from 0.25 --> 0.75)
    rebalance() {
        this.setState(state => ({
            potA: Number(state.allocation),
            potB: Number(state.balance - state.allocation)
        }));
    }

    // moves on from the rebalancing phase
    handleRebalanceOver() {
        this.setState(state => ({ round: state.round + 1, stage: "market", rebalance: false }));
    }

    // method for if the user decides to take the default advice for the current strategy
    takeAdvice() {
        if (this.state.version === 1) {
            this.setState(state => ({
                potA: state.balance / 2,
                potB: state.balance / 2
            }));
        } else if (this.state.version === 2) {
            if (this.state.gainOrLoss > 0) {
                this.setState(state => ({
                    potA: state.potA - 10,
                    potB: state.potB + 10
                }));
            }
        }
        this.continue();
    }

    // continues to the end screen after game
    continueToEnd() {
        this.setState({ stage: "end" });
    }

    // reset to default game values for the next round
    resetGame() {
        this.setState(this.initialState);
    }

    // continues on to the next game once the player reaches the end screen
    nextGame() {
        this.resetGame(); // reset to default game values

        // move to next game
        this.setState(state => {
            console.log(state);
            // change the stage to rules or markets, depending on the game
            let stage;
            if (state.gameNum === 6) {
                stage = "rules";
            } else {
                stage = "market";
            }

            // change the version if passed game number 7
            let version = state.version;
            if (state.gameNum === 6) {
                state.version === 1 ? version = 2 : version = 1;
            }

            // reset number of rounds
            let numRounds = 4;
            for (let i = 0; i < 2; ++i) {
                numRounds += Math.floor(Math.random() * 2);
            }

            return {
                gameNum: state.gameNum + 1,
                stage: stage,
                version: version,
                numRounds: numRounds
            }
        }, this.changePath);

        // move to end end screen if done with all rounds
        this.setState(state => {
            let stage = state.stage;
            if (state.gameNum === 13) {
                stage = "endEnd";
            }

            return {stage};
        });
    }

    render() {
        let content;
        if (this.state.stage === "rules") {
            content = <GameRules version={this.state.version} onClick={this.doneReadingRules} />;
        }
        else if (this.state.stage === "market") {
            content = <div>
                <GameInfo version={this.state.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} marketResult={this.state.marketResult} spendResult={this.state.spendResult} pathNum={this.state.path} />
                <Button variant="danger" onClick={this.markets}>Start Round {this.state.round}</Button>
            </div>;
        }
        else if (this.state.stage === "choices") {
            content = <div>
                <GameInfo version={this.state.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} marketResult={this.state.marketResult} spendResult={this.state.spendResult} pathNum={this.state.path} />
                <MarketInfo change={this.state.gainOrLoss} version={this.state.version} potA={this.state.initPotA} continue={this.continue} takeAdvice={this.takeAdvice} rebalance={this.doRebalance} />
            </div>;
        }
        else if (this.state.stage === "rebalance") {
            content = <div>
                <GameInfo version={this.state.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} marketResult={this.state.marketResult} spendResult={this.state.spendResult} pathNum={this.state.path} />
                <RebalanceSlider onSlide={this.handleSlide} potA={this.state.potA} balance={this.state.balance} /> <br />
                <Button id="done-rebalancing" variant="danger" onClick={this.handleRebalanceOver}>Done Rebalancing</Button>
            </div>
        }
        else if (this.state.stage === "choices-end") {
            content = (<div>
                <GameInfo version={this.state.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} marketResult={this.state.marketResult} spendResult={this.state.spendResult} pathNum={this.state.path} />
                <MarketInfo change={this.state.gainOrLoss} version={this.state.version} potA={this.state.initPotA} continue={this.continue} takeAdvice={this.takeAdvice} rebalance={this.doRebalance} end={true} continueToEnd={this.continueToEnd} />
            </div>);
        } else if (this.state.stage === "end") {
            let message;
            if (this.state.balance < 0) {
                message = "You're out of money.";
            } else {
                message = "You made it through all the rounds successfully!";
            }
            content = (
                <div>
                    <GameInfo version={this.state.version} potA={this.state.potA} potB={this.state.potB} balance={this.state.balance} round={this.state.round} marketResult={this.state.marketResult} spendResult={this.state.spendResult} pathNum={this.state.path} />
                    <p style={{ "fontSize": "20px" }}>{`Game Over! ${message}`}</p>
                    <Button variant="primary" onClick={this.nextGame}>Next Game</Button>
                </div>
            )
        } else {
            content = (
                <div>
                    <p style={{ "fontSize": "20px" }}>All rounds completed.</p>
                </div>
            )
        }

        // figure out heading
        let strategy;
        let gameNum;
        if (this.state.gameNum === 0 || this.state.gameNum === 7) {
            gameNum = "Practice Round";
        } else if (this.state.gameNum > 7) {
            gameNum = `Game ${this.state.gameNum - 1}`;
        } else {
            gameNum = `Game ${this.state.gameNum}`;
        }
        if (this.state.version === 1) {
            strategy = "Strategy A";
        } else {
            strategy = "Strategy B";
        }
        return (
            <div className="game">
                <header>{`${strategy}: ${gameNum}`}</header>
                <div className="content">
                    {content}
                </div>
            </div>
        )
    }
}
