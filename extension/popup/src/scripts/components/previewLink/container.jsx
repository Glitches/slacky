import React from "react";
import { connect } from "react-redux";

import "./component.css";

class PreviewLink extends React.Component {
  constructor(props) {
    super(props);
    this.previewMessage = this.previewMessage.bind(this);
    this.state = {
      loading: false,
      image: "",
      title: "",
      description: ""
    };
  }

  previewMessage(url) {
    fetch(`http://localhost:5000/preview?uri=${url}`)
      .then(response => response.text())
      .then(data => {
        data = JSON.parse(data);
        console.log(data);
        this.setState({
          loading: false,
          image: data.image,
          title: data.title,
          description: data.description
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      (!this.props.showComponents && nextProps.showComponents) ||
      (this.props.showComponents && this.props.showComponents.url !== nextProps.showComponents.url)
    ) {
      this.setState({
        loading: true
      });
      this.previewMessage(nextProps.showComponents.url);
    }
  }

  render() {
    if (!this.props.showComponents) return null;
    return (
      <div className="previewComponent">
        {this.state.loading ? (
          <div className="loadingWrap">Loading...</div>
        ) : (
          <div className="previewWrap">
            <h2>Preview</h2>
            <p>
              <i>{this.state.title}</i>
            </p>
            <img className="previewImage" src={this.state.image} alt="Url Preview" />
            <p>{this.state.description}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ showComponents: state.showComponents });

export default connect(mapStateToProps)(PreviewLink);

// const options = {
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// };
// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//   const currentTab = tabs[0].url;
//   fetch(currentTab)
//     .then(response => response.json())
//     .then(data => console.log(data));
// });
