import React, { Component } from "react";
import AutoComplete from "../sub-components/autosuggest";
import PrizeAmount from "../sub-components/prizeAmount";
import axios from "axios";

class Tournaments extends Component {
  constructor(props) {
    super(props);
    this.refArr = [];
    this.state = {
      formValues: {
        co: 0,
        gid: 0,
        jf: 0,
        jl: 0,
        mr: 0,
        ba: 0,
        name: "",
        start: null,
        end: null,
        bonusAllowance: 0,
        gd: false,
        grouped: null,
        afterRank: null,
        mrpd: [],
        c2: false
      },
      gp: 0.5,
      disabled: false,
      createTBtn: false,
      prizeGridArray: [],
      prizeAsMoney: true,
      prizeAsCoins: false
    };
    this.componentDidMount = () => {
      document.getElementById(
        "calculate-prize-grid"
      ).style.height = document
        .getElementById("create-new-tournament")
        .clientHeight.toString();
    };
    this.calculatePrizeGrid = a => {
      var cutOut = this.state.formValues.co;
      var numberOfPlayer = this.state.formValues.jl;
      var collectionAmount =
        this.state.formValues.jl * this.state.formValues.jf;
      var Amountdetucted = (collectionAmount * cutOut) / 100;
      var prizePool = collectionAmount - Amountdetucted;
      var resArr = [];
      var part0 = (1 - a) / (1 - Math.pow(a, numberOfPlayer));
      for (var i = 1; i <= this.state.formValues.mr; i++) {
        var res = part0 * Math.pow(a, i - 1) * prizePool;
        this.refArr["elem" + i] = React.createRef();
        resArr.push(
          <PrizeAmount
            amount={Math.round(res)}
            rank={i}
            key={i}
            max={prizePool}
            min={0}
            ref={this.refArr["elem" + i]}
            prizeType={this.state.prizeAsMoney ? "money" : "coins"}
          />
        );
      }
      this.setState(
        {
          prizeGridArray: resArr
        },
        () => {
          for (var i = 1; i <= this.state.formValues.mr; i++) {
            this.refArr["elem" + i].current.resetValues();
          }
        }
      );
    };
    this.CreateTournament = () => {
      var TempMrpd = [];
      for (var i = 1; i < this.state.formValues.mr; i++) {
        TempMrpd.push(this.refArr["elem" + i].current.getStateValue());
      }
      var temp = this.state.formValues;
      temp.mrpd = TempMrpd;
      this.setState(
        {
          formValues: temp
        },
        () => {
          axios.post(
            "http://162.241.71.139:5000/tournament/create",
            this.state.formValues
          );
        }
      );
    };
  }

