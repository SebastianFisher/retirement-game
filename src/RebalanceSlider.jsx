import React from 'react';
import "./RebalanceSlider.css";

export default class RebalanceSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleSlide = this.handleSlide.bind(this);
    }

    // Changes parent state based on how slider is moved
    handleSlide(e) {
        this.props.onSlide(e.target.value);
    }

    render() {
        return (
            <div className="slide-container">
                <input className="slider" type="range" min={Number.parseFloat(0.25 * this.props.balance).toFixed(2)} max={Number.parseFloat(0.75 * this.props.balance).toFixed(2)} step={0.25} value={this.props.potA} onChange={this.handleSlide} />
                <br />
            </div>
        )
    }
}