import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Track extends Component {
    constructor() {
        super();
        this.state = {
            src_img: []
        };
    }

    async getSourceImage(songartist, songtitle) {
        const url_src =
            "http://api.dar.fm/songart.php?artist=" +
            songartist +
            "&title=" +
            songtitle +
            "&res=med&callback=json&partner_token=7824139131";

        const data = await axios.get(url_src);
        return data.data.result[0]["arturl"];
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

    render() {
        const { title, artist, station } = this.props;
        const { src_img } = this.state;
        return (
            <React.Fragment>
                <div onClick={this.props.hclick} className="cursor-pointer">
                    <div
                        className=" m-4 border bg-gray-200 rounded-lg hover:bg-green-100 shadow-lg overflow-hidden"
                        style={{ width: "200px", height: "auto" }}
                    >
                        <div style={{ width: "200px", height: "200px" }}>
                            <img className="object-cover" src={src_img} />
                        </div>

                        <div className="p-2 bg-gray-900  text-left text-sm">
                            <div className="flex text-gray-100 items-baseline">
                                <i className="fas fa-music pr-2"></i>
                                <h1> {title}</h1>
                            </div>
                            <div className="pb-1 flex text-gray-100 items-baseline">
                                <i className="fas fa-microphone pr-2"></i>
                                <h1> {artist}</h1>
                            </div>
                            <hr className="pb-1"></hr>
                            <div className="flex text-gray-100 items-baseline ">
                                <i className="fas fa-headphones pr-2"></i>
                                <h1 className="text-xs  ">{station}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
