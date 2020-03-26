import React, { Component } from "react";
import ReactDOM from "react-dom";
import Radio from "../radio.png";
import * as Info from "../constant";

export default class Player extends Component {
    //id, url, image, description, encoding, country, state, city, language,
    constructor(props) {
        super(props);
        this.state = {
            audiostatus: [],
            current: [],
            status: false,
            RadioImage: Radio,
            isFavorite: false,
            src_img: []
        };
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    toggleFavorite() {
        const url =
            Info.BASE_WEB_URL + "togglefavorite/" + this.props.station.id;
        axios.get(url).then(result => {
            this.setState({
                isFavorite: result.data.return
            });
        });
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
        const url = Info.BASE_WEB_URL + "isfavorite/" + this.props.station.id;
        axios.get(url).then(result => {
            this.setState({
                isFavorite: result.data.return
            });
        });
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
        document
            .getElementById("favorite")
            .addEventListener("click", this.toggleFavorite);

        const url = Info.BASE_WEB_URL + "isfavorite/" + this.props.station.id;
        axios.get(url).then(result => {
            this.setState({
                isFavorite: result.data.return
            });
        });

        setInterval(() => {
            if (this.state.status) {
                this.getCurrentPlaying();
            }
        }, 4000);
    }

    componentWillUnmount() {
        document
            .getElementById("favorite")
            .removeEventListener("click", this.toggleFavorite);
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

        const {
            status,
            audiostatus,
            RadioImage,
            current,
            src_img
        } = this.state;
        return (
            <div className="mx-auto overflow-hidden w-full  ">
                <div className=" justify-center mx-auto text-xs">
                    <div
                        className="bg-gray-200 text-dark-800 text-xs py-2 "
                        style={{ height: "auto" }}
                    >
                        <div className="flex items-center justify-around px-2">
                            <div className="w-5/12">
                                <img src={RadioImage} />
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

                        <div
                            className={
                                "py-1 flex items-center border-b " +
                                (current.callsign && status ? "" : "hidden")
                            }
                        >
                            <div
                                onClick={() => this.toggleFavorite}
                                id="favorite"
                                className={
                                    "text-lg font-hairline cursor-pointer px-2 py-1 " +
                                    (this.state.isFavorite
                                        ? "text-red-500 border-red-500"
                                        : "")
                                }
                            >
                                <i className=" far fa-heart"> </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
