import React, { Component } from "react";
import ReactDOM from "react-dom";
import Radio from "../radio.png";
import * as Info from "../constant";

export default class TrackHits extends Component {
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
            <div
                onClick={this.props.hclick}
                className=" mx-auto border-gray-100 bg-gray-200 rounded-lg  overflow-hidden flex cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 m-2"
                style={{ width: "300px", height: "100px" }}
            >
                <div>
                    <img
                        className="object-cover "
                        width={"150px"}
                        height={"150px"}
                        src={src_img}
                        onError={() => this.setCallbackImage()}
                    />
                </div>

                <div className="p-1 bg-black  text-left text-xs w-full h-full  ">
                    <div className="flex text-gray-100 items-baseline ">
                        <i className="fas fa-music pr-2"></i>
                        <h1 className="font-bold"> {title}</h1>
                    </div>
                    <div className="pb-1 flex text-gray-100 items-baseline">
                        <i className="fas fa-microphone pr-2"></i>
                        <h1 className="italic"> {artist}</h1>
                    </div>
                    <hr className="pb-1"></hr>
                    <div className="flex text-gray-100 items-baseline ">
                        <i className="fas fa-headphones pr-2"></i>
                        <h1 className="text-xs  ">{station}</h1>
                    </div>
                </div>
            </div>
        );
    }
}
