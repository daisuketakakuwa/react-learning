import React from "react";
import { Link } from "react-router";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">HOME</Link>　<Link to="/about">ABOUT</Link>　<Link to="/event">EVENT</Link>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
