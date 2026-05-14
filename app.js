const initialState = {
  event: {
    title: "Rehearsal Dinner - Harbor Room",
    guests: 84,
    vendors: 5,
    teams: 4,
    confidence: 96,
    risks: 2,
    nextCheck: "4:45 PM"
  },
  messages: [
    {
      source: "AI",
      time: "4:12 PM",
      text: "Pre-event sweep complete. Guest count, vendor timing, room setup, and kitchen prep are aligned. Two items need monitoring: final dessert delivery confirmation and gluten-free entree count."
    },
    {
      source: "Guest",
      time: "4:18 PM",
      text: "Host confirmed the shuttle pickup address and asked if two late arrivals can still join the champagne toast."
    },
    {
      source: "AI",
      time: "4:19 PM",
      text: "Replied to host, updated front of house arrival notes, and added two champagne pours to banquet service count."
    }
  ],
  teams: [
    {
      name: "Front of house",
      detail: "Arrival notes, host preferences, shuttle timing, late guests.",
      status: "Current",
      when: "4:19 PM",
      review: false
    },
    {
      name: "Kitchen",
      detail: "Final count at 5:15 PM, allergy flags, service pacing.",
      status: "Watching",
      when: "4:12 PM",
      review: true
    },
    {
      name: "Banquet",
      detail: "Room reset, AV cue, champagne toast, table map.",
      status: "Current",
      when: "4:13 PM",
      review: false
    },
    {
      name: "Management",
      detail: "VIP notes, risk log, vendor confirmations, escalation path.",
      status: "Current",
      when: "4:14 PM",
      review: false
    }
  ],
  actions: [
    {
      title: "Confirmed shuttle details with host",
      detail: "Guest-facing logistics were answered and mirrored to front of house."
    },
    {
      title: "Flagged allergy count for kitchen",
      detail: "Kitchen has a timed reminder before the final count lock."
    },
    {
      title: "Checked vendor arrival windows",
      detail: "Florist, AV, bakery, rentals, and photographer are tracked."
    },
    {
      title: "Prepared manager digest",
      detail: "Open risks and guest-sensitive details are summarized for leadership."
    },
    {
      title: "Synced banquet service notes",
      detail: "Toast timing and table map are current for the floor captain."
    },
    {
      title: "Kept guest replies in one thread",
      detail: "The host sees clear answers without the staff chasing messages."
    }
  ],
  timeline: [
    { time: "3:45 PM", text: "Banquet team confirms room reset", state: "done" },
    { time: "4:30 PM", text: "Vendors arrive for setup", state: "active" },
    { time: "5:15 PM", text: "Kitchen final count lock", state: "" },
    { time: "6:00 PM", text: "Guest arrival window opens", state: "" },
    { time: "6:30 PM", text: "Dinner service begins", state: "" }
  ]
};

