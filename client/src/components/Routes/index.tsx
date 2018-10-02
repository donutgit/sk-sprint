import * as React from "react";
import AppBar from "src/components/AppBar/AppBar";
import IChat from "src/components/Routes/Chat";

export default class IApp extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <AppBar />
        <IChat />
      </div>
    );
  }
}
