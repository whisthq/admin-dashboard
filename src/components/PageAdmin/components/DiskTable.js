import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { fetchDiskTable, changeBranch } from "../../../actions/index.js";

import Style from "../../../styles/components/pageAdmin.module.css";

import "../../../static/App.css";

class DiskTable extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, modalShow: false, sortBy: "username" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    this.props.dispatch(fetchDiskTable());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);

    // stop auto-refreshing
    clearInterval(this.intervalID);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  changeBranch = (disk_name, branch) => {
    this.props.dispatch(changeBranch(disk_name, branch));
  };

  sortArray = (prop) => {
    return function (a, b) {
      if (a[prop] === null) {
        return 1;
      }
      if (b[prop] === null) {
        return -1;
      }

      var a_temp = a[prop].toString().toLowerCase();
      var b_temp = b[prop].toString().toLowerCase();
      if (a_temp > b_temp) {
        return 1;
      } else if (a_temp < b_temp) {
        return -1;
      }

      return 0;
    };
  };

  unixToDate = (unix) => {
    if (unix && unix > 0) {
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix * 1000);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

      const milliseconds = unix * 1000;
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString("en-US").split(",")[0];
      var dateArr = humanDateFormat.split("/");
      const month = dateArr[0].toString();
      var finalDate =
        month + "/" + dateArr[1].toString() + "/" + dateArr[2].toString();
      return finalDate + ", " + formattedTime;
    } else {
      return "Never Winlogon'ed";
    }
  };

  setSortBy = (type) => {
    this.setState({ sortBy: type });
    console.log("set sort by " + type);
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose();
    }
    var header = [];
    if (this.props.disk_info.length > 0) {
      Object.keys(this.props.disk_info[0]).forEach(function (key) {
        header.push(key);
      });
    }
    header.sort(function (x, y) {
      return x === "username" ? -1 : y === "username" ? 1 : 0;
    });

    const branchToggle = (disk_name, branch) => {
      return (
        <td className={Style.tableCell} style={{ display: "flex" }}>
          <div
            style={{
              marginRight: 6,
              fontWeight: branch === "dev" ? "bold" : "normal",
              color: "#1ba8e0",
              background: branch === "dev" ? "rgba(94, 195, 235, 0.2)" : "none",
              border:
                branch === "dev" ? "none" : "solid 1px rgba(94, 195, 235, 0.2)",
              padding: "5px 10px",
              borderRadius: 2,
            }}
            onClick={() => this.changeBranch(disk_name, "dev")}
            className="pointerOnHover"
          >
            Dev
          </div>
          <div
            style={{
              marginRight: 6,
              fontWeight: branch === "staging" ? "bold" : "normal",
              color: "#1ba8e0",
              background:
                branch === "staging" ? "rgba(94, 195, 235, 0.2)" : "none",
              border:
                branch === "staging"
                  ? "none"
                  : "solid 1px rgba(94, 195, 235, 0.2)",
              padding: "5px 10px",
              borderRadius: 2,
            }}
            onClick={() => this.changeBranch(disk_name, "staging")}
            className="pointerOnHover"
          >
            Staging
          </div>
          <div
            style={{
              marginRight: 6,
              fontWeight: branch === "master" ? "bold" : "normal",
              color: "#1ba8e0",
              background:
                branch === "master" ? "rgba(94, 195, 235, 0.2)" : "none",
              border:
                branch === "master"
                  ? "none"
                  : "solid 1px rgba(94, 195, 235, 0.2)",
              padding: "5px 10px",
              borderRadius: 2,
            }}
            onClick={() => this.changeBranch(disk_name, "master")}
            className="pointerOnHover"
          >
            Master
          </div>
        </td>
      );
    };

    return (
      <div>
        {this.props.disks_fetched ? (
          <div
            style={{
              maxHeight: 600,
              overflowY: "scroll",
              width: "100%",
              display: "block",
            }}
          >
            <table
              style={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)",
              }}
            >
              <tr
                style={{
                  color: "white",
                  backgroundColor: "#1e1f36",
                  fontSize: 13,
                  textAlign: "left",
                  key: "vm-header",
                }}
              >
                <th
                  style={{ padding: 20, paddingLeft: 40 }}
                  onClick={() => this.setSortBy("branch")}
                >
                  branch
                </th>
                {header.map((value, index) => {
                  if (value !== "branch") {
                    return (
                      <th
                        style={{ padding: 20 }}
                        name={value}
                        onClick={() => this.setSortBy(value)}
                        className={
                          this.state.sortBy === value
                            ? Style.tableHeadFocus
                            : Style.tableHead
                        }
                      >
                        {value}
                      </th>
                    );
                  }
                  return <div></div>;
                })}
              </tr>
              {this.props.disk_info
                .sort(this.sortArray(this.state.sortBy))
                .map((value, index) => (
                  <tr
                    style={{
                      borderTop: "solid 0.5px #EBEBEB",
                      color: "#333333",
                      fontSize: 12,
                      key: "vm-body",
                    }}
                    key={index}
                  >
                    <td className={Style.tableCell} style={{ display: "flex" }}>
                      {branchToggle(value["disk_name"], value["branch"])}
                    </td>
                    {header.map((value1, index1) => {
                      if (value1 !== "branch") {
                        return (
                          <td className={Style.tableCell}>
                            {value[value1] == null ? (
                              <div />
                            ) : (
                              <div>{value[value1].toString()}</div>
                            )}
                          </td>
                        );
                      }
                      return <div></div>;
                    })}
                  </tr>
                ))}
            </table>
          </div>
        ) : (
          <div className={Style.spinnerContainer}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <FontAwesomeIcon
                icon={faCircleNotch}
                spin
                style={{ color: "#1e1f36", margin: "auto", marginTop: 220 }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    disk_info: state.AccountReducer.disk_info
      ? state.AccountReducer.disk_info
      : [],
    disks_fetched: state.AccountReducer.disks_fetched
      ? state.AccountReducer.disks_fetched
      : false,
  };
}

export default connect(mapStateToProps)(DiskTable);