const scenarios = {
  dietary: {
    triage: "Resolving",
    confidence: 97,
    risks: 1,
    nextCheck: "5:05 PM",
    message: {
      source: "Guest",
      text: "Three guests just replied with shellfish allergies, and one guest changed to gluten-free."
    },
    ai: "Updated meal count, confirmed the changes with the host, alerted kitchen, and added a manager-visible allergy note for service.",
    action: {
      title: "Dietary change handled end to end",
      detail: "Host, kitchen, banquet captain, and manager view now show the same allergy count."
    },
    teamUpdates: {
      "Kitchen": {
        detail: "Shellfish allergy count increased by three. Gluten-free count increased by one.",
        status: "Updated",
        review: false
      },
      "Banquet": {
        detail: "Seat markers and server notes refreshed for allergy-sensitive guests.",
        status: "Updated",
        review: false
      },
      "Management": {
        detail: "Allergy change logged as handled with kitchen acknowledgment pending at 5:05 PM.",
        status: "Watching",
        review: true
      }
    }
  },
  vendor: {
    triage: "Coordinating",
    confidence: 94,
    risks: 2,
    nextCheck: "4:50 PM",
    message: {
      source: "Vendor",
      text: "Bakery is 18 minutes behind because the delivery van is stuck near Crosstown."
    },
    ai: "Moved dessert delivery to the side entrance, protected dinner service timing, notified banquet and management, and set a 4:50 PM follow-up.",
    action: {
      title: "Vendor delay contained",
      detail: "Setup path changed so the late delivery does not interrupt guest arrival or kitchen flow."
    },
    teamUpdates: {
      "Banquet": {
        detail: "Dessert delivery shifted to side entrance after room reset.",
        status: "Updated",
        review: false
      },
      "Management": {
        detail: "Bakery delay tracked with follow-up reminder and fallback plating window.",
        status: "Watching",
        review: true
      }
    },
    timeline: [
      { time: "4:30 PM", text: "Florist and AV arrive for setup", state: "active" },
      { time: "4:50 PM", text: "Bakery delivery follow-up", state: "active" }
    ]
  },
  arrival: {
    triage: "Routing",
    confidence: 98,
    risks: 1,
    nextCheck: "5:30 PM",
    message: {
      source: "Guest",
      text: "The shuttle may arrive ten minutes late. Can guests still enter through the side courtyard?"
    },
    ai: "Confirmed side courtyard entry, told front of house to hold the welcome cue, and updated the host with the adjusted arrival plan.",
    action: {
      title: "Arrival logistics adjusted",
      detail: "Guest instructions, host reply, and front-of-house cue timing were synchronized."
    },
    teamUpdates: {
      "Front of house": {
        detail: "Side courtyard entry confirmed. Welcome cue held for delayed shuttle.",
        status: "Updated",
        review: false
      },
      "Banquet": {
        detail: "Champagne toast cue moved ten minutes later unless manager overrides.",
        status: "Updated",
        review: false
      }
    }
  },
  lastMinute: {
    triage: "Escalating",
    confidence: 93,
    risks: 2,
    nextCheck: "5:00 PM",
    message: {
      source: "Manager",
      text: "Weather is turning. Move the welcome toast indoors and keep cocktail hour flexible."
    },
    ai: "Moved toast cue indoors, updated banquet and AV setup notes, sent a concise manager digest, and prepared guest-facing language if needed.",
    action: {
      title: "Room change coordinated",
      detail: "Toast location, AV cue, banquet setup, and management digest now match."
    },
    teamUpdates: {
      "Front of house": {
        detail: "Guests should be guided indoors for the welcome toast if weather worsens.",
        status: "Updated",
        review: false
      },
      "Banquet": {
        detail: "Indoor toast setup and flexible cocktail flow added to room notes.",
        status: "Updated",
        review: false
      },
      "Management": {
        detail: "Weather move summarized with guest communication language ready.",
        status: "Updated",
        review: false
      }
    },
    timeline: [
      { time: "6:20 PM", text: "Indoor welcome toast contingency", state: "active" }
    ]
  }
};

const events = {
  rehearsal: {
    title: "Rehearsal Dinner - Harbor Room",
    guests: 84,
    vendors: 5,
    teams: 4
  },
  corporate: {
    title: "Corporate Reception - Rooftop",
    guests: 46,
    vendors: 4,
    teams: 4
  },
  brunch: {
    title: "Farewell Brunch - Garden Room",
    guests: 62,
    vendors: 3,
    teams: 4
  }
};

let state = structuredClone(initialState);

const messageFeed = document.querySelector("#messageFeed");
const teamGrid = document.querySelector("#teamGrid");
const actionList = document.querySelector("#actionList");
const timeline = document.querySelector("#timeline");
const updateForm = document.querySelector("#updateForm");
const incomingMessage = document.querySelector("#incomingMessage");

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function renderMessages() {
  messageFeed.innerHTML = state.messages
    .map((message) => `
      <article class="message">
        <div class="avatar">${message.source.slice(0, 2).toUpperCase()}</div>
        <div class="message-body">
          <strong>${message.source}<time>${message.time}</time></strong>
          <p>${message.text}</p>
        </div>
      </article>
    `)
    .join("");
  messageFeed.scrollTop = messageFeed.scrollHeight;
}

function renderTeams() {
  teamGrid.innerHTML = state.teams
    .map((team) => `
      <article class="team-card ${team.review ? "needs-followup" : ""}">
        <h4>${team.name}</h4>
        <p>${team.detail}</p>
        <div class="team-status">
          <span>${team.status}</span>
          <span>${team.when}</span>
        </div>
      </article>
    `)
    .join("");

  document.querySelector("#alignmentScore").textContent = `${state.teams.length}/${state.teams.length} informed`;
}

function renderActions() {
  actionList.innerHTML = state.actions
    .map((action) => `
      <article class="action-item">
        <div class="check">✓</div>
        <div>
          <strong>${action.title}</strong>
          <p>${action.detail}</p>
        </div>
      </article>
    `)
    .join("");
  document.querySelector("#actionCount").textContent = `${state.actions.length} actions`;
}

