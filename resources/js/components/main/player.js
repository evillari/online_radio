import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Radio from "../radio.png";
import * as Info from "../constant";

export default class Player extends Component {
    //url, image, description, encoding, country, state, city, language,
    constructor(props) {
        super(props);
        this.state = {
            audiostatus: [],
            current: [],
            status: false,
            RadioImage: Radio
        };
    }

    setErrorAudio() {
        this.setState({
            audiostatus: "Station out of reach",
            status: false,
            current: [],
            RadioImage: Radio
        });
    }
    setLoadStart() {
        this.setState({
            audiostatus: "Loading...",
            status: false,
            current: [],
            RadioImage: Radio
        });
    }
    setOnPlay() {
        this.setState({
            audiostatus: "Started",
            status: true
        });
    }
    setOnPlaying() {
        this.setState({
            audiostatus: "Playing",
            status: true,
            RadioImage: []
        });
    }
    setOnPause() {
        this.setState({
            audiostatus: "Pause",
            status: true
        });
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.status) {
                this.getCurrentPlaying();
            }
        }, 1000);
    }

    async getCurrentPlaying() {
        await axios
            .get(Info.BASE_API_URL + "current_playing/" + this.props.station.id)
            .then(data => {
                this.setState({
                    current: data.data.result[0]
                });
            });
    }

    render() {
        const {
            id,
            callsign,
            url,
            image,
            description,
            encoding,
            country,
            state,
            city,
            language
        } = this.props.station;

        const { status, audiostatus, RadioImage } = this.state;
        return (
            <div className="mx-auto border shadow-lg rounded-lg overflow-hidden w-full  ">
                <div className=" justify-center mx-auto text-xs">
                    <div
                        className="bg-gray-200 text-dark-800 rounded text-xs  "
                        style={{ height: "auto" }}
                    >
                        {status ? (
                            <div className="flex flex-col justify-center ">
                                {this.state.current.title !== undefined ? (
                                    <React.Fragment>
                                        <div className=" bg-gray-300 text-center">
                                            <h1>Currently Playing:</h1>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-left px-2 font-bold">
                                                <i className="fas fa-music pr-2"></i>
                                                {this.state.current.title}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    ""
                                )}

                                {this.state.current.artist !== undefined ? (
                                    <div>
                                        <div className="text-left px-2 italic w-full">
                                            <i className="fas fa-microphone pr-2"></i>
                                            {this.state.current.artist}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className="mx-auto bg-gray-300 ">
                    <div>
                        <div className="flex justify-between items-center bg-black text-white rounded  text-xs px-4">
                            <h1 className="text-left px-2">{audiostatus}</h1>
                            {this.state.current.callsign !== undefined ? (
                                <div className="px-2 ">
                                    <i className="fas fa-headphones pr-2"></i>
                                    {this.state.current.callsign}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <audio
                            src={url}
                            controls
                            autoPlay
                            className="outline-none w-full"
                            onError={() => this.setErrorAudio()}
                            onLoadStart={() => this.setLoadStart()}
                            onPlay={() => this.setOnPlay()}
                            onPlaying={() => this.setOnPlaying()}
                            onPause={() => this.setOnPause()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
