import * as React from "react";
import * as openSocket from "socket.io-client";
//mui
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

interface State {
  time: {
    hours: number;
    minutes: number;
    seconds;
  };
  messages: Array<any>;
  input: string;
}

const socket = openSocket("http://localhost:3000");

const subscribeToTimer = callback => {
  socket.on("timer", timestamp => callback(timestamp));
  socket.emit("subscribeToTimer", 1000);
};

export default class IChat extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      time: {
        hours: 23,
        minutes: 59,
        seconds: 59
      },
      messages: [],
      input: ""
    };
  }
  onMessage = (e, input) => {
    e.preventDefault();
    socket.emit("new message", input);
  };
  componentDidMount() {
    subscribeToTimer(time => this.setState({ time }));

    socket.on("get messages", messages => {
      this.setState({ messages });
    });
    socket.emit("get messages");
    socket.on("new message", newMessage => {
      this.setState(({ messages }) => {
        const addMessage = messages.concat(newMessage);
        return { messages: addMessage, input: "" };
      });
    });
  }
  public render() {
    const { hours, minutes, seconds } = this.state.time;
    return (
      <div>
        <p style={{ marginRight: 20 }}>
          {`Time ${hours}:${minutes}`}
          <span style={{ color: "#ed2553" }}>:{seconds}</span>
        </p>
        <ul>
          {this.state.messages.map(msg => (
            <li key={msg._id}>{msg.content}</li>
          ))}
        </ul>
        <form onSubmit={e => this.onMessage(e, this.state.input)}>
          <TextField
            id="search"
            variant="outlined"
            label="Search"
            value={this.state.input}
            onChange={event => this.setState({ input: event.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </div>
    );
  }
}
