Array.prototype.indexOf = Array.prototype.indexOf || function (value) {
    for (var i = 0, length = this.length; i < length; ++i)
        if (this[i] === value) return i;
    return -1;
};
(function fixMobileScaling() {
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.head.appendChild(meta);
})();
window.originalMathRandom = Math.random;
window.matchRandomSeed = 12345;

var getRand = function (max) { return (max === 0) ? 0 : Math.floor((Math.random() * (max || 100))); };
var rand = function (min, max) { return min + Math.floor((Math.random() * (max - min))); };

function seededRandom() {
    var t = window.matchRandomSeed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, function(tag) {
        var charsToReplace = {
            '&': '&amp;',
            '<': '<',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        };
        return charsToReplace[tag] || tag;
    });
}
var getRand = function (max) { return (max === 0) ? 0 : Math.floor((seededRandom() * (max || 100))); };
var rand = function (min, max) { return min + Math.floor((seededRandom() * (max - min))); };

var StageParams = function (key, bg0YOffset, bg1YOffset) {
    this.Key = key; this.Name = key;
    this.Bg0YOffset = bg0YOffset || -21;
    this.Bg1YOffset = bg1YOffset || -41;
    this.Bg0Img = "images/misc/stage/" + this.Key + ".back.png";
    this.Bg1Img = "images/misc/stage/" + this.Key + ".front.png";
};

var stages_ = {};
var val = STAGE.MAX_STAGEX - 1152;
stages_["ryu"] = new StageParams("ryu");
stages_["ken"] = new StageParams("ken");
stages_["guy"] = new StageParams("guy");
stages_["chunli"] = new StageParams("chunli");
stages_["dramatic_battle"] = new StageParams("mbison");
stages_["mbison"] = new StageParams("mbison");
stages_["akuma"] = new StageParams("akuma");
stages_["sodom"] = new StageParams("sodom");
stages_["sagat"] = new StageParams("sagat");
stages_["rose"] = new StageParams("rose");

function ApplyFlip(element, applied) {
    if (applied === undefined) {
        if ((element.className.indexOf(" flipped") === -1)) element.className += " flipped";
        else element.className = element.className.replace(" flipped", "");
    } else if (!!applied) { element.className += " flipped"; } else { element.className = element.className.replace(" flipped", ""); }
}
function AutoApplyFlip(element, applied) {
    if (!!applied && (element.className.indexOf(" flipped") === -1)) { element.className += " flipped"; }
    else if (!applied && (element.className.indexOf(" flipped") !== -1)) { element.className = element.className.replace(" flipped", ""); }
}
function IsFlipped(element) { return !!element && element.className.indexOf(" flipped") !== -1; }
function Alert(text) {} function AlertError(text) {}

function getUserByIndex(index) {
    switch(index) {
        case 1: return window.user1_; case 2: return window.user2_; case 3: return window.user3_;
        case 4: return window.user4_; case 5: return window.user5_; case 6: return window.user6_;
        case 7: return window.user7_; case 8: return window.user8_; default: return null;
    }
}

function getPlayerByUserIndex(index) {
    var user = getUserByIndex(index);
    if (!user) return null;
    var match = game_.getMatch();
    if (!match) return null;
    
    var tA = match.getTeamA();
    if (tA && typeof tA.getPlayers === 'function') {
        var players = tA.getPlayers();
        if (players) {
            for (var i = 0; i < players.length; i++) {
                if (players[i] && players[i].User === user) return players[i];
            }
        }
    }
    var tB = match.getTeamB();
    if (tB && typeof tB.getPlayers === 'function') {
        var players = tB.getPlayers();
        if (players) {
            for (var i = 0; i < players.length; i++) {
                if (players[i] && players[i].User === user) return players[i];
            }
        }
    }
    return null;
}

function GetCharacterEnum(name) {
    switch(name) {
        case "ryu": return CHARACTERS.RYU; case "ken": return CHARACTERS.KEN; case "sagat": return CHARACTERS.SAGAT;
    case "homelander": return CHARACTERS.HOMELANDER;
case "albertwesker": return CHARACTERS.ALBERTWESKER;

        case "mbison": return CHARACTERS.MBISON; case "akuma": return CHARACTERS.AKUMA; case "chunli": return CHARACTERS.CHUNLI;
        case "guy": return CHARACTERS.GUY; case "sodom": return CHARACTERS.SODOM; default: return CHARACTERS.RYU;
    }
}

function getMyUsername() {
    var u = localStorage.getItem('sfa_username');
    if (!u || u.trim() === "") {
        u = "Player";
        localStorage.setItem('sfa_username', u);
    }
    u = u.trim();

    if (window.networkManager_ && networkManager_.leaderboardData) {
        var lower = u.toLowerCase();
        for (var existingName in networkManager_.leaderboardData) {
            if (existingName.toLowerCase() === lower) {
                return existingName;  
            }
        }
    }
    return u;
}

var defaultKeys = { Right: 39, Up: 38, Left: 37, Down: 40, P1: 65, P2: 83, P3: 68, K1: 90, K2: 88, K3: 67, Start: 13 };
var defaultKeyNames = { Right: "RIGHT", Up: "UP", Left: "LEFT", Down: "DOWN", P1: "A", P2: "S", P3: "D", K1: "Z", K2: "X", K3: "C", Start: "ENTER" };

window.customKeys = JSON.parse(localStorage.getItem('sfa_custom_keys')) || defaultKeys;
window.customKeyNames = JSON.parse(localStorage.getItem('sfa_custom_keynames')) || defaultKeyNames;
var defaultPadBindings = {
    Up: 12, Down: 13, Left: 14, Right: 15,
    P1: 2,  P2: 3,  P3: 5,   // Square, Triangle, R1
    K1: 0,  K2: 1,  K3: 7,   // Cross, Circle, R2
    Start: 9, Coin: 8
};

var padButtonLabels = {
    0: "CROSS / A", 1: "CIRCLE / B", 2: "SQUARE / X", 3: "TRIANGLE / Y",
    4: "L1 / LB", 5: "R1 / RB", 6: "L2 / LT", 7: "R2 / RT",
    8: "SELECT / SHARE", 9: "START / OPTIONS", 10: "L3", 11: "R3",
    12: "D-PAD UP", 13: "D-PAD DOWN", 14: "D-PAD LEFT", 15: "D-PAD RIGHT"
};

window.customPadKeys = JSON.parse(localStorage.getItem('sfa_custom_pad_keys')) || defaultPadBindings;

// =========================================================================
// ACOUSTIC TACTILE UI SOUND ENGINE
// =========================================================================
var acousticAudioCtx = null;

function ensureAcousticContext() {
    if (!acousticAudioCtx) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            acousticAudioCtx = new AudioCtx();
        }
    }
    if (acousticAudioCtx && acousticAudioCtx.state === 'suspended') {
        acousticAudioCtx.resume();
    }
    return acousticAudioCtx;
}

window.playAcousticClick = function() {
    try {
        var ctx = ensureAcousticContext();
        if (!ctx) return;
        var t = ctx.currentTime;

        var osc = ctx.createOscillator();
        var oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(240, t);
        osc.frequency.exponentialRampToValueAtTime(55, t + 0.09);

        oscGain.gain.setValueAtTime(0.85, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);

        var bufferSize = Math.floor(ctx.sampleRate * 0.025);
        var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        var noise = ctx.createBufferSource();
        noise.buffer = buffer;

        var filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1700, t);
        filter.Q.setValueAtTime(1.0, t);

        var noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.45, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(t);
    } catch(e) {}
};

window.playAcousticLock = function() {
    try {
        var ctx = ensureAcousticContext();
        if (!ctx) return;
        var t = ctx.currentTime;

        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(35, t + 0.28);

        gain.gain.setValueAtTime(0.95, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.28);
    } catch(e) {}
};

window.playAcousticCancel = function() {
    try {
        var ctx = ensureAcousticContext();
        if (!ctx) return;
        var t = ctx.currentTime;

        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.08);

        gain.gain.setValueAtTime(0.65, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.08);
    } catch(e) {}
};

// =========================================================================
// UNIVERSAL AUTO-DELEGATION
// =========================================================================
document.addEventListener('pointerdown', function(e) {
    ensureAcousticContext();

    var target = e.target.closest(`
        button,
        .btn-arcade,
        .cancel-btn-arcade,
        .keybind-btn,
        .btn-invite,
        #btn-add-friend,
        #btn-emoji,
        .emoji-item,
        .sfv-roster-card,
        .vs-slot-card,
        .vs-roster-card,
        .friend-row,
        #ui-profile-btn,
        .lobby-stat,
        .lobby-player-row,
        .hint-close-btn,
        .lb-arrow-btn,
        img[onclick*="setMyAvatar"]
    `);

    if (!target) return;

    var text = (target.innerText || "").toUpperCase();

    if (
        target.classList.contains('cancel-btn-arcade') ||
        target.classList.contains('hint-close-btn') ||
        text.includes('CANCEL') ||
        text.includes('CLOSE') ||
        text.includes('DECLINE') ||
        text.includes('X ')
    ) {
        window.playAcousticCancel();
    }
    else {
        window.playAcousticClick();
    }
}, true);


// ==========================================
// SFA BACKGROUND MUSIC CONTROLLER
// ==========================================
var sfaBgMusic = document.getElementById('sfaBgMusic');

var isMusicMuted = localStorage.getItem('sfa_music_muted') !== 'false';

function playMenuMusic() {
    if (isMusicMuted) return;
    if (!sfaBgMusic) sfaBgMusic = document.getElementById('sfaBgMusic');
    if (!sfaBgMusic) return;

    var isStageVisible = document.getElementById("pnlStage") && document.getElementById("pnlStage").style.opacity === "1";

    if (!isStageVisible) {
        sfaBgMusic.volume = 0.4;
        sfaBgMusic.play().catch(function() {});
    }
}

function stopMenuMusic() {
    if (!sfaBgMusic) sfaBgMusic = document.getElementById('sfaBgMusic');
    if (!sfaBgMusic) return;
    sfaBgMusic.pause();
    sfaBgMusic.currentTime = 0;
}

window.toggleMenuMusicSetting = function() {
    isMusicMuted = !isMusicMuted;
    localStorage.setItem('sfa_music_muted', isMusicMuted ? 'true' : 'false');

    var btn = document.getElementById('btn-toggle-bgm');
    if (btn) {
        btn.innerText = isMusicMuted ? "OFF" : "ON";
        btn.style.color = isMusicMuted ? "#ff2a4b" : "#0f0";
        btn.style.borderColor = isMusicMuted ? "#ff2a4b" : "#0f0";
    }

    if (isMusicMuted) {
        stopMenuMusic();
    } else {
        playMenuMusic();
    }
};
window.addEventListener('click', function() { playMenuMusic(); }, { once: true });
window.addEventListener('touchstart', function() { playMenuMusic(); }, { once: true });
window.addEventListener('keydown', function() { playMenuMusic(); }, { once: true });

function updateLocalControlsMap() {
    window.LOCAL_CONTROLS = { 70: "Turn", 17: "Coin" };
    for (var action in window.customKeys) {
        window.LOCAL_CONTROLS[window.customKeys[action]] = action;
    }
}
updateLocalControlsMap();

