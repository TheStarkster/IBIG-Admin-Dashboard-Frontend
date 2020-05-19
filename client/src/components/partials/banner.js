import React, { Component } from "react";
import Axios from "axios";
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSet: false,
      //........
      TSBannerArray: [],
      TSname: "",
      TSrender: null,
      TSrenderToShow: null,
      TSdispose: null,
      TSdisposeToShow: null,
      TSfile: null,
      TSfileName: "Choose File",
      TSid: null,
      TSBannerUpdate: false,
      //........
      IBBannerArray: [],
      IBname: "",
      IBrender: null,
      IBrenderToShow: null,
      IBdispose: null,
      IBdisposeToShow: null,
      IBfile: null,
      IBfileName: "Choose File",
      IBid: null,
      IBBannerUpdate: false,
      //........
      TBannerArray: [],
      Tname: "",
      Trender: null,
      TrenderToShow: null,
      Tdispose: null,
      TdisposeToShow: null,
      Tfile: null,
      TfileName: "Choose File",
      Tid: null,
      TBannerUpdate: false,
    };
    this.componentDidMount = () => {
      Axios.get("http://162.241.71.139:5000/banner/getAll/To-admin").then(
        (u) => {
          console.log(u.data);
          this.setState({
            TSBannerArray: [...u.data.message.filter((x) => x.position == 0)],
            IBBannerArray: [...u.data.message.filter((x) => x.position == 1)],
            TBannerArray: [...u.data.message.filter((x) => x.position == 2)],
          });
        }
      );
    };
    this.checkIfNotEmptyTS = () => {
      if (
        this.state.TSname === null ||
        this.state.TSdispose === null ||
        this.state.TSrender === null ||
        this.state.TSfile === null
      ) {
        alert("Please Fill All Fields");
        return false;
      }
      return true;
    };
    this.checkIfNotEmptyIB = () => {
      if (
        this.state.IBname === null ||
        this.state.IBdispose === null ||
        this.state.IBrender === null ||
        this.state.IBfile === null
      ) {
        alert("Please Fill All Fields");
        return false;
      }
      return true;
    };
    this.checkIfNotEmptyT = () => {
      if (
        this.state.Tname === null ||
        this.state.Tdispose === null ||
        this.state.Trender === null ||
        this.state.Tfile === null
      ) {
        alert("Please Fill All Fields");
        return false;
      }
      return true;
    };
  }
  render() {
    return (
      <React.Fragment>
        <h3 class="text-dark mb-1">Manage Banners</h3>
        <div class="row">
          <div class="col" id="create-new-tournament">
            <form>
              <h5>Top Sliding</h5>
              <hr />
              <div className="pair-container">
                <div class="form-group">
                  <label>Banner Name</label>
                  <input
                    class="form-control"
                    type="text"
                    inputmode="numeric"
                    placeholder="Characters"
                    value={this.state.TSname}
                    onChange={(e) => {
                      this.setState({
                        TSname: e.target.value,
                      });
                    }}
                  />
                  <label>Render Time</label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    inputmode="numeric"
                    value={this.state.TSrenderToShow}
                    onChange={(e) => {
                      var myDate = new Date(e.target.value);
                      var myEpoch = myDate.getTime() / 1000.0;
                      this.setState({
                        TSrender: myEpoch,
                        TSrenderToShow: e.target.value,
                      });
                    }}
                  />
                  <label>Disposed Time</label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    inputmode="numeric"
                    required=""
                    value={this.state.TSdisposeToShow}
                    onChange={(e) => {
                      var myDate = new Date(e.target.value);
                      var myEpoch = myDate.getTime() / 1000.0;
                      this.setState({
                        TSdispose: myEpoch,
                        TSdisposeToShow: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="custom-file mb-4">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    value={
                      this.state.TSfile !== null
                        ? this.state.TSfile[0]
                        : this.state.TSfile
                    }
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      this.setState({
                        TSfile:
                          e.target.files[0] !== undefined
                            ? e.target.files[0]
                            : null,
                        TSfileName:
                          e.target.files[0] !== undefined
                            ? e.target.files[0].name
                            : "Choose File",
                      });
                    }}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {this.state.TSfileName}
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.checkIfNotEmptyTS()) {
                      const formData = new FormData();
                      formData.append("bid", this.state.TSid);
                      formData.append("name", this.state.TSname);
                      formData.append("dispose", this.state.TSdispose);
                      formData.append("render", this.state.TSrender);
                      formData.append("updatedUnixT", new Date().getTime());
                      formData.append("position", 0);
                      if (this.state.TSfile !== null) {
                        formData.append("file", this.state.TSfile);
                        formData.append("fileUpdated", true);
                      } else {
                        formData.append("fileUpdated", false);
                      }
                      Axios.post(
                        "http://162.241.71.139:5000/banner/update",
                        formData
                      ).then((u) => {
                        var tempArr = this.state.TSBannerArray;
                        tempArr.push(u.data.message);
                        this.setState({
                          TSfile: null,
                          TSfileName: "Choose File",
                          TSname: "",
                          TSBannerArray: tempArr,
                        });
                        if (this.state.TSid !== null) {
                          Axios.get(
                            "http://162.241.71.139:5000/banner/getAll/To-admin"
                          ).then((u) => {
                            this.setState({
                              TSBannerArray: [...u.data.message],
                              TSid: null,
                              TSname: "",
                              TSfile: null,
                              TSfileName: "Choose File",
                            });
                          });
                        }
                      });
                    }
                  }}
                >
                  Done
                </button>
              </div>
              <h5 style={{ marginTop: "50px" }}>In Between Games</h5>
              <hr />
              <div className="pair-container">
                <div class="form-group">
                  <label>Banner Name</label>
                  <input
                    class="form-control"
                    type="text"
                    inputmode="numeric"
                    value={this.state.IBname}
                    placeholder="Characters"
                    onChange={(e) => {
                      this.setState({
                        IBname: e.target.value,
                      });
                    }}
                  />
                  <label>Render Time</label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    inputmode="numeric"
                    value={this.state.IBrenderToShow}
                    required=""
                    onChange={(e) => {
                      var myDate = new Date(e.target.value);
                      var myEpoch = myDate.getTime() / 1000.0;
                      this.setState({
                        IBrender: myEpoch,
                      });
                    }}
                  />
                  <label>Disposed Time</label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    inputmode="numeric"
                    value={this.state.IBdisposeToShow}
                    required=""
                    onChange={(e) => {
                      var myDate = new Date(e.target.value);
                      var myEpoch = myDate.getTime() / 1000.0;
                      this.setState({
                        IBdispose: myEpoch,
                      });
                    }}
                  />
                </div>
                <div className="custom-file mb-4">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    value={
                      this.state.IBfile !== null
                        ? this.state.IBfile[0]
                        : this.state.IBfile
                    }
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      this.setState({
                        IBfile:
                          e.target.files[0] !== undefined
                            ? e.target.files[0]
                            : null,
                        IBfileName:
                          e.target.files[0] !== undefined
                            ? e.target.files[0].name
                            : "Choose File",
                      });
                    }}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {this.state.IBfileName}
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.checkIfNotEmptyIB()) {
                      const formData = new FormData();
                      formData.append("bid", this.state.IBid);
                      formData.append("name", this.state.IBname);
                      formData.append("dispose", this.state.IBdispose);
                      formData.append("render", this.state.IBrender);
                      formData.append("updatedUnixT", new Date().getTime());
                      formData.append("position", 1);
                      if (this.state.IBfile !== null) {
                        formData.append("file", this.state.IBfile);
                        formData.append("fileUpdated", true);
                      } else {
                        formData.append("fileUpdated", false);
                      }
                      Axios.post(
                        "http://162.241.71.139:5000/banner/update",
                        formData
                      ).then((u) => {
                        var tempArr = this.state.IBBannerArray;
                        tempArr.push(u.data.message);
                        this.setState({
                          IBfile: null,
                          IBfileName: "Choose File",
                          IBname: "",
                          IBBannerArray: tempArr,
                        });
                        if (this.state.IBid !== null) {
                          Axios.get(
                            "http://162.241.71.139:5000/banner/getAll/To-admin"
                          ).then((u) => {
                            this.setState({
                              IBBannerArray: [...u.data.message],
                              IBid: null,
                              IBname: "",
                              IBfile: null,
                              IBfileName: "Choose File",
                            });
                          });
                        }
                      });
                    }
                  }}
                >
                  Done
                </button>
              </div>
              <h5 style={{ marginTop: "50px" }}>In Tournament</h5>
              <hr />
              <div className="pair-container">
                <div class="form-group">
                  <label>Banner Name</label>
                  <input
                    class="form-control"
                    type="text"
                    inputmode="numeric"
                    placeholder="Characters"
                    value={this.state.Tname}
                    onChange={(e) => {
                      this.setState({
                        Tname: e.target.value,
                      });
                    }}
                  />
                  <label>Render Time</label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    inputmode="numeric"
                    required=""
                    value={this.state.TrenderToShow}
                    onChange={(e) => {
                      var myDate = new Date(e.target.value);
                      var myEpoch = myDate.getTime() / 1000.0;
                      this.setState({
                        Trender: myEpoch,
                      });
                    }}
                  />
                  <label>Disposed Time</label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    inputmode="numeric"
                    value={this.state.TdisposeToShow}
                    required=""
                    onChange={(e) => {
                      var myDate = new Date(e.target.value);
                      var myEpoch = myDate.getTime() / 1000.0;
                      this.setState({
                        Tdispose: myEpoch,
                      });
                    }}
                  />
                </div>
                <div className="custom-file mb-4">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    value={
                      this.state.Tfile !== null
                        ? this.state.Tfile[0]
                        : this.state.Tfile
                    }
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      this.setState({
                        Tfile:
                          e.target.files[0] !== undefined
                            ? e.target.files[0]
                            : null,
                        TfileName:
                          e.target.files[0] !== undefined
                            ? e.target.files[0].name
                            : "Choose File",
                      });
                    }}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {this.state.TfileName}
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.checkIfNotEmptyT()) {
                      const formData = new FormData();
                      formData.append("bid", this.state.Tid);
                      formData.append("name", this.state.Tname);
                      formData.append("dispose", this.state.Tdispose);
                      formData.append("render", this.state.Trender);
                      formData.append("updatedUnixT", new Date().getTime());
                      formData.append("position", 2);
                      if (this.state.Tfile !== null) {
                        formData.append("file", this.state.Tfile);
                        formData.append("fileUpdated", true);
                      } else {
                        formData.append("fileUpdated", false);
                      }
                      Axios.post(
                        "http://162.241.71.139:5000/banner/update",
                        formData
                      ).then((u) => {
                        var tempArr = this.state.TBannerArray;
                        tempArr.push(u.data.message);
                        this.setState({
                          Tfile: null,
                          TfileName: "Choose File",
                          Tname: "",
                          TBannerArray: tempArr,
                        });
                        if (this.state.Tid !== null) {
                          Axios.get(
                            "http://162.241.71.139:5000/banner/getAll/To-admin"
                          ).then((u) => {
                            this.setState({
                              TBannerArray: [...u.data.message],
                              Tid: null,
                              Tname: "",
                              Tfile: null,
                              TfileName: "Choose File",
                            });
                          });
                        }
                      });
                    }
                  }}
                >
                  Done
                </button>
              </div>
            </form>
          </div>
          <div class="col" id="create-new-tournament">
            <form>
              <h5>Top Sliding Entries</h5>
              <hr />
              <div className="pair-container scrollable-pair-container">
                {this.state.TSBannerArray.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center h100p">
                    <h4>Loading...</h4>
                  </div>
                ) : (
                  this.state.TSBannerArray.map((item) => (
                    <div className="Banner-Card-Root">
                      <img
                        src={item.url}
                        alt="banner"
                        className="Banner-Image"
                      />
                      <div className="custom-column">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            var render = new Date(item.render * 1000)
                              .toISOString()
                              .split(".")[0];
                            var dispose = new Date(item.dispose * 1000)
                              .toISOString()
                              .split(".")[0];
                            this.setState({
                              TSname: item.name,
                              TSrenderToShow: render,
                              TSdisposeToShow: dispose,
                              TSdispose: item.dispose,
                              TSrender: item.render,
                              TSid: item.id,
                            });
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            Axios.get(
                              "http://162.241.71.139:5000/banner/delete/" +
                                item.id
                            ).then((u) => {
                              if (u.data.message == "deleted") {
                                Axios.get(
                                  "http://162.241.71.139:5000/banner/getAll/To-admin"
                                ).then((u) => {
                                  console.log(u.data);
                                  this.setState({
                                    TSBannerArray: [...u.data.message],
                                  });
                                });
                              }
                            });
                          }}
                        >
                          Delete
                        </button>
                        <hr />
                        <div>
                          <h6>render at</h6>
                          <h4>
                            {new Date(item.render * 1000).getDate() +
                              "-" +
                              (new Date(item.render * 1000).getMonth() + 1) +
                              "-" +
                              new Date(item.render * 1000).getFullYear() +
                              " " +
                              new Date(item.render * 1000).getHours() +
                              ":" +
                              new Date(item.render * 1000).getMinutes()}
                          </h4>
                        </div>
                        <div>
                          <h6>dispose at</h6>
                          <h4>
                            {new Date(item.dispose * 1000).getDate() +
                              "-" +
                              (new Date(item.dispose * 1000).getMonth() + 1) +
                              "-" +
                              new Date(item.dispose * 1000).getFullYear() +
                              " " +
                              new Date(item.dispose * 1000).getHours() +
                              ":" +
                              new Date(item.dispose * 1000).getMinutes()}
                          </h4>
                        </div>
                        <div>
                          <h6>Banner Name</h6>
                          <h4>{item.name}</h4>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <h5 style={{ marginTop: "50px" }}>In Between Entries</h5>
              <hr />
              <div className="pair-container scrollable-pair-container">
                {this.state.IBBannerArray.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center h100p">
                    <h4>Loading...</h4>
                  </div>
                ) : (
                  this.state.IBBannerArray.map((item) => (
                    <div className="Banner-Card-Root">
                      <img
                        src={item.url}
                        alt="banner"
                        className="Banner-Image"
                      />
                      <div className="custom-column">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            var render = new Date(item.render * 1000)
                              .toISOString()
                              .split(".")[0];
                            var dispose = new Date(item.dispose * 1000)
                              .toISOString()
                              .split(".")[0];
                            this.setState({
                              IBname: item.name,
                              IBrenderToShow: render,
                              IBdisposeToShow: dispose,
                              IBdispose: item.dispose,
                              IBrender: item.render,
                              IBid: item.id,
                            });
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            Axios.get(
                              "http://162.241.71.139:5000/banner/delete/" +
                                item.id
                            ).then((u) => {
                              if (u.data.message == "deleted") {
                                Axios.get(
                                  "http://162.241.71.139:5000/banner/getAll/To-admin"
                                ).then((u) => {
                                  console.log(u.data);
                                  this.setState({
                                    IBBannerArray: [...u.data.message],
                                  });
                                });
                              }
                            });
                          }}
                        >
                          Delete
                        </button>
                        <hr />
                        <div>
                          <h6>render at</h6>
                          <h4>
                            {new Date(item.render * 1000).getDate() +
                              "-" +
                              (new Date(item.render * 1000).getMonth() + 1) +
                              "-" +
                              new Date(item.render * 1000).getFullYear() +
                              " " +
                              new Date(item.render * 1000).getHours() +
                              ":" +
                              new Date(item.render * 1000).getMinutes()}
                          </h4>
                        </div>
                        <div>
                          <h6>dispose at</h6>
                          <h4>
                            {new Date(item.dispose * 1000).getDate() +
                              "-" +
                              (new Date(item.dispose * 1000).getMonth() + 1) +
                              "-" +
                              new Date(item.dispose * 1000).getFullYear() +
                              " " +
                              new Date(item.dispose * 1000).getHours() +
                              ":" +
                              new Date(item.dispose * 1000).getMinutes()}
                          </h4>
                        </div>
                        <div>
                          <h6>Banner Name</h6>
                          <h4>{item.name}</h4>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <h5 style={{ marginTop: "50px" }}>In Tournament Entries</h5>
              <hr />
              <div className="pair-container scrollable-pair-container">
                {this.state.TBannerArray.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center h100p">
                    <h4>Loading...</h4>
                  </div>
                ) : (
                  this.state.TBannerArray.map((item) => (
                    <div className="Banner-Card-Root">
                      <img
                        src={item.url}
                        alt="banner"
                        className="Banner-Image"
                      />
                      <div className="custom-column">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            var render = new Date(item.render * 1000)
                              .toISOString()
                              .split(".")[0];
                            var dispose = new Date(item.dispose * 1000)
                              .toISOString()
                              .split(".")[0];
                            this.setState({
                              Tname: item.name,
                              TrenderToShow: render,
                              TdisposeToShow: dispose,
                              Tdispose: item.dispose,
                              Trender: item.render,
                              Tid: item.id,
                            });
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            Axios.get(
                              "http://162.241.71.139:5000/banner/delete/" +
                                item.id
                            ).then((u) => {
                              if (u.data.message == "deleted") {
                                Axios.get(
                                  "http://162.241.71.139:5000/banner/getAll/To-admin"
                                ).then((u) => {
                                  console.log(u.data);
                                  this.setState({
                                    TBannerArray: [...u.data.message],
                                  });
                                });
                              }
                            });
                          }}
                        >
                          Delete
                        </button>
                        <hr />
                        <div>
                          <h6>render at</h6>
                          <h4>
                            {new Date(item.render * 1000).getDate() +
                              "-" +
                              (new Date(item.render * 1000).getMonth() + 1) +
                              "-" +
                              new Date(item.render * 1000).getFullYear() +
                              " " +
                              new Date(item.render * 1000).getHours() +
                              ":" +
                              new Date(item.render * 1000).getMinutes()}
                          </h4>
                        </div>
                        <div>
                          <h6>dispose at</h6>
                          <h4>
                            {new Date(item.dispose * 1000).getDate() +
                              "-" +
                              (new Date(item.dispose * 1000).getMonth() + 1) +
                              "-" +
                              new Date(item.dispose * 1000).getFullYear() +
                              " " +
                              new Date(item.dispose * 1000).getHours() +
                              ":" +
                              new Date(item.dispose * 1000).getMinutes()}
                          </h4>
                        </div>
                        <div>
                          <h6>Banner Name</h6>
                          <h4>{item.name}</h4>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Banner;
