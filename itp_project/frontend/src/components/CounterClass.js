import React from "react";

class CounterClass extends React.Component {
    constructor() {
        super();
        this.Increment = this.Increment.bind(this)
        this.state = {
            number: 0
        };
    }

    Increment(){
        this.setState({
            number: ++this.state.number
        })

    }
    render() {
        return (
            <div>
                <h2>Class Base Component</h2>
                <h1>Counter = {this.state.number}</h1>
                <button onClick={this.Increment}>Increment</button>
            </div>
        );
    }
}

export default CounterClass;
