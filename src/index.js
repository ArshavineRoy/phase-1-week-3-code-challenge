fetch('https://arshavineroy.github.io/phase-1-week-3-code-challenge/db.json')
    .then(res => res.json())
    .then(data => {
        const array = Object.values(data.films); 
        films(array)
        
    })

// testing DB

function films (array){
    array.forEach(film => {
        const title = film.title
        console.log(title);        
    });
}

// working great!