  render() {
    return (
      <React.Fragment>
        <h3 class="text-dark mb-1">Manage Tournament</h3>
        <div class="row">
          <div class="col" id="create-new-tournament">
            <h5 style={{ paddingBottom: "14px" }}>Create New Tournament</h5>
            <hr />
            <form>
              <div class="form-group">
                <label>Tournament Name</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Character (Max 10)"
                  required=""
                  onChange={e => {
                    var temp = this.state.formValues;
                    temp.name = e.target.value;
                    this.setState({
                      formValues: temp
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <label>Choose Game</label>
                <AutoComplete values={["Flappy Bird", "Pin The Circle"]} />
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label>Start Time</label>
                    <input
                      class="form-control"
                      type="datetime-local"
                      inputmode="numeric"
                      required=""
                      onChange={e => {
                        var temp = this.state.formValues;
                        console.log(e.target.value);
                        var myDate = new Date(e.target.value);
                        var myEpoch = myDate.getTime() / 1000.0;
                        temp.start = myEpoch;
                        this.setState({
                          formValues: temp
                        });
                      }}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>End Time</label>
                    <input
                      class="form-control"
                      type="datetime-local"
                      inputmode="numeric"
                      required=""
                      onChange={e => {
                        var temp = this.state.formValues;
                        var myDate = new Date(e.target.value);
                        var myEpoch = myDate.getTime() / 1000.0;
                        temp.end = myEpoch;
                        this.setState({
                          formValues: temp
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Joining Fee</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Numeric (Rs.)"
                  required=""
                  onChange={e => {
                    var temp = this.state.formValues;
                    temp.jf = parseInt(e.target.value);
                    this.setState({
                      formValues: temp
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <label>Cut Out (%)</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Numeric (%)"
                  onChange={e => {
                    var temp = this.state.formValues;
                    temp.co = parseInt(e.target.value);
                    this.setState({
                      formValues: temp
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <label>Join With Bonus Allowance</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Numeric (Rs.)"
                  onChange={e => {
                    var temp = this.state.formValues;
                    temp.ba = parseInt(e.target.value);
                    this.setState({
                      formValues: temp
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <div style={{ display: "inline" }}>
                  <label>Joining Limit</label>
                  <div class="form-check" style={{ float: "right" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="formCheck-1"
                      onChange={() => {
                        this.setState({
                          disabled: !this.state.disabled
                        });
                      }}
                    />
                    <label class="form-check-label" for="formCheck-1">
                      Unlimited
                    </label>
                  </div>
                </div>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Numeric"
                  inputmode="numeric"
                  disabled={this.state.disabled}
                  onChange={e => {
                    var temp = this.state.formValues;
                    temp.jl = parseInt(e.target.value);
                    this.setState({
                      formValues: temp
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <label>Prize Distributed in</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Numeric"
                  onChange={e => {
                    var temp = this.state.formValues;
                    temp.mr = parseInt(e.target.value);
                    this.setState({
                      formValues: temp
                    });
                  }}
                />
              </div>
              {/* <div class="form-row">
                <div class="col">
                  <div class="form-check custom-control custom-switch">
                    <input
                      class="form-check-input custom-control-input"
                      type="checkbox"
                      id="customSwitch1"
                      onChange={() => {
                        var temp = this.state.formValues;
                        temp.gd = !this.state.formValues.gd;
                        this.setState({
                          formValues: temp
                        });
                      }}
                    />
                    <label
                      class="form-check-label custom-control-label"
                      for="customSwitch1"
                    >
                      Group Distribution
                    </label>
                  </div>
                </div>
              </div> */}
              {this.state.formValues.gd ? (
                <div class="form-row">
                  <div class="col">
                    <div class="form-group">
                      <label>Number of Users in a Group</label>
                      <input
                        class="form-control"
                        type="text"
                        inputmode="numeric"
                        required=""
                        onChange={e => {
                          var temp = this.state.formValues;
                          temp.grouped = parseInt(e.target.value);
                          this.setState({
                            formValues: temp
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Create Group After Rank</label>
                      <input
                        class="form-control"
                        type="text"
                        inputmode="numeric"
                        required=""
                        onChange={e => {
                          var temp = this.state.formValues;
                          temp.afterRank = parseInt(e.target.value);
                          this.setState({
                            formValues: temp
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <div class="form-row">
                <div class="col">
                  <div class="form-check custom-control custom-switch">
                    <input
                      class="form-check-input custom-control-input"
                      type="checkbox"
                      checked={this.state.prizeAsMoney}
                      id="customSwitch3"
                      onChange={() => {
                        this.setState({
                          prizeAsCoins: this.state.prizeAsMoney,
                          prizeAsMoney: !this.state.prizeAsMoney
                        });
                      }}
                    />
                    <label
                      class="form-check-label custom-control-label"
                      for="customSwitch3"
                    >
                      Prize as Money (Prize will be Distributed as Money)
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-check custom-control custom-switch">
                    <input
                      class="form-check-input custom-control-input"
                      type="checkbox"
                      checked={this.state.prizeAsCoins}
                      id="customSwitch4"
                      onChange={() => {
                        this.setState({
                          prizeAsMoney: this.state.prizeAsCoins,
                          prizeAsCoins: !this.state.prizeAsCoins
                        });
                      }}
                    />
                    <label
                      class="form-check-label custom-control-label"
                      for="customSwitch4"
                    >
                      Prize as Coins (Prize will be Distributed as Coins)
                    </label>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-primary float-right"
                type="button"
                onClick={() => this.calculatePrizeGrid(this.state.gp)}
              >
                Calculate Prize Grid
              </button>
            </form>
          </div>
          <div class="col" id="calculate-prize-grid">
            <div style={{ display: "flex" }}>
              <h5 style={{ flex: 1 }}>Prize Grid</h5>
              <div
                style={{ display: "flex", flexDirection: "column", flex: "2" }}
              >
                <label>GP</label>
                <input
                  type="range"
                  class="custom-range"
                  value={this.state.gp}
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  onChange={e => {
                    this.setState({
                      gp: e.target.value
                    });
                  }}
                />
              </div>
            </div>
            <hr />
            <form>
              {this.state.prizeGridArray}
              <div class="form-row">
                <div class="col">
                  <div class="form-check custom-control custom-switch">
                    <input
                      class="form-check-input custom-control-input"
                      type="checkbox"
                      id="customSwitch2"
                    />
                    <label
                      class="form-check-label custom-control-label"
                      for="customSwitch2"
                    >
                      Allow Unregistered User to Join Tournament
                    </label>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-success float-right"
                type="button"
                onClick={() => this.CreateTournament()}
              >
                Create Tournament
              </button>
            </form>
          </div>
        </div>
        <div class="card shadow">
          <div class="card-header py-3">
            <p class="text-primary m-0 font-weight-bold">Employee Info</p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 text-nowrap">
                <div
                  id="dataTable_length"
                  class="dataTables_length"
                  aria-controls="dataTable"
                >
                  <label>
                    Show&nbsp;
                    <select class="form-control form-control-sm custom-select custom-select-sm">
                      <option value="10" selected="">
                        10
                      </option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    &nbsp;
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <div
                  class="text-md-right dataTables_filter"
                  id="dataTable_filter"
                >
                  <label>
                    <input
                      type="search"
                      class="form-control form-control-sm"
                      aria-controls="dataTable"
                      placeholder="Search"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div
              class="table-responsive table mt-2"
              id="dataTable"
              role="grid"
              aria-describedby="dataTable_info"
            >
              <table class="table dataTable my-0" id="dataTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar1.jpeg"
                      />
                      Airi Satou
                    </td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>33</td>
                    <td>2008/11/28</td>
                    <td>$162,700</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar2.jpeg"
                      />
                      Angelica Ramos
                    </td>
                    <td>Chief Executive Officer(CEO)</td>
                    <td>London</td>
                    <td>47</td>
                    <td>
                      2009/10/09
                      <br />
                    </td>
                    <td>$1,200,000</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar3.jpeg"
                      />
                      Ashton Cox
                    </td>
                    <td>Junior Technical Author</td>
                    <td>San Francisco</td>
                    <td>66</td>
                    <td>
                      2009/01/12
                      <br />
                    </td>
                    <td>$86,000</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar4.jpeg"
                      />
                      Bradley Greer
                    </td>
                    <td>Software Engineer</td>
                    <td>London</td>
                    <td>41</td>
                    <td>
                      2012/10/13
                      <br />
                    </td>
                    <td>$132,000</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar5.jpeg"
                      />
                      Brenden Wagner
                    </td>
                    <td>Software Engineer</td>
                    <td>San Francisco</td>
                    <td>28</td>
                    <td>
                      2011/06/07
                      <br />
                    </td>
                    <td>$206,850</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar1.jpeg"
                      />
                      Brielle Williamson
                    </td>
                    <td>Integration Specialist</td>
                    <td>New York</td>
                    <td>61</td>
                    <td>
                      2012/12/02
                      <br />
                    </td>
                    <td>$372,000</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar2.jpeg"
                      />
                      Bruno Nash
                      <br />
                    </td>
                    <td>Software Engineer</td>
                    <td>London</td>
                    <td>38</td>
                    <td>
                      2011/05/03
                      <br />
                    </td>
                    <td>$163,500</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar3.jpeg"
                      />
                      Caesar Vance
                    </td>
                    <td>Pre-Sales Support</td>
                    <td>New York</td>
                    <td>21</td>
                    <td>
                      2011/12/12
                      <br />
                    </td>
                    <td>$106,450</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar4.jpeg"
                      />
                      Cara Stevens
                    </td>
                    <td>Sales Assistant</td>
                    <td>New York</td>
                    <td>46</td>
                    <td>
                      2011/12/06
                      <br />
                    </td>
                    <td>$145,600</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        class="rounded-circle mr-2"
                        width="30"
                        height="30"
                        src="assets/img/avatars/avatar5.jpeg"
                      />
                      Cedric Kelly
                    </td>
                    <td>Senior JavaScript Developer</td>
                    <td>Edinburgh</td>
                    <td>22</td>
                    <td>
                      2012/03/29
                      <br />
                    </td>
                    <td>$433,060</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <strong>Name</strong>
                    </td>
                    <td>
                      <strong>Position</strong>
                    </td>
                    <td>
                      <strong>Office</strong>
                    </td>
                    <td>
                      <strong>Age</strong>
                    </td>
                    <td>
                      <strong>Start date</strong>
                    </td>
                    <td>
                      <strong>Salary</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="row">
              <div class="col-md-6 align-self-center">
                <p
                  id="dataTable_info"
                  class="dataTables_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing 1 to 10 of 27
                </p>
              </div>
              <div class="col-md-6">
                <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tournaments;
