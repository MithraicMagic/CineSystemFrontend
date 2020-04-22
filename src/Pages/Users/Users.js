import React from 'react';

export default class Users extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
    } 

    componentDidMount() {
        fetch("http://localhost:8080/users/byScore?points=100")
        .then(res => res.json())
        .then(res => this.setState({data: res}))
    }

    displayUsers() {
        let elements = [];
        this.state.data.forEach(user => {
            elements.push(<p key={user.id}>Naam: {user.username}, Score: {user.pointsAmount}</p>)
        })
        return elements;
    }

    render() {
        return (
            <div>
                {this.displayUsers()}
            </div>
        )
    }
}