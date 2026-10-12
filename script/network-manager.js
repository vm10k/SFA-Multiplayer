// script/network-manager.js

var NetworkManager = function() {
    this.socket = null;
    this.room = null;
    this.playerIndex = 0; // 1 to 6
    this.totalPlayers = 2; // 2, 4, or 6
    this.isOnline = false;
    this.opponentReady = false;
    this.matchStarted = false;
};
function getUserByIndex(index) {
    switch(index) {
        case 1: return window.user1_;
        case 2: return window.user2_;
        case 3: return window.user3_;
        case 4: return window.user4_;
        case 5: return window.user5_;
        case 6: return window.user6_;
        default: return null;
    }
}
function getKeyFromInputName(user, name) {
    return user[name];
}
function getInputName(user, keyCode) {
    if (keyCode == user.Left) return "Left";
    if (keyCode == user.Right) return "Right";
    if (keyCode == user.Up) return "Up";
    if (keyCode == user.Down) return "Down";
    if (keyCode == user.P1) return "P1";
    if (keyCode == user.P2) return "P2";
    if (keyCode == user.P3) return "P3";
    if (keyCode == user.K1) return "K1";
    if (keyCode == user.K2) return "K2";
    if (keyCode == user.K3) return "K3";
    if (keyCode == user.Turn) return "Turn";
    if (keyCode == user.Coin) return "Coin";
    if (keyCode == user.Start) return "Start";
    return null;
}

NetworkManager.prototype.init = function() {
    this.socket = io('http://localhost:3000'); 

    var self = this;

    this.socket.on('waiting_for_opponent', function() {
        document.getElementById('spnMsg').innerText = "Searching for opponent...";
    });

    this.socket.on('match_found', function(data) {
        self.room = data.room;
        self.playerIndex = data.playerIndex;
        self.isOnline = true;
        
        document.getElementById('spnMsg').innerText = "Match Found! You are Player " + self.playerIndex;
        
        // Start Character Selection
        StartOnlineCharacterSelection();
    });

    this.socket.on('remote_char_select', function(data) {
        var remoteUser = self.playerIndex === 1 ? user2_ : user1_;
        // 1 = down, 0 = up
        remoteUser.onKeyStateChanged(data.isDown, data.keyCode, game_.getCurrentFrame());
    });

    this.socket.on('remote_input', function(data) {
        // In Game Input
        var remoteUser = self.playerIndex === 1 ? user2_ : user1_;
        remoteUser.onKeyStateChanged(data.isDown, data.keyCode, data.frame);
    });
    
    this.socket.on('opponent_ready', function() {
        self.opponentReady = true;
        self.checkStartMatch();
    });
};

NetworkManager.prototype.findMatch = function() {
    if(this.socket) {
        this.socket.emit('find_match');
    }
};

NetworkManager.prototype.sendInput = function(isDown, keyCode, frame) {
    if (this.isOnline && this.room) {
        
        this.socket.emit('game_input', {
            room: this.room,
            isDown: isDown,
            keyCode: keyCode,
            frame: frame
        });
    }
};

NetworkManager.prototype.sendCharSelectInput = function(isDown, keyCode) {
    if (this.isOnline && this.room) {
        this.socket.emit('char_select_input', {
            room: this.room,
            isDown: isDown,
            keyCode: keyCode
        });
    }
};

NetworkManager.prototype.signalReady = function() {
    this.socket.emit('match_ready', { room: this.room });
    this.checkStartMatch();
}

NetworkManager.prototype.checkStartMatch = function() {
  
};

var networkManager_ = new NetworkManager();