(function injectStyles() {
    var style = document.createElement('style');
    style.innerHTML = `
        :root {
            --sf-black: #050505; --sf-dark-grey: #111111;
            --sf-red: #ff0000; --sf-dark-red: #9e0000;
            --sf-orange: #ff7300; --sf-blue: #0088ff;
            --text-main: #ffffff; --text-muted: #aaaaaa;
        }
        body, html { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; background: var(--sf-black); font-family: 'Roboto Condensed', sans-serif; }
        #pnlStatus, #spnState, #spnMsg, .loading, .show-debug-modal, .state { display: none !important; }
        #pnlStage, #pnlStage *, img { image-rendering: pixelated !important; image-rendering: crisp-edges !important; }
        #pnlStage { transition: opacity 0.3s ease; opacity: 0; overflow: hidden; position: absolute; }

    .modern-menu {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(ellipse at 50% 50%, #9e0018 0%, #5e000e 35%, #2b0006 65%, #080002 95%) !important;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 10000; overflow: hidden;
        }

    
    
        .scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2)); background-size: 100% 4px; z-index: 9999; pointer-events: none; }
        .vignette { position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,0.9); z-index: 9998; pointer-events: none; }
        .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('hero-bg.png'); background-size: cover; background-position: center; animation: breathe 8s ease-in-out infinite alternate; filter: contrast(1.1) saturate(1.2); z-index: 1; }
        
      /* Lightweight, zero-lag sparks */
.sparks {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    overflow: hidden;
}

.spark {
    position: absolute;
    bottom: -10px;
    width: 3px;
    height: 3px;
    background: #ffaa00;
    border-radius: 50%;
    /* Replaced heavy multi-blur shadows with a single sharp 1px glow */
    box-shadow: 0 0 4px #ff3300;
    animation: rise linear infinite;
    opacity: 0;
    will-change: transform, opacity;
}

/* Reduced to only 3 staggered sparks */
.spark:nth-child(1) { left: 25%; animation-duration: 4.5s; animation-delay: 0s; }
.spark:nth-child(2) { left: 55%; animation-duration: 3.8s; animation-delay: 1.5s; width: 4px; height: 4px; }
.spark:nth-child(3) { left: 80%; animation-duration: 5.0s; animation-delay: 2.8s; }

/* Pure GPU transform using 3D acceleration */
@keyframes rise {
    0% {
        transform: translate3d(0, 0, 0) scale(1);
        opacity: 0;
    }
    15% {
        opacity: 0.9;
    }
    85% {
        opacity: 0.7;
    }
    100% {
        transform: translate3d(20px, -100vh, 0) scale(0.3);
        opacity: 0;
    }
}

        /* --- PORTRAIT WARNING OVERLAY --- */
        #portrait-warning {
            display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(5px); z-index: 999999;
            flex-direction: column; align-items: center; justify-content: center; text-align: center;
        }
        .rotate-icon {
            width: 40px; height: 70px; border: 4px solid var(--sf-orange); border-radius: 8px;
            margin-bottom: 20px; position: relative; animation: rotatePhone 2s infinite ease-in-out alternate;
            box-shadow: 0 0 15px var(--sf-red), inset 0 0 10px var(--sf-red);
        }
        .rotate-icon::after {
            content: ''; position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
            width: 8px; height: 8px; background: var(--sf-orange); border-radius: 50%;
        }
        #portrait-warning span {
            font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: #fff;
            text-shadow: 2px 2px 0px var(--sf-red); letter-spacing: 2px; padding: 0 20px;
        }
        @media screen and (orientation: portrait) and (max-width: 900px) {
            #portrait-warning { display: flex !important; }
        }

        .menu-logo {
            width: 320px; max-width: 90vw; margin-bottom: 25px;
            filter: drop-shadow(0 10px 15px rgba(0,0,0,1)); z-index: 10;
            opacity: 0; animation: dropIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .menu-panel {
            position: relative; background: rgba(10, 10, 10, 0.9); border: 2px solid var(--sf-red);
            box-shadow: 0 0 30px rgba(255,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.8);
            padding: 20px; width: 240px; max-width: 90vw; display: flex; flex-direction: column; align-items: center;
            z-index: 10; border-radius: 8px; backdrop-filter: blur(4px); box-sizing: border-box;
            opacity: 0; animation: fadeInUp 0.5s ease forwards 0.2s;
        }

        .username-arcade-container {
            width: 100%; display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,0,0,0.6); padding: 8px 10px !important; border: 1px solid var(--sf-red);
            margin-bottom: 15px !important; box-sizing: border-box;
        }
        .username-arcade-container span { font-family: 'Bebas Neue', sans-serif !important; font-size: 16px !important; color: #fff; letter-spacing: 1px; }
        .username-arcade-container input {
            background: transparent; border: none; color: var(--sf-orange);
            font-family: 'Bebas Neue', sans-serif !important; font-size: 16px !important; outline: none; text-align: right; width: 80px;
            text-shadow: 0 0 5px var(--sf-orange); padding: 0 !important; margin: 0 !important;
        }

        .btn-arcade {
            position: relative; width: 100% !important; padding: 10px 0 !important; margin: 5px 0 !important;
            font-family: 'Bebas Neue', 'Impact', sans-serif !important; font-size: 18px !important; color: #fff !important;
            background: linear-gradient(90deg, var(--sf-dark-red), var(--sf-red)) !important;
            border: 2px solid #fff !important; border-radius: 3px !important; text-transform: uppercase; letter-spacing: 1px;
            box-shadow: 0 0 10px rgba(255,0,0,0.5) !important; cursor: pointer; overflow: hidden; transition: all 0.2s ease; box-sizing: border-box;
            white-space: nowrap !important;
        }
        .btn-arcade::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
            transform: skewX(-25deg); transition: 0.5s;
        }
        .btn-arcade:hover::before { left: 200%; }
        .btn-arcade:hover {
            transform: scale(1.02); background: linear-gradient(90deg, var(--sf-red), var(--sf-orange)) !important;
            border-color: var(--sf-orange) !important; box-shadow: 0 0 20px var(--sf-orange) !important; text-shadow: 0 0 5px #fff !important;
        }
        .btn-arcade:active { transform: scale(0.98); }
        .btn-play { animation: pulseGlow 2s infinite alternate; }
        
        @keyframes dropIn { 0% { transform: translateY(-50px) scale(0.9); opacity: 0; filter: blur(5px); } 100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0px); } }

        /* ===================================================
           SFV DARK "V" CHARACTER SELECT (FULL SCREEN FIXED)
           =================================================== */
        #customCharSelectUI {
            position: fixed !important;
            top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
            width: 100vw !important; height: 100vh !important;
            transform: none !important; margin: 0 !important; padding: 0 !important;
            background: #060608 !important; border: none !important; box-shadow: none !important;
            z-index: 10001 !important; display: none; box-sizing: border-box; overflow: hidden;
            font-family: 'Bebas Neue', sans-serif;
        }

        body:has(#customCharSelectUI[style*="block"]) #mobile-gamepad,
        #customCharSelectUI.active ~ #mobile-gamepad { display: none !important; }

       /* =========================================================
           EXPLOSIVE RED TOURNAMENT ARENA BACKGROUND
           ========================================================= */
        .sfv-cs-screen {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: space-between;
            align-items: center;
            /* Deep crimson gradient fading to abyss black edges */
            background: radial-gradient(ellipse at 50% 50%, #300007 0%, #150003 45%, #050001 100%) !important;
            overflow: hidden;
            box-sizing: border-box;
        }

        /* Explosive Shockwave Blast & Energy Rays */
        .sfv-cs-screen::before {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            width: 140vw; height: 140vh;
            transform: translate(-50%, -50%);
            background:
                /* Fiery explosive core */
                radial-gradient(ellipse at 50% 50%, rgba(255, 20, 40, 0.45) 0%, rgba(200, 0, 25, 0.25) 30%, rgba(90, 0, 15, 0.1) 55%, transparent 75%),
                /* High-stakes tournament shockwave bursts radiating outward */
                repeating-conic-gradient(from 0deg at 50% 50%, rgba(255, 30, 60, 0.08) 0deg 8deg, transparent 8deg 16deg);
            mix-blend-mode: screen;
            animation: explosiveRedBlast 5s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 1;
        }

        /* Ambient side glows that blend the fighters into the explosion */
        .sfv-ambient-1p {
            position: absolute; top: 0; left: 0; width: 45%; height: 100%;
            background: radial-gradient(circle at 15% 65%, rgba(0, 229, 255, 0.14) 0%, transparent 65%);
            pointer-events: none; z-index: 1;
        }
        .sfv-ambient-2p {
            position: absolute; top: 0; right: 0; width: 45%; height: 100%;
            background: radial-gradient(circle at 85% 65%, rgba(255, 30, 60, 0.18) 0%, transparent 65%);
            pointer-events: none; z-index: 1;
        }

        /* Hardware-accelerated explosive blast pulse (60fps locked) */
        @keyframes explosiveRedBlast {
            0% {
                transform: translate(-50%, -50%) scale(0.92);
                opacity: 0.65;
                filter: brightness(0.9) contrast(1.1);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.08);
                opacity: 1;
                filter: brightness(1.3) contrast(1.3);
            }
            100% {
                transform: translate(-50%, -50%) scale(0.95);
                opacity: 0.75;
                filter: brightness(1.0) contrast(1.15);
            }
        }

        .sfv-ambient-1p {
            position: absolute; top: 0; left: 0; width: 40%; height: 100%;
            background: radial-gradient(circle at 20% 60%, rgba(0, 229, 255, 0.12) 0%, transparent 70%);
            pointer-events: none; z-index: 1;
        }
        .sfv-ambient-2p {
            position: absolute; top: 0; right: 0; width: 40%; height: 100%;
            background: radial-gradient(circle at 80% 60%, rgba(255, 30, 66, 0.12) 0%, transparent 70%);
            pointer-events: none; z-index: 1;
        }

        /* --- FIGHTER SIDE SHOWCASES --- */
        .sfv-fighter-showcase {
            position: relative; flex: 1; height: 100%;
            display: flex; flex-direction: column; justify-content: flex-end;
            padding: 25px 45px; box-sizing: border-box; z-index: 2; overflow: hidden;
        }

        /* 1V1 Hero Portrait */
        .sfv-showcase-art {
            position: absolute; bottom: 80px; height: 52vh; max-height: 380px; max-width: 32vw;
            object-fit: contain; image-rendering: pixelated !important;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.95)); pointer-events: none;
            transition: opacity 0.15s ease;
        }
        .sfv-showcase-p1 .sfv-showcase-art { left: 45px; }
        .sfv-showcase-p2 .sfv-showcase-art { right: 45px; transform: scaleX(-1); }

        .sfv-fighter-name {
            font-size: 3.4rem; line-height: 0.9; color: #fff; letter-spacing: 3px;
            text-transform: uppercase; text-shadow: 3px 3px 0 #000; margin: 0 0 8px 0; z-index: 3;
        }
        .sfv-showcase-p1 .sfv-fighter-name { align-self: flex-start; text-align: left; }
        .sfv-showcase-p2 .sfv-fighter-name { align-self: flex-end; text-align: right; }

        .sfv-player-pill {
            display: inline-flex !important; width: fit-content !important;
            align-items: center; gap: 10px; background: rgba(10, 10, 12, 0.9);
            border: 1px solid #333; padding: 4px 14px; border-radius: 4px; z-index: 3;
            box-shadow: 0 4px 10px rgba(0,0,0,0.8);
        }
        .sfv-showcase-p1 .sfv-player-pill { align-self: flex-start; }
        .sfv-showcase-p2 .sfv-player-pill { align-self: flex-end; }
.sfv-plays-count {
            color: #888;
            font-size: 0.8rem;
            font-weight: bold;
            margin: 0 6px;
            letter-spacing: 0.5px;
        }
        .sfv-pill-tag { font-size: 0.9rem; font-weight: bold; padding: 1px 6px; border-radius: 2px; letter-spacing: 1px; }
        .sfv-tag-1p { background: #00e5ff; color: #000; }
        .sfv-tag-2p { background: #ff1e42; color: #fff; }
        .sfv-player-name { font-family: 'Roboto Condensed', sans-serif; color: #ccc; font-size: 0.95rem; letter-spacing: 1px; text-transform: uppercase; }

        /* --- 2V2 & 3V3 TEAM ROSTER PANELS --- */
        .sfv-fighter-showcase.sfv-mode-team {
            justify-content: center !important;
            padding: 15px 40px !important;
        }
        .sfv-team-slots {
            display: flex; flex-direction: column; gap: 16px;
            width: 100%; max-width: 380px; z-index: 3;
        }
.sfv-team-slots-p2 {
    margin-left: auto;
    align-items: flex-end;
}
        .sfv-team-slot-card {
            position: relative; display: flex; align-items: center; width: 100%;
            background: linear-gradient(90deg, rgba(16,16,22,0.95), rgba(8,8,12,0.98));
            border: 2px solid #333; border-left: 5px solid #00e5ff;
            padding: 8px 14px; border-radius: 4px; box-shadow: 0 5px 20px rgba(0,0,0,0.85);
            gap: 16px; box-sizing: border-box; transform: skewX(-6deg); transition: all 0.2s ease;
        }
        .sfv-team-slots-p2 .sfv-team-slot-card {
            border-left: 2px solid #333; border-right: 5px solid #ff1e42;
            flex-direction: row-reverse; text-align: right; transform: skewX(6deg);
            background: linear-gradient(270deg, rgba(16,16,22,0.95), rgba(8,8,12,0.98));
        }
        .sfv-slot-thumb {
            width: 72px; height: 72px; background: #000; border: 2px solid #444;
            border-radius: 4px; object-fit: cover; object-position: center 20%;
            image-rendering: pixelated; filter: grayscale(30%); transition: all 0.2s ease;
        }
        .sfv-team-slot-card:hover .sfv-slot-thumb,
        .sfv-team-slot-card.locked .sfv-slot-thumb { filter: grayscale(0%); border-color: #fff; }
        .sfv-slot-details { display: flex; flex-direction: column; justify-content: center; flex: 1; transform: skewX(6deg); }
        .sfv-team-slots-p2 .sfv-slot-details { transform: skewX(-6deg); }
        .sfv-slot-fighter { font-size: 2.2rem; line-height: 0.95; color: #fff; letter-spacing: 2px; text-transform: uppercase; text-shadow: 2px 2px 0 #000; margin-bottom: 4px; }
        .sfv-slot-user { font-family: 'Roboto Condensed', sans-serif; font-size: 1rem; color: #ccc; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px; }
        .sfv-team-slots-p2 .sfv-slot-user { justify-content: flex-end; }
        .sfv-team-slot-card.locked { border-color: #00e5ff; box-shadow: 0 0 20px rgba(0, 229, 255, 0.45); }
        .sfv-team-slots-p2 .sfv-team-slot-card.locked { border-color: #ff1e42; box-shadow: 0 0 20px rgba(255, 30, 66, 0.45); }

        .sfv-team-count-3 .sfv-team-slot-card { padding: 6px 12px; gap: 12px; }
        .sfv-team-count-3 .sfv-slot-thumb { width: 58px; height: 58px; }
        .sfv-team-count-3 .sfv-slot-fighter { font-size: 1.8rem; }

        /* --- RED FIGHTING-GAME ARCADE CENTER WEDGE --- */
        .sfv-center-wedge {
            position: relative; width: 310px; height: 100%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 10; padding: 10px 0; box-sizing: border-box;
            background: linear-gradient(to bottom, rgba(12,12,16,0.96) 0%, rgba(18,18,24,0.98) 50%, rgba(12,12,16,0.96) 100%);
            border-left: 2px solid var(--sf-red) !important;
            border-right: 2px solid var(--sf-red) !important;
            box-shadow: 0 0 35px rgba(255, 0, 0, 0.35), inset 0 0 25px rgba(0, 0, 0, 0.9);
        }

        /* --- GLOWING RED "V" SHAPE DIVIDER LINES --- */
        .sfv-v-lines {
            position: absolute; top: 0; left: 50%; width: 340px; height: 100%;
            transform: translateX(-50%); pointer-events: none; z-index: 8;
        }
        .sfv-v-line-left {
            position: absolute; top: 0; left: 0; width: 2px; height: 100%;
            background: linear-gradient(to bottom, #ff0033 0%, #ff4400 75%, transparent 100%);
            box-shadow: 0 0 12px #ff0033, 0 0 25px rgba(255, 0, 50, 0.6);
            transform-origin: top center; transform: rotate(-7deg);
        }
        .sfv-v-line-right {
            position: absolute; top: 0; right: 0; width: 2px; height: 100%;
            background: linear-gradient(to bottom, #ff0033 0%, #ff4400 75%, transparent 100%);
            box-shadow: 0 0 12px #ff0033, 0 0 25px rgba(255, 0, 50, 0.6);
            transform-origin: top center; transform: rotate(7deg);
        }

        /* Header Accent Lines */
        .sfv-wedge-header { text-align: center; margin-bottom: 10px; width: 100%; }
        .sfv-match-badge {
            display: inline-flex; align-items: center; gap: 6px; background: rgba(0, 0, 0, 0.9);
            border: 1px solid var(--sf-red); padding: 3px 14px; border-radius: 3px;
            box-shadow: 0 0 12px rgba(255, 0, 0, 0.5); margin-bottom: 6px;
        }
        .sfv-match-badge span { color: var(--sf-orange); font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; }

        .sfv-header-lines {
            position: relative; display: flex; align-items: center; justify-content: center; width: 100%; gap: 10px; margin: 4px 0;
        }
        .sfv-header-lines::before, .sfv-header-lines::after {
            content: ''; flex: 1; height: 2px; background: linear-gradient(to right, transparent, var(--sf-red)); box-shadow: 0 0 10px var(--sf-red);
        }
        .sfv-header-lines::after { background: linear-gradient(to left, transparent, var(--sf-red)); }
        .sfv-title-text { color: #fff; font-size: 1.3rem; letter-spacing: 3px; margin: 0; line-height: 1; }
        .sfv-vs-text { color: #ff2a4b; font-size: 1.3rem; letter-spacing: 2px; margin-top: 3px; font-style: italic; }

        /* Roster Box & Square Cards */
        .sfv-v-roster-box { display: flex; gap: 12px; justify-content: center; align-items: flex-start; margin-bottom: 12px; }
        .sfv-col-left { display: flex; flex-direction: column; gap: 6px; transform: skewX(-5deg); }
        .sfv-col-right { display: flex; flex-direction: column; gap: 6px; transform: skewX(5deg); }

        .sfv-roster-card {
            position: relative; width: 68px; height: 68px; background: #0f0f12;
            border: 2px solid #333; border-radius: 4px; overflow: hidden; cursor: pointer; transition: all 0.15s ease;
        }
        .sfv-roster-card img {
            width: 100%; height: 100%; object-fit: cover; object-position: center 20%;
            image-rendering: pixelated; filter: grayscale(35%); transition: 0.15s ease;
        }
        .sfv-col-left .sfv-roster-card img { transform: skewX(5deg); }
        .sfv-col-right .sfv-roster-card img { transform: skewX(-5deg); }
        .sfv-roster-card:hover { border-color: #00e5ff; box-shadow: 0 0 12px rgba(0, 229, 255, 0.7); transform: scale(1.06); z-index: 5; }
        .sfv-roster-card:hover img { filter: grayscale(0%); }
        .sfv-roster-card.locked-1p { border-color: #00e5ff !important; box-shadow: 0 0 15px #00e5ff !important; }
        .sfv-roster-card.locked-2p { border-color: #ff1e42 !important; box-shadow: 0 0 15px #ff1e42 !important; }

        #charSelectStatus {
            font-size: 0.9rem; color: #fff; letter-spacing: 1px; background: rgba(0,0,0,0.85);
            border: 1px solid var(--sf-red); padding: 4px 12px; margin-bottom: 8px;
            text-align: center; max-width: 90%; white-space: nowrap;
        }

        @keyframes breathe { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }
        @keyframes slam { 0% { transform: scale(4); opacity: 0; filter: blur(10px); } 80% { transform: scale(0.9); opacity: 1; filter: blur(0px); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fadeInUp { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 15px var(--sf-red); } 100% { box-shadow: 0 0 35px var(--sf-red), 0 0 15px var(--sf-orange); } }
        @keyframes rise { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-100vh) scale(0); opacity: 0; } }

       #custom-loader {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            z-index: 20000;
            display: none; flex-direction: column; align-items: center; justify-content: center;
            color: var(--sf-orange); font-family: 'Bebas Neue', sans-serif; text-shadow: 0 0 15px var(--sf-red);
            /* Smooth background fade */
            animation: popupFadeIn 0.2s ease-out;
        }

        .search-popup-box {
            background: transparent; border: none; box-shadow: none;
            padding: 40px 60px; display: flex; flex-direction: column; align-items: center; text-align: center;
            /* Smooth upward glide & settle */
            animation: popupSlideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 100% lightweight animations (no blur, zero lag) */
        @keyframes popupFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        @keyframes popupSlideIn {
            from { opacity: 0; transform: translateY(18px) scale(0.94); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .arcade-meter-bg {
            width: 280px; height: 24px; background: rgba(0, 0, 0, 0.8); border: 3px solid #fff;
            position: relative; margin-bottom: 25px; box-shadow: 0 0 15px var(--sf-red); transform: skewX(-15deg);
        }
        .arcade-meter-fill {
            height: 100%; background: linear-gradient(90deg, #F3C300, var(--sf-orange), var(--sf-red));
            box-shadow: inset 0 0 8px rgba(255,255,255,0.8); animation: chargeMeter 1.5s infinite ease-in-out;
        }
        @keyframes chargeMeter {
            0% { width: 0%; opacity: 1; filter: brightness(1); }
            80% { width: 100%; opacity: 1; filter: brightness(1.5); box-shadow: 0 0 20px var(--sf-orange); }
            90% { width: 100%; opacity: 0; }
            100% { width: 0%; opacity: 0; }
        }

        .cancel-btn-arcade {
            padding: 8px 30px; font-size: 20px; background: rgba(0,0,0,0.6); color: #fff;
            border: 2px solid var(--sf-red); cursor: pointer; font-family: 'Bebas Neue', sans-serif;
            transition: 0.2s; transform: skewX(-15deg); letter-spacing: 1px;
        }
        .cancel-btn-arcade:hover { background: var(--sf-red); box-shadow: 0 0 15px var(--sf-red); transform: skewX(-15deg) scale(1.05); }

        .fighter-slots-container { display: flex; gap: 12px; margin-bottom: 20px; transform: skewX(-15deg); }
        .fighter-slot {
            width: 35px; height: 35px; background: rgba(0, 0, 0, 0.8); border: 2px solid #555;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.9); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;
        }
        .fighter-slot.filled {
            background: linear-gradient(135deg, var(--sf-orange), var(--sf-red)); border-color: #fff;
            box-shadow: 0 0 15px var(--sf-orange), inset 0 0 8px #fff; animation: slotPulse 0.8s infinite alternate;
        }
        .fighter-slot.filled::after { content: ''; width: 15px; height: 15px; background: #fff; border-radius: 50%; box-shadow: 0 0 5px #fff; }
        @keyframes slotPulse { 0% { filter: brightness(1); } 100% { filter: brightness(1.4); } }

        .loader-text { animation: pulse 0.8s infinite alternate; }
        @keyframes pulse { 0% { opacity: 0.2; } 100% { opacity: 1; } }

/* Rounded Ping & Discord Buttons */
        #ui-ping {
            position: fixed; top: 15px; right: 20px; color: #0f0;
            font-family: 'Courier New', monospace; font-size: 16px; font-weight: bold;
            z-index: 10001; text-shadow: 2px 2px 0 #000; display: flex; align-items: center;
            gap: 8px; background: rgba(0,0,0,0.6); padding: 5px 10px; border: 2px solid #555;
            border-radius: 6px !important; /* <-- ROUNDED */
        }

        #ui-discord {
            position: fixed; top: 15px; right: 135px; z-index: 10001;
            display: flex; align-items: center; gap: 8px;
            background: rgba(10, 10, 10, 0.85); border: 2px solid #5865F2;
            padding: 4px 10px; text-decoration: none; color: #fff;
            font-family: 'Bebas Neue', sans-serif; font-size: 16px;
            letter-spacing: 1px; transition: 0.2s;
            border-radius: 6px !important; /* <-- ROUNDED */
        }
        
        
/* =========================================================
           GLASSMORPHISM SOCIAL UI (Chat, Friends, Lobbies)
           ========================================================= */
        #ui-lobbies, #ui-friends, #ui-chat {
            position: fixed;
            background: rgba(15, 15, 20, 0.4) !important; /* Semi-transparent base */
            backdrop-filter: blur(12px) !important; /* The magic glass blur */
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255, 60, 60, 0.3) !important; /* Soft red border */
            border-top: 1px solid rgba(255, 100, 100, 0.4) !important; /* Highlight top edge */
            border-radius: 12px !important; /* Smooth rounded corners */
            box-shadow: 0 15px 35px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1) !important;
            z-index: 10001; box-sizing: border-box;
            overflow: hidden; /* Keeps headers/inputs from bleeding out of the rounded corners */
        }
        
#ui-lobbies {
            top: 50%; left: 20px; transform: translateY(-50%); width: 230px;
            padding: 0 !important; /* Let the red headers span flush edge-to-edge */
            display: flex; flex-direction: column;
        }
        
        .lobby-bar-header {
            background: linear-gradient(90deg, rgba(158, 0, 0, 0.6), rgba(255, 0, 0, 0.4)) !important;
            color: #fff !important;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 20px;
            text-align: center;
            padding: 8px;
            border-bottom: 1px solid rgba(255, 115, 0, 0.5) !important;
            text-shadow: 2px 2px 0px #000;
            user-select: none;
            letter-spacing: 1px;
        }

        .lobby-stat {
            color: #fff; font-family: 'Roboto Condensed', sans-serif; font-size: 14px;
            margin: 5px 0; font-weight: bold; display: flex; justify-content: space-between;
            text-shadow: 1px 1px 2px #000;
        }
    
        #ui-chat { bottom: 20px; right: 20px; width: 320px; height: 220px; display: flex; flex-direction: column; }
        #ui-friends { bottom: 250px; right: 20px; width: 320px; height: 250px; display: flex; flex-direction: column; }
        
        /* Glassy Headers */
        #ui-chat-header, #ui-friends-header {
            background: linear-gradient(90deg, rgba(158, 0, 0, 0.6), rgba(255, 0, 0, 0.4)) !important;
            color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 20px; text-align: center;
            padding: 8px; border-bottom: 1px solid rgba(255, 115, 0, 0.5) !important;
            text-shadow: 2px 2px 0px #000; cursor: move; user-select: none; letter-spacing: 1px;
        }
        
        /* Message Area */
        #ui-chat-messages { flex-grow: 1; overflow-y: auto; padding: 10px; color: #fff; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; display: flex; flex-direction: column; gap: 6px; }
        .chat-msg { background: rgba(0,0,0,0.3) !important; padding: 6px 8px; border-left: 3px solid var(--sf-orange); border-radius: 0 4px 4px 0; word-wrap: break-word; text-shadow: 1px 1px 1px #000;}
        .chat-msg .author { color: var(--sf-orange); font-weight: bold; margin-right: 5px; }
        
        /* Input Areas at Bottom */
        #ui-chat-input-container, #ui-add-friend-container {
            display: flex;
            background: rgba(0, 0, 0, 0.3) !important;
            border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        #ui-chat-input, #ui-add-friend-input { flex-grow: 1; background: transparent; border: none; outline: none; color: #fff; padding: 10px; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; text-transform: none; text-shadow: 1px 1px 1px #000;}
        
        /* Input Buttons */
        #btn-emoji { background: transparent; color: var(--sf-orange); border: none; border-left: 1px solid rgba(255,255,255,0.1); padding: 0 15px; cursor: pointer; font-size: 18px; font-family: 'Bebas Neue', sans-serif; transition: 0.2s; }
        #btn-emoji:hover { background: rgba(255,0,0,0.4); color: #fff; }
        #btn-add-friend { background: rgba(255,255,255,0.1); color: #fff; border: none; border-left: 1px solid rgba(255,255,255,0.1); padding: 5px 15px; cursor: pointer; font-family: 'Bebas Neue'; letter-spacing: 1px; transition: 0.2s;}
        #btn-add-friend:hover { background: rgba(255,0,0,0.4); }
        
        #ui-emoji-menu { display: none; position: absolute; bottom: 45px; right: 5px; background: rgba(15,15,20,0.85); backdrop-filter: blur(8px); border: 1px solid var(--sf-orange); border-radius: 8px; padding: 10px; width: 180px; flex-wrap: wrap; gap: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.8); z-index: 10002; justify-content: center; }
        .emoji-item { cursor: pointer; font-size: 20px; transition: transform 0.1s; }
        .emoji-item:hover { transform: scale(1.3); }

        /* Friend Rows */
        #ui-friends-list { flex-grow: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
        .friend-row {
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,0,0,0.4) !important; padding: 6px 8px !important;
            border: 1px solid rgba(255,255,255,0.05) !important;
            border-radius: 6px !important; /* Rounded friend cards */
            font-family: 'Roboto Condensed'; font-size: 13px; color: #fff;
            cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        .friend-row:hover { background: rgba(255, 255, 255, 0.1) !important; border-color: rgba(255, 115, 0, 0.5) !important; transform: translateX(2px); }
        .friend-info { display: flex; align-items: center; gap: 8px; }
        .friend-avatar { width: 28px; height: 28px; object-fit: cover; border: 1px solid #777; border-radius: 4px; image-rendering: pixelated; object-position: center 20%; background:#000; }
        .friend-status.online { color: #0f0; text-shadow: 0 0 5px rgba(0,255,0,0.5); } .friend-status.offline { color: #888; }
        
        .btn-invite { background: rgba(255,0,0,0.6); border: 1px solid rgba(255,255,255,0.5); border-radius: 4px; color: #fff; padding: 2px 8px; font-family: 'Bebas Neue'; cursor: pointer; font-size: 16px; letter-spacing: 1px; z-index: 2; position: relative; transition: 0.2s;}
        .btn-invite:hover { background: var(--sf-orange); border-color: #fff; color: #000; }

        /* Invite Modal Updates */
        #ui-invite-modal { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(15,15,20,0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,60,60,0.5); border-radius: 12px; padding: 20px; z-index: 25000; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1); }
        #ui-invite-modal h2 { font-family: 'Bebas Neue'; color: #fff; margin: 0 0 15px 0; font-size: 32px; text-shadow: 2px 2px 0px #000;}
    

        /* Mobile Virtual Gamepad */
        #mobile-gamepad { position: fixed; bottom: 10px; left: 0; width: 100vw; height: 180px; display: none; justify-content: space-between; align-items: flex-end; padding: 0 20px; box-sizing: border-box; z-index: 20001; pointer-events: none; }
        #mobile-gamepad.visible { display: flex !important; }
        .touch-col { display: flex; flex-direction: column; align-items: center; pointer-events: auto; }
        
        .mobile-fs-btn {
            position: fixed; top: 15px; left: 15px; width: 42px; height: 42px; border-radius: 50%;
            display: none; align-items: center; justify-content: center; font-size: 20px; z-index: 10005; box-shadow: 4px 4px 0px #000; cursor: pointer;
            color: transparent !important; background: rgba(10, 10, 10, 0.9) !important; border: 2px solid var(--sf-red) !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'/%3E%3C/svg%3E") !important;
            background-size: 60% !important; background-repeat: no-repeat !important; background-position: center !important;
        }
        .mobile-fs-btn:active { background: var(--sf-red) !important; transform: scale(0.95); }
        #joystick-base {
            background: rgba(10, 10, 10, 0.7) !important; border: 3px solid var(--sf-dark-red) !important;
            box-shadow: inset 0 0 20px rgba(255,0,0,0.3), 0 0 10px rgba(0,0,0,0.8) !important;
        }
        #joystick-knob {
            background: linear-gradient(135deg, var(--sf-red), var(--sf-dark-red)) !important; border: 2px solid var(--sf-orange) !important;
            box-shadow: 0 0 15px rgba(255, 115, 0, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.4) !important;
        }


.custom-scroll, #ui-chat-messages, #ui-friends-list {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
.custom-scroll::-webkit-scrollbar, #ui-chat-messages::-webkit-scrollbar, #ui-friends-list::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}
  
/* =========================================================
   1080p & BROWSER-WINDOWED (1965x976, 1920x1080, 1980x1080)
   ========================================================= */
@media (min-width: 1750px) and (max-width: 1999px) {
    body {
        zoom: 1.20; /* Perfectly calibrated for 976px height and 1080px height */
        overflow: hidden !important;
    }

    /* Keep everything locked dead center */
    .modern-menu,
    #custom-loader,
    #ui-invite-modal,
    #ui-keybind-modal,
    #customCharSelectUI {
        width: 100% !important;
        height: 100% !important;
        left: 0 !important;
        right: 0 !important;
        box-sizing: border-box !important;
    }

    /* Slightly more compact logo so buttons have comfortable vertical breathing room */
    .menu-logo {
        width: 450px !important;
        max-width: 70vw !important;
        margin-bottom: 12px !important;
    }

    .menu-panel {
        padding: 16px 20px !important;
    }
}
  /* =========================================================
   2K SPECIFIC ADJUSTMENTS (2560x1440)
   ========================================================= */
@media (min-width: 2000px) and (max-width: 2999px) {

    /* --- 1. POPUP BASE CONTAINER (TAILORED 2K SCALE) --- */
    #custom-loader .search-popup-box {
        transform: scale(1.35) !important;
        width: 440px !important;
        max-width: 90vw !important;
    }

    /* --- 2. FIGHTER ID & FRIEND DOSSIER: FIX LABELS & VALUES --- */
    #custom-loader .search-popup-box header {
        font-size: 26px !important;
        margin-bottom: 10px !important;
    }

    /* Keep stat values (rank, plays, fighter) identical in size to their labels */
    #custom-loader .search-popup-box div {
        line-height: 1.35 !important;
        white-space: nowrap !important;
    }
    #custom-loader .search-popup-box span {
        font-size: inherit !important;
    }

    /* Compact info labels */
    #custom-loader .search-popup-box div[style*="Roboto Condensed"],
    #custom-loader .search-popup-box .friend-status {
        font-size: 13px !important;
    }

    /* Click to edit name hint */
    #custom-loader .search-popup-box div[style*="CLICK TO EDIT"] {
        font-size: 10px !important;
        margin-bottom: 4px !important;
    }

    /* Section Subheaders ("YOUR RIVALRY HISTORY", "SET PROFILE AVATAR") */
    #custom-loader .search-popup-box span[style*="Bebas Neue"] {
        font-size: 17px !important;
    }

    /* Rivalry history scroll box formatting */
    #custom-loader .search-popup-box .custom-scroll {
        font-family: 'Roboto Condensed', sans-serif !important;
        font-size: 12px !important;
        max-height: 120px !important;
    }
    #custom-loader .search-popup-box .custom-scroll div {
        font-family: 'Roboto Condensed', sans-serif !important;
        font-size: 12px !important;
        white-space: normal !important;
        padding: 6px !important;
    }

    /* Buttons inside Dossier / ID */
    #custom-loader .cancel-btn-arcade {
        font-size: 14px !important;
        padding: 5px 16px !important;
    }

    /* --- 3. FIGHTERS IN LOBBY: EXPANDED FOR 2K --- */
    #custom-loader .search-popup-box:has(.lobby-player-row),
    #custom-loader .search-popup-box:has(#stat-players) {
        transform: scale(1.6) !important;
        width: 520px !important;
    }
    #custom-loader .search-popup-box:has(.lobby-player-row) .custom-scroll {
        width: 100% !important;
        max-height: 320px !important;
    }
    #custom-loader .search-popup-box:has(.lobby-player-row) header {
        font-size: 28px !important;
    }
    .lobby-player-row {
        padding: 8px 12px !important;
        font-size: 14px !important;
    }
    .lobby-player-row img {
        width: 30px !important;
        height: 30px !important;
    }
}
  
  /* =========================================================
   2K MATCHMAKING SCALE (2560x1440)
   ========================================================= */
@media (min-width: 2000px) and (max-width: 2999px) {
    #custom-loader .search-popup-box:has(#matchmaking-slots),
    #custom-loader .search-popup-box:has(#matchmaking-counter),
    #custom-loader .search-popup-box:has(.arcade-meter-bg) {
        transform: scale(2.0) !important;       /* Scales up the matchmaking screen */
        width: auto !important;
        min-width: 520px !important;
    }
    #custom-loader .search-popup-box:has(#matchmaking-slots) .arcade-meter-bg {
        width: 320px !important;
        height: 16px !important;
    }
    #custom-loader .search-popup-box:has(#matchmaking-slots) .fighter-slot {
        width: 42px !important;
        height: 42px !important;
    }
    #custom-loader .search-popup-box:has(#matchmaking-slots) .cancel-btn-arcade {
        font-size: 18px !important;
        padding: 8px 30px !important;
    }
}

/* =========================================================
   4K MATCHMAKING SCALE (3840x2160)
   ========================================================= */
@media (min-width: 3000px) {
    #custom-loader .search-popup-box:has(#matchmaking-slots),
    #custom-loader .search-popup-box:has(#matchmaking-counter),
    #custom-loader .search-popup-box:has(.arcade-meter-bg) {
        transform: scale(2.8) !important;       /* Grand arcade scale for 4K */
        width: auto !important;
        min-width: 600px !important;
    }
    #custom-loader .search-popup-box:has(#matchmaking-slots) .arcade-meter-bg {
        width: 380px !important;
        height: 20px !important;
    }
    #custom-loader .search-popup-box:has(#matchmaking-slots) .fighter-slot {
        width: 50px !important;
        height: 50px !important;
    }
    #custom-loader .search-popup-box:has(#matchmaking-slots) .cancel-btn-arcade {
        font-size: 22px !important;
        padding: 10px 36px !important;
    }
}
  /* =========================================================
   MOBILE / PHONE VIEW (LANDSCAPE)
   ========================================================= */
@media (max-width: 900px), (max-height: 500px) {
    #custom-loader .search-popup-box:has(#matchmaking-slots),
    #custom-loader .search-popup-box:has(#matchmaking-counter),
    #custom-loader .search-popup-box:has(.arcade-meter-bg) {
        transform: scale(0.82) !important; /* Slightly bigger, perfectly fitted for landscape phones */
        padding: 12px 20px !important;
        width: auto !important;
    }
}
        /* Controls Rebinder UI */
/* --- NEW PROFILE BUTTON (Replaces Controls) --- */
/* --- UPGRADED PROFILE BUTTON --- */
        #ui-profile-btn {
            position: fixed; top: 15px; left: 20px; z-index: 10001; display: flex; align-items: center; gap: 12px;
            background: linear-gradient(180deg, #2a2a2a 0%, #050505 100%);
            border: 2px solid #666; border-radius: 6px; padding: 4px 16px 4px 4px;
            cursor: pointer; transition: all 0.2s ease;
            box-shadow: 0 4px 10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        #ui-profile-btn:hover {
            border-color: var(--sf-orange);
            box-shadow: 0 4px 15px rgba(255, 115, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }
        #ui-profile-btn img {
            width: 38px; height: 38px; object-fit: cover; border-radius: 3px;
            border: 1px solid #999; background: #000; image-rendering: pixelated; object-position: center 20%;
        }
        #ui-profile-btn .prof-name {
            color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1.5px;
            text-shadow: 2px 2px 0 #000; margin-top:2px;
        }

        /* Mobile / Resolution Scaling for Profile Button */
        @media (max-width: 900px), (max-height: 500px) {
            #ui-profile-btn { left: 45px !important; top: 5px !important; transform: scale(0.85); transform-origin: top left; padding: 2px 10px 2px 2px; }
            #ui-profile-btn img { width: 26px; height: 26px; }
            #ui-profile-btn .prof-name { font-size: 16px; }
        }
        @media (min-width: 2500px) { #ui-profile-btn { transform: scale(1.8); transform-origin: top left; } }
        @media (min-width: 3800px) { #ui-profile-btn { transform: scale(2.8); transform-origin: top left; } }
    
        #ui-keybind-modal { display: none; position: fixed; top: 0; left: 0; width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.8) !important; backdrop-filter: blur(4px); z-index: 25000; flex-direction: column; align-items: center; justify-content: center; }
        #keybind-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px 40px; }
        .keybind-row { display: flex; justify-content: space-between; align-items: center; width: 250px; font-family: 'Roboto Condensed'; font-size: 16px; color: #fff; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 4px; margin: 0; }
        .keybind-row span { color: var(--sf-orange); }
        .keybind-btn { background: #111; border: 2px solid #555; color: #fff; padding: 5px 10px; font-family: 'Bebas Neue'; font-size: 16px; cursor: pointer; min-width: 80px; text-align: center; transition: 0.2s; }
        .keybind-btn:hover { background: var(--sf-orange); color: #000; border-color: #fff; }
        .keybind-btn.listening { background: var(--sf-red); color: #fff; border-color: #fff; animation: bindPulse 0.5s infinite alternate; }
        @keyframes bindPulse { 100% { transform: scale(1.1); box-shadow: 0 0 10px var(--sf-red); } }

        /* Leaderboard Links */
        .leaderboard-link-container { text-align: center; margin-top: 10px; }
        .leaderboard-lnk {
            color: var(--sf-orange); font-size: 11px; text-decoration: none; font-family: 'Roboto Condensed', sans-serif;
            border-bottom: 1px dotted var(--sf-orange); display: inline-flex; align-items: center; gap: 6px; transition: 0.2s; white-space: nowrap;
        }
        .leaderboard-lnk svg { fill: #aaa; width: 12px; height: 12px; shape-rendering: crispEdges; transition: fill 0.2s; }

        /* =========================================================
           MOBILE OPTIMIZATIONS (LANDSCAPE SMARTPHONES < 900px)
           ========================================================= */
        @media (max-width: 900px), (max-height: 500px) {
            .menu-logo { width: 240px !important; margin-bottom: 8px !important; }
      .lobby-bar-header { font-size: 12px; padding: 4px; }
      /* Shrink all popups on phone screens and remove giant 40px vertical padding */
            #custom-loader .search-popup-box {
                padding: 10px 15px !important;
                transform: scale(0.68) !important;
                transform-origin: center center !important;
            }
#ui-ping { top: 5px; right: 5px; font-size: 9px; padding: 2px 5px; border-width: 1px; border-radius: 5px !important; }
        #ui-discord { top: 5px !important; right: 75px !important; padding: 2px 6px !important; border-width: 1px !important; gap: 4px !important; border-radius: 5px !important; }
            .menu-panel { width: 160px; padding: 6px; border-width: 1px; }
            .username-arcade-container { padding: 2px 4px !important; margin-bottom: 4px !important; }
            .username-arcade-container span { font-size: 10px !important; }
            .username-arcade-container input { font-size: 11px !important; width: 50px; height: 14px; }
            .btn-arcade { padding: 3px 0 !important; font-size: 10px !important; margin: 1px 0 !important; letter-spacing: 0px; border-width: 1px !important; }
.sfv-plays-count { font-size: 0.55rem !important; margin: 0 4px !important; }
            #ui-lobbies { width: 130px; padding: 8px; left: 5px; border-width: 1px; }
            .lobby-header { font-size: 14px; margin-bottom: 5px; padding-bottom: 2px; }
            .lobby-stat { font-size: 9px; margin: 2px 0; }

            #ui-chat { width: 180px; height: 120px; bottom: 5px; right: 5px; border-width: 1px; }
            #ui-chat-header { font-size: 12px; padding: 4px; }
            #ui-chat-messages { font-size: 10px; padding: 5px; gap: 3px; }
            .chat-msg { padding: 3px; border-width: 2px; }
            #ui-chat-input { font-size: 10px; padding: 5px; }
            #btn-emoji { font-size: 12px; padding: 0 8px; }
            #ui-emoji-menu { width: 130px; padding: 5px; gap: 5px; bottom: 35px; }
            .emoji-item { font-size: 14px; }

/* --- FRIENDS LIST: IDENTICAL DIMENSIONS TO GLOBAL CHAT --- */
            #ui-friends {
                width: 180px !important;
                height: 120px !important;
                bottom: 130px !important; /* Stacked right above Global Chat (5px + 120px + 5px gap) */
                right: 5px !important;
                border-width: 1px !important;
                border-radius: 8px !important;
            }
            #ui-friends-header {
                font-size: 12px !important;
                padding: 4px !important;
                letter-spacing: 0.5px !important;
            }
            #ui-friends-list {
                padding: 4px 5px !important;
                gap: 4px !important;
            }
            .friend-row {
                padding: 2px 5px !important;
                border-radius: 4px !important;
                font-size: 9px !important;
            }
            .friend-info {
                gap: 5px !important;
            }
            .friend-avatar {
                width: 20px !important;
                height: 20px !important;
                border-radius: 2px !important;
            }
            .friend-info span {
                font-size: 10px !important;
                line-height: 1 !important;
            }
            .friend-status {
                font-size: 8px !important;
                margin-top: 1px !important;
            }
            .btn-invite {
                font-size: 10px !important;
                padding: 1px 6px !important;
                height: 18px !important;
                line-height: 15px !important;
                border-radius: 3px !important;
            }
            #ui-add-friend-container {
                height: 22px !important;
            }
            #ui-add-friend-input {
                font-size: 10px !important;
                padding: 2px 5px !important;
                height: 100% !important;
                box-sizing: border-box !important;
            }
            #btn-add-friend {
                font-size: 10px !important;
                padding: 0 8px !important;
                height: 100% !important;
                line-height: 20px !important;
            }
/* --- COMPACT 2-COLUMN HOTKEYS POPUP FOR MOBILE SCREENS --- */
            #ui-keybind-modal .search-popup-box {
                padding: 10px 18px !important;
                max-height: 92vh !important;
                width: 95vw !important;
                max-width: 440px !important;
                overflow-y: auto !important;
            }
            #ui-keybind-modal .search-popup-box div:first-child {
                font-size: 20px !important;
                margin-bottom: 6px !important;
            }
            #keybind-container {
                grid-template-columns: repeat(2, 1fr) !important; /* 2 compact columns */
                gap: 3px 14px !important;
                width: 100% !important;
            }
            .keybind-row {
                width: 100% !important;
                font-size: 10px !important;
                padding-bottom: 2px !important;
                border-bottom: 1px solid #222 !important;
            }
            .keybind-btn {
                font-size: 10px !important;
                padding: 2px 6px !important;
                min-width: 45px !important;
                height: 18px !important;
                line-height: 14px !important;
                border-width: 1px !important;
            }
            #btn-close-keybinds {
                margin-top: 8px !important;
                font-size: 12px !important;
                padding: 3px 20px !important;
            }
            #ui-ping { top: 5px; right: 5px; font-size: 9px; padding: 2px 4px; border-width: 1px; }
.mobile-fs-btn {
            width: 28px !important;  /* Matches profile's exact height */
            height: 32px !important;
            top: 5px !important;
            left: 10px !important;
            display: flex !important;
            border-radius: 5px !important;
            border: 2px solid #666 !important;
            /* Layers the white fullscreen icon directly on top of the dark metallic gradient */
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'/%3E%3C/svg%3E"), linear-gradient(180deg, #2a2a2a 0%, #050505 100%) !important;
            background-size: 60% !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1) !important;
            box-sizing: border-box !important;
        }
    #ui-discord { top: 5px !important; right: 75px !important; padding: 2px 4px !important; border-width: 1px !important; gap: 4px !important; }
            #ui-discord span { font-size: 9px !important; }
            #ui-discord img { width: 9px !important; }

            #ui-controls-btn { display: none !important; }
            #keybind-container { grid-template-columns: 1fr; gap: 8px; }
            .keybind-row { width: 85vw; font-size: 13px; }
            .leaderboard-link-container { margin-top: 5px; }
            .leaderboard-lnk { font-size: 8px; gap: 3px; }
            .leaderboard-lnk svg { width: 8px; height: 8px; }

            /* --- PHONE VIEW FIX FOR CHARACTER SELECT --- */
            #customCharSelectUI {
                position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                width: 100vw !important; height: 100vh !important; transform: none !important; padding: 0 !important; margin: 0 !important;
            }
            .sfv-center-wedge { width: 210px !important; padding: 4px 0 !important; }
            .sfv-title-text { font-size: 0.95rem !important; letter-spacing: 1px; }
            .sfv-vs-text { font-size: 0.95rem !important; margin-top: 1px; }
            .sfv-wedge-header { margin-bottom: 4px !important; }
            .sfv-v-roster-box { gap: 6px !important; margin-bottom: 6px !important; }
            .sfv-roster-card { width: 44px !important; height: 44px !important; border-width: 1px !important; }
            
            .sfv-fighter-showcase { padding: 8px 14px !important; }
            .sfv-showcase-p1 .sfv-showcase-art { left: 14px !important; bottom: 42px !important; }
            .sfv-showcase-p2 .sfv-showcase-art { right: 14px !important; bottom: 42px !important; }
            .sfv-showcase-art { height: 42vh !important; max-height: 150px !important; bottom: 25px !important; max-width: 26vw !important; }
            .sfv-fighter-name { font-size: 1.4rem !important; margin-bottom: 2px !important; }
            .sfv-player-pill { padding: 1px 5px !important; gap: 4px !important; }
            .sfv-pill-tag { font-size: 0.65rem !important; padding: 1px 3px !important; }
            .sfv-player-name { font-size: 0.65rem !important; }

            #charSelectStatus { font-size: 0.65rem !important; padding: 1px 6px !important; margin-bottom: 3px !important; }
            .sfv-cancel-btn { font-size: 0.65rem !important; padding: 1px 6px !important; }

            .sfv-v-lines { width: 230px !important; }
            .sfv-v-line-left { transform: rotate(-5deg) !important; }
            .sfv-v-line-right { transform: rotate(5deg) !important; }
            .sfv-match-badge { padding: 1px 8px !important; }
            .sfv-match-badge span { font-size: 0.75rem !important; }

            .sfv-fighter-showcase.sfv-mode-team { padding: 6px 12px !important; }
            .sfv-team-slots { max-width: 210px !important; gap: 6px !important; }
            .sfv-team-slot-card { padding: 4px 8px !important; gap: 8px !important; border-width: 1px !important; }
            .sfv-slot-thumb { width: 42px !important; height: 42px !important; border-width: 1px !important; }
            .sfv-slot-fighter { font-size: 1.1rem !important; margin-bottom: 2px !important; }
            .sfv-slot-user { font-size: 0.7rem !important; gap: 4px !important; }
            .sfv-team-count-3 .sfv-slot-thumb { width: 34px !important; height: 34px !important; }
            .sfv-team-count-3 .sfv-slot-fighter { font-size: 0.95rem !important; }
        }




/* =========================================
           2K RESOLUTION SCALING (min-width: 2000px)
           ========================================= */
        @media (min-width: 2000px) {
            .menu-logo { width: 850px !important; margin-bottom: 20px !important; }
            .menu-panel { transform: scale(1.6) !important; transform-origin: top center !important; }
            #ui-ping { transform: scale(1.5); transform-origin: top right; }
            #ui-lobbies { transform: translateY(-50%) scale(1.5) !important; transform-origin: left center; }
            #ui-chat { transform: scale(1.5); transform-origin: bottom right; }
            #ui-friends { bottom: 370px !important; transform: scale(1.5); transform-origin: bottom right; }
            #ui-controls-btn { transform: scale(1.5); transform-origin: top left; }
            #ui-keybind-modal .search-popup-box { transform: scale(1.5) !important; }
            .sfv-plays-count { font-size: 1.2rem !important; margin: 0 10px !important; }

            /* Matchmaking and Mode Select Popups */
            #custom-loader .search-popup-box,
            #ui-invite-modal .search-popup-box,
            .vs-container { transform: scale(2.0) !important; transform-origin: center !important; }

            /* --- ABSOLUTE FIX: FORCE FULL SCREEN & SCALE UP INTERNAL WEDGE --- */
            html body #customCharSelectUI {
                transform: none !important; /* KILLS THE INDEX.HTML BUG */
                top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                margin: 0 !important; padding: 0 !important; width: 100vw !important; height: 100vh !important;
            }

            .sfv-center-wedge { width: 450px !important; }
            .sfv-v-lines { width: 480px !important; }
            .sfv-wedge-header .sfv-title-text { font-size: 2rem !important; }
            .sfv-wedge-header .sfv-vs-text { font-size: 2rem !important; }
            .sfv-roster-card { width: 90px !important; height: 90px !important; }
            .sfv-fighter-showcase { padding: 40px 60px !important; }
            .sfv-showcase-art { max-height: 950px !important; max-width: 40vw !important; bottom: 180px !important; }
            .sfv-fighter-name { font-size: 5rem !important; margin-bottom: 15px !important; }
            .sfv-player-pill { padding: 8px 20px !important; }
            .sfv-pill-tag { font-size: 1.4rem !important; }
            .sfv-player-name { font-size: 1.4rem !important; }
            .sfv-plays-count { font-size: 1.2rem !important; }
            #charSelectStatus { font-size: 1.4rem !important; padding: 8px 20px !important; }
            .cancel-btn-arcade { font-size: 1.4rem !important; padding: 10px 30px !important; }
            
            .sfv-slot-thumb { width: 100px !important; height: 100px !important; }
            .sfv-slot-fighter { font-size: 3rem !important; }
            .sfv-slot-user { font-size: 1.4rem !important; }
            .sfv-team-count-3 .sfv-slot-thumb { width: 80px !important; height: 80px !important; }
            .sfv-team-count-3 .sfv-slot-fighter { font-size: 2.2rem !important; }
        }

        /* =========================================
           4K RESOLUTION SCALING (min-width: 3000px)
           ========================================= */
        @media (min-width: 3000px) {
            .menu-logo { width: 1300px !important; margin-bottom: 40px !important; }
            .menu-panel { transform: scale(2.5) !important; transform-origin: top center !important; }
            #ui-ping { transform: scale(2.2); transform-origin: top right; }
            #ui-lobbies { transform: translateY(-50%) scale(2.2) !important; transform-origin: left center; }
            #ui-chat { transform: scale(2.2); transform-origin: bottom right; }
            #ui-friends { bottom: 530px !important; transform: scale(2.2); transform-origin: bottom right; }
            #ui-controls-btn { transform: scale(2.2); transform-origin: top left; }
            #ui-keybind-modal .search-popup-box { transform: scale(2.2) !important; }
            .sfv-plays-count { font-size: 1.8rem !important; margin: 0 16px !important; }

            /* Matchmaking and Mode Select Popups */
            #custom-loader .search-popup-box,
            #ui-invite-modal .search-popup-box,
            .vs-container { transform: scale(3.2) !important; transform-origin: center !important; }

            /* --- GIGANTIC 4K CHARACTER SELECT SIZING --- */
            /* --- ABSOLUTE FIX: FORCE FULL SCREEN & SCALE UP INTERNAL WEDGE --- */
            html body #customCharSelectUI {
                transform: none !important; /* KILLS THE INDEX.HTML BUG */
                top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                margin: 0 !important; padding: 0 !important; width: 100vw !important; height: 100vh !important;
            }

            .sfv-center-wedge { width: 650px !important; }
            .sfv-v-lines { width: 680px !important; }
            .sfv-wedge-header .sfv-title-text { font-size: 2.8rem !important; }
            .sfv-wedge-header .sfv-vs-text { font-size: 2.8rem !important; }
            .sfv-roster-card { width: 130px !important; height: 130px !important; }
            .sfv-fighter-showcase { padding: 60px 90px !important; }
            .sfv-showcase-art { max-height: 950px !important; max-width: 40vw !important; bottom: 180px !important; }
            .sfv-fighter-name { font-size: 7.5rem !important; margin-bottom: 25px !important; }
            .sfv-player-pill { padding: 12px 30px !important; }
            .sfv-pill-tag { font-size: 2rem !important; }
            .sfv-player-name { font-size: 2rem !important; }
            .sfv-plays-count { font-size: 1.8rem !important; }
            #charSelectStatus { font-size: 2rem !important; padding: 12px 30px !important; }
            .cancel-btn-arcade { font-size: 2rem !important; padding: 15px 45px !important; margin-top: 15px; }
            
            .sfv-slot-thumb { width: 150px !important; height: 150px !important; }
            .sfv-slot-fighter { font-size: 4.5rem !important; }
            .sfv-slot-user { font-size: 2rem !important; }
            .sfv-team-count-3 .sfv-slot-thumb { width: 120px !important; height: 120px !important; }
            .sfv-team-count-3 .sfv-slot-fighter { font-size: 3.5rem !important; }
        }
    
    
    
    
      /* =========================================================
   4K SPECIFIC ADJUSTMENTS (3840x2160)
   ========================================================= */
@media (min-width: 3000px) {

    /* --- 1. POPUP BASE CONTAINER (BALANCED 4K SCALE) --- */
    #custom-loader .search-popup-box {
        transform: scale(1.8) !important;
        width: 480px !important;
        max-width: 90vw !important;
    }

    /* --- 2. FIGHTER ID & FRIEND DOSSIER: FIX LABELS & VALUES --- */
    #custom-loader .search-popup-box header {
        font-size: 26px !important;
        margin-bottom: 12px !important;
    }

    /* Keep the stat values (rank, plays, fighter) the same readable size as their labels */
    #custom-loader .search-popup-box div {
        line-height: 1.4 !important;
        white-space: nowrap !important;
    }
    #custom-loader .search-popup-box span {
        font-size: inherit !important; /* Fixes microscopic orange numbers/values */
    }

    /* Compact info labels */
    #custom-loader .search-popup-box div[style*="Roboto Condensed"],
    #custom-loader .search-popup-box .friend-status {
        font-size: 13px !important;
    }

    /* Click to edit name hint */
    #custom-loader .search-popup-box div[style*="CLICK TO EDIT"] {
        font-size: 10px !important;
        margin-bottom: 4px !important;
    }

    /* Section Subheaders ("YOUR RIVALRY HISTORY", "SET PROFILE AVATAR") */
    #custom-loader .search-popup-box span[style*="Bebas Neue"] {
        font-size: 17px !important;
    }

    /* Fix the huge "No recorded matches against..." text */
    #custom-loader .search-popup-box .custom-scroll {
        font-family: 'Roboto Condensed', sans-serif !important;
        font-size: 12px !important;
        max-height: 120px !important;
    }
    #custom-loader .search-popup-box .custom-scroll div {
        font-family: 'Roboto Condensed', sans-serif !important;
        font-size: 12px !important;
        white-space: normal !important; /* Allows history text to wrap neatly */
        padding: 8px !important;
    }

    /* Buttons inside Dossier / ID */
    #custom-loader .cancel-btn-arcade {
        font-size: 14px !important;
        padding: 5px 16px !important;
    }

    /* --- 3. FIGHTERS IN LOBBY: MAKE IT BIG & EXPANDED --- */
    #custom-loader .search-popup-box:has(.lobby-player-row),
    #custom-loader .search-popup-box:has(#stat-players) {
        transform: scale(2.2) !important;
        width: 580px !important;
    }
    #custom-loader .search-popup-box:has(.lobby-player-row) .custom-scroll {
        width: 100% !important;
        max-height: 380px !important;
    }
    #custom-loader .search-popup-box:has(.lobby-player-row) header {
        font-size: 30px !important;
    }
    .lobby-player-row {
        padding: 8px 14px !important;
        font-size: 15px !important;
    }
    .lobby-player-row img {
        width: 32px !important;
        height: 32px !important;
    }
}
    /* =========================================================
           POPUP ANIMATION & 2K/4K RESCALING FIX
           ========================================================= */
        
        /* 1. Lag-free smooth slide-up for all popups (Uses margin to avoid breaking scale) */
        .search-popup-box, .vs-container {
            animation: lightSlideUp 0.2s ease-out forwards !important;
        }

        @keyframes lightSlideUp {
            from { opacity: 0; margin-top: 30px; }
            to   { opacity: 1; margin-top: 0px; }
        }

       /* 2. Force 2K Resolution Scale */
        @media (min-width: 2500px) {
            #custom-loader .search-popup-box,
            #ui-invite-modal .search-popup-box,
            .vs-container {
                transform: scale(2.0) !important;
                transform-origin: center !important;
            }
            html body #customCharSelectUI { transform: none !important; }

 /* =========================================================
           2K RESOLUTION OVERRIDES (2560x1440 & 2500px+)
           ========================================================= */
        @media (min-width: 2500px) {
            /* 1. DISCORD & PING */
            html body #ui-ping,
            html body #ui-discord {
                transform: none !important;
                top: 20px !important;
                height: 38px !important;
                padding: 0 12px !important;
                border-radius: 6px !important;
                border: 2px solid #555 !important;
                box-sizing: border-box !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            html body #ui-ping { right: 20px !important; font-size: 16px !important; }
            html body #ui-discord { right: 135px !important; border-color: #5865F2 !important; }
            html body #ui-discord img { width: 20px !important; height: auto !important; }
            html body #ui-discord span { font-size: 18px !important; }

            /* 2. MAIN MENU */
            .menu-logo { width: 750px !important; margin-bottom: 25px !important; }
            html body .menu-panel { transform: scale(1.6) !important; transform-origin: top center !important; }

            /* 3. SIDEBARS & SOCIAL UI */
            html body #ui-profile-btn { transform: scale(1.6) !important; transform-origin: top left !important; top: 20px !important; left: 20px !important; }
            html body #ui-lobbies { transform: translateY(-50%) scale(1.6) !important; transform-origin: left center !important; left: 20px !important; }
            html body #ui-chat { transform: scale(1.6) !important; transform-origin: bottom right !important; right: 20px !important; bottom: 20px !important; }
            html body #ui-friends { transform: scale(1.6) !important; transform-origin: bottom right !important; right: 20px !important; bottom: 430px !important; }

            /* 4. ALL POPUPS & MODALS */
            html body #custom-loader .search-popup-box,
            html body #ui-invite-modal .search-popup-box,
            html body #ui-keybind-modal .search-popup-box,
            html body .vs-container {
                transform: scale(2.2) !important;
                transform-origin: center center !important;
            }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) {
                transform: scale(2.2) !important;
                transform-origin: center center !important;
                width: 580px !important;
                padding: 30px 40px !important;
            }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) header { font-size: 38px !important; margin-bottom: 18px !important; }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) .custom-scroll { width: 100% !important; min-width: 460px !important; max-height: 320px !important; gap: 10px !important; }
            html body .lobby-player-row { padding: 10px 16px !important; font-size: 16px !important; border-radius: 4px !important; }
            html body .lobby-player-row img { width: 36px !important; height: 36px !important; }
            html body .lobby-player-row span[style*="font-size: 11px"] { font-size: 13px !important; }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) .cancel-btn-arcade { font-size: 18px !important; padding: 8px 32px !important; margin-top: 10px !important; }

            /* 5. CHARACTER SELECT (2K) */
            html body #customCharSelectUI { transform: none !important; width: 100vw !important; height: 100vh !important; padding: 0 !important; margin: 0 !important; }
            .sfv-center-wedge { width: 640px !important; padding: 12px 0 !important; }
            .sfv-v-lines { width: 680px !important; }
            .sfv-v-line-left { transform: rotate(-5deg) !important; }
            .sfv-v-line-right { transform: rotate(5deg) !important; }
            .sfv-wedge-header { margin-bottom: 10px !important; }
            .sfv-match-badge { padding: 4px 18px !important; margin-bottom: 8px !important; }
            .sfv-match-badge span { font-size: 1.6rem !important; }
            .sfv-title-text, .sfv-vs-text { font-size: 2.4rem !important; }
            .sfv-v-roster-box { gap: 18px !important; margin-bottom: 16px !important; }
            .sfv-roster-card { width: 130px !important; height: 130px !important; border-width: 3px !important; border-radius: 6px !important; }
            #charSelectStatus { font-size: 1.6rem !important; padding: 6px 22px !important; margin-bottom: 8px !important; }
            #customCharSelectUI .cancel-btn-arcade { font-size: 1.6rem !important; padding: 8px 34px !important; margin-top: 4px !important; }
            
            /* --- 1V1 REDUCED PORTRAIT SIZES --- */
            .sfv-fighter-showcase { padding: 15px 40px !important; }
.sfv-showcase-art {
    height: 54vh !important;        /* Increased from 44vh */
    max-height: 620px !important;   /* Raised ceiling from 480px to allow it to expand */
    max-width: 32vw !important;     /* Gave it more width room */
    bottom: 0px !important;
}            .sfv-showcase-p1 .sfv-showcase-art { left: 40px !important; }
            .sfv-showcase-p2 .sfv-showcase-art { right: 40px !important; }
            .sfv-fighter-name { font-size: 4rem !important; margin: 0 0 6px 0 !important; }
            .sfv-player-pill { padding: 6px 18px !important; gap: 12px !important; border-radius: 8px !important; border-width: 2px !important; }
            .sfv-pill-tag { font-size: 1.4rem !important; padding: 2px 10px !important; }
            .sfv-player-name { font-size: 1.6rem !important; }
            .sfv-plays-count { font-size: 1.4rem !important; margin: 0 8px !important; }

            /* --- 2V2 & 3V3 TEAM MODE SCALING (2K) --- */
            .sfv-fighter-showcase.sfv-mode-team { padding: 15px 35px !important; }
            .sfv-team-slots { max-width: 580px !important; gap: 24px !important; }
            .sfv-team-slot-card { padding: 14px 24px !important; gap: 24px !important; border-width: 3px !important; border-radius: 6px !important; }
            .sfv-slot-thumb { width: 110px !important; height: 110px !important; border-width: 3px !important; }
            .sfv-slot-fighter { font-size: 3.4rem !important; margin-bottom: 6px !important; }
            .sfv-slot-user { font-size: 1.6rem !important; gap: 12px !important; }
            .sfv-slot-user .sfv-pill-tag { font-size: 1.4rem !important; padding: 2px 10px !important; }
            .sfv-slot-user .sfv-plays-count { font-size: 1.3rem !important; }

            /* 3v3 specific adjustment */
            .sfv-team-count-3 .sfv-team-slots { max-width: 520px !important; gap: 16px !important; }
            .sfv-team-count-3 .sfv-team-slot-card { padding: 10px 18px !important; gap: 18px !important; }
            .sfv-team-count-3 .sfv-slot-thumb { width: 85px !important; height: 85px !important; }
            .sfv-team-count-3 .sfv-slot-fighter { font-size: 2.6rem !important; }
        }

        /* =========================================================
           4K RESOLUTION OVERRIDES (3840x2160 & 3800px+)
           ========================================================= */
        @media (min-width: 3800px) {
            /* 1. DISCORD & PING */
            html body #ui-ping,
            html body #ui-discord {
                transform: none !important;
                top: 30px !important;
                height: 56px !important;
                padding: 0 18px !important;
                border-radius: 8px !important;
                border: 3px solid #555 !important;
                box-sizing: border-box !important;
                display: flex !important;
                align-items: center !important;
                gap: 12px !important;
            }
            html body #ui-ping { right: 30px !important; font-size: 24px !important; }
            html body #ui-discord { right: 200px !important; border-color: #5865F2 !important; }
            html body #ui-discord img { width: 28px !important; height: auto !important; }
            html body #ui-discord span { font-size: 26px !important; }

            /* 2. MAIN MENU */
            .menu-logo { width: 1150px !important; margin-bottom: 38px !important; }
            html body .menu-panel { transform: scale(2.4) !important; transform-origin: top center !important; }

            /* 3. SIDEBARS & SOCIAL UI */
            html body #ui-profile-btn { transform: scale(2.4) !important; transform-origin: top left !important; top: 30px !important; left: 30px !important; }
            html body #ui-lobbies { transform: translateY(-50%) scale(2.4) !important; transform-origin: left center !important; left: 30px !important; }
            html body #ui-chat { transform: scale(2.4) !important; transform-origin: bottom right !important; right: 30px !important; bottom: 30px !important; }
            html body #ui-friends { transform: scale(2.4) !important; transform-origin: bottom right !important; right: 30px !important; bottom: 650px !important; }

            /* 4. ALL POPUPS & MODALS */
            html body #custom-loader .search-popup-box,
            html body #ui-invite-modal .search-popup-box,
            html body #ui-keybind-modal .search-popup-box,
            html body .vs-container {
                transform: scale(3.2) !important;
                transform-origin: center center !important;
            }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) {
                transform: scale(3.2) !important;
                transform-origin: center center !important;
                width: 780px !important;
                padding: 42px 55px !important;
            }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) header { font-size: 52px !important; margin-bottom: 25px !important; }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) .custom-scroll { width: 100% !important; min-width: 620px !important; max-height: 440px !important; gap: 14px !important; }
            html body .lobby-player-row { padding: 14px 22px !important; font-size: 22px !important; border-radius: 6px !important; }
            html body .lobby-player-row img { width: 48px !important; height: 48px !important; }
            html body .lobby-player-row span[style*="font-size: 11px"] { font-size: 18px !important; }
            html body #custom-loader .search-popup-box:has(.lobby-player-row) .cancel-btn-arcade { font-size: 24px !important; padding: 12px 46px !important; margin-top: 15px !important; }

            /* 5. CHARACTER SELECT (4K) */
            html body #customCharSelectUI { transform: none !important; width: 100vw !important; height: 100vh !important; padding: 0 !important; margin: 0 !important; }
            .sfv-center-wedge { width: 920px !important; padding: 15px 0 !important; }
            .sfv-v-lines { width: 980px !important; }
            .sfv-v-line-left { transform: rotate(-5deg) !important; }
            .sfv-v-line-right { transform: rotate(5deg) !important; }
            .sfv-wedge-header { margin-bottom: 16px !important; }
            .sfv-match-badge { padding: 6px 26px !important; margin-bottom: 10px !important; }
            .sfv-match-badge span { font-size: 2.4rem !important; }
            .sfv-title-text, .sfv-vs-text { font-size: 3.6rem !important; }
            .sfv-v-roster-box { gap: 26px !important; margin-bottom: 22px !important; }
            .sfv-roster-card { width: 190px !important; height: 190px !important; border-width: 4px !important; border-radius: 8px !important; }
            #charSelectStatus { font-size: 2.2rem !important; padding: 8px 30px !important; margin-bottom: 12px !important; }
            #customCharSelectUI .cancel-btn-arcade { font-size: 2.2rem !important; padding: 12px 50px !important; margin-top: 6px !important; }
            
            /* --- 1V1 REDUCED PORTRAIT SIZES --- */
            .sfv-fighter-showcase { padding: 25px 60px !important; }
            .sfv-showcase-art { height: 46vh !important; max-height: 980px !important; max-width: 28vw !important; bottom: 0px !important; }
            .sfv-showcase-p1 .sfv-showcase-art { left: 60px !important; }
            .sfv-showcase-p2 .sfv-showcase-art { right: 60px !important; }
            .sfv-fighter-name { font-size: 5.8rem !important; margin: 0 0 10px 0 !important; }
            .sfv-player-pill { padding: 10px 28px !important; gap: 18px !important; border-radius: 12px !important; border-width: 3px !important; }
            .sfv-pill-tag { font-size: 2rem !important; padding: 4px 14px !important; }
            .sfv-player-name { font-size: 2.4rem !important; }
            .sfv-plays-count { font-size: 2rem !important; margin: 0 12px !important; }

            /* --- 2V2 & 3V3 TEAM MODE SCALING (4K) --- */
            .sfv-fighter-showcase.sfv-mode-team { padding: 25px 50px !important; }
            .sfv-team-slots { max-width: 880px !important; gap: 36px !important; }
            .sfv-team-slot-card { padding: 20px 36px !important; gap: 34px !important; border-width: 4px !important; border-radius: 8px !important; }
            .sfv-slot-thumb { width: 160px !important; height: 160px !important; border-width: 4px !important; }
            .sfv-slot-fighter { font-size: 5rem !important; margin-bottom: 8px !important; }
            .sfv-slot-user { font-size: 2.4rem !important; gap: 18px !important; }
            .sfv-slot-user .sfv-pill-tag { font-size: 2.2rem !important; padding: 4px 16px !important; }
            .sfv-slot-user .sfv-plays-count { font-size: 2rem !important; }

            /* 3v3 specific adjustment */
            .sfv-team-count-3 .sfv-team-slots { max-width: 780px !important; gap: 24px !important; }
            .sfv-team-count-3 .sfv-team-slot-card { padding: 14px 28px !important; gap: 26px !important; }
            .sfv-team-count-3 .sfv-slot-thumb { width: 125px !important; height: 125px !important; }
            .sfv-team-count-3 .sfv-slot-fighter { font-size: 3.8rem !important; }
        }
        }
  :focus-visible, :focus {
    outline: 2px solid var(--sf-orange) !important;
    box-shadow: 0 0 12px var(--sf-orange) !important;
    transform: scale(1.03);
}
  
  /* Controller UI focus indicators */
.controller-focused {
    outline: 3px solid var(--sf-orange) !important;
    box-shadow: 0 0 16px var(--sf-orange), inset 0 0 8px #fff !important;
    transform: scale(1.06) !important;
    z-index: 100 !important;
}
.sfv-roster-card.controller-focused {
    border-color: #fff !important;
}
.sfv-roster-card.controller-focused img {
    filter: grayscale(0%) !important;
}
                      /* --- UNIVERSAL FRIEND LIST HEIGHT INCREASE --- */
#ui-friends {
    height: 380px !important; /* Default / Desktop (up from 250px) */
    max-height: calc(100vh - 270px) !important; /* Prevents top overflow on short screens */
}

@media (max-width: 900px), (max-height: 500px) {
    #ui-friends {
        height: 180px !important; /* Mobile Landscape (up from 120px) */
        max-height: calc(100vh - 145px) !important;
    }
}
    `;
    document.head.appendChild(style);
})();

