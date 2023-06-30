fetch("https://arshavineroy.github.io/phase-1-week-3-code-challenge/db.json")
  .then((res) => res.json())
  .then((data) => {
    const array = Object.values(data.films);
    films(array);
  });

// film list buttons

function films(array) {
  const filmDiv = document.createElement("div");
  filmDiv.classList.add("movie-list");
  array.forEach((film) => {
    const title = film.title;
    const movieButton = document.createElement("button");
    document.querySelector(".sidebar").appendChild(filmDiv);
    filmDiv.appendChild(movieButton);
    movieButton.classList.add("button-55");
    movieButton.textContent = title;
  });
}
