fetch("https://arshavineroy.github.io/phase-1-week-3-code-challenge/db.json")
  .then((res) => res.json())
  .then((data) => {
    const array = Object.values(data.films);
    films(array);
  });

// film list buttons

function films(array) {
  const movieList = document.querySelector(".movie-list");
  array.forEach((film) => {
    const title = film.title;
    console.log(title);
    const movieButton = document.createElement("button");
    movieList.appendChild(movieButton);
    movieButton.classList = "button-55";
    movieButton.textContent = title;
  });
}