BuildModernMenu();
function ToggleSocialUI(show) {
    var pingEl = document.getElementById("ui-ping");
    var lobEl = document.getElementById("ui-lobbies");
    var chatEl = document.getElementById("ui-chat");
    var frEl = document.getElementById("ui-friends");
    
    if (pingEl) pingEl.style.display = show ? "flex" : "none";
    if (lobEl) lobEl.style.display = show ? "flex" : "none";
    if (chatEl) chatEl.style.display = show ? "flex" : "none";
    if (frEl) frEl.style.display = show ? "flex" : "none";
}

function makeResponsive() {
    var stage = document.getElementById('pnlStage');
    if(!stage) return;
    var baseWidth = stage.offsetWidth || parseInt(stage.style.width) || 768;
    var baseHeight = stage.offsetHeight || parseInt(stage.style.height) || 448;
    if (baseWidth === 0 || baseHeight === 0) return;
    var scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);
    stage.style.transformOrigin = 'top left';
    stage.style.transform = 'scale(' + scale + ')';
    stage.style.left = ((window.innerWidth - (baseWidth * scale)) / 2) + 'px';
    stage.style.top = ((window.innerHeight - (baseHeight * scale)) / 2) + 'px';
}
window.addEventListener('resize', makeResponsive);
window.centerScreen = makeResponsive;

