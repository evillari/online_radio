import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Listener extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        window.Echo.listen(
            "users-channel",
            "." + this.props.username.replace(/\s/g, ""),
            e => {
                if (e.activity == "messaging") {
                }
            }
        );
    }

    render() {
        return (
            <div
                onClick={this.props.thisclick}
                className={
                    "p-4 flex flex-row items-center rounded justify-start text-gray-800 text-xs font-hairline  " +
                    (this.props.status
                        ? "cursor-pointer hover:bg-gray-100"
                        : "")
                }
            >
                <div className="pr-4">
                    <div
                        className={
                            "rounded-full border-2  " +
                            (this.props.status
                                ? "border-green-500"
                                : "border-gray-500")
                        }
                    >
                        <img
                            src={this.props.image}
                            className="rounded-full"
                            width={"40px"}
                            height={"40px"}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <h1>{this.props.username} </h1>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-row items-baseline pr-2">
                            <i className="fas fa-map-marker-alt pr-1"></i>
                            <h1>{this.props.country}</h1>
                        </div>
                        <div className="flex flex-row items-baseline">
                            <i className="fas fa-guitar pr-1"></i>
                            <h1>{this.props.genre}</h1>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
