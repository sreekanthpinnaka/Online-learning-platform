import React from 'react';
import PropTypes from 'prop-types';

class DelRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    onClick= async () => {
        console.log("Psych")
  }

    render() {
        return (
            <div>
                <button onClick={this.onClick} style={{}}>Delete Room</button>
            </div>
        );
    }
}

export default DelRoom;
