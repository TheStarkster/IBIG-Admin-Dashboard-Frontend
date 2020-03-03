import React, { Component } from "react";
import Axios from "axios";
import FileUpload from "../sub-components/fileUpload";

export default class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      name: "",
      url: "",
      // image: null,
      // imagePreview: null,
      wonAmount: ""
    };
  }
  handleUploadFile = () => {
    if (this.state.loaded) {
      Axios.post("http://162.241.71.139:5000/game/create", this.state).then(
        response => {
          this.setState({
            imagePreview: response.data.fileUrl,
            loaded: false
          });
        }
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <h3 class="text-dark mb-1">Manage Games</h3>
        <div class="row">
          <div class="col-8" id="create-new-tournament">
            <h5 style={{ paddingBottom: "14px" }}>Create New Game</h5>
            <hr />
            <form>
              <div className="form-group">
                <label>Game Name</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Characters"
                  required=""
                  onChange={e => {
                    this.setState({
                      name: e.target.value
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Game Url</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Characters"
                  required=""
                  onChange={e => {
                    this.setState({
                      url: e.target.value
                    });
                  }}
                />
              </div>
              {/* <div className="form-group">
                <label>Game Image</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">
                      Upload
                    </span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      onChange={e => {
                        this.setState(
                          {
                            image: e.target.files[0]
                          },
                          () => {
                            if (this.state.image !== null) {
                              console.log(this.state.image);
                              this.setState({ loaded: true });
                            }
                          }
                        );
                      }}
                    />
                    <label class="custom-file-label" for="inputGroupFile01">
                      Choose file
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="form-group">
                <label>Won Amount</label>
                <input
                  class="form-control"
                  type="text"
                  inputmode="numeric"
                  placeholder="Characters"
                  required=""
                  onChange={e => {
                    this.setState({
                      wonAmount: e.target.value
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Game Image</label>
                <FileUpload
                  name={this.state.name}
                  url={this.state.url}
                  wonAmount={this.state.wonAmount}
                />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
