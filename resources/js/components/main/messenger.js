import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as Info from "./../constant";

export default class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minimize: false,
            message: []
        };

        this.thisminimize = this.thisminimize.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.bottomView = React.createRef();
    }

    scrollToBottom() {
        this.bottomView.current.scrollIntoView();
    }

    sendMessage(e) {
        if (e.key === "Enter" && e.target.value.trim() != "") {
            const message = {
                from: this.props.owner,
                to: this.props.username,
                message: encodeURIComponent(e.target.value)
            };

            const url =
                Info.BASE_WEB_URL +
                "/messages/create/" +
                this.props.owner +
                this.props.username +
                "/" +
                this.props.username +
                this.props.owner +
                "/" +
                JSON.stringify(message);
            axios
                .get(url)
                .then(res => {
                    // console.log(res.data);
                })
                .catch(e => {
                    console.log(e);
                });

            document.getElementById("inputmessage").value = "";
        }
    }

    thisminimize() {
        this.setState({
            minimize: !this.state.minimize
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        const url =
            Info.BASE_WEB_URL +
            "messages/" +
            this.props.owner +
            this.props.username;

        axios.get(url).then(result => {
            this.setState({
                message: result.data
            });
        });

        window.Echo.listen("message-channel", "." + this.props.owner, e => {
            if (e.from == this.props.username || e.from == this.props.owner) {
                this.setState({
                    message: this.state.message.concat(e)
                });
            }
        });

        this.scrollToBottom();
        document
            .getElementById("minimize")
            .addEventListener("click", this.thisminimize);
        document
            .getElementById("inputmessage")
            .addEventListener("keypress", this.sendMessage);
    }

    componentWillUnmount() {
        document
            .getElementById("minimize")
            .removeEventListener("click", this.thisminimize);
        document
            .getElementById("inputmessage")
            .removeEventListener("keypress", this.sendMessage);
    }

    render() {
        return (
            <div
                className="absolute z-50 rounded-lg border-2 bottom-0"
                style={{
                    height: "auto",
                    width: "250px",
                    left: this.props.position * 240 + "px"
                }}
            >
                <div>
                    <div className="z-40 p-2 bg-green-400 flex flex-row justify-between w-full">
                        <div className="flex flex-row items-center text-sm font-thin">
                            <img
                                className="rounded-full"
                                src={this.props.image}
                                width={"30px"}
                                height={"30px"}
                            />
                            <div className="pl-1">
                                <h1>{this.props.username}</h1>
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="text-lg">
                                <i
                                    onClick={this.props.thisminimize}
                                    id="minimize"
                                    className="fas fa-minus cursor-pointer pr-1"
                                ></i>
                            </div>
                            <div className="text-lg">
                                <i
                                    onClick={this.props.thisclose}
                                    className="fas fa-times cursor-pointer"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="z-30  bg-white w-full text-xs font-thin">
                    <div
                        className=" relative bg-white w-full overflow-none"
                        style={{
                            height: this.state.minimize ? "0px" : "250px"
                        }}
                    >
                        <div
                            className="absolute pl-2 text-xs overflow-y-auto bottom-0"
                            style={{
                                width: "240px",
                                maxHeight: "250px",
                                height: this.state.minimize ? "0px" : "auto"
                            }}
                        >
                            {this.state.message.map((item, i) => (
                                <div
                                    className="flex items-center my-2"
                                    key={i}
                                    style={{ width: "240px" }}
                                >
                                    {item.from == this.props.username ? (
                                        <img
                                            src={this.props.image}
                                            className="rounded-full"
                                            width={"30px"}
                                            height={"30px"}
                                        />
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}

                                    <div
                                        className={
                                            "pl-2 text-gray-700 whitespace-normal " +
                                            (item.from == this.props.owner
                                                ? "text-right"
                                                : "")
                                        }
                                        style={{
                                            width: "210px",
                                            overflowWrap: "break-word",
                                            wordWrap: "break-word",
                                            hyphens: "auto"
                                        }}
                                    >
                                        {item.message}
                                    </div>
                                </div>
                            ))}

                            <div ref={this.bottomView}></div>
                        </div>
                    </div>

                    <div
                        className=" w-full"
                        style={{
                            height: "auto"
                        }}
                    >
                        <div className={this.state.minimize ? "hidden" : ""}>
                            <input
                                onKeyPress={() => this.sendMessage}
                                id="inputmessage"
                                className="outline-none border-4 w-full "
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
