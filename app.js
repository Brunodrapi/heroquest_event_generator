// app.js — HeroQuest Dungeon Events (fixed trigger chance + multi-draw + direct draw button)

let deck = [];
let discard = [];
let history = [];
let lang = "fr"; // défaut FR

// ✅ CHANCE FIXE (ne change jamais via les cartes)
// événement si d6 >= 5 (donc 5–6 = 2/6)
const EVENT_THRESHOLD_FIXED = 5;

// ✅ règle: nombre de cartes tirées quand un événement proc (par défaut 1)
let onTriggerDrawCount = 1;

function qs(id) { return document.getElementById(id); }
function d6() { return Math.floor(Math.random() * 6) + 1; }

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showToast(message) {
  const toast = qs("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => (toast.hidden = true), 2500);
}

function safeCardTitle(card) {
  const loc = card?.i18n?.[lang];
  return loc?.title || card?.title || "—";
}
function safeCardText(card) {
  const loc = card?.i18n?.[lang];
  return loc?.text || card?.text || [];
}

// -------------------- UI labels
function setStaticLabels() {
  const isFR = lang === "fr";
  if (qs("subtitle")) qs("subtitle").textContent = isFR
    ? "Si le tour de Zargon n’a aucun effet, tirez un Événement."
    : "Draw an event if Zargon’s turn has no effect.”";

  if (qs("labelOdds")) qs("labelOdds").textContent = isFR ? "Afficher les chances" : "Show odds";
  if (qs("historyTitle")) qs("historyTitle").textContent = isFR ? "Historique" : "History";
  if (qs("footerLine")) {
  qs("footerLine").innerHTML = isFR
    ? `Inspiré par <a href="https://www.drivethrurpg.com/fr/product/438534/axianquest-dungeon-events" target="_blank">le deck d'événement de donjon d'Axian Quest</a>`
    : `Inspired by <a href="https://www.drivethrurpg.com/fr/product/438534/axianquest-dungeon-events" target="_blank">Axian Quest Dungeon event deck</a>`;
}
  if (qs("hint")) qs("hint").textContent = isFR ? "Clique sur “Tirer un évenement”." : "Click “Draw an event ”.";

  // ✅ Rename main buttons
  if (qs("drawBtn")) qs("drawBtn").textContent = isFR ? "Tirer un évenement" : "Draw an event";
  if (qs("drawCardBtn")) qs("drawCardBtn").textContent = isFR ? "Prochaine carte événement" : "Next event card";

  if (qs("resetBtn")) qs("resetBtn").textContent = isFR ? "Reset" : "Reset";
  if (qs("rollBtn")) qs("rollBtn").textContent = isFR ? "Lancer d6" : "Roll d6";

  // Multi section title will be set dynamically
}

// -------------------- Rule status (top)
function renderRuleStatus() {
  const el = qs("ruleStatus");
  if (!el) return;

  let ruleName;
  if (onTriggerDrawCount === 3) ruleName = "Dungeon Turmoil";
  else if (onTriggerDrawCount === 2) ruleName = (lang === "fr") ? "Double pioche" : "Double Draw";
  else ruleName = "Normal";

  let range;
  if (EVENT_THRESHOLD_FIXED <= 1) range = "1–6";
  else if (EVENT_THRESHOLD_FIXED >= 6) range = "6";
  else range = `${EVENT_THRESHOLD_FIXED}–6`;

  if (lang === "fr") {
    el.textContent = `Règle active : ${ruleName} • Événement sur ${range} • ${onTriggerDrawCount} carte(s) par événement`;
  } else {
    el.textContent = `Active rule: ${ruleName} • Event on ${range} • ${onTriggerDrawCount} card(s) per event`;
  }
}

// -------------------- Odds line (fixed chance)
function setOddsLine() {
  const odds = qs("oddsLine");
  const show = qs("showOddsChk") ? qs("showOddsChk").checked : true;
  if (!odds) return;
  if (!show) { odds.textContent = ""; return; }

  const num = Math.max(0, Math.min(6, 7 - EVENT_THRESHOLD_FIXED));
  const den = 6;
  const perc = Math.round((num / den) * 1000) / 10;

  let range;
  if (EVENT_THRESHOLD_FIXED <= 1) range = "1–6";
  else if (EVENT_THRESHOLD_FIXED >= 6) range = "6";
  else range = `${EVENT_THRESHOLD_FIXED}–6`;

  odds.textContent = (lang === "fr")
    ? `Événement sur ${range} (${num}/${den} ≈ ${perc}%) • Cartes par événement : ${onTriggerDrawCount}`
    : `Event on ${range} (${num}/${den} ≈ ${perc}%) • Cards per event: ${onTriggerDrawCount}`;

  renderRuleStatus();
}

function renderDeckStatus() {
  const el = qs("deckStatus");
  if (!el) return;

  const total = deck.length + discard.length;
  const remaining = deck.length;
  const used = discard.length;
const reshuffles = history.filter(h =>
  h.type === "RESHUFFLE" || h.type === "RESHUFFLE_CARD"
).length;

  el.textContent = (lang === "fr")
    ? `Deck : ${remaining}/${total} • Défausse : ${used} • Remélanges : ${reshuffles}`
    : `Deck: ${remaining}/${total} • Discard: ${used} • Reshuffles: ${reshuffles}`;
}

// -------------------- Multi-cards display
function clearMultiCards() {
  const sec = qs("multiSection");
  const box = qs("multiCards");
  if (box) box.innerHTML = "";
  if (sec) sec.hidden = true;
}

function miniTagHTML(tags) {
  return (tags || []).map(t => `<span class="tag">${t}</span>`).join("");
}

function appendMiniCard(card, index, totalPlaceholder) {
  const sec = qs("multiSection");
  const box = qs("multiCards");
  const titleEl = qs("multiTitle");
  if (!sec || !box) return;

  sec.hidden = false;
  if (titleEl) titleEl.textContent = (lang === "fr")
    ? "Cartes tirées (ce déclenchement)"
    : "Cards drawn (this trigger)";

  const title = safeCardTitle(card);
  const textLines = safeCardText(card);
  const icon = card.icon || "☠️";
  const tagsHTML = miniTagHTML(card.tags);

  let wanderingHTML = "";
  if (card.wandering) {
    const count = card.wandering.count ?? 1;
    const note = card.wandering.noteI18n
      ? (card.wandering.noteI18n[lang] || card.wandering.noteI18n.en || "")
      : (card.wandering.note || "");
    const wTitle = (lang === "fr") ? `Monstres errants : ${count}` : `Wandering Monsters: ${count}`;
    wanderingHTML = `<div class="mini-wandering"><b>${wTitle}</b>${note ? `<div style="margin-top:6px">${note}</div>` : ""}</div>`;
  }

  const badge = (lang === "fr")
    ? `Carte ${index}/${totalPlaceholder}`
    : `Card ${index}/${totalPlaceholder}`;

  const div = document.createElement("div");
  div.className = "mini-card";
  div.innerHTML = `
    <div class="mini-head">
      <div class="mini-icon">${icon}</div>
      <div style="min-width:0">
        <div class="mini-title">${title}</div>
        <div class="mini-tags">${tagsHTML}</div>
      </div>
      <div class="mini-badge">${badge}</div>
    </div>
    <div class="mini-body">
      ${(textLines || []).map(t => `<div>${t}</div>`).join("")}
      ${wanderingHTML}
      <div class="mini-sep"></div>
    </div>
  `;
  box.appendChild(div);
}

function renumberMiniCards(totalFinal) {
  const box = qs("multiCards");
  if (!box) return;
  const badges = box.querySelectorAll(".mini-badge");
  badges.forEach((b, i) => {
    b.textContent = (lang === "fr")
      ? `Carte ${i + 1}/${totalFinal}`
      : `Card ${i + 1}/${totalFinal}`;
  });
}

// -------------------- Main card rendering
function removeWanderingBox() {
  const old = document.getElementById("wanderingBox");
  if (old) old.remove();
}

function renderTags(card) {
  const tags = qs("cardTags");
  if (!tags) return;
  tags.innerHTML = "";
  (card.tags || []).forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    tags.appendChild(span);
  });
}

