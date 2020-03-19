import React, { Component } from "react";
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

        const { status, audiostatus, RadioImage, current } = this.state;
        return (
            <div className="mx-auto overflow-hidden w-full  ">
                <div className=" justify-center mx-auto text-xs">
                    <div
                        className="bg-gray-200 text-dark-800 text-xs py-2 "
                        style={{ height: "auto" }}
                    >
                        <div className="flex items-center justify-around px-2">
                            <div className="w-5/12">
                                <img src={Radio} />
                            </div>
                            <div className="mx-auto px-4 w-7/12">
                                {current.callsign && status ? (
                                    <div className=" flex flex-row items-baseline">
                                        <i className="fas fa-headphones-alt pr-2"></i>
                                        <div
                                            className=""
                                            style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {current.callsign}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="flex ">
                                    {current.artist && status ? (
                                        <React.Fragment>
                                            <div>
                                                <i className="fas fa-music pr-2"></i>
                                            </div>
                                            <div>
                                                <div
                                                    className="font-bold"
                                                    style={{
                                                        textOverflow:
                                                            "ellipsis",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    {current.artist}
                                                </div>

                                                {current.title && status ? (
                                                    <div
                                                        className="italic"
                                                        style={{
                                                            textOverflow:
                                                                "ellipsis",
                                                            overflow: "hidden",
                                                            whiteSpace: "nowrap"
                                                        }}
                                                    >
                                                        {current.title}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {country && current.artist && status ? (
                                    <div className=" ">
                                        <i className="fas fa-location-arrow pr-2"></i>
                                        {country} {"," + state} {"," + city}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div>
                            {current.artist && description && status ? (
                                <div className="px-4 italic bg-gray-300 mt-2">
                                    <q>{description}</q>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto  ">
                    <div>
                        <div className="flex justify-between items-center bg-black text-white text-xs px-4">
                            <h1 className="text-left px-2">{audiostatus}</h1>
                        </div>

                        <audio
                            src={url}
                            controls="controls"
                            autoPlay
                            className="outline-none w-full bg-gray-200 border-t"
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
