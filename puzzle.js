
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
  const SNAP_RATIO = 0.15;
  const JIGSAW_TAB_RATIO = 0.22;
  const JIGSAW_HIT_PADDING_RATIO = 0.24;
  const ROTATE_STEP = 90;
  const HINT_TOTAL = 1;
  const TIMER_TICK_MS = 250;
  const MAX_CANVAS_DESKTOP = 900;
  const MAX_CANVAS_MOBILE = 760;
  const MAX_DPR_DESKTOP = 1.8;
  const MAX_DPR_MOBILE = 1.25;
  const MOBILE_MEDIA_QUERY = "(max-width: 920px), (pointer: coarse)";

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
      status_mobile_cap: "Mode mobile: puzzle reduit de {from}x{from} a {to}x{to} pour garder un jeu fluide.",
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
      status_mobile_cap: "Mobile mode: puzzle reduced from {from}x{from} to {to}x{to} to keep the game smooth.",
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
    boardSize: 0,
    pixelRatio: 1,
    isLowPowerDevice: false,
    active: false,
    drawQueued: false,
    timerHandle: 0,
    lastTimerSecond: -1,
    raf: 0,
    dragLayer: null,
    dragLayerPiece: null,
    hintsRemaining: HINT_TOTAL,
    currentPacked: ""
  };

  const dict = () => TXT[state.settings.language] || TXT.fr;
  const t = (k, vars = {}) => {
    let str = dict()[k] || TXT.fr[k] || k;
    for (const [name, value] of Object.entries(vars)) {
      str = str.replace("{" + name + "}", String(value));
    }
    return str;
  };

  const setStatus = (text, type = "") => {
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

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const makeId = () => ((window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : (String(Date.now()) + "_" + Math.random().toString(36).slice(2)));

  function createShareLinkFromPacked(packed) {
    const url = new URL(window.location.href);
    url.search = "";

    if (packed.length <= MAX_URL_DATA) {
      url.searchParams.set("data", packed);
      return { url: url.toString(), modeKey: "share_mode_data" };
    }

    const sid = makeId();
    localStorage.setItem(PAYLOAD_PREFIX + sid, packed);
    url.searchParams.set("sid", sid);
    return { url: url.toString(), modeKey: "share_mode_local" };
  }

  function loadHintBank() {
    try {
      const raw = localStorage.getItem(HINT_BANK_KEY);
      const value = Number(raw);
      if (Number.isFinite(value) && value >= 0) {
        return Math.floor(value);
      }
      return HINT_TOTAL;
    } catch {
      return HINT_TOTAL;
    }
  }

  function saveHintBank() {
    localStorage.setItem(HINT_BANK_KEY, String(state.hintsRemaining));
  }

  function loadPuzzlesLibrary() {
    try {
      const raw = localStorage.getItem(PUZZLES_LIBRARY_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((entry) => entry && typeof entry.id === "string" && typeof entry.packed === "string");
    } catch {
      return [];
    }
  }

  function savePuzzlesLibrary(entries) {
    let list = Array.isArray(entries) ? entries.slice(0, MAX_SAVED_PUZZLES) : [];
    while (list.length > 0) {
      try {
        localStorage.setItem(PUZZLES_LIBRARY_KEY, JSON.stringify(list));
        return list;
      } catch {
        list.pop();
      }
    }
    try {
      localStorage.removeItem(PUZZLES_LIBRARY_KEY);
    } catch { }
    return [];
  }

  function upsertPackedPuzzle(packed) {
    let entries = loadPuzzlesLibrary().filter((entry) => entry.packed !== packed);
    entries.unshift({ id: makeId(), createdAt: Date.now(), packed });
    entries = savePuzzlesLibrary(entries);
    renderPuzzlesLibrary(entries);
  }

  function removePuzzleFromLibrary(id) {
    const entries = loadPuzzlesLibrary().filter((entry) => entry.id !== id);
    const saved = savePuzzlesLibrary(entries);
    renderPuzzlesLibrary(saved);
  }

  function formatSavedDate(value) {
    const dateValue = typeof value === "number" ? value : Date.now();
    const locale = state.settings.language === "fr" ? "fr-FR" : "en-US";
    try {
      return new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(dateValue);
    } catch {
      return new Date(dateValue).toLocaleString();
    }
  }

  function setShareLink(url, modeKey) {
    el.shareLink.value = url;
    el.linkMode.textContent = t(modeKey);
    el.linkContainer.hidden = false;
  }

  function updateMyPuzzlesToggle() {
    if (!el.toggleMyPuzzlesBtn || !el.myPuzzlesSection) return;
    el.toggleMyPuzzlesBtn.textContent = el.myPuzzlesSection.hidden ? t("my_puzzles_toggle_open") : t("my_puzzles_toggle_close");
  }

  function toggleMyPuzzlesSection() {
    if (!el.myPuzzlesSection) return;
    el.myPuzzlesSection.hidden = !el.myPuzzlesSection.hidden;
    updateMyPuzzlesToggle();
  }

  function renderPuzzlesLibrary(optionalEntries) {
    const entries = Array.isArray(optionalEntries) ? optionalEntries : loadPuzzlesLibrary();
    el.myPuzzlesList.innerHTML = "";

    if (!entries.length) {
      el.myPuzzlesList.hidden = true;
      el.myPuzzlesEmpty.hidden = false;
      return;
    }

    let hasValid = false;
    let changed = false;
    const keptEntries = [];

    entries.forEach((entry) => {
      try {
        const payload = decodePayload(entry.packed);
        if (!payload || !payload.i || !payload.d || !payload.m) {
          throw new Error("INVALID_ENTRY");
        }

        const decodedMsg = decodeText(payload.m);
        const diffLabel = dict().diff[String(payload.d)] || String(payload.d) + "x" + String(payload.d);

        const card = document.createElement("article");
        card.className = "saved-card";

        const image = document.createElement("img");
        image.className = "saved-thumb";
        image.src = payload.i;
        image.alt = "Puzzle";
        card.appendChild(image);

        const body = document.createElement("div");
        body.className = "saved-body";

        const title = document.createElement("p");
        title.className = "saved-title";
        title.textContent = t("saved_puzzle", { diff: diffLabel });
        body.appendChild(title);

        const meta = document.createElement("p");
        meta.className = "saved-meta";
        meta.textContent = t("saved_on", { date: formatSavedDate(entry.createdAt) });
        body.appendChild(meta);

        const message = document.createElement("p");
        message.className = "saved-message";
        message.textContent = decodedMsg || t("local_default_message");
        body.appendChild(message);

        const actions = document.createElement("div");
        actions.className = "saved-actions";

        const replayBtn = document.createElement("button");
        replayBtn.type = "button";
        replayBtn.className = "btn btn-main";
        replayBtn.dataset.action = "replay";
        replayBtn.dataset.pid = entry.id;
        replayBtn.textContent = t("replay_puzzle");
        actions.appendChild(replayBtn);

        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "btn btn-secondary";
        copyBtn.dataset.action = "copy";
        copyBtn.dataset.pid = entry.id;
        copyBtn.textContent = t("copy");
        actions.appendChild(copyBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-ghost";
        deleteBtn.dataset.action = "delete";
        deleteBtn.dataset.pid = entry.id;
        deleteBtn.textContent = t("delete_puzzle");
        actions.appendChild(deleteBtn);

        body.appendChild(actions);
        card.appendChild(body);
        el.myPuzzlesList.appendChild(card);

        keptEntries.push(entry);
        hasValid = true;
      } catch {
        changed = true;
      }
    });

    if (changed) {
      savePuzzlesLibrary(keptEntries);
    }

    el.myPuzzlesList.hidden = !hasValid;
    el.myPuzzlesEmpty.hidden = hasValid;
  }

  function renderStaticGallery() {
    if (!el.galleryList) return;
    el.galleryList.innerHTML = "";

    PRELOADED_GALLERY.forEach((item) => {
      const card = document.createElement("article");
      card.className = "saved-card";

      const image = document.createElement("img");
      image.className = "saved-thumb";
      image.src = item.img;
      image.alt = item.title;
      card.appendChild(image);

      const body = document.createElement("div");
      body.className = "saved-body";

      const title = document.createElement("p");
      title.className = "saved-title";
      title.textContent = item.title;
      body.appendChild(title);

      const meta = document.createElement("p");
      meta.className = "saved-meta";
      meta.textContent = "Diff.: " + dict().diff[item.diff];
      meta.style.color = "var(--accent)";
      body.appendChild(meta);

      const actions = document.createElement("div");
      actions.className = "saved-actions";

      const playBtn = document.createElement("button");
      playBtn.type = "button";
      playBtn.className = "btn btn-main";
      playBtn.dataset.action = "play-gallery";
      playBtn.dataset.gid = item.id;
      playBtn.textContent = "JOUER";
      actions.appendChild(playBtn);

      body.appendChild(actions);
      card.appendChild(body);
      el.galleryList.appendChild(card);
    });
  }

  async function handleLibraryAction(action, puzzleId) {
    const entries = loadPuzzlesLibrary();
    const entry = entries.find((item) => item.id === puzzleId);
    if (!entry) return;

    if (action === "delete") {
      removePuzzleFromLibrary(puzzleId);
      return;
    }

    if (action === "replay") {
      try {
        const payload = decodePayload(entry.packed);
        enterApp();
        loadPuzzle(payload);
      } catch {
        removePuzzleFromLibrary(puzzleId);
      }
      return;
    }

    if (action === "copy") {
      try {
        const share = createShareLinkFromPacked(entry.packed);
        setShareLink(share.url, share.modeKey);
        await navigator.clipboard.writeText(share.url);
        setStatusKey("status_copied", "ok");
      } catch {
        setStatusKey("status_error_generate", "warn");
      }
    }
  }

  function handleGalleryAction(galleryId) {
    const item = PRELOADED_GALLERY.find((g) => g.id === galleryId);
    if (!item) return;

    // Load as a direct puzzle rather than from packed payload
    enterApp();
    startPuzzle(item.img, item.diff, "Vous avez résolu le puzzle avec succès, félicitations !", null);
  }

  function normalizeSettings(raw) {
    const s = { ...DEFAULT_SETTINGS, ...(raw || {}) };
    if (!["fr", "en"].includes(s.language)) s.language = "fr";
    s.darkMode = Boolean(s.darkMode);
    s.profileName = String(s.profileName || "").trim().slice(0, 32);
    return s;
  }

  function loadSettings() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
      return normalizeSettings(parsed);
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  }

  function applyTheme() {
    const theme = state.settings.darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    if (el.metaThemeColor) {
      el.metaThemeColor.setAttribute("content", theme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light);
    }
  }

  function updateDiffLabels() {
    const labels = dict().diff;
    for (const option of el.difficulty.querySelectorAll("option[data-diff]")) {
      const value = option.getAttribute("data-diff");
      option.textContent = labels[value] || value + "x" + value;
    }
  }

  function applyTranslations() {
    document.documentElement.lang = state.settings.language;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });

    updateDiffLabels();
    updateHintUI();
    updateProgressUI();
    updateConnectionBanner();
    renderPuzzlesLibrary();
    updateMyPuzzlesToggle();

    const profile = state.settings.profileName || t("default_profile");
    el.welcomeLine.textContent = t("welcome_user", { name: profile });

    if (!el.linkContainer.hidden) {
      if (el.shareLink.value.includes("?data=")) el.linkMode.textContent = t("share_mode_data");
      if (el.shareLink.value.includes("?sid=")) el.linkMode.textContent = t("share_mode_local");
    }
  }

  function applySettings() {
    applyTheme();
    applyTranslations();
  }

  function openSettings() {
    el.profileName.value = state.settings.profileName;
    el.languageSelect.value = state.settings.language;
    el.darkModeToggle.checked = state.settings.darkMode;
    el.settingsModal.hidden = false;
  }

  function closeSettings() {
    el.settingsModal.hidden = true;
  }

  function saveSettingsFromForm() {
    state.settings = normalizeSettings({
      profileName: el.profileName.value,
      language: el.languageSelect.value,
      darkMode: el.darkModeToggle.checked,
    });
    saveSettings();
    applySettings();
    setStatusKey("status_settings_saved", "ok");
    closeSettings();
  }

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function updateInstallBtn() {
    el.installBtn.hidden = isStandalone() || !state.deferredInstallPrompt;
  }

  async function installApp() {
    if (!state.deferredInstallPrompt) {
      setStatusKey("status_install_help", "warn");
      return;
    }
    state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
    state.deferredInstallPrompt = null;
    updateInstallBtn();
  }

  function updateConnectionBanner() {
    el.networkBanner.textContent = t("offline_banner");
    el.networkBanner.hidden = navigator.onLine;
  }

  function openLightbox(src) {
    if (!src) return;
    el.lightboxImage.src = src;
    el.lightbox.hidden = false;
  }

  function closeLightbox() {
    el.lightbox.hidden = true;
  }

  function clearSetupPreview() {
    if (state.setupPreviewUrl) {
      URL.revokeObjectURL(state.setupPreviewUrl);
      state.setupPreviewUrl = "";
    }
    el.setupPreviewImage.hidden = true;
    el.setupPreviewImage.removeAttribute("src");
    el.setupPreviewEmpty.hidden = false;
  }

  function updateSetupPreview(file) {
    if (!file) {
      clearSetupPreview();
      return;
    }

    if (state.setupPreviewUrl) URL.revokeObjectURL(state.setupPreviewUrl);
    state.setupPreviewUrl = URL.createObjectURL(file);

    el.setupPreviewImage.src = state.setupPreviewUrl;
    el.setupPreviewImage.hidden = false;
    el.setupPreviewEmpty.hidden = true;
  }

  function enterApp() {
    if (!el.welcomeScreen.hidden) el.welcomeScreen.hidden = true;
  }

  function isLowPowerDevice() {
    const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 6;
    return window.matchMedia(MOBILE_MEDIA_QUERY).matches || lowCpu;
  }

  function setupCanvas() {
    state.isLowPowerDevice = isLowPowerDevice();
    const maxCanvas = state.isLowPowerDevice ? MAX_CANVAS_MOBILE : MAX_CANVAS_DESKTOP;
    const panelWidth = el.puzzlePanel && el.puzzlePanel.clientWidth ? el.puzzlePanel.clientWidth : window.innerWidth - 30;
    const side = Math.min(maxCanvas, panelWidth - 2);
    const normalized = Math.max(280, side);

    state.boardSize = normalized;
    state.pixelRatio = Math.min(window.devicePixelRatio || 1, state.isLowPowerDevice ? MAX_DPR_MOBILE : MAX_DPR_DESKTOP);

    el.canvas.style.width = normalized + "px";
    el.canvas.style.height = normalized + "px";
    el.canvas.width = Math.max(1, Math.round(normalized * state.pixelRatio));
    el.canvas.height = Math.max(1, Math.round(normalized * state.pixelRatio));
    ctx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in ctx) {
      ctx.imageSmoothingQuality = state.isLowPowerDevice ? "medium" : "high";
    }

    state.pieceSize = normalized / state.gridSize;
    state.srcW = state.img.width / state.gridSize;
    state.srcH = state.img.height / state.gridSize;
  }

  function createPieces() {
    state.pieces = [];
    for (let y = 0; y < state.gridSize; y += 1) {
      for (let x = 0; x < state.gridSize; x += 1) {
        const topEdge = y === 0 ? 0 : -state.pieces[(y - 1) * state.gridSize + x].edges.b;
        const leftEdge = x === 0 ? 0 : -state.pieces[state.pieces.length - 1].edges.r;
        const rightEdge = x === state.gridSize - 1 ? 0 : (Math.random() > 0.5 ? 1 : -1);
        const bottomEdge = y === state.gridSize - 1 ? 0 : (Math.random() > 0.5 ? 1 : -1);

        state.pieces.push({
          sx: x * state.srcW,
          sy: y * state.srcH,
          currentX: Math.random() * (state.boardSize - state.pieceSize),
          currentY: Math.random() * (state.boardSize - state.pieceSize),
          correctX: x * state.pieceSize,
          correctY: y * state.pieceSize,
          rotation: Math.floor(Math.random() * 4) * ROTATE_STEP,
          edges: { t: topEdge, r: rightEdge, b: bottomEdge, l: leftEdge },
          solved: false,
          sprite: null,
          drawX: -state.pieceSize / 2,
          drawY: -state.pieceSize / 2,
          drawW: state.pieceSize,
          drawH: state.pieceSize,
        });
      }
    }

    rebuildPieceSprites();
  }

  function shufflePieces() {
    state.pieces.forEach((p) => {
      p.currentX = Math.random() * (state.boardSize - state.pieceSize);
      p.currentY = Math.random() * (state.boardSize - state.pieceSize);
      p.rotation = Math.floor(Math.random() * 4) * ROTATE_STEP;
      p.solved = false;
    });
  }

  function buildJigsawPath(context, piece) {
    const size = state.pieceSize;
    const half = size / 2;
    const left = -half;
    const right = half;
    const top = -half;
    const bottom = half;
    const tab = size * JIGSAW_TAB_RATIO;
    const neck = size * 0.18;
    const edges = piece.edges || { t: 0, r: 0, b: 0, l: 0 };

    context.beginPath();
    context.moveTo(left, top);

    if (edges.t === 0) {
      context.lineTo(right, top);
    } else {
      const bulge = -edges.t * tab;
      context.lineTo(-neck, top);
      context.bezierCurveTo(-neck * 0.45, top, -neck * 0.75, top + bulge, 0, top + bulge);
      context.bezierCurveTo(neck * 0.75, top + bulge, neck * 0.45, top, neck, top);
      context.lineTo(right, top);
    }

    if (edges.r === 0) {
      context.lineTo(right, bottom);
    } else {
      const bulge = edges.r * tab;
      context.lineTo(right, -neck);
      context.bezierCurveTo(right, -neck * 0.45, right + bulge, -neck * 0.75, right + bulge, 0);
      context.bezierCurveTo(right + bulge, neck * 0.75, right, neck * 0.45, right, neck);
      context.lineTo(right, bottom);
    }

    if (edges.b === 0) {
      context.lineTo(left, bottom);
    } else {
      const bulge = edges.b * tab;
      context.lineTo(neck, bottom);
      context.bezierCurveTo(neck * 0.45, bottom, neck * 0.75, bottom + bulge, 0, bottom + bulge);
      context.bezierCurveTo(-neck * 0.75, bottom + bulge, -neck * 0.45, bottom, -neck, bottom);
      context.lineTo(left, bottom);
    }

    if (edges.l === 0) {
      context.lineTo(left, top);
    } else {
      const bulge = -edges.l * tab;
      context.lineTo(left, neck);
      context.bezierCurveTo(left, neck * 0.45, left + bulge, neck * 0.75, left + bulge, 0);
      context.bezierCurveTo(left + bulge, -neck * 0.75, left, -neck * 0.45, left, -neck);
      context.lineTo(left, top);
    }

    context.closePath();
  }

  function pieceRenderMetrics(piece) {
    const edges = piece.edges || { t: 0, r: 0, b: 0, l: 0 };
    const tabPx = state.pieceSize * JIGSAW_TAB_RATIO;
    const srcPadX = state.srcW * JIGSAW_TAB_RATIO;
    const srcPadY = state.srcH * JIGSAW_TAB_RATIO;

    const destExtTop = edges.t === 1 ? tabPx : 0;
    const destExtRight = edges.r === 1 ? tabPx : 0;
    const destExtBottom = edges.b === 1 ? tabPx : 0;
    const destExtLeft = edges.l === 1 ? tabPx : 0;

    const srcExtTop = edges.t === 1 ? srcPadY : 0;
    const srcExtRight = edges.r === 1 ? srcPadX : 0;
    const srcExtBottom = edges.b === 1 ? srcPadY : 0;
    const srcExtLeft = edges.l === 1 ? srcPadX : 0;

    const sx = Math.max(0, piece.sx - srcExtLeft);
    const sy = Math.max(0, piece.sy - srcExtTop);
    const sw = Math.max(1, Math.min(state.img.width, piece.sx + state.srcW + srcExtRight) - sx);
    const sh = Math.max(1, Math.min(state.img.height, piece.sy + state.srcH + srcExtBottom) - sy);
    const drawW = state.pieceSize + destExtLeft + destExtRight;
    const drawH = state.pieceSize + destExtTop + destExtBottom;
    const drawX = -state.pieceSize / 2 - destExtLeft;
    const drawY = -state.pieceSize / 2 - destExtTop;

    return {
      destExtTop,
      destExtRight,
      destExtBottom,
      destExtLeft,
      sx,
      sy,
      sw,
      sh,
      drawX,
      drawY,
      drawW,
      drawH
    };
  }

  function createPieceSprite(piece) {
    const metrics = pieceRenderMetrics(piece);
    const spriteScale = state.isLowPowerDevice ? 1 : Math.min(2, state.pixelRatio);
    const sprite = document.createElement("canvas");
    sprite.width = Math.max(1, Math.round(metrics.drawW * spriteScale));
    sprite.height = Math.max(1, Math.round(metrics.drawH * spriteScale));
    const spriteCtx = sprite.getContext("2d");
    spriteCtx.setTransform(spriteScale, 0, 0, spriteScale, 0, 0);
    spriteCtx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in spriteCtx) {
      spriteCtx.imageSmoothingQuality = state.isLowPowerDevice ? "medium" : "high";
    }

    const centerX = state.pieceSize / 2 + metrics.destExtLeft;
    const centerY = state.pieceSize / 2 + metrics.destExtTop;

    spriteCtx.save();
    spriteCtx.translate(centerX, centerY);
    buildJigsawPath(spriteCtx, piece);
    spriteCtx.clip();
    spriteCtx.drawImage(
      state.img,
      metrics.sx,
      metrics.sy,
      metrics.sw,
      metrics.sh,
      metrics.drawX,
      metrics.drawY,
      metrics.drawW,
      metrics.drawH
    );

    if (!state.isLowPowerDevice) {
      const bevel = spriteCtx.createLinearGradient(
        -state.pieceSize / 2,
        -state.pieceSize / 2,
        state.pieceSize / 2,
        state.pieceSize / 2
      );
      bevel.addColorStop(0, "rgba(255,255,255,0.22)");
      bevel.addColorStop(0.45, "rgba(255,255,255,0.03)");
      bevel.addColorStop(1, "rgba(0,0,0,0.2)");
      spriteCtx.fillStyle = bevel;
      spriteCtx.fillRect(metrics.drawX, metrics.drawY, metrics.drawW, metrics.drawH);
    }
    spriteCtx.restore();

    spriteCtx.save();
    spriteCtx.translate(centerX, centerY);
    buildJigsawPath(spriteCtx, piece);
    spriteCtx.strokeStyle = state.isLowPowerDevice ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.30)";
    spriteCtx.lineWidth = state.isLowPowerDevice ? 0.9 : 1.05;
    spriteCtx.stroke();
    spriteCtx.restore();

    piece.sprite = sprite;
    piece.drawX = metrics.drawX;
    piece.drawY = metrics.drawY;
    piece.drawW = metrics.drawW;
    piece.drawH = metrics.drawH;
  }

  function rebuildPieceSprites() {
    if (!state.img || !state.pieces.length) return;
    state.pieces.forEach(createPieceSprite);
    invalidateDragLayer();
  }

  function invalidateDragLayer() {
    state.dragLayer = null;
    state.dragLayerPiece = null;
  }

  function shouldUseDragLayer() {
    return state.isLowPowerDevice && state.pieces.length >= 140;
  }

  function ensureDragLayer(excludedPiece) {
    if (!excludedPiece || !shouldUseDragLayer()) return;
    if (state.dragLayer && state.dragLayerPiece === excludedPiece) return;

    const layer = document.createElement("canvas");
    layer.width = el.canvas.width;
    layer.height = el.canvas.height;
    const layerCtx = layer.getContext("2d");
    layerCtx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
    layerCtx.imageSmoothingEnabled = true;
    if ("imageSmoothingQuality" in layerCtx) {
      layerCtx.imageSmoothingQuality = state.isLowPowerDevice ? "medium" : "high";
    }

    layerCtx.clearRect(0, 0, state.boardSize, state.boardSize);
    for (let i = 0; i < state.pieces.length; i += 1) {
      const piece = state.pieces[i];
      if (piece === excludedPiece) continue;
      drawPiece(piece, false, layerCtx);
    }

    state.dragLayer = layer;
    state.dragLayerPiece = excludedPiece;
  }

  function drawPiece(piece, isSelected = false, targetCtx = ctx) {
    const cx = piece.currentX + state.pieceSize / 2;
    const cy = piece.currentY + state.pieceSize / 2;

    targetCtx.save();
    targetCtx.translate(cx, cy);
    targetCtx.rotate((piece.rotation * Math.PI) / 180);

    if (isSelected) {
      const liftScale = state.isLowPowerDevice ? 1.02 : 1.035;
      targetCtx.scale(liftScale, liftScale);
      targetCtx.shadowColor = "rgba(0, 0, 0, 0.45)";
      targetCtx.shadowBlur = state.isLowPowerDevice ? 12 : 18;
      targetCtx.shadowOffsetY = state.isLowPowerDevice ? 5 : 7;
    }

    if (piece.sprite) {
      targetCtx.drawImage(piece.sprite, piece.drawX, piece.drawY, piece.drawW, piece.drawH);
    } else {
      const metrics = pieceRenderMetrics(piece);
      buildJigsawPath(targetCtx, piece);
      targetCtx.clip();
      targetCtx.drawImage(
        state.img,
        metrics.sx,
        metrics.sy,
        metrics.sw,
        metrics.sh,
        metrics.drawX,
        metrics.drawY,
        metrics.drawW,
        metrics.drawH
      );
    }

    targetCtx.shadowColor = "transparent";
    targetCtx.shadowBlur = 0;
    targetCtx.shadowOffsetY = 0;

    if (isSelected) {
      buildJigsawPath(targetCtx, piece);
      targetCtx.strokeStyle = "rgba(255,79,93,0.95)";
      targetCtx.lineWidth = 2.1;
      targetCtx.stroke();
    }

    targetCtx.restore();
  }

  function drawPuzzle() {
    ctx.clearRect(0, 0, state.boardSize, state.boardSize);
    if (!state.pieces.length) return;

    if (state.selected) {
      ensureDragLayer(state.selected);
      if (state.dragLayer && state.dragLayerPiece === state.selected) {
        ctx.drawImage(state.dragLayer, 0, 0, state.boardSize, state.boardSize);
        drawPiece(state.selected, true, ctx);
        return;
      }
    }

    for (let i = 0; i < state.pieces.length; i += 1) {
      const piece = state.pieces[i];
      if (piece === state.selected) continue;
      drawPiece(piece, false);
    }

    if (state.selected) {
      drawPiece(state.selected, true);
    }
  }

  function updateTimer() {
    if (!state.startTime) return;
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    if (elapsed === state.lastTimerSecond) return;
    state.lastTimerSecond = elapsed;
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const ss = String(elapsed % 60).padStart(2, "0");
    el.timer.textContent = mm + ":" + ss;
  }

  function stopTimerLoop() {
    if (!state.timerHandle) return;
    clearInterval(state.timerHandle);
    state.timerHandle = 0;
  }

  function startTimerLoop() {
    stopTimerLoop();
    state.lastTimerSecond = -1;
    updateTimer();
    state.timerHandle = window.setInterval(() => {
      if (!state.active) return;
      updateTimer();
    }, TIMER_TICK_MS);
  }

  function requestDraw() {
    if (state.drawQueued) return;
    state.drawQueued = true;
    state.raf = requestAnimationFrame(() => {
      state.raf = 0;
      state.drawQueued = false;
      ctx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
      drawPuzzle();
    });
  }

  function solvedCount() {
    return state.pieces.reduce((acc, p) => acc + (p.solved ? 1 : 0), 0);
  }

  function updateProgressUI() {
    const solved = solvedCount();
    const total = state.pieces.length;
    el.progressText.textContent = solved + " / " + total;
    el.difficultyText.textContent = state.gridSize + " x " + state.gridSize;
    const pct = total > 0 ? (solved / total) * 100 : 0;
    el.progressBar.style.width = pct.toFixed(1) + "%";
  }

  function updateHintUI() {
    el.hintBtn.textContent = t("hint_btn", { count: state.hintsRemaining });
    el.hintBtn.disabled = !state.active || state.hintsRemaining <= 0;
    if (!state.active && !el.gameScreen.hidden) {
      el.hintInfo.textContent = t("hint_finished");
    } else if (state.hintsRemaining <= 0) {
      el.hintInfo.textContent = t("hint_none");
    } else {
      el.hintInfo.textContent = t("hint_info");
    }
  }

  function checkVictory() {
    if (!state.active) return;
    if (state.pieces.every((p) => p.solved)) {
      state.active = false;
      stopTimerLoop();
      if (state.raf) {
        cancelAnimationFrame(state.raf);
        state.raf = 0;
      }
      state.drawQueued = false;
      invalidateDragLayer();
      requestDraw();

      state.hintsRemaining += 1;
      saveHintBank();
      setStatusKey("status_hint_reward", "ok");
      updateHintUI();

      setTimeout(() => {
        el.revealedMessage.textContent = state.message;
        el.victoryModal.hidden = false;
      }, 260);
    }
  }

  function checkSnap(piece) {
    const dx = Math.abs(piece.currentX - piece.correctX);
    const dy = Math.abs(piece.currentY - piece.correctY);
    if (dx <= state.pieceSize * SNAP_RATIO && dy <= state.pieceSize * SNAP_RATIO && piece.rotation === 0) {
      piece.currentX = piece.correctX;
      piece.currentY = piece.correctY;
      piece.solved = true;
      updateProgressUI();
      checkVictory();
    }
  }
  function hitPiece(x, y) {
    const pad = state.pieceSize * JIGSAW_HIT_PADDING_RATIO;
    for (let i = state.pieces.length - 1; i >= 0; i -= 1) {
      const p = state.pieces[i];
      if (p.solved) continue;
      if (
        x >= p.currentX - pad &&
        x <= p.currentX + state.pieceSize + pad &&
        y >= p.currentY - pad &&
        y <= p.currentY + state.pieceSize + pad
      ) {
        return { p, i };
      }
    }
    return null;
  }

  function toCanvas(e) {
    const rect = el.canvas.getBoundingClientRect();
    const sx = state.boardSize / rect.width;
    const sy = state.boardSize / rect.height;
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  }

  function onPointerDown(e) {
    if (!state.active) return;
    const { x, y } = toCanvas(e);
    const hit = hitPiece(x, y);
    if (!hit) return;

    state.selected = hit.p;
    state.offsetX = x - hit.p.currentX;
    state.offsetY = y - hit.p.currentY;
    state.startX = x;
    state.startY = y;
    state.moved = false;

    state.pieces.splice(hit.i, 1);
    state.pieces.push(hit.p);

    el.canvas.setPointerCapture(e.pointerId);
    requestDraw();
  }

  function onPointerMove(e) {
    if (!state.selected || state.selected.solved) return;
    const { x, y } = toCanvas(e);
    const pad = state.pieceSize * JIGSAW_HIT_PADDING_RATIO;
    state.selected.currentX = clamp(x - state.offsetX, -pad, state.boardSize - state.pieceSize + pad);
    state.selected.currentY = clamp(y - state.offsetY, -pad, state.boardSize - state.pieceSize + pad);
    if (Math.abs(x - state.startX) + Math.abs(y - state.startY) > 6) state.moved = true;
    requestDraw();
  }

  function onPointerUp(e) {
    if (!state.selected) return;
    const p = state.selected;
    if (!state.moved) p.rotation = (p.rotation + ROTATE_STEP) % 360;
    checkSnap(p);
    state.selected = null;
    invalidateDragLayer();
    if (el.canvas.hasPointerCapture(e.pointerId)) el.canvas.releasePointerCapture(e.pointerId);
    requestDraw();
  }

  function useHint() {
    if (!state.active) return;
    if (state.hintsRemaining <= 0) {
      setStatusKey("status_no_hint", "warn");
      updateHintUI();
      return;
    }

    const target = state.pieces.find((piece) => !piece.solved);
    if (!target) {
      return;
    }

    state.hintsRemaining -= 1;
    saveHintBank();

    target.currentX = target.correctX;
    target.currentY = target.correctY;
    target.rotation = 0;
    target.solved = true;

    updateHintUI();
    updateProgressUI();
    setStatusKey("status_hint_auto_piece", "ok");
    checkVictory();
    invalidateDragLayer();
    requestDraw();
  }

  function startPuzzle(imageSrc, diff, message, packed = "") {
    const packedPuzzle = packed || encodePayload({ m: encodeText(message || ""), d: String(diff), i: imageSrc });
    const image = new Image();
    image.onload = () => {
      el.setupScreen.hidden = true;
      el.gameScreen.hidden = false;
      el.victoryModal.hidden = true;

      state.img = image;
      state.message = message;
      state.gridSize = parseInt(diff, 10);
      if (Number.isNaN(state.gridSize) || state.gridSize < 2) state.gridSize = 4;
      state.currentPacked = packedPuzzle;

      setupCanvas();
      if (state.isLowPowerDevice && state.gridSize > 20) {
        const from = state.gridSize;
        state.gridSize = 20;
        setupCanvas();
        setStatusKey("status_mobile_cap", "warn", { from, to: state.gridSize });
      }
      createPieces();
      shufflePieces();

      state.startTime = Date.now();
      state.active = true;
      state.selected = null;
      state.drawQueued = false;

      el.referenceImage.src = imageSrc;

      updateHintUI();
      updateProgressUI();
      if (state.raf) {
        cancelAnimationFrame(state.raf);
        state.raf = 0;
      }
      startTimerLoop();
      requestDraw();
    };

    image.onerror = () => {
      window.alert(t("status_image_error"));
      location.href = window.location.pathname;
    };

    image.src = imageSrc;
  }

  function loadPuzzle(payload) {
    if (!payload || !payload.i || !payload.d || !payload.m) throw new Error("INVALID");
    startPuzzle(payload.i, payload.d, decodeText(payload.m), encodePayload(payload));
  }

  async function fileToDataUrl(file) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => resolve(evt.target.result);
      reader.onerror = () => reject(new Error("FILE_READ"));
      reader.readAsDataURL(file);
    });
  }

  async function optimizeImageDataUrl(dataUrl, maxDim, quality) {
    return await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const longSide = Math.max(image.width, image.height);
        const scale = longSide > maxDim ? maxDim / longSide : 1;

        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);

        const optimized = canvas.toDataURL("image/jpeg", quality);
        resolve(optimized);
      };
      image.onerror = () => reject(new Error("IMAGE_DECODE"));
      image.src = dataUrl;
    });
  }

  async function readSelectedImageAsDataUrl() {
    const file = el.imageInput.files && el.imageInput.files[0];
    if (!file) return null;
    const rawDataUrl = await fileToDataUrl(file);
    try {
      return await optimizeImageDataUrl(rawDataUrl, SHARE_IMAGE_MAX_DIM, SHARE_IMAGE_QUALITY);
    } catch {
      return rawDataUrl;
    }
  }

  async function playNow() {
    const imageData = await readSelectedImageAsDataUrl();
    const msg = el.message.value.trim();
    if (!imageData) {
      setStatusKey("status_need", "warn");
      return;
    }

    // Check if offline and trying to use extreme difficulty
    const diffVal = parseInt(el.difficulty.value, 10);
    if (!navigator.onLine && diffVal > 10) {
      window.alert(t("status_offline_diff"));
      return;
    }

    const payload = {
      m: encodeText(msg || t("local_default_message")),
      d: el.difficulty.value,
      i: imageData,
    };
    const packed = encodePayload(payload);
    upsertPackedPuzzle(packed);
    startPuzzle(imageData, el.difficulty.value, msg || t("local_default_message"), packed);
  }

  async function generateLink() {
    const imageData = await readSelectedImageAsDataUrl();
    const msg = el.message.value.trim();
    if (!imageData || !msg) {
      setStatusKey("status_need", "warn");
      return;
    }

    // Check if offline and trying to use extreme difficulty
    const diffVal = parseInt(el.difficulty.value, 10);
    if (!navigator.onLine && diffVal > 10) {
      window.alert(t("status_offline_diff"));
      return;
    }

    setStatusKey("status_encoding");

    const payload = { m: encodeText(msg), d: el.difficulty.value, i: imageData };
    const packed = encodePayload(payload);
    upsertPackedPuzzle(packed);
    state.currentPacked = packed;

    const share = createShareLinkFromPacked(packed);
    setShareLink(share.url, share.modeKey);
    if (share.modeKey === "share_mode_data") {
      setStatusKey("status_url", "ok");
    } else {
      setStatusKey("status_local", "warn");
    }
  }
  async function copyLink() {
    if (!el.shareLink.value) {
      setStatusKey("status_first", "warn");
      return;
    }
    try {
      await navigator.clipboard.writeText(el.shareLink.value);
    } catch {
      el.shareLink.select();
      document.execCommand("copy");
    }
    setStatusKey("status_copied", "ok");
  }

  function openLink() {
    if (!el.shareLink.value) {
      setStatusKey("status_first", "warn");
      return;
    }
    location.href = el.shareLink.value;
  }

  async function shareCurrentPuzzle() {
    if (!state.currentPacked) {
      setStatusKey("status_first", "warn");
      return;
    }

    const share = createShareLinkFromPacked(state.currentPacked);
    setShareLink(share.url, share.modeKey);

    if (navigator.share && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Toi",
          text: t("share_text"),
          url: share.url,
        });
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(share.url);
    } catch {
      el.shareLink.select();
      document.execCommand("copy");
    }
    window.alert(t("status_copied"));
  }

  function payloadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (data) return decodePayload(data);
    const sid = params.get("sid");
    if (sid) {
      const packed = localStorage.getItem(PAYLOAD_PREFIX + sid);
      if (!packed) throw new Error("MISSING");
      return decodePayload(packed);
    }
    return null;
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => { });
    });
  }

  function onResize() {
    if (!state.img || el.gameScreen.hidden) return;
    setupCanvas();
    const pad = state.pieceSize * JIGSAW_HIT_PADDING_RATIO;
    state.pieces.forEach((p) => {
      const col = Math.round(p.sx / state.srcW);
      const row = Math.round(p.sy / state.srcH);
      p.correctX = col * state.pieceSize;
      p.correctY = row * state.pieceSize;
      if (p.solved) {
        p.currentX = p.correctX;
        p.currentY = p.correctY;
      } else {
        p.currentX = clamp(p.currentX, -pad, state.boardSize - state.pieceSize + pad);
        p.currentY = clamp(p.currentY, -pad, state.boardSize - state.pieceSize + pad);
      }
    });
    rebuildPieceSprites();
    requestDraw();
  }

  function bindEvents() {
    el.enterAppBtn.addEventListener("click", enterApp);

    el.imageInput.addEventListener("change", () => {
      const file = el.imageInput.files && el.imageInput.files[0] ? el.imageInput.files[0] : null;
      updateSetupPreview(file);
    });

    el.setupPreviewImage.addEventListener("click", () => {
      if (!el.setupPreviewImage.hidden && el.setupPreviewImage.src) openLightbox(el.setupPreviewImage.src);
    });

    el.playNowBtn.addEventListener("click", () => {
      playNow().catch(() => setStatusKey("status_error_generate", "warn"));
    });

    el.generateBtn.addEventListener("click", () => {
      generateLink().catch(() => setStatusKey("status_error_generate", "warn"));
    });

    el.copyBtn.addEventListener("click", copyLink);
    el.openBtn.addEventListener("click", openLink);
    el.toggleMyPuzzlesBtn.addEventListener("click", toggleMyPuzzlesSection);
    el.myPuzzlesList.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-action][data-pid]");
      if (!btn) return;
      handleLibraryAction(btn.dataset.action, btn.dataset.pid);
    });

    if (el.galleryList) {
      el.galleryList.addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-action='play-gallery']");
        if (!btn) return;
        handleGalleryAction(btn.dataset.gid);
      });
    }

    el.referenceImage.addEventListener("click", () => {
      if (el.referenceImage.src) openLightbox(el.referenceImage.src);
    });
    el.closeReferenceBtn.addEventListener("click", closeLightbox);
    el.lightbox.addEventListener("click", (e) => {
      if (e.target === el.lightbox) closeLightbox();
    });

    el.settingsBtn.addEventListener("click", openSettings);
    el.closeSettingsBtn.addEventListener("click", closeSettings);
    el.closeSettingsTop.addEventListener("click", closeSettings);
    el.settingsModal.addEventListener("click", (e) => {
      if (e.target === el.settingsModal) closeSettings();
    });
    el.saveSettingsBtn.addEventListener("click", saveSettingsFromForm);

    el.installBtn.addEventListener("click", () => {
      installApp().catch(() => setStatusKey("status_install_help", "warn"));
    });

    el.hintBtn.addEventListener("click", useHint);
    el.shareVictoryBtn.addEventListener("click", () => {
      shareCurrentPuzzle().catch(() => setStatusKey("status_error_generate", "warn"));
    });
    el.restartBtn.addEventListener("click", () => { location.href = window.location.pathname; });

    if (el.backToSetupBtn) {
      el.backToSetupBtn.addEventListener("click", () => {
        el.gameScreen.hidden = true;
        el.setupScreen.hidden = false;
        state.active = false;
        state.selected = null;
        stopTimerLoop();
        if (state.raf) {
          cancelAnimationFrame(state.raf);
          state.raf = 0;
        }
        state.drawQueued = false;
        invalidateDragLayer();
      });
    }

    el.canvas.addEventListener("pointerdown", onPointerDown);
    el.canvas.addEventListener("pointermove", onPointerMove);
    el.canvas.addEventListener("pointerup", onPointerUp);
    el.canvas.addEventListener("pointercancel", onPointerUp);
    el.canvas.addEventListener("lostpointercapture", () => {
      state.selected = null;
      requestDraw();
    });

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !el.welcomeScreen.hidden) {
        e.preventDefault();
        enterApp();
        return;
      }
      if (e.key === "Escape") {
        closeSettings();
        closeLightbox();
      }
    });

    window.addEventListener("online", updateConnectionBanner);
    window.addEventListener("offline", updateConnectionBanner);

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      state.deferredInstallPrompt = e;
      updateInstallBtn();
    });

    window.addEventListener("appinstalled", () => {
      state.deferredInstallPrompt = null;
      updateInstallBtn();
      setStatusKey("status_installed", "ok");
    });

    const dm = window.matchMedia("(display-mode: standalone)");
    if (dm && typeof dm.addEventListener === "function") dm.addEventListener("change", updateInstallBtn);

    window.addEventListener("beforeunload", () => {
      stopTimerLoop();
      if (state.setupPreviewUrl) URL.revokeObjectURL(state.setupPreviewUrl);
    });
  }

  function boot() {
    state.settings = loadSettings();
    state.hintsRemaining = loadHintBank();
    applySettings();
    registerSW();
    bindEvents();
    clearSetupPreview();
    updateInstallBtn();
    updateConnectionBanner();
    closeSettings();
    closeLightbox();
    el.victoryModal.hidden = true;
    updateHintUI();
    updateProgressUI();
    renderStaticGallery();

    try {
      const payload = payloadFromUrl();
      if (payload) {
        enterApp();
        loadPuzzle(payload);
      }
    } catch {
      window.alert(t("status_invalid_link"));
      location.href = window.location.pathname;
    }
  }

  boot();
})();
