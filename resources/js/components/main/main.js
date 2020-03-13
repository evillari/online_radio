import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: []
        };
    }

    render() {
        return (
            <div>
                <div className="border shadow-lg rounded-lg overflow-hidden m-4">
                    <div className="flex justify-center mx-auto">
                        <h1 className="text-left p-2">
                            {this.props.info.callsign ?? this.props.station ?? (
                                <span> No station playing. </span>
                            )}
                        </h1>
                    </div>

                    <div className="flex justify-center mx-auto bg-gray-300">
                        <audio
                            src={this.props.info.url ?? this.props.s_url}
                            controls
                            autoPlay
                            className="outline-none"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