function renderTimeline() {
  timeline.innerHTML = state.timeline
    .map((item) => `
      <li class="${item.state}">
        <span>${item.time}</span>
        <strong>${item.text}</strong>
      </li>
    `)
    .join("");
}

function renderStats() {
  document.querySelector("#eventTitle").textContent = state.event.title;
  document.querySelector("#guestCount").textContent = state.event.guests;
  document.querySelector("#vendorCount").textContent = state.event.vendors;
  document.querySelector("#teamCount").textContent = state.event.teams;
  document.querySelector("#confidence").textContent = `${state.event.confidence}%`;
  document.querySelector("#riskCount").textContent = state.event.risks;
  document.querySelector("#nextCheck").textContent = state.event.nextCheck;
}

function render() {
  renderStats();
  renderMessages();
  renderTeams();
  renderActions();
  renderTimeline();
}

function addMessage(source, text) {
  state.messages.push({ source, time: getTime(), text });
}

function updateTeams(teamUpdates) {
  Object.entries(teamUpdates).forEach(([teamName, update]) => {
    const team = state.teams.find((item) => item.name === teamName);
    if (!team) return;
    team.detail = update.detail;
    team.status = update.status;
    team.when = getTime();
    team.review = update.review;
  });
}

function applyTimeline(updates = []) {
  updates.forEach((update) => {
    const match = state.timeline.find((item) => item.time === update.time);
    if (match) {
      match.text = update.text;
      match.state = update.state;
    } else {
      state.timeline.splice(2, 0, update);
    }
  });
}

function runScenario(name) {
  const scenario = scenarios[name];
  if (!scenario) return;

  document.querySelector("#triageState").textContent = scenario.triage;
  state.event.confidence = scenario.confidence;
  state.event.risks = scenario.risks;
  state.event.nextCheck = scenario.nextCheck;
  addMessage(scenario.message.source, scenario.message.text);
  addMessage("AI", scenario.ai);
  state.actions.unshift(scenario.action);
  updateTeams(scenario.teamUpdates);
  applyTimeline(scenario.timeline);
  render();
}

function processCustomUpdate(text) {
  const normalized = text.toLowerCase();
  let audience = "Management";
  let summary = "Logged the update, identified affected teams, and created a follow-up check so the detail does not sit in one person's inbox.";

  if (normalized.includes("guest") || normalized.includes("rsvp") || normalized.includes("shuttle")) {
    audience = "Front of house";
    summary = "Routed the guest-facing update to front of house, prepared a host reply, and mirrored the change in the event notes.";
  }

  if (normalized.includes("food") || normalized.includes("allergy") || normalized.includes("diet") || normalized.includes("kitchen")) {
    audience = "Kitchen";
    summary = "Flagged the kitchen-impacting update, refreshed the service notes, and added a final-count reminder.";
  }

  if (normalized.includes("vendor") || normalized.includes("delivery") || normalized.includes("setup") || normalized.includes("florist")) {
    audience = "Banquet";
    summary = "Coordinated the vendor/setup update with banquet and management, then added a timed confirmation check.";
  }

  addMessage("Incoming", text);
  addMessage("AI", summary);
  updateTeams({
    [audience]: {
      detail: summary,
      status: "Updated",
      review: false
    }
  });
  state.actions.unshift({
    title: `Custom update routed to ${audience}`,
    detail: "The demo AI classified the update and pushed the operational consequence to the right team."
  });
  state.event.confidence = Math.min(99, state.event.confidence + 1);
  render();
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => runScenario(button.dataset.scenario));
});

document.querySelectorAll("[data-event]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-event]").forEach((eventButton) => eventButton.classList.remove("is-active"));
    button.classList.add("is-active");
    state.event = { ...state.event, ...events[button.dataset.event] };
    renderStats();
  });
});

updateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = incomingMessage.value.trim();
  if (!value) return;
  processCustomUpdate(value);
  incomingMessage.value = "";
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  state = structuredClone(initialState);
  document.querySelector("#triageState").textContent = "Monitoring";
  document.querySelectorAll("[data-event]").forEach((button) => button.classList.remove("is-active"));
  document.querySelector('[data-event="rehearsal"]').classList.add("is-active");
  render();
});

render();