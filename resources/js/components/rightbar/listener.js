import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Listener extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="flex text-white">
                <div>
                    <h1> Avatar </h1>
                </div>
                <div>
                    <div>
                        <h1>Username </h1>
                    </div>
                    <div className="flex">
                        <div>
                            <h1>Genre</h1>
                        </div>
                        <div>
                            <h1>Country</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
