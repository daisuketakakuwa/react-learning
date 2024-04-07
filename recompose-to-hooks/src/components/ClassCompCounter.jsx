import React, { Component } from 'react';

class ClassCompCounter extends Component {
    constructor(props) {
        super(props);
        // フィールドとして「state」オブジェクトを定義
        this.state = {
            count: 0
        };
    }

    // インスタンスがもつstateオブジェクトを更新する関数を定義
    incrementCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.incrementCount}>Increment</button>
            </div>
        );
    }
}

export default ClassCompCounter;
