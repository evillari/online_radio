import React, { Component } from "react";
import ReactDOM from "react-dom";
import TrackHits from "./main/trackhits";
import TrackResults from "./main/trackresults";
import Player from "./leftbar/player";
import Search from "./rightbar/search";
import Listener from "./leftbar/listener";
import OfflineListener from "./leftbar/offlinelistener";
import Recommendation from "./main/recommendation";
import Messenger from "./main/messenger";
import Favorites from "./main/favorites";
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
            showrightbar: false,
            socketid: "",
            roster: [],
            loginresponse: [],
            messengerwindow: [],
            favorites: []
        };
        this.getResults = this.getResults.bind(this);
        this.setToggle = this.setToggle.bind(this);
        this.hClick = this.hClick.bind(this);
        this.openChat = this.openChat.bind(this);
        this.closeChat = this.closeChat.bind(this);
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

    componentDidMount() {
        window.Echo.listen("roster-channel", ".roster-event", e => {
            if (e.activity == "rosterupdate") {
                this.setState({
                    roster: e.data
                });
                console.log(this.state.roster);
            }
            if (
                e.activity == "favoriteupdate" &&
                e.owner == this.props.username
            ) {
                this.setState({
                    favorites: e.data
                });
                console.log(e.data);
            }
        });

        window.Echo.connector.socket.on("connect", () => {
            this.setState({
                socketid: window.Echo.socketId()
            });

            return axios
                .get(
                    Info.BASE_API_URL +
                        "roster/" +
                        "login/" +
                        this.props.userid +
                        "/" +
                        this.state.socketid
                )
                .then(result => {
                    this.setState({
                        roster: result.data
                    });
                });
        });

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
        this.getFav()
            .then(data => {
                this.setState({
                    favorites: data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    async getFav() {
        const result = await axios.get(Info.BASE_WEB_URL + "favorites");
        return await result.data;
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
                        <div key={i} className="mr-6">
                            <TrackHits
                                key={track.station_id}
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
                        <div key={i} className="mr-6">
                            <Recommendation
                                key={track.station_id}
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
    favHtml() {
        return (
            <div className="mx-4">
                <h1 className="pt-8 pb-2 text-gray-800">Favorites</h1>

                <div className="border-t border-b flex flex-row overflow-x-scroll py-6">
                    {console.log(this.state.favorites)}
                    {this.state.favorites.slice(0, 15).map((stationid, i) => (
                        <div key={stationid} className="mr-6">
                            <Favorites
                                key={stationid}
                                sid={stationid}
                                hclick={() => this.getStationInfo(stationid)}
                            ></Favorites>
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
                                {this.favHtml()}
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="fixed bottom-0">
                        {this.state.messengerwindow
                            .slice(0, 3)
                            .map((key, i) => (
                                <Messenger
                                    key={i}
                                    owner={this.props.username}
                                    username={key.username}
                                    position={i}
                                    image={key.image}
                                    genre={key.genre}
                                    country={key.country}
                                    thisclose={() => this.closeChat(i)}
                                ></Messenger>
                            ))}
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
                                        key={track.station_id}
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

    openChat(username, image, genre, country) {
        let c = true;
        let element = {
            username: username,
            image: image,
            genre: genre,
            country: country
        };

        this.state.messengerwindow.map(key => {
            if (JSON.stringify(key) == JSON.stringify(element)) {
                c = false;
            }
        });

        if (c == true) {
            this.setState({
                messengerwindow: [element].concat(this.state.messengerwindow)
            });
        }
    }

    closeChat(index) {
        const { messengerwindow } = this.state;
        if (messengerwindow.length == 1) {
            this.setState({
                messengerwindow: []
            });
        } else {
            this.setState({
                messengerwindow: messengerwindow
                    .slice(0, index)
                    .concat(messengerwindow.slice(index + 1))
            });
        }
    }
    updateFavorites() {
        console.log("update favorites");
    }

    leftBarHtml() {
        const { station, roster } = this.state;
        return (
            <div className="leftbar w-3/12  h-screen border-r">
                <Player station={station}></Player>
                <div>
                    <div className="mx-4 mt-4 text-gray-700 text-xs font-hairline">
                        <h1 className="font-bold">Listeners:</h1>
                    </div>
                    <h1 className="ml-6 text-xs font-hairline">Online</h1>
                    <div className="mb-4">
                        {roster.online
                            ? roster.online.map((item, i) =>
                                  item.username != this.props.username ? (
                                      <div key={i} className=" my-2 ">
                                          <Listener
                                              key={item.username}
                                              username={item.username}
                                              image={item.image}
                                              genre={item.genre}
                                              country={item.country}
                                              status={true}
                                              thisclick={() =>
                                                  this.openChat(
                                                      item.username,
                                                      item.image,
                                                      item.genre,
                                                      item.country
                                                  )
                                              }
                                          ></Listener>
                                      </div>
                                  ) : (
                                      ""
                                  )
                              )
                            : ""}
                    </div>
                    <h1 className="ml-6 text-xs font-hairline">Offline</h1>
                    {roster.online
                        ? roster.offline.map((item, i) =>
                              item.username != this.props.username ? (
                                  <div key={i} className="my-2 ">
                                      <OfflineListener
                                          key={item.username}
                                          username={item.username}
                                          image={item.image}
                                          genre={item.genre}
                                          country={item.country}
                                          status={false}
                                      ></OfflineListener>
                                  </div>
                              ) : (
                                  ""
                              )
                          )
                        : ""}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="flex flex-row w-screen">
                {this.leftBarHtml()}
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