function renderWandering(card) {
  removeWanderingBox();
  if (!card?.wandering) return;

  const body = qs("cardBody");
  if (!body) return;

  const box = document.createElement("div");
  box.id = "wanderingBox";
  box.className = "wandering-box";

  const count = card.wandering.count ?? 1;
  const note = card.wandering.noteI18n
    ? (card.wandering.noteI18n[lang] || card.wandering.noteI18n.en || "")
    : (card.wandering.note || "");

  const title = (lang === "fr") ? `Monstres errants : ${count}` : `Wandering Monsters: ${count}`;
  const help = (lang === "fr")
    ? "Utilise ton appli HeroQuest pour déterminer les monstres."
    : "Use your HeroQuest app to determine the monsters.";

  box.innerHTML = `
    <div style="font-weight:900">${title}</div>
    ${note ? `<div class="muted" style="margin-top:6px">${note}</div>` : ""}
    <div class="muted" style="margin-top:6px">${help}</div>
  `;

  body.appendChild(box);
}

function clearCard() {
  if (qs("cardTitle")) qs("cardTitle").textContent = "—";
  if (qs("cardBody")) qs("cardBody").innerHTML = `<p class="muted">${lang === "fr" ? "Tirer un évenement" : "Draw an event"}</p>`;
  if (qs("cardActions")) qs("cardActions").hidden = true;
  if (qs("rollResult")) qs("rollResult").textContent = "";
  if (qs("cardIcon")) qs("cardIcon").textContent = "☁️";
  if (qs("cardTags")) qs("cardTags").innerHTML = "";
  removeWanderingBox();
}

