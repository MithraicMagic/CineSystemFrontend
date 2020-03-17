fetch("http://www.omdbapi.com/?apikey=190fc593&t=the+shining")
    .then(res => res.json())
    .then(res => console.log(res.Title));