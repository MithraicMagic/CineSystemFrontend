import React from 'react';
import './style.scss';


class Frank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {word: "title", rating: 0};
    }

    componentDidMount() {
        this.getRating();
    }

    // addWord() {
    //     fetch('http://localhost:8080/gibRandomNumber')
    //     .then((res) => res.json())
    //     .then((res) => {
    //         console.log(res);
    //         this.setState({word: res.naam})
    //         }
    //     )
    // }

    getRating() {
        fetch('http://www.omdbapi.com/?apikey=190fc593&t=it+follows')
        .then((res) => res.json())
        .then((res) => {
            this.setState({word: res.Title, rating: res.imdbRating, poster: res.Poster});
            console.log(res);
        })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1>{this.state.word}</h1>
                <h2>Rating is {this.state.rating}</h2>
                <img src={this.state.poster}></img>
            </div>
        )
    }
}

export default Frank;