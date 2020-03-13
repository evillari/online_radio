import React, { Component } from "react";
import ReactDOM from "react-dom";
import Track from "./leftbar/Track";
import MainPage from "./main/main";
import Search from "./main/search";

class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            tophits: [],
            images: [],
            info: [],
            value: [],
            result: [],
            csign: [],
            url: [],
            showSearch: false
        };

        this.getResults = this.getResults.bind(this);
        this.setToggle = this.setToggle.bind(this);
    }

    setToggle() {
        this.setState({
            showSearch: true
        });
    }

    async getTopHits() {
        const tophits =
            "http://api.dar.fm/topsongs.php?q=Music&callback=json&partner_token=7824139131";
        const result = await axios.get(tophits);
        return await result.data.result;
    }

    getPlayable(uberurl) {
        this.setState({
            info: uberurl
        });
    }

    componentDidMount() {
        this.getTopHits()
            .then(data => {
                this.setState({
                    tophits: this.state.tophits.concat(data)
                });
            })
            .catch(err => console.log(err));
    }

    getResults(event) {
        const x = event.target.value;
        if (x.length >= 0) {
            const q =
                "http://api.dar.fm/songartist.php?search_index=songlist_artist_index2&q=" +
                "*" +
                x.trim().replace(" ", "*%20*") +
                "*" +
                "&callback=json&partner_token=7824139131";

            axios.get(q).then(data => {
                this.setState({
                    value: data.data.result
                });
            });
        } else {
        }
    }

    getURL(query) {
        const q =
            "http://api.dar.fm/playlist.php?q=" +
            query.replace(" ", "%20") +
            "&callback=json";
        axios.get(q).then(data => {
            this.setState({
                result: data.data.result
            });
        });
    }

    getStationURL(s_id, callsign) {
        this.setState({
            url: "http://stream.dar.fm/" + s_id,
            csign: callsign
        });
    }

    showDropdown() {
        this.setState({
            showSearch: false
        });
    }
    render() {
        const { tophits, result, showSearch } = this.state;
        return (
            <div className="lg:flex lg:flex-row-reverse">
                <div className="mx-auto text-center lg:7/12">
                    <div className="">
                        <div className="">
                            <MainPage
                                station={this.state.csign}
                                s_url={this.state.url}
                                info={this.state.info}
                            ></MainPage>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="flex justify-center">
                                <input
                                    type="text"
                                    className="border rounded w-full m-4 "
                                    placeholder="Search songs or artist..."
                                    onChange={this.getResults}
                                    onFocus={this.setToggle}
                                />
                            </div>
                        </div>
                        <div>
                            {showSearch ? (
                                <div>
                                    <ul className="text-black border bg-gray-400 ">
                                        {this.state.value.map((key, i) => {
                                            return (
                                                <Search
                                                    key={i}
                                                    pitem={key}
                                                    hclick={() => {
                                                        this.getURL(key);
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
                        <div className="flex flex-wrap justify-center lg:overflow-y-auto h-screen">
                            {result.map((track, i) => {
                                return (
                                    <Track
                                        key={i}
                                        title={track.title}
                                        artist={track.artist}
                                        station={track.callsign}
                                        hclick={() =>
                                            this.getStationURL(
                                                track.station_id,
                                                track.callsign
                                            )
                                        }
                                    ></Track>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="mx-auto text-center lg:w-5/12">
                    <div>
                        <h1 className="text-2xl py-4">Top Hits on Radio!!!</h1>
                        <h1> Currently Playing: </h1>
                    </div>
                    <div className="flex flex-wrap justify-center lg:overflow-y-auto h-screen">
                        {tophits.map((track, i) => (
                            <div key={i} className="">
                                <Track
                                    key={i}
                                    title={track.songtitle}
                                    artist={track.songartist}
                                    hclick={() =>
                                        this.getPlayable(track.uberurl)
                                    }
                                    station={track.uberurl.callsign}
                                ></Track>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;

if (document.getElementById("top-tracks")) {
    ReactDOM.render(<Main />, document.getElementById("top-tracks"));
}
