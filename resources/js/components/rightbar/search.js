import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Search extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="text-left ">
                <li
                    className="cursor-pointer rounded hover:bg-white transform hover:scale-110 px-4"
                    style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                    }}
                    onClick={this.props.hclick}
                >
                    {this.props.pitem}
                </li>
            </div>
        );
    }
}