function renderHistory() {
  const list = qs("historyList");
  if (!list) return;
  list.innerHTML = "";
  history.slice(-12).reverse().forEach(h => {
    const li = document.createElement("li");
    li.textContent = h.label;
    list.appendChild(li);
  });
}

function showNothingHappens(rollValue) {
  const title = (lang === "fr") ? "Rien ne se passe" : "Nothing happens";
  const body = (lang === "fr")
    ? `Le donjon est silencieux… (d6=${rollValue})`
    : `The dungeon is quiet… (d6=${rollValue})`;

  if (qs("cardTitle")) qs("cardTitle").textContent = title;
  if (qs("cardBody")) qs("cardBody").innerHTML = `<p class="muted">${body}</p>`;
  if (qs("cardActions")) qs("cardActions").hidden = true;
  if (qs("rollResult")) qs("rollResult").textContent = "";
  if (qs("cardIcon")) qs("cardIcon").textContent = "🕯️";
  if (qs("cardTags")) qs("cardTags").innerHTML = "";
  removeWanderingBox();

  history.push({ type: "NONE", label: `${title} (d6=${rollValue})` });
  renderHistory();
  renderDeckStatus();
}

// -------------------- Deck management
function buildFreshDeckWithReshuffleCard() {
  if (!Array.isArray(EVENT_CARDS)) {
    clearCard();
    showToast(lang === "fr" ? "ERREUR: EVENT_CARDS introuvable" : "ERROR: EVENT_CARDS not found");
    console.error("EVENT_CARDS missing. Check data.js is loaded and valid.");
    return;
  }

  if (typeof RESHUFFLE_CARD !== "undefined" && RESHUFFLE_CARD) {
    deck = [...EVENT_CARDS, RESHUFFLE_CARD];
  } else {
    deck = [...EVENT_CARDS];
  }

  // ✅ Aléatoire : deck mélangé au reset
  shuffle(deck);
  discard = [];
}

function reshuffleFromDiscard() {
  if (discard.length === 0) return;

  if (typeof RESHUFFLE_CARD !== "undefined" && RESHUFFLE_CARD) {
    deck = [...discard, RESHUFFLE_CARD];
  } else {
    deck = [...discard];
  }

  discard = [];

  // ✅ Aléatoire : deck remélangé quand il est recyclé
  shuffle(deck);

  showToast(lang === "fr" ? "Deck remélangé" : "Deck reshuffled");
  history.push({ type: "RESHUFFLE", label: (lang === "fr") ? "🔀 Deck remélangé" : "🔀 Deck reshuffled" });
  renderHistory();
  renderDeckStatus();
}

