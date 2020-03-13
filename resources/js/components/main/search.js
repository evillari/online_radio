import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Search extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="text-left pl-4">
                <li
                    className="cursor-pointer rounded hover:bg-white px-4"
                    onClick={this.props.hclick}
                >
                    {this.props.pitem}
                </li>
            </div>
        );
    }
}
