import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Pages extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}


if (document.getElementById('example')) {
    ReactDOM.render(<Pages />, document.getElementById('example'));
}
