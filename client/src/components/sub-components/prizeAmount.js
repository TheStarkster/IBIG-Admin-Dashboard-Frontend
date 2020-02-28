import React, { Component } from "react";

export default class PrizeAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      prizeType: ""
    };

    this.componentWillMount = () => {
      this.setState({
        amount: props.amount,
        prizeType: props.prizeType
      });
    };
    this.SliderChangeHandler = e => {
      console.log(e.target.value);
      this.setState({
        amount: e.target.value
      });
    };
  }
  getStateValue = () => {
    return this.state;
  };
  resetValues = () => {
    if (this.props.amount !== this.state.amount) {
      this.setState({
        amount: this.props.amount
      });
    }
  };
  render() {
    return (
      <div class="form-group">
        <label>Rank {this.props.rank}</label>
        <div class="d-flex justify-content-center align-items-center">
          <input
            class="custom-range"
            type="range"
            value={this.state.amount}
            min={this.props.min}
            max={this.props.max}
            onChange={e => this.SliderChangeHandler(e)}
          />
          <input
            class="form-control"
            type="number"
            style={{ marginRight: "6px" }}
            value={this.state.amount}
            onChange={e => this.SliderChangeHandler(e)}
          />
          <select
            id="cars"
            class="form-control"
            onChange={e => this.setState({ prizeType: e.target.value })}
          >
            <option
              value="money"
              selected={this.props.prizeType == "money" ? "selected" : ""}
            >
              Money
            </option>
            <option
              value="coins"
              selected={this.props.prizeType == "coins" ? "selected" : ""}
            >
              Coins
            </option>
          </select>
        </div>
      </div>
    );
  }
}