window.toggleFullScreen = function() {
    var doc = window.document;
    var docEl = doc.documentElement;
    var btn = document.getElementById("mobile-fs-toggle");

    var request = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancel = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        request.call(docEl);
        if(btn) btn.innerHTML = "⤢";
    } else {
        cancel.call(doc);
        if(btn) btn.innerHTML = "⤢";
    }
};

(function initRandomUsername() {
    var savedName = localStorage.getItem('sfa_username');
    if (!savedName || savedName.trim() === "" || savedName.toLowerCase() === "player") {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomName = '';
        for (var i = 0; i < 5; i++) {
            randomName += chars.charAt(Math.floor(window.originalMathRandom() * chars.length));
        }
        localStorage.setItem('sfa_username', randomName);
    }
})();
 function BuildModernMenu() {
    var container = document.querySelector(".start-game-container");
    if (!container) return;
    container.innerHTML = `
        <div class="scanlines"></div>
        <div class="vignette"></div>
        <div class="hero-bg"></div>
        
        <div class="sparks">
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
        </div>

        <img src="images/misc/misc/splash.jpg" class="menu-logo" alt="Street Fighter Alpha" />

        <div class="menu-panel">
            <button class="btn-arcade btn-play" onclick="showVsComMenu()">VS COM (LOCAL)</button>
            <button class="btn-arcade" onclick="startOnlineGame('1v1')">VS BATTLE (1V1)</button>
            <button class="btn-arcade" onclick="startOnlineGame('2v2')">DRAMATIC BATTLE (2V2)</button>
            <button class="btn-arcade" onclick="startOnlineGame('3v3')">TEAM SURVIVAL (3V3)</button>
            
            <button class="btn-arcade" onclick="document.getElementById('ui-keybind-modal').style.display='flex'" style="margin-top: 15px !important; border-color: #888 !important; background: rgba(0,0,0,0.6) !important; color: #ccc !important;">⌨️ CONTROLS & SETTINGS</button>
        </div>
    `;
    container.className = "start-game-container modern-menu";
    container.style.display = "flex";
}

function PrepareGameStart() {
    if (document.activeElement) document.activeElement.blur(); // <-- ADD THIS LINE

    var container = document.querySelector(".start-game-container");
    if (container) container.style.display = "none";
    
    var stage = document.getElementById('pnlStage');
    if (stage) stage.style.opacity = 1;
    
    makeResponsive();
    ToggleSocialUI(false);

    var pad = document.getElementById("mobile-gamepad");
    if (pad) pad.className = "visible";
}
function ResetToMainMenu() {
    try {
        if (window.game_) {
            if (typeof game_.stop === 'function') game_.stop();
            if (typeof game_.end === 'function') game_.end();
            if (typeof game_.resetGameData === 'function') game_.resetGameData();
        }
    } catch(err) {
        console.warn("Reset error suppressed:", err);
    }

    var container = document.querySelector(".start-game-container");
    if (container) container.style.display = "flex";

    var stage = document.getElementById('pnlStage');
    if (stage) stage.style.opacity = "0";

    var charSelect = document.getElementById("customCharSelectUI");
    if (charSelect) {
        charSelect.style.display = "none";
        charSelect.classList.remove("active");
    }

    ToggleSocialUI(true);

    var pad = document.getElementById("mobile-gamepad");
    if (pad) pad.className = "";
    var cl = document.getElementById("custom-loader");
    if (cl) cl.style.display = "none";
      playMenuMusic();

}
window.cancelCharacterSelect = function() {
      window.invitedOpponentName = null;

    var ui = document.getElementById("customCharSelectUI");
    if (ui) {
        ui.style.display = "none";
        ui.classList.remove("active");
    }

    if (window.networkManager_) {
        if (networkManager_.webrtcTimeout) {
            clearTimeout(networkManager_.webrtcTimeout);
            networkManager_.webrtcTimeout = null;
        }
        if (networkManager_.socket) {
            networkManager_.socket.emit('leave_match');
            networkManager_.socket.emit('cancel_matchmaking');
        }
        for (var index in networkManager_.peers) {
            if (networkManager_.peers[index]) {
                try { networkManager_.peers[index].close(); } catch(e){}
            }
        }
        networkManager_.peers = {};

        for (var index in networkManager_.dataChannels) {
            if (networkManager_.dataChannels[index]) {
                try { networkManager_.dataChannels[index].close(); } catch(e){}
            }
        }
        networkManager_.dataChannels = {};

        networkManager_.isOnline = false;
        networkManager_.matchStarted = false;
        networkManager_.room = null;
    }

    ResetToMainMenu();
};
var onlineSelectedCharacters = {};
var onlineSelectedUsernames = {};

function CreateCustomCharSelectUI() {
    var ui = document.getElementById("customCharSelectUI");
    if (!ui) {
        ui = document.createElement("div");
        ui.id = "customCharSelectUI";
    }
    if (ui.parentNode !== document.body) {
        document.body.appendChild(ui);
    }
}



var sfvCharImages = {
    "ryu": "images/misc/misc/nc_ryu.png",
    "ken": "images/misc/misc/nc_ken.png",
    "sagat": "images/misc/misc/nc_sagat.png",
    "mbison": "images/misc/misc/nc_mbison.png",
  "homelander": "images/misc/misc/nc_homelander.png",
  "albertwesker": "images/misc/misc/nc_albertwesker.png",

    "akuma": "images/misc/misc/nc_akuma.png"
};

function formatFighterName(name) {
    if (!name) return "RYU";
  if (name.toLowerCase() === "homelander") return "HOMELANDER";
if (name.toLowerCase() === "albertwesker") return "WESKER";

    if (name.toLowerCase() === "mbison") return "M. BISON";
    return name.toUpperCase();
}

