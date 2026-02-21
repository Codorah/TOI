(() => {
  "use strict";

  const SETTINGS_KEY = "toi_settings_v2";
  const PAYLOAD_PREFIX = "toi_payload_";
  const PUZZLES_LIBRARY_KEY = "toi_puzzles_library_v1";
  const HINT_BANK_KEY = "toi_hint_bank_v1";
  const MAX_SAVED_PUZZLES = 10;
  const MAX_URL_DATA = 6500;
  const SHARE_IMAGE_MAX_DIM = 960;
  const SHARE_IMAGE_QUALITY = 0.82;
  const SNAP_RATIO = 0.18; 
  const JIGSAW_TAB_RATIO = 0.22;
  const JIGSAW_HIT_PADDING_RATIO = 0.24;
  const ROTATE_STEP = 90;
  const HINT_TOTAL = 1;

  const PRELOADED_GALLERY = [
    {
      id: "gal-02",
      diff: "6",
      title: "Réseau Neural",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "gal-03",
      diff: "20",
      title: "Mégapole (Titan)",
      img: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "gal-04",
      diff: "50",
      title: "Fractale (Insane)",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const DEFAULT_SETTINGS = { profileName: "", language: "fr", darkMode: true };
  const THEME_COLORS = { dark: "#ff4f5d", light: "#2f4dde" };

  const TXT = {
    fr: {
      splash_title: "Bienvenue dans Toi",
      splash_subtitle: "Votre createur de puzzle interactif. Cree ton puzzle, joue instantanement ou partage un lien.",
      enter_app: "Entrer",
      play_now: "Jouer maintenant",
      settings: "Parametres",
      close: "Fermer",
      save: "Sauvegarder",
      install_app: "Installer l'app",
      my_puzzles_title: "Mes puzzles",
      my_puzzles_empty: "Aucun puzzle enregistre pour le moment.",
      my_puzzles_toggle_open: "Voir mes puzzles",
      my_puzzles_toggle_close: "Masquer mes puzzles",
      replay_puzzle: "Rejouer",
      delete_puzzle: "Supprimer",
      saved_on: "Sauvegarde: {date}",
      saved_puzzle: "Puzzle {diff}",
      create_title: "Creer un Puzzle Secret",
      create_subtitle: "Utilisateur A cree le puzzle, partage un lien, utilisateur B le resout.",
      label_image: "Image",
      label_difficulty: "Difficulte",
      label_message: "Message secret",
      message_placeholder: "Ton message secret ici...",
      generate_link: "Generer le lien de partage",
      copy: "Copier",
      test_link: "Tester le lien",
      large_preview: "Apercu grand format",
      preview_empty: "Selectionne une image pour l'afficher en grand ici. Clique l'image pour zoom.",
      progress_label: "Progression",
      difficulty_label: "Difficulte",
      game_note: "Appuie pour tourner une piece (90 deg), puis glisse pour la placer. Snap strict a 15%.",
      reference_title: "Image de reference",
      profile_name: "Nom profil",
      profile_placeholder: "Ton nom",
      language: "Langue",
      dark_mode: "Mode sombre",
      victory_title: "Puzzle resolu",
      share_link_action: "Partager son lien",
      share_text: "J'ai termine ce puzzle sur Toi. A toi de le resoudre !",
      create_mine: "Creer le mien",
      welcome_user: "Bienvenue, {name}",
      default_profile: "Joueur",
      hint_btn: "Indice ({count})",
      hint_info: "Indice: place automatiquement une piece correcte.",
      hint_none: "Aucun indice disponible.",
      hint_finished: "Partie terminee.",
      share_mode_data: "Mode partage: URL directe (?data=...)",
      share_mode_local: "Mode partage: localStorage (?sid=...)",
      offline_banner: "Hors connexion: mode offline actif.",
      status_need: "Image et message requis.",
      status_encoding: "Encodage du puzzle en cours...",
      status_url: "Lien genere dans l'URL.",
      status_local: "Lien trop long, stockage local active sur cet appareil.",
      status_copied: "Lien copie.",
      status_first: "Genere d'abord un lien.",
      status_error_generate: "Erreur lors de la generation du lien.",
      status_no_hint: "Plus d'indice disponible.",
      status_hint_auto_piece: "Indice utilise: une piece a ete placee automatiquement.",
      status_hint_reward: "Puzzle termine: +1 indice gagne.",
      status_invalid_link: "Lien invalide ou donnees introuvables.",
      status_image_error: "Impossible de charger l'image du puzzle.",
      status_settings_saved: "Parametres sauvegardes.",
      status_installed: "Application installee.",
      status_install_help: "Chrome: menu > Installer l'application.",
      local_default_message: "Puzzle local sans message secret.",
      status_saved_puzzle: "Puzzle ajoute a Mes puzzles.",
      status_offline_diff: "Les modes de difficulté supérieurs à 10x10 (Titan, Insane) nécessitent une connexion Internet.",
      back_to_setup: "← Retour",
      diff: { "4": "Facile (4x4)", "6": "Moyen (6x6)", "8": "Difficile (8x8)", "10": "Expert (10x10)", "20": "Titan (20x20)", "50": "Insane (50x50)" }
    },
    en: {
      splash_title: "Welcome to Toi",
      splash_subtitle: "Your interactive puzzle creator. Build your puzzle, play instantly, or share a link.",
      enter_app: "Enter",
      play_now: "Play now",
      settings: "Settings",
      close: "Close",
      save: "Save",
      install_app: "Install app",
      my_puzzles_title: "My puzzles",
      my_puzzles_empty: "No saved puzzles yet.",
      my_puzzles_toggle_open: "Show my puzzles",
      my_puzzles_toggle_close: "Hide my puzzles",
      replay_puzzle: "Replay",
      delete_puzzle: "Delete",
      saved_on: "Saved: {date}",
      saved_puzzle: "Puzzle {diff}",
      create_title: "Create a Secret Puzzle",
      create_subtitle: "User A creates the puzzle and shares a link. User B solves it.",
      label_image: "Image",
      label_difficulty: "Difficulty",
      label_message: "Secret message",
      message_placeholder: "Your secret message...",
      generate_link: "Generate share link",
      copy: "Copy",
      test_link: "Test link",
      large_preview: "Large preview",
      preview_empty: "Choose an image to preview it large here. Click image to zoom.",
      progress_label: "Progress",
      difficulty_label: "Difficulty",
      game_note: "Tap to rotate a piece (90 deg), then drag to place it. Strict 15% snap.",
      reference_title: "Reference image",
      profile_name: "Profile name",
      profile_placeholder: "Your name",
      language: "Language",
      dark_mode: "Dark mode",
      victory_title: "Puzzle solved",
      share_link_action: "Share link",
      share_text: "I finished this puzzle on Toi. Can you solve it?",
      create_mine: "Create mine",
      welcome_user: "Welcome, {name}",
      default_profile: "Player",
      hint_btn: "Hint ({count})",
      hint_info: "Hint: automatically places one correct piece.",
      hint_none: "Hint already used.",
      hint_finished: "Game finished.",
      share_mode_data: "Share mode: direct URL (?data=...)",
      share_mode_local: "Share mode: localStorage (?sid=...)",
      offline_banner: "Offline: cached mode is active.",
      status_need: "Image and message are required.",
      status_encoding: "Encoding puzzle...",
      status_url: "Link generated in URL.",
      status_local: "Link too long, local storage mode enabled on this device.",
      status_copied: "Link copied.",
      status_first: "Generate a link first.",
      status_error_generate: "Error generating link.",
      status_no_hint: "No hint left.",
      status_hint_auto_piece: "Hint used: one piece was placed automatically.",
      status_hint_reward: "Puzzle completed: +1 hint earned.",
      status_invalid_link: "Invalid link or missing data.",
      status_image_error: "Could not load puzzle image.",
      status_settings_saved: "Settings saved.",
      status_installed: "App installed.",
      status_install_help: "Chrome: menu > Install app.",
      local_default_message: "Local puzzle without secret message.",
      status_saved_puzzle: "Puzzle added to My puzzles.",
      status_offline_diff: "Difficulty modes higher than 10x10 (Titan, Insane) require an internet connection.",
      back_to_setup: "← Back",
      diff: { "4": "Easy (4x4)", "6": "Medium (6x6)", "8": "Hard (8x8)", "10": "Expert (10x10)", "20": "Titan (20x20)", "50": "Insane (50x50)" }
    }
  };

  const el = {
    welcomeScreen: document.getElementById("welcome-screen"),
    enterAppBtn: document.getElementById("enter-app-btn"),
    networkBanner: document.getElementById("network-banner"),
    metaThemeColor: document.getElementById("meta-theme-color"),
    welcomeLine: document.getElementById("welcome-line"),
    settingsBtn: document.getElementById("settings-btn"),
    installBtn: document.getElementById("install-btn"),
    setupScreen: document.getElementById("setup-screen"),
    gameScreen: document.getElementById("game-screen"),
    imageInput: document.getElementById("image-input"),
    difficulty: document.getElementById("difficulty"),
    message: document.getElementById("secret-message"),
    playNowBtn: document.getElementById("play-now-btn"),
    generateBtn: document.getElementById("generate-btn"),
    status: document.getElementById("status"),
    linkContainer: document.getElementById("link-container"),
    linkMode: document.getElementById("link-mode"),
    shareLink: document.getElementById("share-link"),
    copyBtn: document.getElementById("copy-btn"),
    openBtn: document.getElementById("open-btn"),
    toggleMyPuzzlesBtn: document.getElementById("toggle-my-puzzles-btn"),
    myPuzzlesSection: document.getElementById("my-puzzles-section"),
    myPuzzlesEmpty: document.getElementById("my-puzzles-empty"),
    myPuzzlesList: document.getElementById("my-puzzles-list"),
    setupPreviewImage: document.getElementById("setup-preview-image"),
    setupPreviewEmpty: document.getElementById("setup-preview-empty"),
    canvas: document.getElementById("puzzle-canvas"),
    puzzlePanel: document.querySelector(".puzzle-panel"),
    timer: document.getElementById("timer"),
    hintBtn: document.getElementById("hint-btn"),
    hintInfo: document.getElementById("hint-info"),
    progressText: document.getElementById("progress-text"),
    progressBar: document.getElementById("progress-bar"),
    difficultyText: document.getElementById("difficulty-text"),
    referenceImage: document.getElementById("reference-image"),
    settingsModal: document.getElementById("settings-modal"),
    profileName: document.getElementById("profile-name"),
    languageSelect: document.getElementById("language-select"),
    darkModeToggle: document.getElementById("dark-mode-toggle"),
    saveSettingsBtn: document.getElementById("save-settings-btn"),
    closeSettingsBtn: document.getElementById("close-settings-btn"),
    closeSettingsTop: document.getElementById("close-settings-top"),
    victoryModal: document.getElementById("victory-modal"),
    revealedMessage: document.getElementById("revealed-message"),
    shareVictoryBtn: document.getElementById("share-victory-btn"),
    restartBtn: document.getElementById("restart-btn"),
    backToSetupBtn: document.getElementById("back-to-setup-btn"),
    lightbox: document.getElementById("reference-lightbox"),
    lightboxImage: document.getElementById("reference-lightbox-image"),
    closeReferenceBtn: document.getElementById("close-reference-btn"),
    galleryList: document.getElementById("gallery-list")
  };

  const ctx = el.canvas.getContext("2d");

  const state = {
    settings: { ...DEFAULT_SETTINGS },
    deferredInstallPrompt: null,
    setupPreviewUrl: "",
    img: null,
    message: "",
    gridSize: 4,
    pieceSize: 0,
    srcW: 0,
    srcH: 0,
    pieces: [],
    selected: null,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    moved: false,
    startTime: 0,
    active: false,
    raf: 0,
    hintsRemaining: HINT_TOTAL,
    currentPacked: ""
  };

  // --- HELPERS ---
  const dict = () => TXT[state.settings.language] || TXT.fr;
  const t = (k, vars = {}) => {
    let str = dict()[k] || TXT.fr[k] || k;
    for (const [name, value] of Object.entries(vars)) {
      str = str.replace("{" + name + "}", String(value));
    }
    return str;
  };

  const setStatus = (text, type = "") => {
    if (!el.status) return;
    el.status.textContent = text;
    el.status.className = "status" + (type ? " " + type : "");
  };
  const setStatusKey = (key, type = "", vars = {}) => setStatus(t(key, vars), type);

  const bytesToBase64 = (bytes) => {
    let b = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
      b += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(b);
  };
  const base64ToBytes = (base64) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  };
  const encodeText = (txt) => bytesToBase64(new TextEncoder().encode(txt));
  const decodeText = (b64) => new TextDecoder().decode(base64ToBytes(b64));
  const encodePayload = (payload) => encodeText(JSON.stringify(payload));
  const decodePayload = (b64) => JSON.parse(decodeText(b64));

  const makeId = () => ((window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : (String(Date.now()) + "_" + Math.random().toString(36).slice(2)));

  // --- DATA MANAGEMENT ---
  function loadSettings() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
      return { ...DEFAULT_SETTINGS, ...(parsed || {}) };
    } catch { return { ...DEFAULT_SETTINGS }; }
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  }

  function loadPuzzlesLibrary() {
    try {
      const raw = localStorage.getItem(PUZZLES_LIBRARY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  function savePuzzlesLibrary(entries) {
    localStorage.setItem(PUZZLES_LIBRARY_KEY, JSON.stringify(entries.slice(0, MAX_SAVED_PUZZLES)));
  }

  // --- UI RENDERERS ---
  function renderPuzzlesLibrary() {
    const entries = loadPuzzlesLibrary();
    el.myPuzzlesList.innerHTML = "";
    if (!entries.length) {
      el.myPuzzlesEmpty.hidden = false;
      return;
    }
    el.myPuzzlesEmpty.hidden = true;
    entries.forEach(entry => {
      try {
        const payload = decodePayload(entry.packed);
        const card = document.createElement("article");
        card.className = "saved-card";
        card.innerHTML = `
          <img class="saved-thumb" src="${payload.i}">
          <div class="saved-body">
            <p class="saved-title">Puzzle ${payload.d}x${payload.d}</p>
            <div class="saved-actions">
              <button class="btn btn-main" data-action="replay" data-pid="${entry.id}">${t("replay_puzzle")}</button>
              <button class="btn btn-ghost" data-action="delete" data-pid="${entry.id}">${t("delete_puzzle")}</button>
            </div>
          </div>`;
        el.myPuzzlesList.appendChild(card);
      } catch {}
    });
  }

  function renderStaticGallery() {
    if (!el.galleryList) return;
    el.galleryList.innerHTML = "";
    PRELOADED_GALLERY.forEach(item => {
      const card = document.createElement("article");
      card.className = "saved-card";
      card.innerHTML = `
        <img class="saved-thumb" src="${item.img}">
        <div class="saved-body">
          <p class="saved-title">${item.title}</p>
          <button class="btn btn-main" data-action="play-gallery" data-gid="${item.id}">JOUER</button>
        </div>`;
      el.galleryList.appendChild(card);
    });
  }

  // --- CORE PUZZLE ENGINE ---
  function setupCanvas() {
    const panelWidth = el.puzzlePanel ? el.puzzlePanel.clientWidth : window.innerWidth - 30;
    const side = Math.min(900, Math.max(280, panelWidth - 2));
    el.canvas.width = side;
    el.canvas.height = side;
    state.pieceSize = side / state.gridSize;
    state.srcW = state.img.width / state.gridSize;
    state.srcH = state.img.height / state.gridSize;
  }

  function createPieces() {
    state.pieces = [];
    for (let y = 0; y < state.gridSize; y++) {
      for (let x = 0; x < state.gridSize; x++) {
        const top = y === 0 ? 0 : -state.pieces[(y - 1) * state.gridSize + x].edges.b;
        const left = x === 0 ? 0 : -state.pieces[state.pieces.length - 1].edges.r;
        state.pieces.push({
          sx: x * state.srcW, sy: y * state.srcH,
          currentX: Math.random() * (el.canvas.width - state.pieceSize),
          currentY: Math.random() * (el.canvas.height - state.pieceSize),
          correctX: x * state.pieceSize, correctY: y * state.pieceSize,
          rotation: Math.floor(Math.random() * 4) * ROTATE_STEP,
          edges: { 
            t: top, 
            r: x === state.gridSize - 1 ? 0 : (Math.random() > 0.5 ? 1 : -1), 
            b: y === state.gridSize - 1 ? 0 : (Math.random() > 0.5 ? 1 : -1), 
            l: left 
          },
          solved: false
        });
      }
    }
  }

  function buildJigsawPath(p) {
    const s = state.pieceSize, h = s / 2, tab = s * JIGSAW_TAB_RATIO, neck = s * 0.18, e = p.edges;
    ctx.beginPath(); ctx.moveTo(-h, -h);
    if (e.t === 0) ctx.lineTo(h, -h); else { const b = -e.t * tab; ctx.lineTo(-neck, -h); ctx.bezierCurveTo(-neck * 0.45, -h, -neck * 0.75, -h + b, 0, -h + b); ctx.bezierCurveTo(neck * 0.75, -h + b, neck * 0.45, -h, neck, -h); ctx.lineTo(h, -h); }
    if (e.r === 0) ctx.lineTo(h, h); else { const b = e.r * tab; ctx.lineTo(h, -neck); ctx.bezierCurveTo(h, -neck * 0.45, h + b, -neck * 0.75, h + b, 0); ctx.bezierCurveTo(h + b, neck * 0.75, h, neck * 0.45, h, neck); ctx.lineTo(h, h); }
    if (e.b === 0) ctx.lineTo(-h, h); else { const b = e.b * tab; ctx.lineTo(neck, h); ctx.bezierCurveTo(neck * 0.45, h, neck * 0.75, h + b, 0, h + b); ctx.bezierCurveTo(-neck * 0.75, h + b, -neck * 0.45, h, -neck, h); ctx.lineTo(-h, h); }
    if (e.l === 0) ctx.lineTo(-h, -h); else { const b = -e.l * tab; ctx.lineTo(-h, neck); ctx.bezierCurveTo(-h, neck * 0.45, -h + b, neck * 0.75, -h + b, 0); ctx.bezierCurveTo(-h + b, -neck * 0.75, -h, -neck * 0.45, -h, -neck); ctx.lineTo(-h, -h); }
    ctx.closePath();
  }

  function drawPuzzle() {
    ctx.clearRect(0, 0, el.canvas.width, el.canvas.height);
    const tabPx = state.pieceSize * JIGSAW_TAB_RATIO;
    const sPadX = state.srcW * JIGSAW_TAB_RATIO, sPadY = state.srcH * JIGSAW_TAB_RATIO;

    state.pieces.forEach(p => {
      const cx = p.currentX + state.pieceSize / 2, cy = p.currentY + state.pieceSize / 2;
      const e = p.edges;
      const dL = e.l === 1 ? tabPx : 0, dT = e.t === 1 ? tabPx : 0;
      const sL = e.l === 1 ? sPadX : 0, sT = e.t === 1 ? sPadY : 0;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((p.rotation * Math.PI) / 180);
      buildJigsawPath(p);
      ctx.clip();
      
      if (p === state.selected) { ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 10; }
      
      ctx.drawImage(state.img, p.sx - sL, p.sy - sT, state.srcW + sL + (e.r === 1 ? sPadX : 0), state.srcH + sT + (e.b === 1 ? sPadY : 0), 
                    -state.pieceSize / 2 - dL, -state.pieceSize / 2 - dT, state.pieceSize + dL + (e.r === 1 ? tabPx : 0), state.pieceSize + dT + (e.b === 1 ? tabPx : 0));
      ctx.restore();
    });
  }

  // --- INPUT MANAGEMENT ---
  function getPos(e) {
    const rect = el.canvas.getBoundingClientRect();
    const bx = e.touches ? e.touches[0].clientX : e.clientX;
    const by = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (bx - rect.left) * (el.canvas.width / rect.width), y: (by - rect.top) * (el.canvas.height / rect.height) };
  }

  function onStart(e) {
    if (!state.active) return;
    const { x, y } = getPos(e);
    for (let i = state.pieces.length - 1; i >= 0; i--) {
      const p = state.pieces[i];
      if (p.solved) continue;
      if (x > p.currentX && x < p.currentX + state.pieceSize && y > p.currentY && y < p.currentY + state.pieceSize) {
        state.selected = p;
        state.offsetX = x - p.currentX; state.offsetY = y - p.currentY;
        if (e.touches) state.offsetY += 25;
        state.moved = false;
        state.pieces.splice(i, 1); state.pieces.push(p);
        break;
      }
    }
  }

  function onMove(e) {
    if (!state.selected) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getPos(e);
    state.selected.currentX = x - state.offsetX;
    state.selected.currentY = y - state.offsetY;
    state.moved = true;
  }

  function onEnd() {
    if (!state.selected) return;
    const p = state.selected;
    if (!state.moved) {
      p.rotation = (p.rotation + ROTATE_STEP) % 360;
    } else {
      const dist = Math.hypot(p.currentX - p.correctX, p.currentY - p.correctY);
      if (dist < state.pieceSize * SNAP_RATIO && p.rotation % 360 === 0) {
        p.currentX = p.correctX; p.currentY = p.correctY; p.solved = true;
        updateProgressUI();
        if (state.pieces.every(p => p.solved)) showVictory();
      }
    }
    state.selected = null;
  }

  // --- NAVIGATION & INIT ---
  function updateProgressUI() {
    const solved = state.pieces.filter(p => p.solved).length;
    const percent = Math.floor((solved / state.pieces.length) * 100);
    if (el.progressText) el.progressText.textContent = percent + "%";
    if (el.progressBar) el.progressBar.style.width = percent + "%";
  }

  function showVictory() {
    state.active = false;
    setTimeout(() => {
      el.victoryModal.hidden = false;
      el.revealedMessage.textContent = state.message;
    }, 500);
  }

  function startPuzzle(imgSrc, diff, msg) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      state.img = img;
      state.gridSize = parseInt(diff);
      state.message = msg;
      setupCanvas();
      createPieces();
      state.active = true;
      el.setupScreen.hidden = true;
      el.gameScreen.hidden = false;
      updateProgressUI();
      animate();
    };
    img.src = imgSrc;
  }

  function animate() {
    if (!state.active) return;
    drawPuzzle();
    state.raf = requestAnimationFrame(animate);
  }

  function applySettings() {
    const theme = state.settings.darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-i18n]").forEach(n => n.textContent = t(n.getAttribute("data-i18n")));
  }

  function init() {
    state.settings = loadSettings();
    applySettings();
    renderStaticGallery();
    renderPuzzlesLibrary();

    // Fix NAVIGATION
    if (el.enterAppBtn) {
      el.enterAppBtn.onclick = () => {
        el.welcomeScreen.hidden = true;
        el.setupScreen.hidden = false;
      };
    }

    if (el.backToSetupBtn) {
      el.backToSetupBtn.onclick = () => {
        state.active = false;
        el.gameScreen.hidden = true;
        el.setupScreen.hidden = false;
      };
    }

    // Canvas Events
    el.canvas.style.touchAction = "none";
    el.canvas.addEventListener("pointerdown", onStart);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onEnd);

    // Global Actions (Gallery & Library)
    document.addEventListener("click", e => {
      const action = e.target.dataset.action;
      if (action === "play-gallery") {
        const item = PRELOADED_GALLERY.find(g => g.id === e.target.dataset.gid);
        if (item) startPuzzle(item.img, item.diff, "Bravo !");
      }
      if (action === "replay") {
        const entry = loadPuzzlesLibrary().find(en => en.id === e.target.dataset.pid);
        if (entry) {
          const p = decodePayload(entry.packed);
          startPuzzle(p.i, p.d, decodeText(p.m));
        }
      }
    });
  }

  init();
})();