function forceReshuffleKeepingCard(keepCard) {
  // keepCard = la carte "deck-reshuffled" déjà piochée
  const keepId = keepCard?.id;

  // Pool = tout ce qui reste à tirer + toute la défausse sauf la carte keep
  const pool = [
    ...deck,
    ...discard.filter(c => c?.id !== keepId)
  ];

  shuffle(pool);

  // Nouveau deck = pool mélangé
  deck = pool;

  // Défausse = uniquement la carte "deck remélangé" (pour ne pas la re-piocher tout de suite)
  discard = keepCard ? [keepCard] : [];

  showToast(lang === "fr" ? "🔀 Deck remélangé !" : "🔀 Deck reshuffled!");
  history.push({ type: "RESHUFFLE_CARD", label: (lang === "fr") ? "🔀 Deck remélangé (carte)" : "🔀 Deck reshuffled (card)" });
  renderHistory();
  renderDeckStatus();
}

// -------------------- Rule cards effects
// ✅ Ne change PAS la chance (d6>=5), change seulement le nombre de cartes lors des prochains événements
function applyRuleCardEffects(card) {
  if (!card?.id) return;

  if (card.id === "deck-reshuffled") {
    forceReshuffleKeepingCard(card);
    return;
  }

  if (card.id === "dungeon-turmoil") {
    onTriggerDrawCount = 3;
    setOddsLine();
    renderRuleStatus();
    showToast(lang === "fr" ? "🌀 Désormais : 3 cartes par événement" : "🌀 From now on: 3 cards per event");
    return;
  }

  if (card.id === "too-much-calm") {
    onTriggerDrawCount = 2;
    setOddsLine();
    renderRuleStatus();
    showToast(lang === "fr" ? "⏳ Désormais : 2 cartes par événement" : "⏳ From now on: 2 cards per event");
    return;
  }
}

// -------------------- Draw one card & render (main card)
function drawOneCardAndRender() {
  
  if (deck.length === 0) reshuffleFromDiscard();
  if (deck.length === 0) {
    showToast(lang === "fr" ? "Deck vide" : "Empty deck");
    return null;
  }

  const card = deck.pop();
  discard.push(card);

  const title = safeCardTitle(card);
  const textLines = safeCardText(card);

  if (qs("cardTitle")) qs("cardTitle").textContent = title;
  if (qs("cardIcon")) qs("cardIcon").textContent = card.icon || "☠️";
  renderTags(card);

  if (qs("cardBody")) qs("cardBody").innerHTML = (textLines || []).map(t => `<p>${t}</p>`).join("");

  renderWandering(card);

/*   // Roll button supports new resultsI18n and old results
  const actions = qs("cardActions");
  const rollBtn = qs("rollBtn");
  const rollResult = qs("rollResult"); */

 /*  const hasNewRoll = card.roll && card.roll.sides === 6 && card.roll.resultsI18n;
  const hasOldRoll = card.roll && card.roll.sides === 6 && card.roll.results;

  if (actions && rollBtn && rollResult && (hasNewRoll || hasOldRoll)) {
    actions.hidden = false;
    rollResult.textContent = "";
    rollBtn.textContent = (lang === "fr") ? "Lancer d6" : "Roll d6";

    rollBtn.onclick = () => {
      const r = d6();
      let res = "";
      if (hasNewRoll) {
        res = card.roll.resultsI18n[lang]?.[r] || card.roll.resultsI18n.en?.[r] || "";
      } else {
        res = card.roll.results[r] || "";
      }
      rollResult.textContent = (lang === "fr") ? `Résultat : ${r} → ${res}` : `Result: ${r} → ${res}`;
    };
  } else if (actions && rollResult) {
    actions.hidden = true;
    rollResult.textContent = "";
  } */
   // 🎲 Auto-roll if card has a d6 table
  const rollResult = qs("rollResult");
  if (card.roll && card.roll.sides === 6) {
    const r = d6();
    let res = "";

    if (card.roll.resultsI18n) {
      res = card.roll.resultsI18n[lang]?.[r] || card.roll.resultsI18n.en?.[r] || "";
    } else if (card.roll.results) {
      res = card.roll.results[r] || "";
    }

    const autoRollLine = (lang === "fr")
      ? `🎲 Jet automatique : ${r} → ${res}`
      : `🎲 Auto roll: ${r} → ${res}`;

    const body = qs("cardBody");
    if (body) {
      body.innerHTML += `<div class="muted" style="margin-top:10px">${autoRollLine}</div>`;
    }
  }

  history.push({ type: "CARD", label: title });
  renderHistory();
  renderDeckStatus();

  return card;
}

