console.log("Welcome to the Community Portal");

const eventName = "Community Cleanup Drive";
const eventDate = "2025-06-15";
let availableSeats = 50;

console.log(`Event: ${eventName}`);
console.log(`Date: ${eventDate}`);
console.log(`Available Seats: ${availableSeats}`);

availableSeats--;
console.log(`Seats after one registration: ${availableSeats}`);

availableSeats++;
console.log(`Seats after a cancellation: ${availableSeats}`);

// Unified global events array
const events = [
  { name: "Community Cleanup Drive", date: "2025-06-15", seats: 10, category: "Environment" },
  { name: "Tree Plantation", date: "2024-12-10", seats: 0, category: "Environment" },
  { name: "Blood Donation Camp", date: "2025-05-30", seats: 20, category: "Health" },
  { name: "Music Night", date: "2025-06-20", seats: 25, category: "Music" },
  { name: "Baking Workshop", date: "2025-06-25", seats: 15, category: "Cooking" },
  { name: "Rock Concert", date: "2025-07-01", seats: 30, category: "Music" },
  { name: "Guitar Jam", date: "2025-07-05", seats: 12, category: "Music" }
];

// Adds a new event to the global events list
function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
  console.log(`Event "${name}" added under "${category}" category.`);
}

// Closure for tracking registrations per category
function createCategoryTracker() {
  const categoryCounts = {};
  return function registerToCategory(category) {
    if (!categoryCounts[category]) categoryCounts[category] = 0;
    categoryCounts[category]++;
    console.log(`Registered in "${category}" category. Total: ${categoryCounts[category]}`);
  };
}

const trackRegistration = createCategoryTracker();

// Helper to compare dates (ignores time part)
function isPastDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

// Register a user for an event by name
function registerUser(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found");
    if (isPastDate(event.date)) throw new Error("Cannot register for past events");
    if (event.seats <= 0) throw new Error("No seats available");

    event.seats--;
    console.log(`Registered for "${event.name}". Seats left: ${event.seats}`);
    trackRegistration(event.category);
  } catch (err) {
    console.error(`Registration Error: ${err.message}`);
  }
}

// Filter events by category (exact match)
function filterEventsByCategory(category) {
  return events.filter(e => e.category === category);
}

// Filter events with a callback predicate
function filterEventsByCallback(callback) {
  return events.filter(callback);
}

// Add some more events
addEvent("Beach Cleanup", "2025-07-10", 15, "Environment");
addEvent("Blood Donation", "2025-06-05", 20, "Health");
addEvent("Tree Planting", "2024-12-01", 0, "Environment");
addEvent("First Aid Workshop", "2025-05-30", 10, "Health");

// Test registrations
registerUser("Blood Donation");
registerUser("Beach Cleanup");
registerUser("Fake Event");

console.log("Environment Events:", filterEventsByCategory("Environment"));

// Filter upcoming events using the callback filter
const upcomingEvents = filterEventsByCallback(event => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate > today;
});
console.log("Upcoming Events:", upcomingEvents);

