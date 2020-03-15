import React, { Component } from "react";
import ReactDOM from "react-dom";
import TrackHits from "./leftbar/trackhits";
import TrackResults from "./main/trackresults";
import Player from "./main/player";
import Search from "./main/search";
import * as Info from "./constant";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            tophits: [],
            value: [],
            result: [],
            station: [],
            showSearch: false
        };
        this.getResults = this.getResults.bind(this);
        this.setToggle = this.setToggle.bind(this);
        this.hClick = this.hClick.bind(this);
    }

    hClick(event) {
        this.getResults(event);
    }

    setToggle() {
        this.setState({
            showSearch: true
        });
    }

    async getTopHits() {
        const result = await axios.get(Info.BASE_API_URL + "tophits");
        return result.data;
    }

    componentDidMount() {
        this.getTopHits()
            .then(data => {
                this.setState({
                    tophits: data.body.result
                });
            })
            .catch(err => console.log(err));
    }

    getResults(event) {
        const x = event.target.value;
        if (x.length >= 3) {
            axios
                .get(
                    Info.BASE_API_URL +
                        "search_index/" +
                        x.trim().replace(" ", "*%20*")
                )
                .then(data => {
                    this.setState({
                        value: data.data.result
                    });
                });
        } else {
            this.setState({
                value: []
            });
        }
    }

    getUrl(query) {
        axios
            .get(Info.BASE_API_URL + "playlist/" + query.replace(" ", "%20"))
            .then(data => {
                this.setState({
                    result: data.data.result
                });
            });
    }

    getStationInfo(s_id) {
        axios.get(Info.BASE_API_URL + "station_info/" + s_id).then(data => {
            this.setState({
                station: data.data
            });
        });
    }

    showDropdown() {
        this.setState({
            showSearch: false
        });
    }
    render() {
        const { station, tophits, result, showSearch } = this.state;

        return (
            <div className="">
                <div className="md:flex md:flex-row md:flex-row-reverse">
                    <div className="md:w-7/12 mx-auto text-center">
                        <div>
                            <div>
                                <div className="flex justify-center">
                                    <input
                                        type="text"
                                        className="outline-none border rounded-full w-full m-4 "
                                        placeholder="Search songs or artist..."
                                        onClick={this.hClick}
                                        onChange={this.getResults}
                                        onFocus={this.setToggle}
                                    />
                                </div>
                            </div>
                            <div>
                                {showSearch ? (
                                    <div>
                                        <ul className="text-black border bg-gray-400 ">
                                            {this.state.value
                                                .slice(0, 10)
                                                .map((key, i) => {
                                                    return (
                                                        <Search
                                                            key={i}
                                                            pitem={key}
                                                            hclick={() => {
                                                                this.getUrl(
                                                                    key
                                                                );
                                                                this.showDropdown();
                                                            }}
                                                        ></Search>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap justify-center lg:overflow-y-auto lg:h-screen">
                                {result.map((track, i) => {
                                    return (
                                        <TrackResults
                                            key={i}
                                            title={track.title}
                                            artist={track.artist}
                                            station={track.callsign}
                                            hclick={() =>
                                                this.getStationInfo(
                                                    track.station_id
                                                )
                                            }
                                        ></TrackResults>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div
                        className="md:w-4/12"
                        style={{ paddingBottom: "110px" }}
                    >
                        <div className="text-center">
                            <h1 className="text-2xl py-4 text-white">
                                Top Hits on Radio!!!
                            </h1>
                        </div>
                        <div
                            className="flex flex-wrap py-4 overflow-y-auto h-screen"
                            style={{ height: "100%" }}
                        >
                            {tophits.slice(0, 20).map((track, i) => (
                                <TrackHits
                                    key={i}
                                    title={track.songtitle}
                                    artist={track.songartist}
                                    station={track.uberurl.callsign}
                                    hclick={() =>
                                        this.getStationInfo(track.station_id)
                                    }
                                ></TrackHits>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mx-auto fixed  bottom-0 w-screen">
                    <Player station={station}></Player>
                </div>
            </div>
        );
    }
}

export default Main;

if (document.getElementById("radio")) {
    ReactDOM.render(<Main />, document.getElementById("radio"));
}