function ShowCustomOnlineCharSelect() {
    game_.resetPlayers();
    game_.resume();

    var pad = document.getElementById("mobile-gamepad");
    if (pad) pad.className = "";

    CreateCustomCharSelectUI();
    var ui = document.getElementById("customCharSelectUI");
    ui.classList.add("active");
    
    var myName = getMyUsername();
    var myIndex = networkManager_.playerIndex || 1;
    var totalPlayers = networkManager_.totalPlayers || 2;
    
    window.roomPlayerNames = window.roomPlayerNames || {};
    window.roomPlayerNames[myIndex] = myName;

    if (networkManager_.socket && networkManager_.room) {
        networkManager_.socket.emit('send_chat', {
            username: "SYSTEM_SIGNAL",
            message: "PLAYER_NAME|" + networkManager_.room + "|" + myIndex + "|" + myName
        });
    }

    var modeTitle = "ONLINE BATTLE (1V1)";
    if (totalPlayers === 4) modeTitle = "DRAMATIC BATTLE (2V2)";
    if (totalPlayers === 6) modeTitle = "TEAM SURVIVAL (3V3)";

    var leftColChars = ["ryu", "ken", "akuma", "albertwesker"];
    var rightColChars = ["mbison", "sagat", "homelander"];

    var leftCardsHtml = leftColChars.map(function(c) {
        return `
            <div id="char-btn-${c}" class="sfv-roster-card"
                 onmouseenter="previewCharHover('${c}', ${myIndex})"
                 onclick="SelectOnlineCharacter('${c}')">
                <img src="${sfvCharImages[c]}" draggable="false" />
            </div>
        `;
    }).join('');

    var rightCardsHtml = rightColChars.map(function(c) {
        return `
            <div id="char-btn-${c}" class="sfv-roster-card"
                 onmouseenter="previewCharHover('${c}', ${myIndex})"
                 onclick="SelectOnlineCharacter('${c}')">
                <img src="${sfvCharImages[c]}" draggable="false" />
            </div>
        `;
    }).join('');

    var leftTeamHtml = "";
    var rightTeamHtml = "";

    if (totalPlayers === 2) {
        var p1Fallback = (myIndex === 1) ? myName : (window.invitedOpponentName || 'CONNECTING...');
        var p2Fallback = (myIndex === 2) ? myName : (window.invitedOpponentName || 'CONNECTING...');

        var p1Name = window.roomPlayerNames[1] || p1Fallback;
        var p2Name = window.roomPlayerNames[2] || p2Fallback;
        
        var p1Plays = p1Name !== 'CONNECTING...' ? getPlayerPlays(p1Name) : 0;
        var p2Plays = p2Name !== 'CONNECTING...' ? getPlayerPlays(p2Name) : 0;

        leftTeamHtml = `
            <div class="sfv-fighter-showcase sfv-showcase-p1">
                <img id="sfv-art-1" class="sfv-showcase-art" src="${sfvCharImages['ryu']}" />
                <div id="sfv-name-1" class="sfv-fighter-name">RYU</div>
                <div class="sfv-player-pill">
                    <span class="sfv-pill-tag sfv-tag-1p">1P</span>
                    <span id="sfv-user-1" class="sfv-player-name">${p1Name}</span>
                    <span id="sfv-plays-1" class="sfv-plays-count">${p1Name !== 'CONNECTING...' ? p1Plays + ' PLAYS' : ''}</span>
                </div>
            </div>
        `;
        rightTeamHtml = `
            <div class="sfv-fighter-showcase sfv-showcase-p2">
                <img id="sfv-art-2" class="sfv-showcase-art" src="${sfvCharImages['mbison']}" />
                <div id="sfv-name-2" class="sfv-fighter-name">M. BISON</div>
                <div class="sfv-player-pill">
                    <span id="sfv-plays-2" class="sfv-plays-count">${p2Name !== 'CONNECTING...' ? p2Plays + ' PLAYS' : ''}</span>
                    <span id="sfv-user-2" class="sfv-player-name">${p2Name}</span>
                    <span class="sfv-pill-tag sfv-tag-2p">2P</span>
                </div>
            </div>
        `;
    } else {
        var teamCount = Math.floor(totalPlayers / 2);
        var team1Cards = "";
        var team2Cards = "";

        for (var p = 1; p <= totalPlayers; p += 2) {
            var isLocal = (p === myIndex);
            var displayName = isLocal ? myName : (window.roomPlayerNames[p] || 'CONNECTING...');
            var plays = displayName !== 'CONNECTING...' ? getPlayerPlays(displayName) : 0;
            var playsHtml = displayName !== 'CONNECTING...' ? `<span id="sfv-plays-${p}" class="sfv-plays-count">${plays} PLAYS</span>` : `<span id="sfv-plays-${p}" class="sfv-plays-count"></span>`;

            team1Cards += `
                <div id="sfv-slot-box-${p}" class="sfv-team-slot-card">
                    <img id="sfv-art-${p}" class="sfv-slot-thumb" src="${sfvCharImages['ryu']}" />
                    <div class="sfv-slot-details">
                        <div id="sfv-name-${p}" class="sfv-slot-fighter">RYU</div>
                        <div class="sfv-slot-user">
                            <span class="sfv-pill-tag sfv-tag-1p">P${p}</span>
                            <span id="sfv-user-${p}">${displayName}</span>
                            ${playsHtml}
                        </div>
                    </div>
                </div>
            `;
        }
    
        for (var p = 2; p <= totalPlayers; p += 2) {
            var isLocal = (p === myIndex);
            var displayName = isLocal ? myName : (window.roomPlayerNames[p] || 'CONNECTING...');
            var plays = displayName !== 'CONNECTING...' ? getPlayerPlays(displayName) : 0;
            var playsHtml = displayName !== 'CONNECTING...' ? `<span id="sfv-plays-${p}" class="sfv-plays-count">${plays} PLAYS</span>` : `<span id="sfv-plays-${p}" class="sfv-plays-count"></span>`;

            team2Cards += `
                <div id="sfv-slot-box-${p}" class="sfv-team-slot-card">
                    <img id="sfv-art-${p}" class="sfv-slot-thumb" src="${sfvCharImages['mbison']}" />
                    <div class="sfv-slot-details">
                        <div id="sfv-name-${p}" class="sfv-slot-fighter">M. BISON</div>
                        <div class="sfv-slot-user">
                            ${playsHtml}
                            <span id="sfv-user-${p}">${displayName}</span>
                            <span class="sfv-pill-tag sfv-tag-2p">P${p}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        leftTeamHtml = `
            <div class="sfv-fighter-showcase sfv-showcase-p1 sfv-mode-team">
                <div class="sfv-team-slots sfv-team-count-${teamCount}">${team1Cards}</div>
            </div>
        `;
        rightTeamHtml = `
            <div class="sfv-fighter-showcase sfv-showcase-p2 sfv-mode-team">
                <div class="sfv-team-slots sfv-team-slots-p2 sfv-team-count-${teamCount}">${team2Cards}</div>
            </div>
        `;
    }

    ui.innerHTML = `
        <div class="sfv-cs-screen">
            <div class="sfv-ambient-1p"></div>
            <div class="sfv-ambient-2p"></div>

            <div class="sfv-v-lines">
                <div class="sfv-v-line-left"></div>
                <div class="sfv-v-line-right"></div>
            </div>

            ${leftTeamHtml}

            <div class="sfv-center-wedge">
                <div class="sfv-wedge-header">
                    <div class="sfv-match-badge">
                        <span>${modeTitle}</span>
                    </div>
                    <div class="sfv-header-lines">
                        <div class="sfv-title-text">CHARACTER SELECT</div>
                    </div>
                    <div class="sfv-vs-text">VS</div>
                </div>

                <div class="sfv-v-roster-box">
                    <div class="sfv-col-left">${leftCardsHtml}</div>
                    <div class="sfv-col-right">${rightCardsHtml}</div>
                </div>

                <div id="charSelectStatus">CHOOSE YOUR FIGHTER</div>
                <!-- GUARANTEED WORKING CANCEL BUTTON -->
                <button type="button" onclick="window.cancelCharacterSelect()" class="cancel-btn-arcade" style="position: relative; z-index: 100; pointer-events: auto !important; font-size: 15px; padding: 5px 22px; margin-top: 4px;">X CANCEL MATCH</button>
            </div>

            ${rightTeamHtml}
        </div>
    `;

    ui.style.display = "block";
}

window.previewCharHover = function(charName, pIndex) {
    if (onlineSelectedCharacters[pIndex]) return;
    var art = document.getElementById("sfv-art-" + pIndex);
    var nameEl = document.getElementById("sfv-name-" + pIndex);
    if (art && sfvCharImages[charName]) art.src = sfvCharImages[charName];
    if (nameEl) nameEl.innerText = formatFighterName(charName);
};

window.SelectOnlineCharacter = function(charName) {
    var myName = getMyUsername();
    var myIndex = networkManager_.playerIndex || 1;

    if (networkManager_.socket) {
        networkManager_.socket.emit('char_select_input', {
            room: networkManager_.room,
            playerIndex: myIndex,
            charName: charName,
            username: myName
        });
    }

    RegisterCharacterSelection(myIndex, charName, myName);
};

function RegisterCharacterSelection(index, charName, username) {
    onlineSelectedCharacters[index] = charName;
    onlineSelectedUsernames[index] = username || ("Player " + index);
    
    var art = document.getElementById("sfv-art-" + index);
    var nameEl = document.getElementById("sfv-name-" + index);
    var userEl = document.getElementById("sfv-user-" + index);
    var playsEl = document.getElementById("sfv-plays-" + index);
    var slotBox = document.getElementById("sfv-slot-box-" + index);
    
    if (art && sfvCharImages[charName]) art.src = sfvCharImages[charName];
    if (nameEl) nameEl.innerText = formatFighterName(charName);
    if (userEl) userEl.innerText = onlineSelectedUsernames[index];
    if (playsEl) {
        var pCount = getPlayerPlays(onlineSelectedUsernames[index]);
        playsEl.innerText = pCount + " PLAYS";
    }
    if (slotBox) slotBox.classList.add("locked");

    var selBtn = document.getElementById('char-btn-' + charName);
    if (selBtn) {
        selBtn.classList.add(index % 2 !== 0 ? "locked-1p" : "locked-2p");
    }

    if (index === networkManager_.playerIndex) {
        var cards = document.querySelectorAll('.sfv-roster-card');
        cards.forEach(function(c) { c.style.pointerEvents = 'none'; });
    }

    var count = Object.keys(onlineSelectedCharacters).length;
    var stEl = document.getElementById("charSelectStatus");

    if (stEl) {
        if (onlineSelectedCharacters[networkManager_.playerIndex]) {
            stEl.innerHTML = "FIGHTER LOCKED. WAITING (" + count + "/" + networkManager_.totalPlayers + ")";
        } else {
            stEl.innerHTML = "PLAYERS READY: " + count + "/" + networkManager_.totalPlayers;
        }
    }

    if (count >= networkManager_.totalPlayers) {
        if (stEl) {
            stEl.innerHTML = "STARTING MATCH...";
            stEl.style.borderColor = "#00e5ff";
            stEl.style.color = "#00e5ff";
        }
        if (networkManager_.socket) {
            networkManager_.socket.emit('client_ready_to_start', networkManager_.room);
        }
    }
}


function StartOnlineMatchFromSelection() {
      stopMenuMusic();

      $$init();

    var ui = document.getElementById("customCharSelectUI");
    if (ui) {
        ui.style.display = "none";
        ui.classList.remove("active");
    }

    var pad = document.getElementById("mobile-gamepad");
    if (pad) pad.classList.add("visible");

    var t1 = []; var t2 = [];
    var isTeamMode = networkManager_.totalPlayers > 2;
    game_.setTeamMode(isTeamMode);
    
    game_.resetPlayers();
    game_.resume();

    var characterPickCount = {};
    
    for (var i = 1; i <= networkManager_.totalPlayers; i++) {
        var cName = onlineSelectedCharacters[i] || "ryu";
        var charEnum = GetCharacterEnum(cName);
        var uObj = getUserByIndex(i);
        
        characterPickCount[cName] = (characterPickCount[cName] || 0) + 1;
        var useAltColor = (characterPickCount[cName] % 2 === 0);
        
        if (uObj) {
            uObj.IsAI = false;
            if(typeof uObj.disableAI === 'function') uObj.disableAI();
            uObj.customUsername = onlineSelectedUsernames[i] || ("Player " + i);
            uObj.setChar(charEnum, useAltColor, false);
            if (i % 2 !== 0) { t1.push(i - 1); } else { t2.push(i - 1); }
        }
    }
    
    var selectedStageName = networkManager_.matchStage || "akuma";
    var stage = stages_[selectedStageName] || stages_["akuma"];
    
    if (networkManager_.socket) networkManager_.socket.emit('record_match_played', getMyUsername());
      networkManager_.matchResultRecorded = false;
    
    game_.startMatch(false, t1, t2, stage);
}

var NetworkManager = function() {
    this.socket = null; this.room = null;
    this.playerIndex = 0; this.totalPlayers = 2;
    this.isOnline = false; this.pingInterval = null;
    this.matchStage = "akuma";
    this.inputBuffer = [];
    this.peers = {};        
    this.dataChannels = {};
      this.leaderboardData = {};

};
NetworkManager.prototype.activateWebSocketFallback = function(reason) {
    if (!this.room || !this.isOnline) return;

    if (this.webrtcTimeout) {
        clearTimeout(this.webrtcTimeout);
        this.webrtcTimeout = null;
    }

    this.useWebSocketRelay = true;

    for (var index in this.peers) {
        if (this.peers[index]) {
            try { this.peers[index].close(); } catch (e) {}
        }
    }
    this.peers = {};
    this.dataChannels = {};

    var msgBox = document.getElementById("ui-chat-messages");
    if (msgBox) {
        msgBox.innerHTML += `<div class="chat-msg" style="color:var(--sf-orange);"><em>System: ${escapeHTML(reason)} Switched to WS relay.</em></div>`;
        msgBox.scrollTop = msgBox.scrollHeight;
    }

    if (!this.matchStarted) {
        StartOnlineMatchFromSelection();
    }
};

NetworkManager.prototype.sendGameData = function(type, payload) {
    payload.type = type;
    var payloadStr = JSON.stringify(payload);
    var sentP2P = false;

    if (!this.useWebSocketRelay) {
        for (var targetIndex in this.dataChannels) {
            var channel = this.dataChannels[targetIndex];
            if (channel && channel.readyState === 'open') {
                channel.send(payloadStr);
                sentP2P = true;
            }
        }
    }

    if (!sentP2P && this.socket) {
        this.socket.emit(type, payload);
    }
};
   NetworkManager.prototype.initWebRTC = function() {
    var self = this;
    this.iceCandidateQueue = {};
    this.useWebSocketRelay = false;
    var rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

    var cl = document.getElementById("custom-loader");
    if (cl) {
        cl.innerHTML = "<div class='loader-spinner'></div><div style='font-size:12px; font-weight:bold; color:#fff; text-shadow: 2px 2px 0 #000; margin-top:20px;'>ESTABLISHING CONNECTION...</div>";
        cl.style.display = "flex";
    }

    if (this.webrtcTimeout) clearTimeout(this.webrtcTimeout);
    
    this.webrtcTimeout = setTimeout(function() {
        console.warn("[Network] wRTC failed or timed out. Falling back to WS Relay.");
        
        if (self.socket) {
            self.socket.emit('send_chat', {
                username: "SYSTEM_SIGNAL",
                message: "WEBRTC_FALLBACK|" + self.room
            });
        }

        self.activateWebSocketFallback("Connection timed out.");
    }, 8000);

    for (var i = 1; i <= this.totalPlayers; i++) {
        if (i === this.playerIndex) continue;

        if (this.playerIndex < i) {
            const targetIndex = i;
            const peer = new RTCPeerConnection(rtcConfig);
            this.peers[targetIndex] = peer;

            const channel = peer.createDataChannel('game_data_' + targetIndex, { ordered: true });
            this.dataChannels[targetIndex] = channel;
            this.setupDataChannel(channel, targetIndex);

            peer.onicecandidate = function(e) {
                if (e.candidate) self.socket.emit('webrtc_signal', { room: self.room, playerIndex: self.playerIndex, targetIndex: targetIndex, signal: { type: 'candidate', candidate: e.candidate } });
            };

            peer.createOffer().then(o => peer.setLocalDescription(o)).then(() => {
                self.socket.emit('webrtc_signal', { room: self.room, playerIndex: self.playerIndex, targetIndex: targetIndex, signal: { type: 'offer', offer: peer.localDescription } });
            });
        }
    }
};
  

NetworkManager.prototype.setupDataChannel = function(channel, targetIndex) {
    var self = this;
    channel.onopen = function() {
        console.log("Connection Started " + targetIndex);
        
        var openChannelsCount = 0;
        for (var index in self.dataChannels) {
            if (self.dataChannels[index].readyState === 'open') {
                openChannelsCount++;
            }
        }

        var expectedChannels = self.totalPlayers - 1;
        if (openChannelsCount >= expectedChannels) {
            console.log("All WRTC connections established! Starting match.");
            if (self.webrtcTimeout) {
                clearTimeout(self.webrtcTimeout);
                self.webrtcTimeout = null;
            }
            StartOnlineMatchFromSelection();
        }
    };

    channel.onclose = function() {
        if (!self.useWebSocketRelay && self.isOnline) {
            console.warn("WebRTC data channel closed. Falling back to WebSocket relay.");
            self.activateWebSocketFallback("link disconnected.");
        }
    };

    channel.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.type === 'game_input') {
            var remoteUser = getUserByIndex(data.playerIndex);
            if (data.inputName && remoteUser && data.playerIndex !== self.playerIndex) {
                var logicalKey = remoteUser[data.inputName];
                if (logicalKey) self.inputBuffer.push({ isLocal: false, isDown: data.isDown, key: logicalKey, frame: data.targetFrame, user: remoteUser });
            }
        } else if (data.type === 'frame_sync') {
            if (data.frame > (self.lastReceivedOpponentFrame || 0)) self.lastReceivedOpponentFrame = data.frame;
        }
    };
};
  
NetworkManager.prototype.login = function() {
    if (this.socket) {
        var myName = getMyUsername();
        var myAvatar = localStorage.getItem('sfa_avatar') || 'ryu';
        if (myName) {
            this.socket.emit('login', myName);
            this.socket.emit('set_avatar', myAvatar);
            
            this.socket.emit('send_chat', {
                username: "SYSTEM_SIGNAL",
                message: "AVATAR_UPDATE|" + myName + "|" + myAvatar
            });
        }
    }
};



  NetworkManager.prototype.setupSocialUI = function() {
    var self = this;
    if (!document.getElementById("ui-keybind-modal")) {
        var actions = [
            { id: "Up", label: "JUMP" }, { id: "Down", label: "CROUCH" }, { id: "Left", label: "MOVE LEFT" }, { id: "Right", label: "MOVE RIGHT" },
            { id: "P1", label: "LIGHT PUNCH" }, { id: "P2", label: "MED PUNCH" }, { id: "P3", label: "HARD PUNCH" },
            { id: "K1", label: "LIGHT KICK" }, { id: "K2", label: "MED KICK" }, { id: "K3", label: "HARD KICK" },
            { id: "Start", label: "START / TAUNT" }
        ];

        var rowsHtml = actions.map(function(a) {
            var padBtn = window.customPadKeys[a.id];
            var currentLabel = (padBtn !== undefined && padButtonLabels[padBtn])
                ? padButtonLabels[padBtn]
                : (window.customKeyNames[a.id] || "NONE");

            return `<div class="keybind-row"><span>${a.label}</span> <button class="keybind-btn" id="btn-bind-${a.id}" onclick="startBinding('${a.id}')">${currentLabel}</button></div>`;
        }).join('');

        var modal = document.createElement("div");
        modal.id = "ui-keybind-modal";

        var bgmStatusText = isMusicMuted ? "OFF" : "ON";
        var bgmStatusColor = isMusicMuted ? "#ff2a4b" : "#0f0";

        modal.innerHTML = `
            <div class='search-popup-box' style='padding: 20px 40px; background: rgba(10,10,10,0.95); border: 2px solid var(--sf-red);'>
                <div style='font-size:32px; font-weight:bold; letter-spacing:2px; margin-bottom:12px; color:var(--sf-orange); text-shadow: 2px 2px 0px #000; font-family:"Bebas Neue";'>CONTROLS & SETTINGS</div>

                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.5); border: 1px solid #444; border-left: 3px solid var(--sf-orange); padding: 6px 14px; border-radius: 4px; margin-bottom: 15px; box-sizing: border-box;">
                    <span style="font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: #fff; letter-spacing: 1px;">MENU MUSIC (BGM)</span>
                    <button id="btn-toggle-bgm" class="keybind-btn" onclick="window.toggleMenuMusicSetting()" style="min-width: 60px; font-size: 16px; padding: 2px 10px; color: ${bgmStatusColor}; border-color: ${bgmStatusColor};">
                        ${bgmStatusText}
                    </button>
                </div>

                <div id="keybind-container">${rowsHtml}</div>
                
                <div style="display: flex; gap: 15px; justify-content: center; margin-top:20px; width: 100%;">
                    <button class="cancel-btn-arcade" id="btn-reset-keybinds" style="flex: 1; font-size:16px; padding: 5px 0; border-color: var(--sf-orange); color: var(--sf-orange);">RESET DEFAULTS</button>
                    <button class="cancel-btn-arcade" id="btn-close-keybinds" style="flex: 1; font-size:16px; padding: 5px 0;">DONE</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById("btn-close-keybinds").addEventListener("click", function() { modal.style.display = "none"; });

        document.getElementById("btn-reset-keybinds").addEventListener("click", function() {
            localStorage.removeItem('sfa_custom_keys');
            localStorage.removeItem('sfa_custom_keynames');
            localStorage.removeItem('sfa_custom_pad_keys');

            window.customKeys = Object.assign({}, defaultKeys);
            window.customKeyNames = Object.assign({}, defaultKeyNames);
            window.customPadKeys = Object.assign({}, defaultPadBindings);

            updateLocalControlsMap();
            if (window.user1_) {
                for (var act in window.customKeys) {
                    window.user1_[act] = window.customKeys[act];
                }
            }

            actions.forEach(function(a) {
                var btn = document.getElementById("btn-bind-" + a.id);
                if (btn) {
                    var padBtn = window.customPadKeys[a.id];
                    var currentLabel = (padBtn !== undefined && padButtonLabels[padBtn])
                        ? padButtonLabels[padBtn]
                        : (window.customKeyNames[a.id] || "NONE");
                    btn.innerText = currentLabel;
                    btn.classList.remove("listening");
                }
            });

            window.activeBindingAction = null;
            if (window.playAcousticClick) window.playAcousticClick();
        });

        window.activeBindingAction = null;

        window.startBinding = function(action) {
            var btn = document.getElementById("btn-bind-" + action);
            if (!btn) return;

            var prev = document.querySelector(".keybind-btn.listening");
            if (prev) {
                prev.classList.remove("listening");
                var prevAction = prev.id.replace("btn-bind-", "");
                var prevPad = window.customPadKeys[prevAction];
                prev.innerText = prevPad !== undefined ? (padButtonLabels[prevPad] || "PAD " + prevPad) : window.customKeyNames[prevAction];
            }

            btn.innerText = "PRESS KEY / PAD...";
            btn.classList.add("listening");
            
            window.activeBindingAction = action;
            window.bindingStartTime = performance.now();
            window._bindingControllerCleared = false; // Force wait for release

            var bindKeyHandler = function(e) {
                // Ignore fast keyboard events generated by UI button clicks
                if (performance.now() - window.bindingStartTime < 300) {
                    e.preventDefault(); e.stopPropagation(); return;
                }

                // FIX: If a gamepad button is physically held down, IGNORE KEYBOARD EVENTS.
                // This stops Windows from mapping 'A' as 'Enter' or 'B' as 'Escape'!
                var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
                for (var i = 0; i < Math.min(gamepads.length, 2); i++) {
                    var p = gamepads[i];
                    if (p) {
                        for (var bIdx = 0; bIdx < p.buttons.length; bIdx++) {
                            var b = p.buttons[bIdx];
                            if ((typeof b === "object" ? b.pressed : b > 0.5)) {
                                e.preventDefault(); e.stopPropagation(); return; // Let Gamepad loop handle it
                            }
                        }
                    }
                }

                e.preventDefault();
                e.stopPropagation();

                var code = e.keyCode || e.which;
                var keyName = e.key.toUpperCase();

                if (code === 27) { // Escape
                    document.removeEventListener("keydown", bindKeyHandler);
                    btn.classList.remove("listening");
                    var curPad = window.customPadKeys[action];
                    btn.innerText = curPad !== undefined ? (padButtonLabels[curPad] || "PAD " + curPad) : window.customKeyNames[action];
                    window.activeBindingAction = null;
                    return;
                }

                if (code === 16 || code === 17 || code === 18 || code === 91) return;
                if (keyName === " ") keyName = "SPACE";

                window.customKeys[action] = code;
                window.customKeyNames[action] = keyName;
                delete window.customPadKeys[action];

                localStorage.setItem('sfa_custom_keys', JSON.stringify(window.customKeys));
                localStorage.setItem('sfa_custom_keynames', JSON.stringify(window.customKeyNames));
                localStorage.setItem('sfa_custom_pad_keys', JSON.stringify(window.customPadKeys));

                updateLocalControlsMap();
                if (window.user1_) { window.user1_[action] = code; }

                btn.innerText = keyName;
                btn.classList.remove("listening");
                window.activeBindingAction = null;
                document.removeEventListener("keydown", bindKeyHandler);
            };

            // Delay attaching listener slightly to let UI click events clear
            setTimeout(function() { document.addEventListener("keydown", bindKeyHandler); }, 50);
        };
    }
    
    
    // Create Profile, Ping, Discord, Lobbies, Friends, and Chat UIs (Keeping the rest of your UI intact)
    if (!document.getElementById("ui-profile-btn")) {
        var profBtn = document.createElement("div");
        profBtn.id = "ui-profile-btn";
        profBtn.onclick = function() { window.showMyProfileModal(); };
        document.body.appendChild(profBtn);
        window.updateProfileButtonUI();
    }
  
    if (!document.getElementById("ui-ping")) {
        var pEl = document.createElement("div");
        pEl.id = "ui-ping";
        pEl.innerHTML = `<span id="wifi-icon">...</span> <span id="ping-text">-- ms</span>`;
        document.body.appendChild(pEl);
    }
    if (!document.getElementById("ui-discord")) {
        var dEl = document.createElement("a");
        dEl.id = "ui-discord";
        dEl.href = "https://discord.gg/td4qqkBXgv";
        dEl.target = "_blank";
        dEl.innerHTML = `
            <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" style="width: 20px; height: auto;" />
            <span>DISCORD</span>
        `;
        document.body.appendChild(dEl);
    }
  
    if (!document.getElementById("ui-lobbies")) {
        var lobEl = document.createElement("div");
        lobEl.id = "ui-lobbies";
        lobEl.innerHTML = `
            <div class="lobby-bar-header">NETWORK STATUS</div>
            <div style="padding: 10px 14px 6px 14px;">
                <div class="lobby-stat" onclick="showOnlinePlayersPopup()" style="cursor: pointer;">
                    FIGHTERS ONLINE: <span id="stat-players" style="text-decoration: underline; color: var(--sf-orange); transition: 0.2s;">0</span>
                </div>
                <div class="lobby-stat">ACTIVE BATTLES: <span id="stat-matches">0</span></div>
            </div>
            <div class="lobby-bar-header" style="border-top: 1px solid rgba(255,60,60,0.3);">TOP FIGHTERS</div>
            <div style="padding: 8px 14px 12px 14px;">
                <div id="ui-leaderboard-list">
                    <div class="lobby-stat" style="color:#888;">LOADING DATA...</div>
                </div>
                <div class="leaderboard-link-container">
                    <a href="https://sfa-multiplayer.ct.ws/leaderboard" target="_blank" class="leaderboard-lnk" onmouseover="this.style.color='#fff'; this.querySelector('svg').style.fill='#fff';" onmouseout="this.style.color='var(--sf-orange)'; this.querySelector('svg').style.fill='#aaa';">
                        <svg viewBox="0 0 12 12">
                            <rect x="2" y="1" width="8" height="1"/>
                            <rect x="1" y="2" width="2" height="1"/>
                            <rect x="9" y="2" width="2" height="1"/>
                            <rect x="0" y="3" width="2" height="2"/>
                            <rect x="10" y="3" width="2" height="2"/>
                            <rect x="3" y="2" width="6" height="4"/>
                            <rect x="1" y="5" width="2" height="1"/>
                            <rect x="9" y="5" width="2" height="1"/>
                            <rect x="4" y="6" width="4" height="1"/>
                            <rect x="5" y="7" width="2" height="2"/>
                            <rect x="4" y="9" width="4" height="1"/>
                            <rect x="3" y="10" width="6" height="1"/>
                        </svg>
                        <span>VIEW FULL LEADERBOARD</span>
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(lobEl);
    }

    if (!document.getElementById("ui-friends")) {
        var frEl = document.createElement("div");
        frEl.id = "ui-friends";
        frEl.innerHTML = `
            <div id="ui-friends-header">FRIENDS LIST</div>
            <div id="ui-friends-list"></div>
            <div id="ui-add-friend-container">
                <input type="text" id="ui-add-friend-input" placeholder="USERNAME..." maxlength="8" autocomplete="off">
                <button id="btn-add-friend">ADD</button>
            </div>
        `;
        document.body.appendChild(frEl);

        function handleAddFriendSubmit() {
            var inputEl = document.getElementById("ui-add-friend-input");
var fName = inputEl.value.trim();
            if (fName !== "" && self.socket) {
                self.socket.emit('add_friend', { myName: getMyUsername(), friendName: fName });
                inputEl.value = "";
            }
        }

        document.getElementById("btn-add-friend").addEventListener("click", handleAddFriendSubmit);

        var addInput = document.getElementById("ui-add-friend-input");
        addInput.addEventListener('keydown', function(e) {
            e.stopPropagation();
            if (e.key === 'Enter') {
                handleAddFriendSubmit();
            }
        });
        addInput.addEventListener('keyup', function(e) { e.stopPropagation(); });
    }
  
    if (!document.getElementById("ui-chat")) {
        var chatEl = document.createElement("div");
        chatEl.id = "ui-chat";
        chatEl.innerHTML = `
            <div id="ui-chat-header">GLOBAL CHAT</div>
            <div id="ui-chat-messages">
                <div class="chat-msg" style="color:#aaa;"><em>System: Connected to global arena.</em></div>
                <div class="chat-msg" style="color:#ff7300;"><em>System: Visit our website: <a href="https://sfa-multiplayer.ct.ws/" target="_blank" style="color:#fff; text-decoration:underline;">Click Here</a></em></div>
                <div class="chat-msg" style="color:#ff7300;"><em>System: Leave feedback in <a href="https://discord.gg/td4qqkBXgv" target="_blank" style="color:#5865F2; text-decoration:underline; font-weight:bold;">Discord</a>.</em></div>
            </div>
            <div id="ui-emoji-menu">
                <span class="emoji-item">😀</span><span class="emoji-item">😡</span><span class="emoji-item">😭</span>
                <span class="emoji-item">👊</span><span class="emoji-item">🔥</span><span class="emoji-item">💀</span>
                <span class="emoji-item">⭐</span><span class="emoji-item">🏆</span><span class="emoji-item">❤️</span>
            </div>
            <div id="ui-chat-input-container">
                <input type="text" id="ui-chat-input" placeholder="PRESS ENTER..." maxlength="50" autocomplete="off" />
                <button id="btn-emoji">:)</button>
            </div>
        `;
        document.body.appendChild(chatEl);

        self.lastChatTime = 0;
        var chatInput = document.getElementById("ui-chat-input");
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && chatInput.value.trim() !== '') {
                if (game_.hasState && game_.hasState(GAME_STATES.MATCH)) { chatInput.blur(); return; }
                
                var now = Date.now();
                if (now - self.lastChatTime < 2000) {
                    var remaining = Math.ceil((2000 - (now - self.lastChatTime)) / 1000);
                    var msgBox = document.getElementById("ui-chat-messages");
                    if (msgBox) {
                        msgBox.innerHTML += `<div class="chat-msg" style="color:var(--sf-red);"><em>System: Slow down! Wait ${remaining}s before chatting again.</em></div>`;
                        msgBox.scrollTop = msgBox.scrollHeight;
                    }
                    return;
                }

                var msgText = chatInput.value.trim();
                var emojiMap = {
                    ":)": "😀", ":(": "😭", ":D": "😀",
                    "<3": "❤️", ":fire": "🔥", ":ko": "💀",
                    ":win": "🏆", ":skull": "💀", ":star": "⭐"
                };
                for (var key in emojiMap) {
                    msgText = msgText.split(key).join(emojiMap[key]);
                }
                msgText = msgText.slice(0, 50);
                self.lastChatTime = now;

                if (self.socket) {
                    self.socket.emit('send_chat', { username: getMyUsername(), message: msgText });
                }
                chatInput.value = '';
            }
        });
      
        chatInput.addEventListener('focus', function() { window.isTypingInChat = true; });
        chatInput.addEventListener('blur', function() { window.isTypingInChat = false; });
    
        document.getElementById("btn-emoji").addEventListener("click", function() {
            var menu = document.getElementById("ui-emoji-menu");
            menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
        });

        var emojis = document.querySelectorAll(".emoji-item");
        emojis.forEach(function(em) {
            em.addEventListener("click", function() {
                var input = document.getElementById("ui-chat-input");
                input.value += this.innerText;
                input.focus();
                document.getElementById("ui-emoji-menu").style.display = "none";
            });
        });
    }

    if (!document.getElementById("ui-invite-modal")) {
        var invModal = document.createElement("div");
        invModal.id = "ui-invite-modal";
        invModal.style.cssText = "display: none; position: fixed; top: 0; left: 0; width: 100vw !important; height: 100vh !important; background: rgba(0, 0, 0, 0.6) !important; backdrop-filter: blur(4px); z-index: 25000; flex-direction: column; align-items: center; justify-content: center; transform: none !important; border: none !important; box-shadow: none !important; padding: 0 !important;";
        
        var style = document.createElement("style");
        style.innerHTML = `
            #ui-invite-modal .search-popup-box { transform-origin: center; transition: transform 0.2s ease; }
            @media (min-width: 2500px) { #ui-invite-modal .search-popup-box { transform: scale(1.6) !important; } }
            @media (min-width: 3800px) { #ui-invite-modal .search-popup-box { transform: scale(2.4) !important; } }
            @media (max-width: 900px), (max-height: 500px) { #ui-invite-modal .search-popup-box { transform: scale(0.85) !important; } }
        `;
        document.head.appendChild(style);

        invModal.innerHTML = `
            <article class='search-popup-box'>
                <header style='font-size:36px; font-weight:bold; letter-spacing:2px; margin-bottom:15px; color:#fff; text-shadow: 3px 3px 0px var(--sf-red); transform: skewX(-15deg); line-height: 1.2;'>
                    CHALLENGE FROM <br><span id="invite-from-name" style="color:var(--sf-orange);"></span>!
                </header>
                <section style="display:flex; gap: 15px; justify-content: center;">
                    <button class="cancel-btn-arcade" id="btn-accept-invite" style="border-color: #0f0; color: #0f0; box-shadow: 0 0 10px rgba(0,255,0,0.5);">ACCEPT</button>
                    <button class="cancel-btn-arcade" id="btn-decline-invite">DECLINE</button>
                </section>
            </article>
        `;
        document.body.appendChild(invModal);

        document.getElementById("btn-accept-invite").addEventListener("click", function() {
            $$init();
            var host = document.getElementById("ui-invite-modal").getAttribute("data-host");
            window.invitedOpponentName = host;
            if (self.socket) self.socket.emit('accept_invite', { hostName: host, guestName: getMyUsername() });
            document.getElementById("ui-invite-modal").style.display = "none";
            
            PrepareGameStart();
            var cl = document.getElementById("custom-loader");
            if(cl) { cl.innerHTML = "<div class='loader-spinner'></div><div style='font-size:12px; font-weight:bold;'>Joining Private Match...</div>"; cl.style.display = "flex"; }
        });

        document.getElementById("btn-decline-invite").addEventListener("click", function() {
            var host = document.getElementById("ui-invite-modal").getAttribute("data-host");
            if (self.socket) {
                self.socket.emit('send_chat', {
                    username: "SYSTEM_SIGNAL",
                    message: "DECLINE_INVITE|" + host + "|" + getMyUsername()
                });
            }
            document.getElementById("ui-invite-modal").style.display = "none";
            makeUIDraggable(document.getElementById("ui-friends"), document.getElementById("ui-friends-header"));
            makeUIDraggable(document.getElementById("ui-chat"), document.getElementById("ui-chat-header"));
        });
    }
};

window.SendInvite = function(friendName) {
    $$init();
    window.invitedOpponentName = friendName;
    if (networkManager_.socket) {
        networkManager_.socket.emit('send_invite', { fromName: getMyUsername(), toName: friendName });
        
        var cl = document.getElementById("custom-loader");
        if (cl) {
            cl.innerHTML = `
                <div class='search-popup-box'>
                    <div style='font-size:36px; font-weight:bold; letter-spacing:2px; margin-bottom:5px; color:#fff; text-shadow: 3px 3px 0px var(--sf-red); transform: skewX(-15deg);'>
                        CHALLENGING FIGHTER...
                    </div>
                    
                    <div id="matchmaking-counter" style="font-size:22px; color:#F3C300; font-family:'Bebas Neue', sans-serif; letter-spacing:2px; margin-bottom: 15px; transform: skewX(-15deg); text-shadow: 2px 2px 0 #000;">
                        WAITING FOR ${escapeHTML(friendName)} TO ACCEPT
                    </div>

                    <div class='arcade-meter-bg' style='margin-bottom:25px;'><div class='arcade-meter-fill'></div></div>

                    <button onclick='document.getElementById("custom-loader").style.display="none"; ToggleSocialUI(true);' class='cancel-btn-arcade'>X CANCEL</button>
                </div>
            `;
            cl.style.display = "flex";
        }
    }
};

function makeUIDraggable(windowElement, handleElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (handleElement) {
        handleElement.onmousedown = dragMouseDown;
        handleElement.ontouchstart = dragMouseDown;
    }
    function dragMouseDown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        e.preventDefault();
        pos3 = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        pos4 = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }
    function elementDrag(e) {
        e.preventDefault();
        var clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        var clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX; pos4 = clientY;
        windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
        windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
        windowElement.style.bottom = "auto";
        windowElement.style.right = "auto";  
    }
    function closeDragElement() {
        document.onmouseup = null; document.onmousemove = null;
        document.ontouchend = null; document.ontouchmove = null;
    }
}
NetworkManager.prototype.init = function() {
    try {
        this.socket = io('/', { path: '/sfa-socket/' });
    }
    catch(e) { console.error("Could not connect to socket server.", e); return; }

    var self = this;
    this.matchStarted = false;
    this.setupSocialUI();
        this.socket.on('connect', function() {
        self.login();
    });

    setTimeout(() => this.login(), 500);

    this.socket.on('pong_response', function(clientTime) {
        var latency = Date.now() - (clientTime || self.lastPingTime);
        self.currentPing = latency;
        if(self.socket) self.socket.emit('report_ping', latency);
        
        var pingEl = document.getElementById("ui-ping");
        var pingText = document.getElementById("ping-text");
        var wifiIcon = document.getElementById("wifi-icon");
        
        if(pingEl && pingText && wifiIcon) {
            pingEl.style.display = "flex";
            pingText.innerText = latency + " ms";
            if (latency < 80) { pingEl.style.color = "#0f0"; wifiIcon.innerHTML = "&#9608;&#9608;&#9608;"; }
            else if (latency < 150) { pingEl.style.color = "#F3C300"; wifiIcon.innerHTML = "&#9608;&#9608;&#9617;"; }
            else { pingEl.style.color = "#D92525"; wifiIcon.innerHTML = "&#9608;&#9617;&#9617;"; }  
        }
    });

    if(this.pingInterval) clearInterval(this.pingInterval);
    this.pingInterval = setInterval(function() {
        if (self.socket) { self.lastPingTime = Date.now(); self.socket.emit('ping_request', self.lastPingTime); }
    }, 7000);
this.socket.on('server_status', function(data) {
        var pStat = document.getElementById("stat-players");
        var mStat = document.getElementById("stat-matches");
        if(pStat) pStat.innerText = data.playersOnline || 0;
        if(mStat) mStat.innerText = data.activeMatches || 0;
        networkManager_.onlineUsersList = data.onlineList || [];
        networkManager_.totalPlayersOnline = data.playersOnline || 0;

        if (typeof window.renderFriendsList === 'function') {
            window.renderFriendsList();
        }
    });
  
this.socket.on('matchmaking_update', function(data) {
        
        var counterText = document.getElementById("matchmaking-counter");
        if (counterText) {
            counterText.innerHTML = "FIGHTERS FOUND: " + data.currentPlayers + " / " + data.maxPlayers;
        }

        var slotsContainer = document.getElementById("matchmaking-slots");
        if (slotsContainer) {
            var slotsHtml = '';
            for(var i = 0; i < data.maxPlayers; i++) {
                slotsHtml += `<div class="fighter-slot ${i < data.currentPlayers ? 'filled' : ''}"></div>`;
            }
            slotsContainer.innerHTML = slotsHtml;
        }
    });
  this.socket.on('client_ready_for_round_broadcast', function(data) {
        networkManager_.opponentReadyForRound = data.round;
    });

    this.socket.on('sync_start_round', function(data) {
        if (networkManager_.isWaitingForRoundSync) {
            networkManager_.isWaitingForRoundSync = false;
            networkManager_.opponentReadyForRound = 0;
            
            var cl = document.getElementById("custom-loader");
            if (cl) cl.style.display = "none";
            
            networkManager_.baseFrame = game_.getCurrentFrame();
            networkManager_.lastSentFrameSync = 0;
            networkManager_.lastReceivedOpponentFrame = 0;
            networkManager_.inputBuffer = [];
            window.lockstepTimeOffset = 0;
            
            console.log("ROUND " + data.round + " SYNCED! Resuming match.");
        }
    });
this.socket.on('leaderboard_update', function(data) {
    networkManager_.leaderboardData = data || {};
    
    var lbList = document.getElementById("ui-leaderboard-list");
    if (!lbList) return;
    var sortedPlayers = Object.keys(data).sort(function(a, b) { return data[b] - data[a]; });
    var html = "";
    for(var i = 0; i < Math.min(5, sortedPlayers.length); i++) {
        var pname = sortedPlayers[i]; var pwins = data[pname];
        var rankColor = i === 0 ? "#F3C300" : (i === 1 ? "#C0C0C0" : (i === 2 ? "#CD7F32" : "#fff"));
        html += `<div class="lobby-stat" style="color: ${rankColor};">${i+1}. ${pname} <span>${pwins} PLAYS</span></div>`;
    }
    if (sortedPlayers.length === 0) { html = '<div class="lobby-stat" style="color:#888;">NO MATCHES RECORDED</div>'; }
    lbList.innerHTML = html;
});

this.socket.on('opponent_disconnected', function() {
        if (self.isOnline) {
            var msgBox = document.getElementById("ui-chat-messages");
            if (msgBox) {
                msgBox.innerHTML += `<div class="chat-msg" style="color:#D92525;"><em>System: Opponent disconnected. Match ended.</em></div>`;
            }
            self.endOnlineMatch();
        }
    });
    window.renderFriendsList = function() {
        var friends = window.currentFriendsData;
        var fList = document.getElementById("ui-friends-list");
        if (!fList) return;

        if (!friends || friends.length === 0) {
            fList.innerHTML = '<div style="color:#888; font-family:\'Courier New\'; font-size:12px; text-align:center; margin-top:10px;">NO FRIENDS ADDED</div>';
            return;
        }

        var onlineList = (window.networkManager_ && networkManager_.onlineUsersList) || [];
        var html = "";

        friends.forEach(f => {
            var fName = typeof f === 'object' ? (f.name || f.username || f.friendName || "") : f;
            var targetLower = fName.toLowerCase();

            var isOnline = (typeof f === 'object' && !!(f.isOnline || f.online));

            if (!isOnline && onlineList.length > 0) {
                isOnline = onlineList.some(function(u) {
                    var uName = typeof u === 'object' ? (u.name || "") : u;
                    return uName.toLowerCase() === targetLower;
                });
            }

            var charName = (typeof f === 'object' && (f.character || f.avatar)) ? (f.character || f.avatar) : "ryu";
            var avatarKey = (window.playerAvatars && (window.playerAvatars[fName] || window.playerAvatars[targetLower] || window.playerAvatars[fName.toUpperCase()])) || charName;
            var avatarSrc = sfvCharImages[avatarKey] || sfvCharImages["ryu"];

            var statusClass = isOnline ? "online" : "offline";
            var statusText = isOnline ? "ONLINE" : "OFFLINE";

            var safeName = escapeHTML(fName);
            var safeChar = escapeHTML(avatarKey);

            var inviteBtn = isOnline ? `<button class="btn-invite" onclick="event.stopPropagation(); SendInvite('${safeName}')">INVITE</button>` : "";

            html += `
                <div class="friend-row" onclick="showPlayerDetailsPopup('${safeName}', '${safeChar}', ${isOnline}, true)">
                    <div class="friend-info">
                        <img src="${avatarSrc}" class="friend-avatar" draggable="false" />
                        <div style="display:flex; flex-direction: column; line-height: 1.1;">
                            <span style="font-weight: bold;">${safeName}</span>
                            <span class="friend-status ${statusClass}" style="font-size: 10px;">[${statusText}]</span>
                        </div>
                    </div>
                    ${inviteBtn}
                </div>
            `;
        });
        fList.innerHTML = html;
    };

    this.socket.on('friends_list_update', function(friends) {
        window.currentFriendsData = friends || [];
        window.renderFriendsList();
    });
  
    this.socket.on('receive_invite', function(data) {
        var modal = document.getElementById("ui-invite-modal");
        var nameSpan = document.getElementById("invite-from-name");
        if (modal && nameSpan) {
            nameSpan.innerText = data.from;
              modal.setAttribute("data-host", data.from);
            modal.style.display = "flex";
        }
    });
this.socket.on('invite_declined', function(data) {
        var cl = document.getElementById("custom-loader");
        if (cl) cl.style.display = "none";
        
        var msgBox = document.getElementById("ui-chat-messages");
        if(msgBox) {
            msgBox.innerHTML += `<div class="chat-msg" style="color:var(--sf-red);"><em>System: ${escapeHTML(data.guestName)} declined your challenge.</em></div>`;
            msgBox.scrollTop = msgBox.scrollHeight;
        }
        
        ResetToMainMenu();
    });
    this.socket.on('match_found', function(data) {
    PrepareGameStart();
    self.room = data.room;
    self.playerIndex = data.playerIndex;
    self.totalPlayers = data.totalPlayers;
    self.matchStage = data.stageName;
    self.isOnline = true;
    self.matchStarted = false;

    window.roomPlayerNames = {};
    onlineSelectedCharacters = {};
    onlineSelectedUsernames = {};

    var myName = getMyUsername();
    var myIndex = self.playerIndex || 1;
    window.roomPlayerNames[myIndex] = myName;

    if (self.totalPlayers === 2 && window.invitedOpponentName) {
        var oppIndex = (myIndex === 1) ? 2 : 1;
window.roomPlayerNames[oppIndex] = window.invitedOpponentName;
    }

    var customLoader = document.getElementById("custom-loader");
    if (customLoader) customLoader.style.display = "none";
    ShowCustomOnlineCharSelect();
});

    this.socket.on('remote_char_select', function(data) {
    if (data.room && self.room && data.room !== self.room) return;
    if (data.charName && data.playerIndex !== self.playerIndex) {
        RegisterCharacterSelection(data.playerIndex, data.charName, data.username);
    }
});

   this.socket.on('receive_chat', function(data) {
        if (data.username === "SYSTEM_SIGNAL" && data.message.indexOf("AVATAR_UPDATE|") === 0) {
            var parts = data.message.split("|");
            var targetUser = parts[1];
            var targetAvatar = parts[2];
            var isReply = parts[3] === "REPLY";

            if (!targetUser || !targetAvatar) return;

            var allowedChars = ["ryu", "ken", "sagat", "mbison", "akuma", "homelander", "albertwesker"];
            if (allowedChars.indexOf(targetAvatar.toLowerCase()) === -1) {
                targetAvatar = "ryu";
            }

            window.playerAvatars = window.playerAvatars || {};
            window.playerAvatars[targetUser] = targetAvatar;
            window.playerAvatars[targetUser.toLowerCase()] = targetAvatar;
            window.playerAvatars[targetUser.toUpperCase()] = targetAvatar;

            var avatarSrc = sfvCharImages[targetAvatar] || sfvCharImages["ryu"];

           // FIXED (add the '{' and also update lobbyRows to toLowerCase):
var friendRows = document.querySelectorAll(".friend-row");
friendRows.forEach(function(row) {
    if (row.innerText.toLowerCase().includes(targetUser.toLowerCase())) {
        var img = row.querySelector("img.friend-avatar");
        if (img) img.src = avatarSrc;
    }
});

var lobbyRows = document.querySelectorAll(".lobby-player-row");
lobbyRows.forEach(function(row) {
    if (row.innerText.toLowerCase().includes(targetUser.toLowerCase())) {
        var img = row.querySelector("img");
        if (img) img.src = avatarSrc;
    }
});

          

            var myName = getMyUsername();
if (!isReply && targetUser.toLowerCase() !== myName.toLowerCase()) {
                var myAvatar = localStorage.getItem('sfa_avatar') || 'ryu';
                if (self.socket) {
                    self.socket.emit('send_chat', {
                        username: "SYSTEM_SIGNAL",
                        message: "AVATAR_UPDATE|" + myName + "|" + myAvatar + "|REPLY"
                    });
                }
            }
            return;
        }

      if (data.username === "SYSTEM_SIGNAL" && data.message.indexOf("PLAYER_NAME|") === 0) {
    var parts = data.message.split("|");
    var signalRoom = parts.length >= 4 ? parts[1] : null;
    var targetIndex = parseInt(parts.length >= 4 ? parts[2] : parts[1]);
    var targetUsername = parts.length >= 4 ? parts[3] : parts[2];

    if (!self.room || signalRoom !== self.room) return;
    if (isNaN(targetIndex) || !targetUsername) return;

    window.roomPlayerNames = window.roomPlayerNames || {};
    window.roomPlayerNames[targetIndex] = targetUsername;

    var nameSpan = document.getElementById("sfv-user-" + targetIndex);
    var playsSpan = document.getElementById("sfv-plays-" + targetIndex);
    
    if (nameSpan) nameSpan.innerText = targetUsername;
    if (playsSpan) {
        var pCount = getPlayerPlays(targetUsername);
        playsSpan.innerText = pCount + " PLAYS";
    }
    return;
}
        if (data.username === "SYSTEM_SIGNAL") return;

        var msgBox = document.getElementById("ui-chat-messages");
        if (msgBox) {
            var newMsg = document.createElement("div");
            newMsg.className = "chat-msg";
            
            var authorSpan = document.createElement("span");
            authorSpan.className = "author";
            authorSpan.textContent = (data.username || "Guest") + ":";
            
            var textSpan = document.createElement("span");
            textSpan.textContent = " " + (data.message || "");
            
            newMsg.appendChild(authorSpan);
            newMsg.appendChild(textSpan);
            
            msgBox.appendChild(newMsg);
            msgBox.scrollTop = msgBox.scrollHeight;
        }
    });

   

   this.socket.on('webrtc_signal', async function(data) {
    if (data.targetIndex !== self.playerIndex) return;

    var rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    var senderIndex = data.senderIndex;

    if (!self.iceCandidateQueue[senderIndex]) self.iceCandidateQueue[senderIndex] = [];

    if (data.signal.type === 'offer') {
        var peer = new RTCPeerConnection(rtcConfig);
        self.peers[senderIndex] = peer;

        peer.ondatachannel = function(e) {
            self.dataChannels[senderIndex] = e.channel;
            self.setupDataChannel(e.channel, senderIndex);
        };

        peer.onicecandidate = function(e) {
            if (e.candidate) self.socket.emit('webrtc_signal', { room: self.room, playerIndex: self.playerIndex, targetIndex: senderIndex, signal: { type: 'candidate', candidate: e.candidate } });
        };

        await peer.setRemoteDescription(new RTCSessionDescription(data.signal.offer));
        var answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        
        self.socket.emit('webrtc_signal', { room: self.room, playerIndex: self.playerIndex, targetIndex: senderIndex, signal: { type: 'answer', answer: peer.localDescription } });
        
        self.iceCandidateQueue[senderIndex].forEach(c => peer.addIceCandidate(new RTCIceCandidate(c)));
        delete self.iceCandidateQueue[senderIndex];

    } else if (data.signal.type === 'answer') {
        var peer = self.peers[senderIndex];
        if (peer) {
            await peer.setRemoteDescription(new RTCSessionDescription(data.signal.answer));
            self.iceCandidateQueue[senderIndex].forEach(c => peer.addIceCandidate(new RTCIceCandidate(c)));
            delete self.iceCandidateQueue[senderIndex];
        }
    } else if (data.signal.type === 'candidate') {
        var peer = self.peers[senderIndex];
        if (peer && peer.remoteDescription) {
            peer.addIceCandidate(new RTCIceCandidate(data.signal.candidate));
        } else {
            self.iceCandidateQueue[senderIndex].push(data.signal.candidate);
        }
    }
});

    this.socket.on('sync_start_match', function(data) {
        window.matchRandomSeed = (data && data.seed) ? data.seed : 12345;
        self.matchInputDelay = (data && data.delay) ? data.delay : 4;

        Math.random = function() {
            var t = window.matchRandomSeed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };

        self.inputBuffer = [];
        self.lastReceivedOpponentFrame = 0;
        self.lastSentFrameSync = 0;
        window.lockstepTimeOffset = 0;
        
        self.initWebRTC();
    });
    
    this.socket.on('remote_input', function(data) {
        var remoteUser = getUserByIndex(data.playerIndex);
        if(data.inputName && remoteUser && data.playerIndex !== self.playerIndex) {
            var logicalKey = remoteUser[data.inputName];
            if(logicalKey) {
                self.inputBuffer.push({
                    isLocal: false,
                    isDown: data.isDown,
                    key: logicalKey,
                    frame: data.targetFrame,
                    user: remoteUser
                });
            }
        }
    });
    this.socket.on('frame_sync', function(data) {
        if (data.frame > (self.lastReceivedOpponentFrame || 0)) self.lastReceivedOpponentFrame = data.frame;
    });
};

NetworkManager.prototype.endOnlineMatch = function() {
      window.invitedOpponentName = null;

      recordMatchResult();
    if (this.webrtcTimeout) {
        clearTimeout(this.webrtcTimeout);
        this.webrtcTimeout = null;
    }
    if (!this.isOnline) return;
    this.isOnline = false; this.matchStarted = false; this.room = null;
    this.inputBuffer = [];
    this.isLoading = false;
    this.useWebSocketRelay = false;

    for (var index in this.peers) {
        if (this.peers[index]) this.peers[index].close();
    }
    this.peers = {};

    for (var index in this.dataChannels) {
        if (this.dataChannels[index]) this.dataChannels[index].close();
    }
    this.dataChannels = {};

    if (this.socket) {
        this.socket.emit('leave_match');
        this.login();
    }
    ResetToMainMenu();
};

NetworkManager.prototype.findMatch = function(mode) {
      window.invitedOpponentName = null;

    getMyUsername();
    if(this.socket) {
        this.socket.emit('find_match', mode);

        var maxPlayers = 2;
        if (mode === '2v2') maxPlayers = 4;
        if (mode === '3v3') maxPlayers = 6;

        var slotsHtml = '';
        for(var i = 0; i < maxPlayers; i++) {
            slotsHtml += `<div class="fighter-slot ${i === 0 ? 'filled' : ''}"></div>`;
        }

        var customLoader = document.getElementById("custom-loader");
        if(customLoader) {
            customLoader.innerHTML = `
                <div class='search-popup-box'>
                    <div style='font-size:36px; font-weight:bold; letter-spacing:2px; margin-bottom:5px; color:#fff; text-shadow: 3px 3px 0px var(--sf-red); transform: skewX(-15deg);'>AWAITING CHALLENGERS...</div>
                    
                    <div id="matchmaking-counter" style="font-size:22px; color:#F3C300; font-family:'Bebas Neue', sans-serif; letter-spacing:2px; margin-bottom: 15px; transform: skewX(-15deg); text-shadow: 2px 2px 0 #000;">
                        FIGHTERS FOUND: 1 / ${maxPlayers}
                    </div>

                    <div class="fighter-slots-container" id="matchmaking-slots">
                        ${slotsHtml}
                    </div>

                    <div class='arcade-meter-bg' style='height:12px; margin-bottom:25px;'>
                        <div class='arcade-meter-fill'></div>
                    </div>

                    <button onclick='networkManager_.cancelMatch()' class='cancel-btn-arcade'>X CANCEL</button>
                </div>
            `;
            customLoader.style.display = "flex";
        }
    }
};
NetworkManager.prototype.cancelMatch = function() {
      window.invitedOpponentName = null;

    if (this.socket) {
        this.socket.emit('cancel_matchmaking');
    }
    
    var customLoader = document.getElementById("custom-loader");
    if (customLoader) customLoader.style.display = "none";
    
    ResetToMainMenu();
};
NetworkManager.prototype.sendInput = function(isDown, inputName, targetFrame) {
    if (this.isOnline && this.room) {
        var baseFrame = this.baseFrame || 0;
        var relativeCurrentFrame = game_.getCurrentFrame() - baseFrame;
        
        this.sendGameData('game_input', {
            room: this.room,
            playerIndex: this.playerIndex,
            isDown: isDown,
            inputName: inputName,
            targetFrame: targetFrame,
            currentFrame: relativeCurrentFrame
        });
    }
};
var networkManager_ = new NetworkManager();


var announcer_ = CreateAnnouncer();
var game_ = CreateGame();
game_.setTeamMode(false);
var fontSystem_ = CreateFontSystem();

(function injectCustomLoader() {
    var loader = document.createElement("div");
    loader.id = "custom-loader";
    document.body.appendChild(loader);
    
    game_.showLoading = function(show) {
    var cl = document.getElementById("custom-loader");
    if(show) {
        cl.innerHTML = "<div class='loader-text' id='loader-text'>LOADING DATA...</div>";
        cl.style.display = "flex";
        if(window.networkManager_) networkManager_.isLoading = true;
    } else {
        cl.style.display = "none";
        if(window.networkManager_) {
            networkManager_.isLoading = false;
            
            networkManager_.baseFrame = game_.getCurrentFrame();
            networkManager_.lastSentFrameSync = 0;
            networkManager_.lastReceivedOpponentFrame = 0;
        }
    }
};  
  game_.onProgress = function(nbRemaining) {
        var lt = document.getElementById('loader-text');
        if(lt) lt.innerText = "LOADING DATA... " + (nbRemaining || "");
    };
})();

if (typeof Player !== "undefined") {
    var originalPlayerRender = Player.prototype.render;
    Player.prototype.render = function(frame, deltaX) {
        if (originalPlayerRender) originalPlayerRender.call(this, frame, deltaX);
        if (!this.Element) return;

        if (!this._nameTag) {
            this._nameTag = document.createElement("div");
            this._nameTag.style.position = "absolute";
            this._nameTag.style.top = "-25px";
            this._nameTag.style.left = "50%";
            this._nameTag.style.textShadow = "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 0px #000";
            this._nameTag.style.fontFamily = "Arial, sans-serif";
            this._nameTag.style.fontSize = "11px";
            this._nameTag.style.fontWeight = "bold";
            this._nameTag.style.zIndex = "1000";
            this._nameTag.style.textAlign = "center";
            this._nameTag.style.whiteSpace = "nowrap";
            this._nameTag.style.pointerEvents = "none";
            this.Element.appendChild(this._nameTag);
        }
        
        var name = "COM"; var tagColor = "#FF4444";
        
        if (this.User && !this.User.IsAI) {
            name = this.User.customUsername || "Player"; tagColor = "#FFD700";
        }
        if (networkManager_.isOnline && networkManager_.playerIndex > 0) {
            var myUser = getUserByIndex(networkManager_.playerIndex);
            if (this.User === myUser) { tagColor = "#00FF00"; }
        }

        if (this._nameTag.innerText !== name) { this._nameTag.innerText = name; }
        if (this._nameTag.style.color !== tagColor) { this._nameTag.style.color = tagColor; }

        if (IsFlipped(this.Element)) { this._nameTag.style.transform = "translateX(-50%) scaleX(-1)"; }
        else { this._nameTag.style.transform = "translateX(-50%) scaleX(1)"; }
    };
}


  game_.handleKeyPress = function (e, isDown) {
    var keyCode = isNaN(e.which) ? e.keyCode : e.which;

    if (networkManager_.isOnline && networkManager_.matchStarted) {
        if (networkManager_.isWaitingForRoundSync || networkManager_.isLoading) {
            return;
        }

        var inputName = LOCAL_CONTROLS[keyCode];
        if (inputName) {
            var myUser = getUserByIndex(networkManager_.playerIndex);
            if (myUser) {
                var logicalKey = myUser[inputName];
                
                var baseFrame = networkManager_.baseFrame || 0;
                var relativeFrame = game_.getCurrentFrame() - baseFrame;
                
                var INPUT_DELAY = networkManager_.matchInputDelay || 4;
                var targetFrame = relativeFrame + INPUT_DELAY;
                
                networkManager_.sendInput(isDown, inputName, targetFrame);
                networkManager_.lastInputFrameSent = relativeFrame;
                
                networkManager_.inputBuffer.push({
                    isLocal: true,
                    isDown: isDown,
                    key: logicalKey,
                    frame: targetFrame,
                    user: myUser
                });
            }
        }
        return;
    }
   
    if (!this.hasState(GAME_STATES.AUDIO_LOADING)) {
        if (this.wasKeyPressed(KEYS.O, keyCode, isDown)) { this.pause(); }
        if (this.wasKeyPressed(KEYS.P, keyCode, isDown)) { this.resume(); }
    }
    if (this.wasKeyPressed(KEYS.ESCAPE, keyCode, isDown)) { this.resetFrame(); this.end(); }
    if (this.wasKeyPressed(KEYS.EIGHT, keyCode, isDown)) this.speedUp();
    if (this.wasKeyPressed(KEYS.NINE, keyCode, isDown)) this.slowDown();
    if (this.wasKeyPressed(KEYS.ZERO, keyCode, isDown)) this.resetDefaultSpeed();
    if (!!this.hasState(GAME_STATES.AUDIO_LOADING)) return;

    for(var i=1; i<=8; i++) {
        var u = getUserByIndex(i);
        if(u) u.onKeyStateChanged(isDown, keyCode, this.getCurrentFrame());
    }
    if(this.getMatch()) this.getMatch().onKeyStateChanged(isDown, keyCode, this.getCurrentFrame());
};
var runGameLoop_ = (function (thisValue) { return function () { thisValue.runGameLoop(thisValue.getCurrentTime()); } })(game_);

var runCharSelectLoop_ = (function (thisValue) { return function () { thisValue.runCharSelectLoop(); } })(game_);
var runInsertCoinScreenLoop_ = (function (thisValue) { return function () { thisValue.runInsertCoinScreenLoop(); } })(game_);

function OnStageImagesLoaded() { game_.onStageImagesLoaded(); }

function InitUsers() {
    delete window.user1_; delete window.user2_; delete window.user3_; delete window.user4_;
    delete window.user5_; delete window.user6_; delete window.user7_; delete window.user8_;

    var val = 100000;
window.user1_ = game_.addUser1(window.customKeys.Right, window.customKeys.Up, window.customKeys.Left, window.customKeys.Down, window.customKeys.P1, window.customKeys.P2, window.customKeys.P3, window.customKeys.K1, window.customKeys.K2, window.customKeys.K3, KEYS.F, KEYS.CNTRL, window.customKeys.Start);
    window.user2_ = game_.addUser2(KEYS.NUMPAD_6, KEYS.NUMPAD_8, KEYS.NUMPAD_4, KEYS.NUMPAD_5, KEYS.H, KEYS.J, KEYS.K, KEYS.N, KEYS.M, KEYS.COMMA, KEYS.L, KEYS.NUMPAD_7, KEYS.NUMPAD_9);

    val += 100; window.user3_ = game_.addUser(val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, val+10, val+11, val+12, val+13);
    val += 100; window.user4_ = game_.addUser(val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, val+10, val+11, val+12, val+13);
    val += 100; window.user5_ = game_.addUser(val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, val+10, val+11, val+12, val+13);
    val += 100; window.user6_ = game_.addUser(val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, val+10, val+11, val+12, val+13);
    val += 100; window.user7_ = game_.addUser(val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, val+10, val+11, val+12, val+13);
    val += 100; window.user8_ = game_.addUser(val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, val+10, val+11, val+12, val+13);
}
InitUsers();
var debug_ = GetDebugInstance(game_);

stuffLoader_.queue("insert-coin.js", RESOURCE_TYPES.BASE64AUDIO);
stuffLoader_.queue("char-select.js", RESOURCE_TYPES.BASE64AUDIO);
stuffLoader_.queue("match.js", RESOURCE_TYPES.BASE64AUDIO);
stuffLoader_.queue("images/misc/misc/announcer-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/font1/insert.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/font1/credits.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/font1/cap.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/shadow-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/dirt-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/blast-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/bars-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/misc-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/energy-bar-lvl0.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/energy-bar-lvl1.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/energy-bar-lvl2.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/health-bar-life.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/health-bar-damage.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/head-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/char-select-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/char-sprites.png", RESOURCE_TYPES.IMAGE);

var $$wasAudioInitialized = false;
function $$init() {
    if (!$$wasAudioInitialized) {
        $$wasAudioInitialized = true;
        soundManager_ = CreateSoundManager();
        Player.prototype.loadAssets("ryu", "ryu", true); Player.prototype.loadAssets("ryu", "ryu2", true);
        Player.prototype.loadAssets("ken", "ken", true); Player.prototype.loadAssets("ken", "ken2", true);
        Player.prototype.loadAssets("sagat", "sagat", true); Player.prototype.loadAssets("sagat", "sagat2", true);
        Player.prototype.loadAssets("mbison", "mbison", true); Player.prototype.loadAssets("mbison", "mbison2", true);
    Player.prototype.loadAssets("homelander", "homelander", true);
            Player.prototype.loadAssets("homelander", "homelander2", true);
      Player.prototype.loadAssets("albertwesker", "albertwesker", true);
    Player.prototype.loadAssets("albertwesker", "albertwesker2", true);
        Player.prototype.loadAssets("akuma", "akuma", true); Player.prototype.loadAssets("akuma", "akuma2", true);
    }
}

function getCharOptions(includeNone, isPlayer) {
    var html = "";
    if (includeNone) html += '<option value="none">-- NONE --</option>';
    if (!isPlayer) html += '<option value="random">RANDOM</option>';
    html += `
        <option value="ryu">RYU</option>
        <option value="ken">KEN</option>
        <option value="sagat">SAGAT</option>
        <option value="mbison">M.BISON</option>
        <option value="akuma">AKUMA</option>
        <option value="chunli">CHUN-LI</option>
        <option value="guy">GUY</option>
        <option value="sodom">SODOM</option>
    `;
    return html;
}


window.vsComSelections = {
    p1: "ryu",
    com1: "random",
    com2: "none",
    com3: "none"
};
window.vsComActiveSlot = "p1";

var vsComCharData = {
    "ryu": { name: "Ryu", img: "images/misc/misc/nc_ryu.png" },
    "ken": { name: "Ken", img: "images/misc/misc/nc_ken.png" },
    "sagat": { name: "Sagat", img: "images/misc/misc/nc_sagat.png" },
    "mbison": { name: "M.Bison", img: "images/misc/misc/nc_mbison.png" },
    "akuma": { name: "Akuma", img: "images/misc/misc/nc_akuma.png" },
    "homelander": { name: "Homelander", img: "images/misc/misc/nc_homelander.png" },
    "albertwesker": { name: "Wesker", img: "images/misc/misc/nc_albertwesker.png" },
    "random": { name: "Random", img: "images/misc/misc/random.png" },
    "none": { name: "None", img: "" }
};

window.showVsComMenu = function() {
    var cl = document.getElementById("custom-loader");
    if (!cl) return;

    if (!document.getElementById("vs-com-styles")) {
        var style = document.createElement("style");
        style.id = "vs-com-styles";
        style.innerHTML = `
            .vs-container {
                background: linear-gradient(to bottom, var(--sf-dark-grey), var(--sf-black));
                border: 3px solid var(--sf-red);
                box-shadow: 0 0 30px rgba(255,0,0,0.5), inset 0 0 20px rgba(0,0,0,1);
                padding: 15px 25px;
                text-align: center;
                border-radius: 8px;
                width: 520px;
                max-width: 95vw;
                box-sizing: border-box;
                font-family: 'Bebas Neue', sans-serif;
                transform-origin: center;
                transition: transform 0.2s ease;
            }
            .vs-slots-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin-bottom: 15px;
            }
            .vs-slot-card {
                background: #0a0a0a;
                border: 2px solid #333;
                border-radius: 4px;
                padding: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .vs-slot-card.active {
                border-color: var(--sf-orange);
                box-shadow: 0 0 12px var(--sf-orange);
            }
            .vs-slot-title {
                font-size: 13px;
                color: #888;
                letter-spacing: 1px;
                margin-bottom: 4px;
            }
            .vs-slot-card.active .vs-slot-title {
                color: var(--sf-orange);
            }
            .vs-slot-preview {
                width: 100%;
                height: 55px; /* Shortened compact window to eliminate vertical stretch */
                background: #111;
                border: 1px solid #222;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 2px;
            }
            .vs-slot-preview img {
                height: 100%;
                width: auto;
                object-fit: contain;
                image-rendering: pixelated;
            }
            .vs-slot-name {
                font-size: 14px;
                color: #fff;
                margin-top: 4px;
                letter-spacing: 1px;
            }
            
            /* Horizontal configuration: 4 character portraits per row */
            .vs-roster-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 12px 0;
            }
            .vs-roster-card {
                position: relative;
                background: #111;
                border: 2px solid #444;
                border-radius: 4px;
                overflow: hidden;
                cursor: pointer;
                aspect-ratio: 1.2/1; /* Wider aspect ratio for shorter aesthetic */
                transition: all 0.2s ease;
            }
            .vs-roster-card:hover {
                border-color: var(--sf-orange);
                box-shadow: 0 0 8px var(--sf-orange);
            }
            .vs-roster-card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                image-rendering: pixelated;
            }
            .vs-roster-name {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                background: rgba(0,0,0,0.85);
                font-size: 12px;
                color: #fff;
                padding: 1px 0;
                letter-spacing: 1px;
            }

            /* --- RESPONSIVE RESOLUTION SCALING --- */
            
            /* Phone / Portrait Adjustments */
            @media (max-width: 900px), (max-height: 500px) {
                .vs-container {
                    transform: scale(0.85);
                    padding: 10px 15px;
                    width: 440px;
                }
                .vs-slot-preview { height: 42px; }
                .vs-slot-title { font-size: 11px; }
                .vs-slot-name { font-size: 12px; }
                .vs-roster-name { font-size: 11px; }
            }

            /* 2K Resolution scaling */
            @media (min-width: 2500px) {
                .vs-container {
                    transform: scale(1.6);
                }
            }

            /* 4K Resolution scaling */
            @media (min-width: 3800px) {
                .vs-container {
                    transform: scale(2.4);
                }
            }
        `;
        document.head.appendChild(style);
    }

    renderVsComUI();
    cl.style.display = "flex";
};

function renderVsComUI() {
    var cl = document.getElementById("custom-loader");
    if (!cl) return;

    var slots = ["p1", "com1", "com2", "com3"];
    var slotLabels = { p1: "P1 FIGHTER", com1: "COM 1", com2: "COM 2", com3: "COM 3" };

    var html = `
        <div class="vs-container">
            <h2 style="color: var(--sf-orange); font-size: 26px; margin: 0 0 12px 0; text-shadow: 2px 2px 0px #000; letter-spacing: 2px;">VS COM CONFIGURATION</h2>
            
            <!-- Target Slots Row -->
            <div class="vs-slots-grid">
    `;

    slots.forEach(function(slotId) {
        var charKey = window.vsComSelections[slotId];
        var char = vsComCharData[charKey];
        var activeClass = window.vsComActiveSlot === slotId ? "active" : "";
        var imgTag = char.img ? `<img src="${char.img}" draggable="false" />` : `<span style="color:#444; font-size:24px;">-</span>`;

        html += `
            <div class="vs-slot-card ${activeClass}" onclick="selectVsSlot('${slotId}')">
                <div class="vs-slot-title">${slotLabels[slotId]}</div>
                <div class="vs-slot-preview">${imgTag}</div>
                <div class="vs-slot-name" style="${charKey === 'none' ? 'color:#666;' : ''}">${char.name}</div>
            </div>
        `;
    });

    html += `
            </div>
            
            <div style="border-bottom: 2px solid #333; margin: 10px 0;"></div>
            <div style="font-size: 15px; color: #aaa; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px;">SELECT FIGHTER FOR: <span style="color: var(--sf-orange);">${slotLabels[window.vsComActiveSlot]}</span></div>
            
            <!-- Choice Grid (4 columns wide) -->
            <div class="vs-roster-grid">
    `;

var rosterKeys;
    if (window.vsComActiveSlot === "p1") {
        rosterKeys = ["ryu", "ken", "sagat", "mbison", "akuma", "homelander", "albertwesker", "random"];
    } else {
        rosterKeys = ["ryu", "ken", "sagat", "mbison", "akuma", "random"];
        if (window.vsComActiveSlot === "com2" || window.vsComActiveSlot === "com3") {
            rosterKeys.push("none");
        }
    }

    rosterKeys.forEach(function(key) {
        var char = vsComCharData[key];
        var isSelected = window.vsComSelections[window.vsComActiveSlot] === key;
        var highlightStyle = isSelected ? "border-color: #fff; box-shadow: 0 0 10px #fff; transform: scale(1.05);" : "";
        var imgTag = char.img ? `<img src="${char.img}" draggable="false" />` : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#888; font-size:12px;">NONE</div>`;

        html += `
            <div class="vs-roster-card" style="${highlightStyle}" onclick="assignVsChar('${key}')">
                ${imgTag}
                <div class="vs-roster-name">${char.name}</div>
            </div>
        `;
    });

    html += `
            </div>
            
            <!-- Controls Row -->
            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 15px;">
                <button class="btn-arcade btn-play" onclick="launchVsCom()" style="width: 130px; padding: 6px 0 !important; font-size: 18px !important;">FIGHT!</button>
                <button class="cancel-btn-arcade" onclick="document.getElementById('custom-loader').style.display='none'" style="width: 130px; padding: 6px 0; font-size: 18px !important;">CANCEL</button>
            </div>
        </div>
    `;

    cl.innerHTML = html;
}



