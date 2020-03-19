import React, { Component } from "react";
import ReactDOM from "react-dom";
import TrackHits from "./main/trackhits";
import TrackResults from "./main/trackresults";
import Player from "./leftbar/player";
import Search from "./main/search";
import Listener from "./rightbar/listener";
import Recommendation from "./main/recommendation";
import * as Info from "./constant";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tophits: [],
            genrehits: [],
            value: [],
            result: [],
            station: [],
            showSearch: false,
            showrightbar: false
        };
        this.getResults = this.getResults.bind(this);
        this.setToggle = this.setToggle.bind(this);
        this.hClick = this.hClick.bind(this);

        const leftbar = "";
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
        return await result.data;
    }

    async getGenreHits() {
        const result = await axios.get(
            Info.BASE_API_URL + "reco/" + this.props.genre
        );
        return result.data;
    }

    async getCountryHits() {
        const result = await axios.get(Info.BASE_API_URL + "tophits");
        return result.data;
    }

    componentDidMount() {
        // window.Echo.channel("attendance-channel").listen(
        //     ".attendance-event",
        //     e => {
        //         console.log("fired-triggered");
        //     }
        // );

        // window.Echo.connector.socket.on("connect", function() {
        //     console.log("connected");
        // });

        // window.Echo.connector.socket.on("disconnect", function() {
        //     alert("disconnected");
        // });

        this.getTopHits()
            .then(data => {
                this.setState({
                    tophits: data.body.result
                });
            })
            .catch(err => console.log(err));

        this.getGenreHits()
            .then(data => {
                this.setState({
                    genrehits: data.body.result
                });
            })
            .catch(err => {
                console.log(err);
            });
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

    showRightBar() {
        this.setState({
            showrightbar: !this.state.showrightbar
        });
    }

    topHitsHtml() {
        return (
            <div className="mx-4">
                <h1 className="pt-8 pb-2 text-gray-800">Top Hits</h1>

                <div className="border-t border-b flex flex-row overflow-x-scroll py-6">
                    {this.state.tophits.slice(0, 15).map((track, i) => (
                        <div className="mr-6">
                            <TrackHits
                                key={track.toString()}
                                title={track.songtitle}
                                artist={track.songartist}
                                station={track.uberurl.callsign}
                                hclick={() =>
                                    this.getStationInfo(track.station_id)
                                }
                            ></TrackHits>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    recoHtml() {
        return (
            <div className="mx-4">
                <h1 className="pt-8 pb-2 text-gray-800">Recommendations</h1>

                <div className="border-t border-b flex flex-row overflow-x-scroll py-6">
                    {this.state.genrehits.slice(0, 15).map((track, i) => (
                        <div className="mr-6">
                            <Recommendation
                                key={track.toString()}
                                title={track.songtitle}
                                artist={track.songartist}
                                station={track.uberurl.callsign}
                                hclick={() =>
                                    this.getStationInfo(track.station_id)
                                }
                            ></Recommendation>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    mainHtml() {
        return (
            <React.Fragment>
                <div
                    className={
                        "main " +
                        (this.state.showrightbar ? "w-6/12" : "w-9/12") +
                        " w-auto h-screen"
                    }
                >
                    <div
                        className="float-right mr-4 mt-4 transform hover:scale-150 px-4 rounded-full cursor-pointer"
                        onClick={() => this.showRightBar()}
                    >
                        {this.state.showrightbar ? (
                            <i className="fas fa-times"></i>
                        ) : (
                            <i className="fas fa-search "></i>
                        )}
                    </div>
                    <div>
                        {this.state.tophits[0] ? (
                            <React.Fragment>
                                {this.topHitsHtml()}
                                {this.recoHtml()}
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                {this.rightBarHtml()}
            </React.Fragment>
        );
    }

    rightBarHtml() {
        return (
            <React.Fragment>
                <div
                    className={
                        "rightbar border-l-2 pt-4 " +
                        (this.state.showrightbar ? "w-3/12" : "hidden") +
                        " h-screen "
                    }
                >
                    <div>
                        <div>
                            <div className="pt-8 flex justify-center text-sm font-thin">
                                <input
                                    type="text"
                                    className="outline-none border rounded-full w-full mt-4 mx-10 "
                                    placeholder="Search song or artist..."
                                    onClick={this.hClick}
                                    onChange={this.getResults}
                                    onFocus={this.setToggle}
                                />
                            </div>
                        </div>
                        <div>
                            {this.state.showSearch ? (
                                <div className="mx-4 mx-auto ">
                                    <ul className="text-black border bg-gray-400 text-sm font-thin mx-10 rounded">
                                        {this.state.value
                                            .slice(0, 10)
                                            .map((k, i) => {
                                                return (
                                                    <Search
                                                        key={k.toString()}
                                                        pitem={k}
                                                        hclick={() => {
                                                            this.getUrl(k);
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
                        <div className="text-gray-700 italic text-xs ml-10 mt-8">
                            {/* {this.state.result.success == "true"
                                ? "Found " +
                                  this.state.result.length +
                                  " search results."
                                : ""} */}
                        </div>
                        <div className="mt-6 ml-8 pb-20 overflow-y-auto h-screen">
                            {this.state.result.slice(0, 12).map((track, i) => {
                                return (
                                    <TrackResults
                                        key={track.toString()}
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
            </React.Fragment>
        );
    }
    render() {
        const { station } = this.state;

        return (
            <div className="flex flex-row w-screen">
                <div className="leftbar w-3/12  h-screen bg-green-500">
                    <Player station={station}></Player>
                </div>
                {this.mainHtml()}
            </div>
        );
    }
}

export default Main;

if (document.getElementById("radio")) {
    const element = document.getElementById("radio");
    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Main {...props} />, element);
}
