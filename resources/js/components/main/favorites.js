import React, { Component } from "react";
import ReactDOM from "react-dom";
import Radio from "../radio.png";
import * as Info from "../constant";

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            station: [],
            src_img: []
        };
    }

    async getStationInfo(s_id) {
        const r = await axios.get(Info.BASE_API_URL + "station_info/" + s_id);
        return r;
    }

    setCallbackImage() {
        this.setState({
            src_img: Radio
        });
    }
    componentDidMount() {
        this.getStationInfo(this.props.sid).then(result => {
            this.setState({
                station: result.data
            });
            this.setState({
                src_img: this.state.station.image
            });
        });
    }
    //id, url, image, description, encoding, country, state, city, language,
    render() {
        const { src_img, station } = this.state;
        return (
            <React.Fragment>
                <div
                    onClick={this.props.hclick}
                    className="cursor-pointer transform hover:scale-110 "
                >
                    <div
                        className=" border bg-gray-200 rounded-lg shadow-lg overflow-hidden"
                        style={{ width: "160px", height: "auto" }}
                    >
                        <div style={{ width: "160px", height: "160px" }}>
                            <img
                                className="object-cover"
                                src={src_img}
                                onError={() => this.setCallbackImage()}
                            />
                        </div>

                        <div className="p-2 bg-gray-900  text-left text-xs">
                            <div className="flex text-gray-100 items-baseline ">
                                <i className="fas fa-headphones pr-2"></i>
                                <h1
                                    className="font-bold"
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {this.state.station.callsign}
                                </h1>
                            </div>
                            <div className="py-1 flex text-gray-100 items-baseline">
                                <i className="fas fa-map-marker pr-2"></i>
                                <h1
                                    className="italic"
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {(this.state.station.country
                                        ? this.state.station.country
                                        : "") +
                                        " " +
                                        (this.state.station.state
                                            ? this.state.station.state
                                            : "") +
                                        " " +
                                        (this.state.station.city
                                            ? this.state.station.city
                                            : "")}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