// Event constructor function and prototype method
function Event(name, date, seats, category) {
  this.name = name;
  this.date = date;
  this.seats = seats;
  this.category = category;
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

const event1 = new Event("Beach Cleanup", "2025-07-10", 15, "Environment");
const event2 = new Event("Blood Donation", "2025-06-05", 0, "Health");

console.log(`${event1.name} available? ${event1.checkAvailability()}`);
console.log(`${event2.name} available? ${event2.checkAvailability()}`);

console.log("Event 1 Details:");
Object.entries(event1).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

console.log("Event 2 Details:");
Object.entries(event2).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Filter and display music events
const musicEvents = events.filter(event => event.category === "Music");
console.log("Music Events:");
musicEvents.forEach(e => console.log(`${e.name} on ${e.date}`));

// Format event cards strings
const eventCards = events.map(event => `Workshop on ${event.name}`);
console.log("Formatted Event Cards:");
eventCards.forEach(card => console.log(card));

// DOM elements
const eventsContainer = document.querySelector("#eventsContainer");
const categoryFilter = document.querySelector("#categoryFilter");
const searchInput = document.querySelector("#searchInput");

let filteredCategory = "All";
let searchKeyword = "";

// Render events based on filters and current state
function renderEvents() {
  if (!eventsContainer) {
    console.error("Error: No element with id 'eventsContainer' found in the DOM.");
    return;
  }

  eventsContainer.innerHTML = "";

  const filtered = events.filter(event => {
    const matchesCategory = filteredCategory === "All" || event.category === filteredCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filtered.forEach(event => {
    const card = document.createElement("div");
    card.className = "eventCard";
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px 0";

    const title = document.createElement("h3");
    title.textContent = event.name;

    const date = document.createElement("p");
    date.textContent = `Date: ${event.date}`;

    const seats = document.createElement("p");
    seats.textContent = `Seats Available: ${event.seats}`;

    const registerBtn = document.createElement("button");
    registerBtn.textContent = "Register";
    registerBtn.disabled = event.seats === 0;

    registerBtn.onclick = () => {
      if (event.seats > 0) {
        event.seats--;
        renderEvents();
        alert(`Successfully registered for ${event.name}!`);
      }
    };

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(seats);
    card.appendChild(registerBtn);

    eventsContainer.appendChild(card);
  });
}

// Event listeners for filters
if (categoryFilter) {
  categoryFilter.onchange = function () {
    filteredCategory = this.value;
    renderEvents();
  };
}
if (searchInput) {
  searchInput.addEventListener("input", function () {
    searchKeyword = this.value;
    renderEvents();
  });
}

// API fetch elements
const loadingSpinner = document.querySelector("#loadingSpinner");
const apiEventsContainer = document.querySelector("#apiEventsContainer");

const mockApiUrl = "https://mocki.io/v1/15709771-5b8e-489a-b2cc-7644ef17f8ba"; // Mock API returning array of events

// Fetch events using .then()
function fetchEventsWithThen() {
  if (loadingSpinner) loadingSpinner.style.display = "block";
  fetch(mockApiUrl)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      renderApiEvents(data);
    })
    .catch(err => {
      console.error("Error fetching events (then):", err.message);
      if (apiEventsContainer) apiEventsContainer.innerHTML = `<p style="color:red;">Failed to fetch events.</p>`;
    })
    .finally(() => {
      if (loadingSpinner) loadingSpinner.style.display = "none";
    });
}

// Fetch events using async/await
async function fetchEventsWithAsyncAwait() {
  if (loadingSpinner) loadingSpinner.style.display = "block";
  try {
    const response = await fetch(mockApiUrl);
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    renderApiEvents(data);
  } catch (error) {
    console.error("Error fetching events (async):", error.message);
    if (apiEventsContainer) apiEventsContainer.innerHTML = `<p style="color:red;">Failed to fetch events.</p>`;
  } finally {
    if (loadingSpinner) loadingSpinner.style.display = "none";
  }
}

// Render events fetched from API
function renderApiEvents(eventsFromApi) {
  if (!apiEventsContainer) return;

  apiEventsContainer.innerHTML = "";
  if (!eventsFromApi.length) {
    apiEventsContainer.innerHTML = "<p>No events available from API.</p>";
    return;
  }

  eventsFromApi.forEach(event => {
    const card = document.createElement("div");
    card.className = "eventCard";
    card.style.border = "1px solid #666";
    card.style.padding = "10px";
    card.style.margin = "10px 0";
    card.style.backgroundColor = "#f8f8f8";

    const title = document.createElement("h3");
    title.textContent = event.name;

    const date = document.createElement("p");
    date.textContent = `Date: ${event.date}`;

    const category = document.createElement("p");
    category.textContent = `Category: ${event.category}`;

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(category);

    apiEventsContainer.appendChild(card);
  });
}

// Sample separate communityEvents array and filtering function with default parameters
const communityEvents = [
  { name: "Music Night", category: "Music", date: "2025-06-20", seats: 25 },
  { name: "Baking Workshop", category: "Cooking", date: "2025-06-25", seats: 15 },
  { name: "Rock Concert", category: "Music", date: "2025-07-01", seats: 30 },
];

// Filter communityEvents by category with default params and cloning
function filterCommunityEvents(eventsList = [], category = "All") {
  const clonedEvents = [...eventsList];
  return category === "All"
    ? clonedEvents
    : clonedEvents.filter(({ category: cat }) => cat === category);
}

// Use the function with the correct name
const allEvents = filterCommunityEvents(communityEvents);
const musicEvent = filterCommunityEvents(communityEvents, "Music");

// Log results
console.log("All Events:", allEvents);
console.log("Music Events:", musicEvent);

// Initial rendering on page load
document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  
});

$(document).ready(function() {
  // Show event cards with fadeIn initially
  $(".eventCard").fadeIn(1000);

  // Form submit event handler with validation and fetch POST simulation
  $("#registrationForm").on("submit", function(e) {
    e.preventDefault();
    console.log("Form submission started.");

    // Clear previous errors and message
    $(".error").text("");
    $("#message").text("").removeClass("success").css("color", "");

    const form = e.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const selectedEvent = form.elements.event.value;

    let valid = true;

    // Simple validation
    if (!name) {
      $("#nameError").text("Name is required.");
      valid = false;
    }
    if (!email) {
      $("#emailError").text("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      $("#emailError").text("Email is invalid.");
      valid = false;
    }
    if (!selectedEvent) {
      $("#eventError").text("Please select an event.");
      valid = false;
    }

    if (!valid) {
      console.log("Validation failed.");
      return;
    }

    // Prepare user data
    const userData = { name, email, event: selectedEvent };
    console.log("Validated user data:", userData);

    // Simulate fetch POST to mock API with setTimeout
    $("#registerBtn").attr("disabled", true);
    $("#message").text("Registering...");

    // Mock API URL (doesn't really exist, so we simulate)
    const mockApiUrl = "https://jsonplaceholder.typicode.com/posts";

    setTimeout(() => {
      fetch(mockApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then(response => {
          console.log("Fetch response status:", response.status);
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(data => {
          console.log("Server response data:", data);
          $("#message").text("Registration successful!").addClass("success").css("color", "green");

          // Fade out all event cards as an example effect
          $(".eventCard").fadeOut(1000);

          // Clear form inputs
          form.reset();
        })
        .catch(err => {
          console.error("Fetch error:", err.message);
          $("#message").text("Registration failed. Please try again.").css("color", "red");
        })
        .finally(() => {
          $("#registerBtn").attr("disabled", false);
          console.log("Fetch request finished.");
        });
    }, 2000); // Simulated 2-second delay

  });

  // Simple email validation regex function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // jQuery click handler example for registerBtn (also handled by form submit)
  $("#registerBtn").click(() => {
    console.log("Register button clicked.");
  });

});