window.selectVsSlot = function(slotId) {
    window.vsComActiveSlot = slotId;
    renderVsComUI();
};

window.assignVsChar = function(charKey) {
    window.vsComSelections[window.vsComActiveSlot] = charKey;
    
    var slots = ["p1", "com1", "com2", "com3"];
    var currentIndex = slots.indexOf(window.vsComActiveSlot);
    if (currentIndex < slots.length - 1) {
        window.vsComActiveSlot = slots[currentIndex + 1];
    }
    
    renderVsComUI();
};


window.launchVsCom = function() {
      stopMenuMusic();
    var p1 = window.vsComSelections.p1;
    var c1 = window.vsComSelections.com1;
    var c2 = window.vsComSelections.com2;
    var c3 = window.vsComSelections.com3;

    var cl = document.getElementById('custom-loader');
    if (cl) cl.style.display = 'none';

    PrepareGameStart();
    $$init();

    function resolveChar(val) {
        if (val === "random" || !val) {
            var chars = ["ryu", "ken", "sagat", "mbison", "akuma"];
            
            var randFunc = window.originalMathRandom || Math.random;
            val = chars[Math.floor(randFunc() * chars.length)];
        }
        return GetCharacterEnum(val);
    }

    var teamA = [{ A: resolveChar(p1), C: false }];
    var teamB = [];

    if (c1 !== "none") teamB.push({ A: resolveChar(c1), C: true });
    if (c2 !== "none") teamB.push({ A: resolveChar(c2), C: true });
    if (c3 !== "none") teamB.push({ A: resolveChar(c3), C: true });

    if (teamB.length === 0) {
        teamB.push({ A: resolveChar("random"), C: true });
    }

    var availableStages = ["ryu", "ken", "guy", "chunli", "mbison", "akuma", "sodom", "sagat", "rose"];
    var randFunc = window.originalMathRandom || Math.random;
    var randomStage = availableStages[Math.floor(randFunc() * availableStages.length)];

    networkManager_.isOnline = false;
    networkManager_.matchStarted = false;
    game_.setTeamMode(teamB.length > 1);

    debug_.startMatch(teamA, teamB, randomStage);
};

