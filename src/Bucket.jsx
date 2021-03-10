import "./Bucket.css";
import React from 'react';

export default function Bucket(props) {
    let dollars = Math.floor(props.balance);

    // array for the fill to add
    const money = [];

    for (let i = 0; i < dollars; i++) {
        // change color based on amount remaining
        let style = {};
        if (dollars < 30) {
            style.backgroundColor = "rgba(255, 20, 20, 0.75)";
        } else {
            style.backgroundColor = "rgba(41, 255, 37, 0.75)";
        }

        let text = "";
        if ((dollars - i) % 20 === 0) {
            text += `$${dollars - i}`;
            style.borderTop = "1px solid black";
        }

        money.push(<div className="fill" style={style} key={i}>{text}</div>);
    }

    let fit = props.fit ? "bucket-fit-container" : "";
    let fit2 = props.fit ? "bucket-fit" : "";

    return (
        <div id={fit}>
            <p>{props.title}</p>
            <div className={`bucket ${fit2}`}>
                {money}
            </div>
        </div>
    )
}