import React from 'react';
import './style.scss';


class Frank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "title", rating: 0};
    }

    componentDidMount() {
        this.getRating();
    }
    
    getRating() {
        fetch('http://www.omdbapi.com/?apikey=190fc593&t=it+follows')
        .then((res) => res.json())
        .then((res) => {
            this.setState({title: res.Title, rating: res.imdbRating, poster: res.Poster});
            console.log(res);
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h2>Rating is {this.state.rating}</h2>
                <img src={this.state.poster} alt={this.state.title}></img>
            </div>
        )
    }
}

export default Frank;