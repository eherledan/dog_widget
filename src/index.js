import React, {Component, Fragment} from 'react';
import "./index.css";

class DogWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {dog: {}, dogInfos: {}};
  }

    componentDidMount() {
        this.loadDog('https://api.thedogapi.com/v1/images/search?');
        var reload_frequency = 10;
        if (this.props.reload_frequency != null) {
            reload_frequency = this.props.reload_frequency;
        }
        reload_frequency = reload_frequency * 1000;
        console.log(reload_frequency);
        setInterval(() => this.loadDog('https://api.thedogapi.com/v1/images/search?'), reload_frequency);

    }

    loadDog(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const dog = data[0];
                this.setState({dog: dog});
                if (dog.breeds[0] != undefined) {
                  this.setState({dogInfos: dog.breeds[0]});
                }
            });
    }

  render() {
    return (
          <div className="container">
            <img className="image" src={this.state.dog.url}></img>
            <div className="overlay">
                <div className="text">
                    <p>{this.state.dogInfos.name}</p>
                    <p>{this.state.dogInfos.life_span}</p>
                    <p>{this.state.dogInfos.temperament}</p>
                </div>
            </div>
          </div>
    );
  }

}

export default DogWidget;