import React, { Component } from "react";
import ReactDOM from "react-dom";
import Radio from "../radio.png";
import * as Info from "../constant";

export default class Recommendation extends Component {
    constructor() {
        super();
        this.state = {
            src_img: []
        };
    }

    async getSourceImage(songartist, songtitle) {
        const data = await axios.get(
            Info.BASE_API_URL +
                "artist_image/" +
                songartist +
                "&title=" +
                songtitle
        );

        return await data.data.result[0]["arturl"];
    }

    componentDidMount() {
        this.getSourceImage(this.props.artist, this.props.title)
            .then(response => {
                this.setState({
                    src_img: response
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    setCallbackImage() {
        this.setState({
            src_img: Radio
        });
    }

    render() {
        const { title, artist, station } = this.props;
        const { src_img } = this.state;

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
                                <i className="fas fa-music pr-2"></i>
                                <h1
                                    className="font-bold"
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {title}
                                </h1>
                            </div>
                            <div className="pb-1 flex text-gray-100 items-baseline">
                                <i className="fas fa-microphone pr-2"></i>
                                <h1
                                    className="italic"
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {artist}
                                </h1>
                            </div>
                            <hr className="pb-1"></hr>
                            <div className="flex text-gray-100 items-baseline ">
                                <i className="fas fa-headphones pr-2"></i>
                                <h1
                                    className="text-xs  "
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {station}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
