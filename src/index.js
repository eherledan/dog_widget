import React, {Component, Fragment} from 'react';
import "./index.css";

class DogWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {dog: {}};
  }

    componentDidMount() {
        this.loadDog('https://api.thedogapi.com/v1/images/search?');
        var reload_frequency = 10;
        if (this.props.reload_frequency != null) {
            reload_frequency = this.props.reload_frequency;
        }
        reload_frequency = reload_frequency * 1000;
        setInterval(() => this.loadDog('https://api.thedogapi.com/v1/images/search?'), reload_frequency);

    }

    loadDog(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const dog = data[0];
                this.setState({dog: dog});
            });
    }

  render() {
    const { dog } = this.state;

    const overlay = (typeof dog.breeds !== 'undefined' && dog.breeds[0]) ? (
      <div className="overlay">
        <div className="text">
          <p>{dog.breeds[0].name}</p>
          <p>{dog.breeds[0].life_span}</p>
          <p>{dog.breeds[0].temperament}</p>
        </div>
      </div>
    ) : null;

    return (
      <div className="container">
        <img className="image" src={dog.url}></img>
        {overlay}
      </div>
    );
  }

}

export default DogWidget;