// -------------------- Helper: draw N cards right now (same click)
function drawNCardsNow(n, reasonLabel) {
  let drawn = 0;

  // safety guard against infinite chains
  const maxLoopGuard = 50;
  let guard = 0;

  while (n > 0 && guard < maxLoopGuard) {
    guard++;

    const card = drawOneCardAndRender();
    n--;

    if (!card) break;

    drawn++;
    appendMiniCard(card, drawn, 999);

    // persistent rule effects for future triggers
    applyRuleCardEffects(card);

    // immediate extra draws (only for this resolution)
    if (card.id === "double-trouble") {
      showToast(lang === "fr" ? "⏳ Double Trouble : +2 cartes maintenant" : "⏳ Double Trouble: +2 cards now");
      n += 2;
    }
  }

  if (drawn > 0) renumberMiniCards(drawn);

  if (guard >= maxLoopGuard) {
    showToast(lang === "fr" ? "⚠️ Trop de pioches en chaîne (sécurité)" : "⚠️ Too many chained draws (safety)");
  }

  if (reasonLabel && drawn > 0) {
    history.push({ type: "DRAW_NOW", label: reasonLabel });
    renderHistory();
  }
}

// -------------------- MAIN: “Quelque chose se passe ?” (d6 then draw N if proc)
function draw() {
  setOddsLine();
  clearMultiCards();

  const roll = d6();
  if (roll < EVENT_THRESHOLD_FIXED) {
    showNothingHappens(roll);
    return;
  }

  const n = onTriggerDrawCount;

  showToast(
    (lang === "fr")
      ? `🎲 d6=${roll} → Événement ! (${n} carte${n > 1 ? "s" : ""})`
      : `🎲 d6=${roll} → Event! (${n} card${n > 1 ? "s" : ""})`
  );

  drawNCardsNow(n, (lang === "fr")
    ? `🎲 Événement (d6=${roll}) → ${n} carte(s)`
    : `🎲 Event (d6=${roll}) → ${n} card(s)`);
}

// -------------------- DIRECT: “Tirer une carte événement” (no dice)
function drawOneEventCardDirect() {
  setOddsLine();
  clearMultiCards();

  showToast(lang === "fr" ? "🃏 Pioche d’une carte événement" : "🃏 Drawing 1 event card");
  drawNCardsNow(1, (lang === "fr") ? "🃏 Pioche directe (1 carte)" : "🃏 Direct draw (1 card)");
}

// -------------------- Reset
function resetAll() {
  onTriggerDrawCount = 1;

  buildFreshDeckWithReshuffleCard();
  history = [];
  renderHistory();
  clearCard();
  setOddsLine();
  renderDeckStatus();
  renderRuleStatus();
  clearMultiCards();
  showToast(lang === "fr" ? "Reset (règle normale)" : "Reset (normal rule)");
}

// -------------------- Language
function setLang(newLang) {
  lang = newLang;
  if (qs("langFR")) qs("langFR").classList.toggle("active", lang === "fr");
  if (qs("langEN")) qs("langEN").classList.toggle("active", lang === "en");
  setStaticLabels();
  setOddsLine();
  renderDeckStatus();
  renderRuleStatus();
}

// -------------------- UI hooks
if (qs("drawBtn")) qs("drawBtn").onclick = draw;
if (qs("drawCardBtn")) qs("drawCardBtn").onclick = drawOneEventCardDirect;
if (qs("resetBtn")) qs("resetBtn").onclick = resetAll;
if (qs("showOddsChk")) qs("showOddsChk").onchange = setOddsLine;

if (qs("langFR")) qs("langFR").onclick = () => setLang("fr");
if (qs("langEN")) qs("langEN").onclick = () => setLang("en");

// init
setLang("fr");
resetAll();
