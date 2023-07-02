// fetch film data
const URL = "http://localhost:3000/films";
fetch(URL)
  .then((res) => res.json())
  .then((data) => handleFilms(data));
// film list buttons

function handleFilms(data) {
  const filmDiv = document.createElement("div");
  filmDiv.classList.add("movie-list");
  const posterDiv = document.querySelector("#poster-box");
  const centerDiv = document.querySelector("#center-div");
  const posterHeader = document.querySelector("#poster-header");
  const posterFooter = document.querySelector("#poster-footer");
  data.forEach((film) => {
    // iterating over the array received
    const id = film.id;
    const title = film.title;
    const runtime = film.runtime;
    let capacity = film.capacity;
    let showtime = film.showtime;
    let ticketsSold = film.tickets_sold;
    const synopsis = film.description;
    const poster = film.poster;
    let ticketsAvailable = film.capacity - film.tickets_sold;

    // create movie list on the left per deliverables
    const movieButton = document.createElement("button");
    document.querySelector(".sidebar").appendChild(filmDiv);
    filmDiv.appendChild(movieButton);
    movieButton.classList.add("button-55");
    movieButton.textContent = title;

    // a function to handle DOM content
    function content() {
      posterDiv.innerHTML = "";
      const filmPoster = document.createElement("img");
      filmPoster.setAttribute("id", "poster");
      filmPoster.src = poster;
      posterDiv.appendChild(filmPoster);

      // Converting runtime total minutes to hour and minute (2h 43m) format
      const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

      // Get current date one-liner
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // center div HTML
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
              Tickets Available: <span id="tickets-available">${ticketsAvailable}</span><br />
              Synopsis: ${synopsis}
            </h4>
          </div>
          <div class="tickets">
            <h3>Purchase a Ticket</h3>
            <h4 id="purchase-intro">
              <span style="color: #69daba;">${title}</span> is now playing at the Flatiron Movie Theatre. Choose the number of tickets below. This is equivalent to the number
              of seats reserved.
            </h4>
            <div class="ticket-purchase">
              <!-- form input set to accept min 1 ticket and max 30 (theatre capacity) -->
              <input
                type="number"
                min="1"
                max="${capacity}"
                placeholder="Number of Tickets"
                name="text"
                class="input"
              />
              <a class="fancy" href="#" id="buy-ticket-button">
                <span class="top-key"></span>
                <span class="text" id='purchase-button'>Buy Tickets</span>
                <span class="bottom-key-1"></span>
                <span class="bottom-key-2"></span>
              </a>
            </div>
            <button id="reset">
              <b>Reset Tickets</b>
            </button>
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

      // handling user input --- number of tickets being purchased
      const input = document.querySelector(".input");
      const buyTicketButton = document.querySelector("#buy-ticket-button");

      // add event listener to "Buy Tickets" button
      buyTicketButton.addEventListener("click", () => {
        const ticketsBought = input.value;

        // setting a conditional so that input doesn't exceed available tickets/capacity
        if (ticketsBought <= ticketsAvailable && ticketsBought <= capacity) {
          let newTickets = Math.max(
            0,
            parseInt(ticketsSold) + parseInt(ticketsBought)
          ); // Only positive numbers are returned. Defaults to 0 if negative.

          // PATCH request to update server after tickets are purchased
          fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              tickets_sold: newTickets,
            }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Failed to update tickets.");
              }
              // Display success message or update UI
              console.log("Tickets updated successfully.");
            })
            .catch((error) => {
              // Handle error
              console.error(error);
              errorMessage("Failed to update tickets.");
            });
        } else {
          //error message on UI if tickets entered exceed those available
          errorMessage(
            `Only ${ticketsAvailable} tickets can be purchased at this time!`
          );
        }
      });
      // admin reset tickets to max if depleted. addEventListener to the button
      const resetButton = document.querySelector("#reset");
      resetButton.addEventListener("click", () => {
        // PATCH request to update server. Setting tickets sold to 0 means max number are available
        fetch(`${URL}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            tickets_sold: "0",
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to reset tickets.");
            }
            // Display success message or update UI
            console.log("Tickets reset successfully.");
          })
          .catch((error) => {
            // Handle error
            console.error(error);
            errorMessage("Failed to reset tickets.");
          });
      });

      // change buy tickets & UI with Sold Out text if available tickets are 0
      if (ticketsAvailable === 0) {
        const text = document.querySelector("#purchase-button");
        text.textContent = "Sold Out";
        document.querySelector(
          "#purchase-intro"
        ).textContent = `${title} is currently SOLD OUT. Try again tomorrow.`;
      }
    }

    // setting page to load with first film's content
    if (film.id == 1) {
      content();
      movieButton.click(); //simulating default movieButton click
    }
    movieButton.addEventListener("click", content); //adding event listener on movie list
  });
}

// function for showing error messages
function errorMessage(error) {
  document.querySelector("#warning").innerHTML = `
  <i class="fa fa-triangle-exclamation" style="color: #ff0000"></i>
  <span class="text">${error}</span>
  `;
}
