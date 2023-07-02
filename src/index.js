fetch("https://arshavineroy.github.io/phase-1-week-3-code-challenge/db.json")
  .then((res) => res.json())
  .then((data) => {
    const array = Object.values(data.films);
    handleFilms(array);
  });

// film list buttons

function handleFilms(array) {
  const filmDiv = document.createElement("div");
  filmDiv.classList.add("movie-list");
  const posterDiv = document.querySelector("#poster-box");
  const centerDiv = document.querySelector("#center-div");
  const posterHeader = document.querySelector("#poster-header");
  const posterFooter = document.querySelector("#poster-footer");
  array.forEach((film) => {
    const title = film.title;
    const runtime = film.runtime;
    let capacity = film.capacity;
    let showtime = film.showtime;
    let ticketsSold = film.tickets_sold;
    const synopsis = film.description;
    const poster = film.poster;
    let titcketsAvailable = film.capacity - film.tickets_sold;

    const movieButton = document.createElement("button");
    document.querySelector(".sidebar").appendChild(filmDiv);
    filmDiv.appendChild(movieButton);
    movieButton.classList.add("button-55");
    movieButton.textContent = title;
    function content() {
      posterDiv.innerHTML = "";
      const filmPoster = document.createElement("img");
      filmPoster.setAttribute("id", "poster");
      filmPoster.src = poster;
      posterDiv.appendChild(filmPoster);

      // Converting runtime total minutes to hour and minute format
      const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

      // Get curretnt date one-liner
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // center div
      centerDiv.innerHTML = `
          <div>
          <h2>
            Buy movie tickets & condiment to the Flatiron Movie Theater through
            Flatdango.
          </h2>
          </div>
          <div id="film-details">
            <br />
            <h3>Film Details</h3>
            <h4>
              Film Title: ${title}<br />
              Date: ${currentDate}<br />
              Runtime: ${runtime} minutes <br />
              Showtime: ${showtime}<br />
              Tickets Available: ${capacity - ticketsSold}<br />
              Synopsis: ${synopsis}
            </h4>
          </div>
          <div class="tickets">
            <h3>Purchase a Ticket</h3>
            <h4>
              <span style="color: #69daba;">${title}</span> is now playing at the Flatiron Movie Theatre. Choose the number of tickets below. This is equivalent to the number
              of seats reserved.
            </h4>
            <div class="ticket-purchase">
              <!-- form input set to accept min 1 ticket and max 30 (theatre capacity) -->
              <input
                type="number"
                min="1"
                max= ${capacity}
                placeholder="Number of Tickets"
                name="text"
                class="input"
              />
              <a class="fancy" href="#" id="buy-ticket-button">
                <span class="top-key"></span>
                <span class="text">Buy Tickets</span>
                <span class="bottom-key-1"></span>
                <span class="bottom-key-2"></span>
              </a>
            </div>
            <div id="warning">
            </div>

          </div>`;

      // poster header
      posterHeader.innerHTML = `
          <h4>${title}</h4>
          `;

      // poster footer
      posterFooter.innerHTML = `
          <div class="icon-container">
            <i class="fa-regular fa-calendar-days"></i>
            <span class="icon-count" id="vote-count">${currentDate}</span>
          </div>
          <div class="icon-container" id="comment">
            <i class="fa-regular fa-clock"></i>
            <span class="icon-count" id="comment-count">${formattedRuntime}</span>
          </div>
          <div class="icon-container" id="share">
            <i class="fa fa-location-dot"></i>
            <span class="icon-count">Flatiron Movie Theater</span>
          </div>`;

      const input = document.querySelector(".input");
      const buyTicketButton = document.querySelector("#buy-ticket-button");
      buyTicketButton.addEventListener("click", () => {
        const numberOfTickets = input.value;
        console.log(numberOfTickets);
        //console.log(`titcketsAvailable: ${titcketsAvailable}`);
        //titcketsAvailable = titcketsAvailable - numberOfTickets;
        //console.log(`titcketsAvailable: ${titcketsAvailable}`);

        if (numberOfTickets > titcketsAvailable || numberOfTickets > capacity) {
          errorMessage(
            `Only ${titcketsAvailable} tickets can be purchased at this time!`
          );
        } else {
          document.querySelector("#warning").innerHTML = "";
        }
      });
    }

    if (film.id == 1) {
      content();
      movieButton.click();
    }
    movieButton.addEventListener("click", content);
  });
}

function errorMessage(error) {
  document.querySelector("#warning").innerHTML = `
  <i
    class="fa fa-triangle-exclamation"
    style="color: #ff0000"
  ></i>
  <span class="text">${error}</span>
  `;
}