function startOnlineGame(mode) {
    $$init();
    if (!networkManager_.socket) { networkManager_.init(); }
    networkManager_.findMatch(mode);
}

game_.getMaxWinsPerMatch = function() {
    return 1;
};

var originalStartMatch = game_.startMatch;
game_.startMatch = function(matchState, teamAIndexes, teamBIndexes, stage, callback) {
    networkManager_.lastMatchParams = {
        matchState: matchState,
        teamAIndexes: teamAIndexes,
        teamBIndexes: teamBIndexes,
        stage: stage,
        callback: callback
    };

    if (networkManager_.isOnline) networkManager_.matchStarted = true;
    
    var pad = document.getElementById("mobile-gamepad");
    if (pad) pad.classList.add("visible");

    var cl = document.getElementById("custom-loader");
    if (cl) cl.style.display = "none";
    
    setTimeout(makeResponsive, 50);
    setInterval(makeResponsive, 1000);
    
    if (originalStartMatch) originalStartMatch.apply(this, arguments);
};

var originalCreateMatch = game_.createMatch;
game_.createMatch = function(teamA, teamB, stage, callback) {
    
    if (originalCreateMatch) originalCreateMatch.apply(this, arguments);

    var match = game_.getMatch();
    if (match) {
       // console.log("[DEBUG] Match Object successfully intercepted in createMatch:", match);

        var matchProps = [
            "maxRounds", "MaxRounds", "_maxRounds",
            "winningRounds", "WinningRounds", "_winningRounds",
            "nbRounds", "NbRounds", "roundsLimit", "RoundsLimit",
            "targetWins", "TargetWins", "winsLimit", "WinsLimit",
            "requiredWins", "RequiredWins", "WinningChain", "winningChain"
        ];
        
        matchProps.forEach(function(prop) {
            match[prop] = 1;
        });

        var rules = match.rules || match.Rules || match.Config || match.config || match.settings || match.Settings;
        if (rules) {
            matchProps.forEach(function(prop) {
                rules[prop] = 1;
            });
        }

        var teams = [];
        if (typeof match.getTeamA === 'function') teams.push(match.getTeamA());
        if (typeof match.getTeamB === 'function') teams.push(match.getTeamB());
        if (match.teamA) teams.push(match.teamA);
        if (match.teamB) teams.push(match.teamB);
        if (match.TeamA) teams.push(match.TeamA);
        if (match.TeamB) teams.push(match.TeamB);

        teams.forEach(function(team) {
            if (team) {
                var teamProps = [
                    "RoundsToWin", "roundsToWin", "winsNeeded", "WinsNeeded",
                    "WinningChain", "winningChain", "winsLimit", "WinsLimit",
                    "maxRounds", "MaxRounds"
                ];
                
                teamProps.forEach(function(prop) {
                    team[prop] = 1;
                });
            }
        });
    }
};

game_.startCharSelect = function() {
    if (networkManager_.isOnline) {
        networkManager_.endOnlineMatch();
    } else {
        ResetToMainMenu();
    }
};

game_.startInsertCoinScreen = function() {
    if (networkManager_.isOnline) {
        networkManager_.endOnlineMatch();
    } else {
        ResetToMainMenu();
    }
};

window.updateProfileButtonUI = function() {
    var btn = document.getElementById("ui-profile-btn");
    if (!btn) return;
    
    var myName = getMyUsername();
    var myAvatar = localStorage.getItem('sfa_avatar') || 'ryu';
    var avatarSrc = sfvCharImages[myAvatar] || sfvCharImages["ryu"];
    
    btn.innerHTML = `
        <img src="${avatarSrc}" draggable="false" />
        <span class="prof-name">${escapeHTML(myName)}</span>
    `;
};

window.setMyAvatar = function(charName) {
    localStorage.setItem('sfa_avatar', charName);
    window.updateProfileButtonUI();
    
    if (networkManager_.socket) {
        networkManager_.socket.emit('set_avatar', charName);
        
        networkManager_.socket.emit('send_chat', {
            username: "SYSTEM_SIGNAL",
            message: "AVATAR_UPDATE|" + getMyUsername() + "|" + charName
        });
    }
    
    window.showMyProfileModal();
};
window.showMyProfileModal = function() {
    var cl = document.getElementById("custom-loader");
    if (!cl) return;

    var myName = getMyUsername();
    var myRank = getPlayerRank(myName);
    var plays = getPlayerPlays(myName);

    var myAvatar = localStorage.getItem('sfa_avatar') || 'ryu';
    var avatarSrc = sfvCharImages[myAvatar] || sfvCharImages["ryu"];

    var rosterKeys = ["ryu", "ken", "sagat", "mbison", "akuma", "homelander", "albertwesker"];
    var rosterHtml = rosterKeys.map(function(k) {
        var isSelected = (myAvatar === k);
        var borderCol = isSelected ? 'var(--sf-orange)' : '#444';
        return `
            <img src="${sfvCharImages[k]}"
                 onclick="setMyAvatar('${k}')"
                 style="width:55px; height:55px; object-fit:cover; object-position:center 20%; border: 2px solid ${borderCol}; cursor:pointer; background:#000; border-radius:4px; margin: 4px; transition:0.2s; image-rendering:pixelated;"
                 onmouseover="this.style.borderColor='#fff'"
                 onmouseout="this.style.borderColor='${borderCol}'" draggable="false" />
        `;
    }).join('');

    var html = `
        <article class="search-popup-box" style="display: flex; flex-direction: column; align-items: center; width: 360px; max-width: 95vw;">
            <header style="font-size:32px; font-weight:bold; letter-spacing:2px; margin-bottom:15px; color:var(--sf-orange); text-shadow: 2px 2px 0px #000; transform: skewX(-10deg);">FIGHTER ID</header>

            <!-- My Info Card -->
            <div style="display: flex; gap: 15px; width: 100%; background: rgba(0,0,0,0.8); border: 2px solid #444; border-left: 4px solid var(--sf-orange); padding: 15px; border-radius: 4px; margin-bottom: 15px; box-sizing: border-box;">
                <img src="${avatarSrc}" style="width: 80px; height: 80px; object-fit: cover; object-position: center 20%; border: 2px solid #fff; image-rendering: pixelated; background: #000;" />
                <div style="display: flex; flex-direction: column; justify-content: center; text-align: left; flex-grow:1;">
                    
<input type="text" id="profModalNameInput" value="${escapeHTML(myName)}" maxlength="8"
       style="font-size: 26px; color: #fff; font-family: 'Roboto Condensed', sans-serif; font-weight: bold; letter-spacing: 1px; line-height: 1; background: rgba(255,255,255,0.1); border: 1px solid #555; border-radius: 3px; padding: 2px 6px; outline: none; width: 140px; text-transform: none; margin-bottom: 2px; box-shadow: inset 0 0 5px rgba(0,0,0,0.5);"
       oninput="localStorage.setItem('sfa_username', this.value); window.updateProfileButtonUI();"
       onchange="if(networkManager_.socket) networkManager_.login();" />
         
                    <div style="font-size: 10px; color: #888; font-family: 'Roboto Condensed', sans-serif; margin-bottom: 8px;">(CLICK TO EDIT NAME)</div>

                    <div style="font-size: 13px; color: #0f0; font-family: 'Roboto Condensed', sans-serif; font-weight: bold; margin-bottom: 4px;">[ONLINE]</div>
                    <div style="font-size: 13px; color: #ccc; font-family: 'Roboto Condensed', sans-serif;">GLOBAL RANK: <span style="color:var(--sf-orange); font-weight:bold;">${myRank}</span></div>
                    <div style="font-size: 13px; color: #ccc; font-family: 'Roboto Condensed', sans-serif;">TOTAL PLAYS: <span style="color:var(--sf-orange); font-weight:bold;">${plays}</span></div>
                </div>
            </div>

            <!-- Avatar Selection -->
            <div style="width: 100%; text-align: left; margin-bottom: 5px;">
                <span style="color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px;">SET PROFILE AVATAR</span>
            </div>
            
            <div style="display:flex; flex-wrap:wrap; background: rgba(10,10,12,0.9); border: 1px solid #333; padding: 10px; margin-bottom: 20px; justify-content:center; border-radius:4px;">
                ${rosterHtml}
            </div>

            <button onclick="document.getElementById('custom-loader').style.display='none'" class="cancel-btn-arcade" style="width:100%; font-size: 18px; padding: 8px;">DONE</button>
        </article>
    `;

    cl.innerHTML = html;
    cl.style.display = "flex";
};

BuildModernMenu();
if (!networkManager_.socket) { networkManager_.init(); }
ToggleSocialUI(true);

(function createFloatingFSBtn() {
    var fsBtn = document.createElement("div");
    fsBtn.id = "mobile-fs-toggle";
    fsBtn.className = "mobile-fs-btn";
    fsBtn.innerHTML = "?";
    document.body.appendChild(fsBtn);

    fsBtn.addEventListener("touchstart", function(e) {
        e.preventDefault();
        window.toggleFullScreen();
    });
})();



function CreateMobileGamepad() {
    var isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isMobile) return;

    var pad = document.createElement("div");
    pad.id = "mobile-gamepad";
    
    pad.innerHTML = `
        <style>
            .img-atk-container { display: grid; grid-template-columns: repeat(3, 50px); grid-template-rows: repeat(2, 50px); gap: 8px; margin-bottom: 10px; }
            .btn-img { width: 100%; height: 100%; object-fit: contain; user-select: none; -webkit-user-select: none; touch-action: none; opacity: 0.7; }
            .btn-img:active { opacity: 1; transform: scale(0.9); }
      
        </style>
        
        <div class="touch-col" style="padding-left:10px;">
            <div id="joystick-base" style="width:110px; height:110px; background:rgba(255,255,255,0.15); border:3px solid rgba(255,255,255,0.5); border-radius:50%; position:relative; touch-action:none; pointer-events:auto; display:flex; justify-content:center; align-items:center;">
                <div id="joystick-knob" style="width:45px; height:45px; background:#F3C300; border:3px solid #fff; border-radius:50%; position:absolute; pointer-events:none; box-shadow: 2px 2px 5px rgba(0,0,0,0.5);"></div>
            </div>
        </div>

        <div class="touch-col" style="padding-right:10px;">
            <div class="img-atk-container">
                <img src="images/misc/buttons/LP.png" class="btn-img" id="t-lp" draggable="false" />
                <img src="images/misc/buttons/MP.png" class="btn-img" id="t-mp" draggable="false" />
                <img src="images/misc/buttons/HP.png" class="btn-img" id="t-hp" draggable="false" />
                
                <img src="images/misc/buttons/LK.png" class="btn-img" id="t-lk" draggable="false" />
                <img src="images/misc/buttons/MK.png" class="btn-img" id="t-mk" draggable="false" />
                <img src="images/misc/buttons/HK.png" class="btn-img" id="t-hk" draggable="false" />
            </div>
        </div>
    `;
    document.body.appendChild(pad);

    var btnMap = {
        "t-lp": 65, "t-mp": 83, "t-hp": 68,
        "t-lk": 90, "t-mk": 88, "t-hk": 67
    };

    Object.keys(btnMap).forEach(id => {
        var el = document.getElementById(id);
        if (!el) return;
        var handleTouch = function(isDown, e) {
            e.preventDefault();
            game_.handleKeyPress({ keyCode: btnMap[id], which: btnMap[id] }, isDown);
        };
        el.addEventListener("touchstart",  (e) => handleTouch(true, e),  {passive: false});
        el.addEventListener("touchend",    (e) => handleTouch(false, e), {passive: false});
        el.addEventListener("touchcancel", (e) => handleTouch(false, e), {passive: false});
    });

    var base = document.getElementById('joystick-base');
    var knob = document.getElementById('joystick-knob');
    var maxDist = 40;
    var activeKeys = { 38: false, 40: false, 37: false, 39: false };
    var baseRect = null;

    function handleJoystick(e) {
        e.preventDefault();
        
        if (e.type === 'touchend' || e.type === 'touchcancel') {
            knob.style.transform = 'translate(0px, 0px)';
            Object.keys(activeKeys).forEach(k => {
                if (activeKeys[k]) {
                    game_.handleKeyPress({ keyCode: parseInt(k), which: parseInt(k) }, false);
                    activeKeys[k] = false;
                }
            });
            baseRect = null;
            return;
        }

        if (!baseRect) baseRect = base.getBoundingClientRect();
        var touch = e.touches[0];
        var centerX = baseRect.left + (baseRect.width / 2);
        var centerY = baseRect.top + (baseRect.height / 2);
        
        var dx = touch.clientX - centerX;
        var dy = touch.clientY - centerY;
        var dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
        }
        
        knob.style.transform = `translate(${dx}px, ${dy}px)`;

        var threshold = 15;
        var newKeys = {
            38: dy < -threshold,
            40: dy > threshold,  
            37: dx < -threshold,
            39: dx > threshold   
        };

        Object.keys(newKeys).forEach(k => {
            if (newKeys[k] !== activeKeys[k]) {
                game_.handleKeyPress({ keyCode: parseInt(k), which: parseInt(k) }, newKeys[k]);
                activeKeys[k] = newKeys[k];
            }
        });
    }

    base.addEventListener('touchstart', handleJoystick, { passive: false });
    base.addEventListener('touchmove', handleJoystick, { passive: false });
    base.addEventListener('touchend', handleJoystick, { passive: false });
    base.addEventListener('touchcancel', handleJoystick, { passive: false });
}
CreateMobileGamepad();
(function createPortraitWarning() {
    var warning = document.createElement("div");
    warning.id = "portrait-warning";
    warning.innerHTML = `
        <div class="rotate-icon"></div>
        <span>PLEASE ROTATE YOUR PHONE<br>TO ENTER THE ARENA</span>
    `;
    document.body.appendChild(warning);
})();
window.lockstepTimeOffset = 0;
var lastLoopRealTime = 0;

var originalGetCurrentTime = game_.getCurrentTime;
if (originalGetCurrentTime) {
    game_.getCurrentTime = function() {
        return originalGetCurrentTime.call(this) - window.lockstepTimeOffset;
    };
}


var originalRunGameLoop = game_.runGameLoop;
game_.runGameLoop = function(time) {
    var absoluteNow = Date.now();
    if (!lastLoopRealTime) lastLoopRealTime = absoluteNow;
    var deltaTime = absoluteNow - lastLoopRealTime;
    lastLoopRealTime = absoluteNow;

    if (networkManager_.isOnline && networkManager_.matchStarted && !networkManager_.isLoading) {
        
        var baseFrame = networkManager_.baseFrame || 0;
        var relativeFrame = this.getCurrentFrame() - baseFrame;
        var match = this.getMatch();
        var currentRound = match ? (match.Round || match.round || match.roundNumber || 1) : 1;

        if (networkManager_.lastRound !== undefined && networkManager_.lastRound !== currentRound) {
            console.log("ROUND TRANSITION DETECTED (" + currentRound + "). Requesting Sync.");
            
            networkManager_.isWaitingForRoundSync = true;
            
            networkManager_.inputBuffer = [];
            
            var customLoader = document.getElementById("custom-loader");
            if (customLoader) {
                customLoader.innerHTML = `
                    <div class='search-popup-box'>
                        <div style='font-size:36px; font-weight:bold; letter-spacing:2px; margin-bottom:5px; color:#fff; text-shadow: 3px 3px 0px var(--sf-red); transform: skewX(-15deg);'>
                            LOADING ROUND ${currentRound}...
                        </div>
                        <div class='arcade-meter-bg' style='height:12px; margin-top:25px;'>
                            <div class='arcade-meter-fill'></div>
                        </div>
                    </div>
                `;
                customLoader.style.display = "flex";
            }
            
            if (networkManager_.socket && networkManager_.room) {
                networkManager_.socket.emit('client_ready_for_round', {
                    room: networkManager_.room,
                    round: currentRound,
                    playerIndex: networkManager_.playerIndex
                });
            }
        }
        networkManager_.lastRound = currentRound;

       
       var completedFrame = relativeFrame - 1;

        if (networkManager_.isWaitingForRoundSync) {
            if (relativeFrame !== networkManager_.lastInputFrameSent && completedFrame >= 0) {
                networkManager_.sendGameData('frame_sync', { room: networkManager_.room, frame: completedFrame });
                networkManager_.lastInputFrameSent = relativeFrame;
            }
            window.requestAnimationFrame(runGameLoop_);
            return;
        }

        var inputDelay = networkManager_.matchInputDelay || 4;

        if (relativeFrame > (networkManager_.lastSentFrameSync || 0)) {
            if (completedFrame >= 0) {
                networkManager_.sendGameData('frame_sync', { room: networkManager_.room, frame: completedFrame });
            }
            networkManager_.lastSentFrameSync = relativeFrame;
        }

        var highestOpponentFrame = networkManager_.lastReceivedOpponentFrame || 0;
        var isOpponentWaitingForNextRound = (networkManager_.opponentReadyForRound || 0) > currentRound;
        
        if (!isOpponentWaitingForNextRound && relativeFrame > highestOpponentFrame + inputDelay) {
            window.lockstepTimeOffset += deltaTime;
            window.requestAnimationFrame(runGameLoop_);
            return;
        }

        var remainingBuffer = [];
        for(var i = 0; i < networkManager_.inputBuffer.length; i++) {
            var input = networkManager_.inputBuffer[i];
            
            if (relativeFrame >= input.frame) {
                var absoluteEngineFrame = baseFrame + input.frame;
                input.user.onKeyStateChanged(input.isDown, input.key, absoluteEngineFrame);
                if(this.getMatch()) this.getMatch().onKeyStateChanged(input.isDown, input.key, absoluteEngineFrame);
            } else {
                remainingBuffer.push(input);
            }
        }
        
        remainingBuffer.sort(function(a, b) { return a.frame - b.frame; });
        networkManager_.inputBuffer = remainingBuffer;
    } else {
        window.lockstepTimeOffset = 0;
    }

    originalRunGameLoop.call(this, time);
};

var runGameLoop_ = (function (thisValue) { return function () { thisValue.runGameLoop(thisValue.getCurrentTime()); } })(game_);
window.showOnlinePlayersPopup = function() {
    var cl = document.getElementById("custom-loader");
    if (!cl) return;

    if (!document.getElementById("popup-scaling-styles")) {
        var style = document.createElement("style");
        style.id = "popup-scaling-styles";
        style.innerHTML = `
            #custom-loader .search-popup-box { transform-origin: center; transition: transform 0.2s ease; }
            .custom-scroll::-webkit-scrollbar { display: none !important; }
            .custom-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; touch-action: pan-y !important; overscroll-behavior: contain !important; }
            .lobby-player-row { transition: 0.2s; border: 1px solid #444; background: rgba(0,0,0,0.8); }
            .lobby-player-row.clickable:hover { border-color: var(--sf-orange) !important; background: rgba(255,255,255,0.1) !important; cursor: pointer; }
            @media (min-width: 2500px) { #custom-loader .search-popup-box { transform: scale(1.6) !important; } }
            @media (min-width: 3800px) { #custom-loader .search-popup-box { transform: scale(2.4) !important; } }
            @media (max-width: 900px), (max-height: 500px) {
                #custom-loader .search-popup-box {
                    padding: 10px 15px !important;
                    transform: scale(0.68) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    var basePlayers = networkManager_.onlineUsersList || [];
    var totalConnections = networkManager_.totalPlayersOnline || basePlayers.length;
    var players = [...basePlayers];

    var ghostCount = totalConnections - players.length;
    for (var i = 0; i < ghostCount; i++) { players.push("GUEST"); }

    var html = `
        <article class="search-popup-box" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <header style="font-size:32px; font-weight:bold; letter-spacing:2px; margin-bottom:15px; color:var(--sf-orange); text-shadow: 2px 2px 0px #000; transform: skewX(-15deg); display:block;">FIGHTERS IN LOBBY</header>
            
            <section onwheel="event.stopPropagation()" ontouchmove="event.stopPropagation()" style="width: 310px; max-height: 220px; overflow-y: auto; margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; padding-right: 5px;" class="custom-scroll">
    `;

    if (players.length === 0) {
        html += `<span style="color: #666; font-size: 14px; text-transform: uppercase; display:block; text-align: center; margin-top: 10px;">No registered fighters online.</span>`;
    } else {
        var sortedPlayers = players.sort(function(a, b) {
            var nameA = typeof a === 'object' ? (a.name || "GUEST") : a;
            var nameB = typeof b === 'object' ? (b.name || "GUEST") : b;
            return getPlayerPlays(nameB) - getPlayerPlays(nameA);
        });

        sortedPlayers.forEach(function(pData, index) {
            var pName = typeof pData === 'object' ? (pData.name || "GUEST") : pData;
            var charName = typeof pData === 'object' ? (pData.avatar || pData.character || "ryu") : "ryu";
            
            var plays = getPlayerPlays(pName);
            var isGuest = (pName === "GUEST");
            var nameColor = isGuest ? "#888" : "#fff";
            var clickableClass = isGuest ? "" : "clickable";
            
            var avatarKey = charName;
            if (window.playerAvatars) {
                avatarKey = window.playerAvatars[pName] ||
                            window.playerAvatars[pName.toLowerCase()] ||
                            window.playerAvatars[pName.toUpperCase()] ||
                            charName;
            }
            var avatarSrc = sfvCharImages[avatarKey] || sfvCharImages["ryu"];

            var safeName = escapeHTML(pName);
            var safeChar = escapeHTML(charName);
            
            var onClickAction = isGuest ? "" : `onclick="showPlayerDetailsPopup('${safeName}', '${safeChar}', true, false)"`;

            html += `
                <article class="lobby-player-row ${clickableClass}" ${onClickAction} style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; color: ${nameColor}; margin:0; border-radius: 3px;">
                    <span style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: var(--sf-orange); font-weight: bold; width: 18px; text-align: right;">${index + 1}.</span>
                        <img src="${avatarSrc}" style="width: 28px; height: 28px; object-fit: cover; border: 1px solid #777; border-radius: 3px; image-rendering: pixelated; object-position: center 20%; background: #000;" draggable="false" />
                        <span style="margin-left: 2px;">${safeName}</span>
                    </span>
                    <span style="color: #aaa; font-size: 11px; font-weight: bold; letter-spacing:0.5px;">${plays} PLAYS</span>
                </article>
            `;
        });
    }

    html += `
            </section>
            
            <button onclick="document.getElementById('custom-loader').style.display='none'" class="cancel-btn-arcade" style="font-size: 16px; padding: 5px 20px;">X CLOSE</button>
        </article>
    `;

    cl.innerHTML = html;
    cl.style.display = "flex";
};

(function createArrivalHintsSequence() {
    var style = document.createElement("style");
    style.innerHTML = `
        #hero-hint-box {
            position: fixed;
            top: 60px;
            right: 20px;
            z-index: 20002;
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, rgba(20, 2, 6, 0.95), rgba(5, 5, 8, 0.95));
            border: 2px solid var(--sf-red);
            border-left: 5px solid var(--sf-orange);
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.5), 0 8px 25px rgba(0, 0, 0, 0.9);
            padding: 8px 36px 8px 10px;
            border-radius: 4px;
            box-sizing: border-box;
            transform: translateX(140%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
            pointer-events: auto;
        }

        #hero-hint-box.active { transform: translateX(0); }
        #hero-hint-box.dismissed { transform: translateX(140%); opacity: 0; }

        .hint-avatar {
            width: 44px;
            height: 44px;
            border-radius: 4px;
            border: 1px solid var(--sf-orange);
            background: #000;
            object-fit: cover;
            object-position: center 20%;
            image-rendering: pixelated;
            box-shadow: 0 0 8px rgba(255, 115, 0, 0.6);
            transform: none !important;
        }

        .hint-text-group { display: flex; flex-direction: column; transform: skewX(6deg); }

        .hint-subtext {
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 11px;
            font-weight: bold;
            color: var(--sf-orange);
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .hint-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 20px;
            color: #fff;
            letter-spacing: 1.5px;
            text-shadow: 2px 2px 0px #000, 0 0 8px var(--sf-red);
            line-height: 1;
            margin-top: 2px;
        }

        .hint-close-btn {
            position: absolute;
            top: 4px;
            right: 8px;
            background: transparent;
            border: none;
            color: #888;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            padding: 0 4px;
            line-height: 1;
            transform: skewX(6deg);
            transition: color 0.15s, transform 0.15s;
        }
        .hint-close-btn:hover { color: #fff; transform: skewX(6deg) scale(1.2); }

        @media (max-width: 900px), (max-height: 500px) {
            #hero-hint-box {
                top: 35px !important;
                right: 5px !important;
                transform: scale(0.75) translateX(160%) !important;
                transform-origin: top right !important;
            }
            #hero-hint-box.active { transform: scale(0.75) translateX(0) !important; }
            #hero-hint-box.dismissed { transform: scale(0.75) translateX(160%) !important; }
        }
        @media (min-width: 2500px) {
            #hero-hint-box { top: 90px !important; right: 30px !important; transform: scale(1.6) translateX(140%) !important; transform-origin: top right !important; }
            #hero-hint-box.active { transform: scale(1.6) translateX(0) !important; }
            #hero-hint-box.dismissed { transform: scale(1.6) translateX(140%) !important; }
        }
        @media (min-width: 3800px) {
            #hero-hint-box { top: 140px !important; right: 50px !important; transform: scale(2.4) translateX(140%) !important; transform-origin: top right !important; }
            #hero-hint-box.active { transform: scale(2.4) translateX(0) !important; }
            #hero-hint-box.dismissed { transform: scale(2.4) translateX(140%) !important; }
        }
    `;
    document.head.appendChild(style);

    var hints = [
        {
            subtext: "NEW FIGHTER ARRIVED!",
            name: "ALBERT WESKER",
            img: "images/misc/misc/nc_albertwesker.png"
        },
                   {
            subtext: "NEW HERO ARRIVED!",
            name: "HOMELANDER",
            img: "images/misc/misc/nc_homelander.png"
        }
        
    ];

    var currentIndex = 0;
    var autoTimer = null;
    var currentBox = null;

    function showHint(index) {
        if (index >= hints.length) return;

        var data = hints[index];
        currentBox = document.createElement("div");
        currentBox.id = "hero-hint-box";
        currentBox.innerHTML = `
            <button class="hint-close-btn" onclick="window.dismissCurrentHint()">&times;</button>
            <img src="${data.img}" class="hint-avatar" alt="${data.name}" draggable="false" />
            <div class="hint-text-group">
                <span class="hint-subtext">${data.subtext}</span>
                <span class="hint-title">${data.name}</span>
            </div>
        `;
        document.body.appendChild(currentBox);

        setTimeout(function() {
            if (currentBox) currentBox.classList.add("active");
        }, 100);

        autoTimer = setTimeout(function() {
            window.dismissCurrentHint();
        }, 7000);
    }

    window.dismissCurrentHint = function() {
        if (autoTimer) {
            clearTimeout(autoTimer);
            autoTimer = null;
        }

        if (currentBox) {
            currentBox.classList.remove("active");
            currentBox.classList.add("dismissed");
            var boxToRemove = currentBox;
            currentBox = null;

            setTimeout(function() {
                if (boxToRemove && boxToRemove.parentNode) {
                    boxToRemove.parentNode.removeChild(boxToRemove);
                }
                currentIndex++;
                if (currentIndex < hints.length) {
                    setTimeout(function() {
                        showHint(currentIndex);
                    }, 500);
                }
            }, 450);
        }
    };

    setTimeout(function() {
        showHint(0);
    }, 800);
})();
   /* =========================================================================
   UNIVERSAL GAMEPAD & JOYSTICK SUPPORT (PS5, PS4, PS3, XBOX & PC FIGHTSTICKS)
   ========================================================================= */
  
(function initGamepadMenuNavigation() {
    var lastNavTime = 0;
    var NAV_COOLDOWN = 170;
    var currentFocusedEl = null;

    function getActiveMenuContainer() {
        var loader = document.getElementById("custom-loader");
        if (loader && loader.style.display === "flex") return loader;

        var charSelect = document.getElementById("customCharSelectUI");
        if (charSelect && (charSelect.style.display === "block" || charSelect.classList.contains("active"))) return charSelect;

        var invite = document.getElementById("ui-invite-modal");
        if (invite && invite.style.display === "flex") return invite;

        var keybind = document.getElementById("ui-keybind-modal");
        if (keybind && keybind.style.display === "flex") return keybind;

        var friends = document.getElementById("ui-friends");
        if (friends && friends.contains(currentFocusedEl)) return friends;

        var mainMenu = document.querySelector(".modern-menu");
        if (mainMenu && mainMenu.style.display !== "none") return mainMenu;

        return null;
    }

    function getFocusableElements(container) {
        if (!container) return [];
        var selector = [
            "button",
            ".btn-arcade",
            ".cancel-btn-arcade",
            ".sfv-roster-card",    // Character Select cards
            ".friend-row",         // Friend items
            ".btn-invite",         // Friend invite buttons
            ".vs-slot-card",
            ".vs-roster-card",
            ".lobby-player-row",
            "#ui-profile-btn",
            "#btn-add-friend",
            "input"
        ].join(",");

        return Array.from(container.querySelectorAll(selector)).filter(function(el) {
            // Must be visible on screen
            return el.offsetWidth > 0 && el.offsetHeight > 0 && !el.disabled;
        });
    }

    function setElementFocus(el) {
        if (!el) return;

        if (currentFocusedEl) {
            currentFocusedEl.classList.remove("controller-focused");
        }

        currentFocusedEl = el;
        currentFocusedEl.classList.add("controller-focused");

        if (!currentFocusedEl.hasAttribute("tabindex")) {
            currentFocusedEl.setAttribute("tabindex", "0");
        }
        currentFocusedEl.focus();

        if (currentFocusedEl.classList.contains("sfv-roster-card")) {
            var id = currentFocusedEl.id || "";
            var charName = id.replace("char-btn-", "");
            var myIdx = (window.networkManager_ && window.networkManager_.playerIndex) || 1;
            if (charName && typeof window.previewCharHover === "function") {
                window.previewCharHover(charName, myIdx);
            }
        }

        if (typeof currentFocusedEl.scrollIntoView === "function") {
            currentFocusedEl.scrollIntoView({ block: "nearest", inline: "nearest" });
        }

        if (window.playAcousticClick) window.playAcousticClick();
    }

    function moveFocus(dx, dy) {
    var container = getActiveMenuContainer();
    if (!container) return;

    var items = getFocusableElements(container);
    if (items.length === 0) return;

    if (!currentFocusedEl || !container.contains(currentFocusedEl)) {
        setElementFocus(items[0]);
        return;
    }

    var curIdx = items.indexOf(currentFocusedEl);
    if (curIdx === -1) {
        setElementFocus(items[0]);
        return;
    }

    // --- FIX FOR SETTINGS POPUP SEQUENTIAL ORDER ---
    if (container.id === "ui-keybind-modal") {
        var nextIdx = curIdx;
        
        if (dx > 0) nextIdx = curIdx + 1;                  // Right -> Next button (Jump -> Crouch)
        else if (dx < 0) nextIdx = curIdx - 1;             // Left  -> Previous button
        else if (dy > 0) nextIdx = curIdx + 2;             // Down  -> Next row (+2 in 2-col grid)
        else if (dy < 0) nextIdx = curIdx - 2;             // Up    -> Previous row (-2 in 2-col grid)

        // Clamp within list bounds
        if (nextIdx < 0) nextIdx = 0;
        if (nextIdx >= items.length) nextIdx = items.length - 1;

        setElementFocus(items[nextIdx]);
        return;
    }
    // ----------------------------------------------

    var curRect = currentFocusedEl.getBoundingClientRect();
    var bestMatch = null;
    var bestDist = Infinity;

    items.forEach(function(el) {
        if (el === currentFocusedEl) return;
        var r = el.getBoundingClientRect();
        var diffX = (r.left + r.width / 2) - (curRect.left + curRect.width / 2);
        var diffY = (r.top + r.height / 2) - (curRect.top + curRect.height / 2);

        if (dx > 0 && diffX <= 5) return;
        if (dx < 0 && diffX >= -5) return;
        if (dy > 0 && diffY <= 5) return;
        if (dy < 0 && diffY >= -5) return;

        var dist = Math.hypot(diffX, diffY) + (dx !== 0 ? Math.abs(diffY) * 1.5 : Math.abs(diffX) * 1.5);
        if (dist < bestDist) {
            bestDist = dist;
            bestMatch = el;
        }
    });

    if (!bestMatch) {
        if (dy > 0 || dx > 0) bestMatch = items[(curIdx + 1) % items.length];
        else if (dy < 0 || dx < 0) bestMatch = items[(curIdx - 1 + items.length) % items.length];
    }

    if (bestMatch) setElementFocus(bestMatch);
}

  window.handleGamepadUINav = function(pad, isStickAlive) {
    var now = performance.now();

    // FIX: Block UI navigation immediately after binding so 'B' doesn't instantly close the menu!
    if (window._uiNavCooldownUntil && now < window._uiNavCooldownUntil) return true;
    if (window.activeBindingAction) return true;

    var menu = document.querySelector(".start-game-container");
    var isMenuVisible = menu && menu.style.display !== "none";
    var isModalOpen = document.getElementById("ui-keybind-modal")?.style.display === "flex" ||
                      document.getElementById("customCharSelectUI")?.style.display === "block" ||
                      document.getElementById("custom-loader")?.style.display === "flex" ||
                      document.getElementById("ui-invite-modal")?.style.display === "flex";

    if (!isMenuVisible && !isModalOpen) return false;

    function isBtnDown(idx) {
        var btn = pad.buttons[idx];
        return typeof btn === "object" ? (btn.pressed || btn.value > 0.5) : btn > 0.5;
    }

    var axisX = pad.axes[0] || 0;
    var axisY = pad.axes[1] || 0;

    var dUp    = isBtnDown(12) || (isStickAlive && axisY < -0.5);
    var dDown  = isBtnDown(13) || (isStickAlive && axisY > 0.5);
    var dLeft  = isBtnDown(14) || (isStickAlive && axisX < -0.5);
    var dRight = isBtnDown(15) || (isStickAlive && axisX > 0.5);

    if (now - lastNavTime > NAV_COOLDOWN) {
        if (dUp)    { moveFocus(0, -1); lastNavTime = now; return true; }
        if (dDown)  { moveFocus(0, 1);  lastNavTime = now; return true; }
        if (dLeft)  { moveFocus(-1, 0); lastNavTime = now; return true; }
        if (dRight) { moveFocus(1, 0);  lastNavTime = now; return true; }
    }

    if (now - lastNavTime > 250) {
        if (isBtnDown(4)) { var mm = document.querySelector(".modern-menu"); if (mm) { var mItems = getFocusableElements(mm); if (mItems.length) setElementFocus(mItems[0]); lastNavTime = now; return true; } }
        if (isBtnDown(5)) { var fr = document.getElementById("ui-friends"); if (fr) { var fItems = getFocusableElements(fr); if (fItems.length) setElementFocus(fItems[0]); lastNavTime = now; return true; } }
    }

    var btnConfirm = isBtnDown(0) || isBtnDown(9);
    if (btnConfirm && now - lastNavTime > 250) {
        if (currentFocusedEl) {
            currentFocusedEl.click();
            lastNavTime = now;
            return true;
        }
    }

    var btnCancel = isBtnDown(1);
    if (btnCancel && now - lastNavTime > 250) {
        var container = getActiveMenuContainer();
        if (container) {
            var cancelBtn = container.querySelector(".cancel-btn-arcade, .hint-close-btn");
            if (cancelBtn) {
                cancelBtn.click();
                lastNavTime = now;
                return true;
            }
        }
    }

    return false;
};



})();
   
(function setupUniversalGamepadSystem() {
    var lastPadStates = {};
    var stickAliveState = {};

    function dispatchKeyEvent(keyCode, isDown) {
        if (!keyCode || !window.game_) return;
        game_.handleKeyPress({ keyCode: keyCode, which: keyCode, preventDefault: function() {} }, isDown);
    }

    function pollGamepads() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

        for (var padIdx = 0; padIdx < Math.min(gamepads.length, 2); padIdx++) {
            var pad = gamepads[padIdx];
            if (!pad) continue;

            if (stickAliveState[pad.index] === undefined) stickAliveState[pad.index] = false;
            var axisX = pad.axes[0] || 0;
            var axisY = pad.axes[1] || 0;

            if (!stickAliveState[pad.index]) {
                if (Math.abs(axisX) < 0.2 && Math.abs(axisY) < 0.2) stickAliveState[pad.index] = true;
            }

            // 1. REBINDING INTERCEPTOR
            if (window.activeBindingAction && padIdx === 0) {
                if (window.activeBindingAction !== window._lastBindingAction) {
                    window._bindingControllerCleared = false;
                    window._lastBindingAction = window.activeBindingAction;
                }

                var anyButtonPressed = false;
                var pressedButtonIndex = -1;

                for (var bIdx = 0; bIdx < pad.buttons.length; bIdx++) {
                    var b = pad.buttons[bIdx];
                    var isDown = typeof b === "object" ? (b.pressed || b.value > 0.75) : b > 0.75;
                    
                    if (isDown) {
                        anyButtonPressed = true;
                        pressedButtonIndex = bIdx;
                        break;
                    }
                }

                if (!window._bindingControllerCleared) {
                    if (!anyButtonPressed) window._bindingControllerCleared = true;
                    continue;
                }

                if (anyButtonPressed && pressedButtonIndex !== -1) {
                    var act = window.activeBindingAction;
                    window.customPadKeys[act] = pressedButtonIndex;
                    localStorage.setItem('sfa_custom_pad_keys', JSON.stringify(window.customPadKeys));
                    
                    var label = padButtonLabels[pressedButtonIndex] || ("PAD " + pressedButtonIndex);
                    var btnEl = document.getElementById("btn-bind-" + act);
                    if (btnEl) {
                        btnEl.innerText = label;
                        btnEl.classList.remove("listening");
                    }
                    
                    if (window.playAcousticLock) window.playAcousticLock();
                    
                    window.activeBindingAction = null;
                    window._lastBindingAction = null;

                    // COOLDOWN: Block UI for 400ms so mapping 'B' doesn't instantly close the menu!
                    window._uiNavCooldownUntil = performance.now() + 400;
                }
                continue;
            }

            // 2. MENU UI NAVIGATION
            if (window.handleGamepadUINav && window.handleGamepadUINav(pad, stickAliveState[pad.index])) {
                continue;
            }

            // 3. IN-GAME FIGHTING ENGINE DISPATCH
            if (!lastPadStates[padIdx]) {
                lastPadStates[padIdx] = { actions: {} };
            }

            var state = lastPadStates[padIdx];
            var pMap = padIdx === 0 ? Object.assign({}, defaultPadBindings, window.customPadKeys) : defaultPadBindings;
            var kMap = padIdx === 0 ? Object.assign({}, defaultKeys, window.customKeys) : {
                Up: window.user2_.Up, Down: window.user2_.Down, Left: window.user2_.Left, Right: window.user2_.Right,
                P1: window.user2_.P1, P2: window.user2_.P2, P3: window.user2_.P3,
                K1: window.user2_.K1, K2: window.user2_.K2, K3: window.user2_.K3,
                Start: window.user2_.Start, Coin: window.user2_.Coin || 17
            };

            function isBtnDown(logicalName) {
                var bId = pMap[logicalName];
                if (bId === undefined) return false;
                var btn = pad.buttons[bId];
                return btn ? (typeof btn === "object" ? (btn.pressed || btn.value > 0.5) : btn > 0.5) : false;
            }

            var deadzone = 0.45;
            var currentActions = {
                Up:    isBtnDown('Up')    || (stickAliveState[pad.index] && axisY < -deadzone),
                Down:  isBtnDown('Down')  || (stickAliveState[pad.index] && axisY > deadzone),
                Left:  isBtnDown('Left')  || (stickAliveState[pad.index] && axisX < -deadzone),
                Right: isBtnDown('Right') || (stickAliveState[pad.index] && axisX > deadzone),
                P1:    isBtnDown('P1'),
                P2:    isBtnDown('P2'),
                P3:    isBtnDown('P3'),
                K1:    isBtnDown('K1'),
                K2:    isBtnDown('K2'),
                K3:    isBtnDown('K3'),
                Start: isBtnDown('Start'),
                Coin:  isBtnDown('Coin')
            };

            for (var action in currentActions) {
                var isPressed = currentActions[action];
                if (isPressed !== state.actions[action]) {
                    state.actions[action] = isPressed;
                    dispatchKeyEvent(kMap[action], isPressed);
                }
            }
        }
        window.requestAnimationFrame(pollGamepads);
    }

    window.addEventListener("gamepadconnected", function(e) {
        stickAliveState[e.gamepad.index] = false;
    });

    window.requestAnimationFrame(pollGamepads);
})();

window.showPlayerDetailsPopup = function(playerName, charName, isOnline, canChallenge) {
    var rank = getPlayerRank(playerName);
    var plays = getPlayerPlays(playerName);

    var avatarKey = charName || "ryu";
    if (window.playerAvatars) {
        avatarKey = window.playerAvatars[playerName] ||
                    window.playerAvatars[playerName.toLowerCase()] ||
                    window.playerAvatars[playerName.toUpperCase()] ||
                    charName || "ryu";
    }
    var avatarSrc = sfvCharImages[avatarKey] || sfvCharImages["ryu"];

    var cl = document.getElementById("custom-loader");
    if (!cl) return;

    var statusColor = isOnline ? "#0f0" : "#888";
    var statusText = isOnline ? "ONLINE" : "OFFLINE";

    var allHistory = JSON.parse(localStorage.getItem('sfa_my_matches')) || {};
    var vsHistory = allHistory[playerName] ||
                    allHistory[playerName.toLowerCase()] ||
                    allHistory[playerName.toUpperCase()] || [];
    var historyHtml = "";

    if (vsHistory.length === 0) {
        historyHtml = `<div style="padding: 15px; text-align:center; color:#666; font-style:italic;">No recorded matches against ${escapeHTML(playerName)} yet. Challenge them!</div>`;
    } else {
        vsHistory.forEach(match => {
            var color = match.result === "WIN" ? "#0f0" : "var(--sf-red)";
            historyHtml += `
                <div style="padding: 6px; border-bottom: 1px solid #222; display: flex; justify-content: space-between;">
                    <span>YOU VS ${escapeHTML(playerName)} <small style="color:#666;">(${match.date})</small></span>
                    <span style="color:${color}; font-weight:bold;">${match.result}</span>
                </div>
            `;
        });
    }

    var html = `
        <article class="search-popup-box" style="display: flex; flex-direction: column; align-items: center; width: 340px; max-width: 90vw;">
            <header style="font-size:32px; font-weight:bold; letter-spacing:2px; margin-bottom:15px; color:var(--sf-orange); text-shadow: 2px 2px 0px #000; transform: skewX(-10deg);">FIGHTER DOSSIER</header>

            <div style="display: flex; gap: 15px; width: 100%; background: rgba(0,0,0,0.8); border: 2px solid #444; border-left: 4px solid var(--sf-orange); padding: 15px; border-radius: 4px; margin-bottom: 15px; box-sizing: border-box;">
                <img src="${avatarSrc}" style="width: 80px; height: 80px; object-fit: cover; object-position: center 20%; border: 2px solid #fff; image-rendering: pixelated; background: #000;" />
                <div style="display: flex; flex-direction: column; justify-content: center; text-align: left; flex-grow:1;">
                    <div style="font-size: 26px; color: #fff; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; line-height: 1;">${escapeHTML(playerName)}</div>
                    <div style="font-size: 13px; color: ${statusColor}; font-family: 'Roboto Condensed', sans-serif; font-weight: bold; margin-bottom: 8px;">[${statusText}]</div>
                    <div style="font-size: 13px; color: #ccc; font-family: 'Roboto Condensed', sans-serif;">GLOBAL RANK: <span style="color:var(--sf-orange); font-weight:bold;">${rank}</span></div>
                    <div style="font-size: 13px; color: #ccc; font-family: 'Roboto Condensed', sans-serif;">TOTAL PLAYS: <span style="color:var(--sf-orange); font-weight:bold;">${plays}</span></div>
                    <div style="font-size: 13px; color: #ccc; font-family: 'Roboto Condensed', sans-serif;">FAV FIGHTER: <span style="color:var(--sf-orange); font-weight:bold;">${formatFighterName(avatarKey)}</span></div>
                </div>
            </div>

            <div style="width: 100%; text-align: left; margin-bottom: 5px;">
                <span style="color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px;">YOUR RIVALRY HISTORY</span>
            </div>
            
            <div class="custom-scroll" onwheel="event.stopPropagation()" ontouchmove="event.stopPropagation()" style="width: 100%; max-height: 130px; overflow-y: auto; background: rgba(10,10,12,0.9); border: 1px solid #333; padding: 6px; font-family: 'Roboto Condensed', sans-serif; font-size: 13px; color: #ccc; margin-bottom: 20px; box-sizing: border-box;">
                ${historyHtml}
            </div>

            <div style="display:flex; gap:15px; width: 100%;">
                ${(isOnline && canChallenge) ? `<button class="cancel-btn-arcade" style="flex: 1; font-size: 18px; padding: 8px; border-color:#0f0; color:#0f0;" onclick="document.getElementById('custom-loader').style.display='none'; SendInvite('${escapeHTML(playerName)}');">CHALLENGE</button>` : ''}
                <button onclick="document.getElementById('custom-loader').style.display='none'" class="cancel-btn-arcade" style="flex: 1; font-size: 18px; padding: 8px;">CLOSE</button>
            </div>
        </article>
    `;

    cl.innerHTML = html;
    cl.style.display = "flex";
};

function getPlayerPlays(username) {
    if (!username || !window.networkManager_ || !networkManager_.leaderboardData) return 0;
    var data = networkManager_.leaderboardData;
    var target = username.toLowerCase();
    var highestPlays = 0;

    for (var key in data) {
        if (key.toLowerCase() === target) {
            if (data[key] > highestPlays) {
                highestPlays = data[key];
            }
        }
    }
    return highestPlays;
}

function getPlayerRank(username) {
    if (!username || !window.networkManager_ || !networkManager_.leaderboardData) return "UNRANKED";
    var data = networkManager_.leaderboardData;
    var target = username.toLowerCase();

    var sorted = Object.keys(data).sort(function(a, b) { return data[b] - data[a]; });
    for (var i = 0; i < sorted.length; i++) {
        if (sorted[i].toLowerCase() === target) {
            return "#" + (i + 1);
        }
    }
    return "UNRANKED";
}

window.saveLocalMatchHistory = function(opponentName, didIWin) {
    if (!opponentName) return;
    var history = JSON.parse(localStorage.getItem('sfa_my_matches')) || {};
    
    var entry = {
        result: didIWin ? "WIN" : "LOSS",
        date: new Date().toLocaleDateString()
    };

    var keys = [opponentName, opponentName.toLowerCase(), opponentName.toUpperCase()];
    keys.forEach(function(k) {
        if (!history[k]) history[k] = [];
        history[k].unshift(entry);
        if (history[k].length > 10) history[k].pop();
    });

    localStorage.setItem('sfa_my_matches', JSON.stringify(history));
    console.log("[Rivalry] Recorded match against " + opponentName + ": " + (didIWin ? "WIN" : "LOSS"));
};

function recordMatchResult() {
    if (!window.networkManager_ || !networkManager_.isOnline || !networkManager_.matchStarted) return;
    if (networkManager_.matchResultRecorded) return;

    var match = game_.getMatch();
    if (!match) return;

    var myIndex = networkManager_.playerIndex || 1;
    var isMyTeamA = (myIndex % 2 !== 0);

    var oppIndex = isMyTeamA ? 2 : 1;
    var opponentName = (window.onlineSelectedUsernames && onlineSelectedUsernames[oppIndex]) ||
                       (window.roomPlayerNames && roomPlayerNames[oppIndex]);
    if (!opponentName) return;

    var teamA = typeof match.getTeamA === 'function' ? match.getTeamA() : match.teamA;
    var teamB = typeof match.getTeamB === 'function' ? match.getTeamB() : match.teamB;
    if (!teamA || !teamB) return;

    var teamAPlayers = (typeof teamA.getPlayers === 'function') ? teamA.getPlayers() : (teamA.players || []);
    var teamBPlayers = (typeof teamB.getPlayers === 'function') ? teamB.getPlayers() : (teamB.players || []);
    var pA = teamAPlayers[0];
    var pB = teamBPlayers[0];
    if (!pA || !pB) return;

    var pADead = (pA.Health <= 0) || (typeof pA.isDead === 'function' && pA.isDead());
    var pBDead = (pB.Health <= 0) || (typeof pB.isDead === 'function' && pB.isDead());

    if (pADead || pBDead) {
        var didIWin = isMyTeamA ? !pADead : !pBDead;
        networkManager_.matchResultRecorded = true;
        window.saveLocalMatchHistory(opponentName, didIWin);
    }
}
              
