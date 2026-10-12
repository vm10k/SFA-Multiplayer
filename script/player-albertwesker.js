// Character Definition for Albert Wesker (100% Engine Aligned & Scaled)
var createAlbertWesker = function(user)

{
    var player = new Player("albertwesker", 140, 248, user);
    player.Folder = "albertwesker";
    var folder = "images/misc/albertwesker";
    var SCALE = 2.05;

    // --- Dynamic Sprite Scaling & Orientation Flip (Base sprite faces LEFT) ---
    player.flip = function(isFlipped) {
        this.IsFlipped = isFlipped;
        if (isFlipped) {
            this.SpriteElement.style.transform = "scaleX(" + SCALE + ") scaleY(" + SCALE + ")";
        } else {
            this.SpriteElement.style.transform = "scaleX(-" + SCALE + ") scaleY(" + SCALE + ")";
        }
    };
    player.SpriteElement.style.transformOrigin = "bottom center";
    player.flip(player.Direction === -1);

    // --- Render Override for Nametag Height ---
    var originalRender = player.render;
    player.render = function(frame, stageDiffX, stageDiffY) {
        originalRender.call(this, frame, stageDiffX, stageDiffY);
        if (this._nameTag) {
            this._nameTag.style.top = "-150px";
        }
    };

    // --- Scaled Hitbox (Ensures all attacks & hits register damage) ---
    player.setImgRect = function() {
        var imageOffsetY = (!!this.CurrentFrame ? this.CurrentFrame.ImageOffsetY : 0);
        var imageOffsetX = (!!this.CurrentFrame ? this.CurrentFrame.ImageOffsetX : 0);

        var bottom = (parseInt(this.Element.style.bottom) || 0) + imageOffsetY;
        var rawHeight = parseInt(this.SpriteElement.style.height) || 124;
        var rawWidth = parseInt(this.Element.style.width) || 64;

        this.SpriteHeight = Math.round(rawHeight * SCALE);
        this.SpriteWidth = Math.round(rawWidth * SCALE);

        this.TopOffset = bottom + this.SpriteHeight - this.ClipHitTop;
        this.BottomOffset = bottom + this.ClipHitBottom;
        this.BottomNoOffset = bottom;

        if (this.Direction > 0) {
            var right = STAGE.MAX_STAGEX - (parseInt(this.Element.style.right) || 0);
            this.LeftOffset = right - this.SpriteWidth + this.ClipHitFront;
            this.RightOffset = right - this.ClipHitBack - imageOffsetX;
            this.LeftNoOffset = this.LeftOffset;
            this.RightNoOffset = this.RightOffset + imageOffsetX;
        } else {
            var left = (parseInt(this.Element.style.left) || 0);
            this.LeftOffset = left + this.ClipHitBack + imageOffsetX;
            this.RightOffset = left + this.SpriteWidth - this.ClipHitFront;
            this.LeftNoOffset = this.LeftOffset - imageOffsetX;
            this.RightNoOffset = this.RightOffset;
        }

        this.ImgBBox.Left = this.LeftOffset;
        this.ImgBBox.Right = this.RightOffset;
        this.ImgBBox.Top = this.TopOffset;
        this.ImgBBox.Bottom = this.BottomOffset;
        this.ImgBBox.BottomNoOffset = this.BottomNoOffset;
        this.ImgBBox.LeftNoOffset = this.LeftNoOffset;
        this.ImgBBox.RightNoOffset = this.RightNoOffset;
    };

    player.DefaultJumpSpeed = 1.2;
    player.BlockDistanceSq = 120000;
    player.BlockDistanceSq2 = 150000;
    player.StandingClip.Top = 80;
    player.StandingClip.Back = 30;
    player.StandingClip.Front = 25;
    player.DefaultShadowOffset = 0;
    player.Circle.OffsetY = 40;
 player.DizzyOffset = { X: 0, Y: 230 };
    player.addDizzyAnimation();
    player.addDizzyAnimation();
    var f = function(name, idx) { return folder + "/" + name + "-" + idx + ".png"; };

    // --- STANCE ---
    var stance = player.addAnimation(MISC_FLAGS.NONE, "stance", 0, ["stance"], 0, false);
    stance.Flags = ({Player: PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX, Pose: POSE_FLAGS.STANDING});
    for(var i = 0; i < 4; i++) {
        stance.addRepeatingFrame(player, 0, "", f("stance", i), 5, i === 0 ? {Player: PLAYER_FLAGS.MOBILE} : MISC_FLAGS.NONE);
    }

    // --- WALKING ---
    var f_walk = player.addAnimation(POSE_FLAGS.STANDING, "f-walk", 0, [BUTTONS.FORWARD], 90, false);
    f_walk.ButtonSequence.push([{Button: BUTTONS.BACK, State: BUTTON_STATE.NONE}, {Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED}]);
    f_walk.ButtonCount = 1;
    f_walk.Flags = ({Player: PLAYER_FLAGS.LOOP_IF_KEYDOWN, Pose: POSE_FLAGS.WALKING_FORWARD});
    for(var i = 0; i < 6; i++) {
        f_walk.addRepeatingFrame(player, 0, "", f("f-walk", i), 4, i === 0 ? {Player: PLAYER_FLAGS.MOBILE} : {Player: PLAYER_FLAGS.MUST_HOLD_KEY}, MISC_FLAGS.NONE, 4);
    }

    var b_walk = player.addAnimation(POSE_FLAGS.STANDING, "b-walk", 0, [BUTTONS.BACK], 80, false);
    b_walk.ButtonSequence.push([{Button: BUTTONS.FORWARD, State: BUTTON_STATE.NONE}, {Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}]);
    b_walk.ButtonCount = 1;
    b_walk.Flags = ({Player: PLAYER_FLAGS.LOOP_IF_KEYDOWN, Pose: POSE_FLAGS.WALKING_BACKWARD});
    for(var i = 0; i < 4; i++) {
        b_walk.addRepeatingFrame(player, 0, "", f("b-walk", i), 4, i === 0 ? {Player: PLAYER_FLAGS.MOBILE} : {Player: PLAYER_FLAGS.MUST_HOLD_KEY}, MISC_FLAGS.NONE, -3);
    }

    // --- CROUCH & BLOCKS ---
    var crouch = player.addAnimation(POSE_FLAGS.STANDING, "crouch", 5, [BUTTONS.CROUCH], 99, false);
    crouch.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}]);
    crouch.ButtonCount = 1;
    crouch.Flags = ({Player: PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION, Pose: POSE_FLAGS.CROUCHING});
    for(var i = 0; i < 3; i++) {
    crouch.addFrame(player, 0, "", f("crouch", i), 2, {Player: PLAYER_FLAGS.MOBILE | (i > 0 ? PLAYER_FLAGS.HOLD_FRAME : 0)});
    }

    var block = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.ALLOW_BLOCK, "block", 0, [BUTTONS.BACK], -2, false);
    block.ButtonSequence.push([{Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}]);
    block.ButtonCount = 1;
    block.Flags = ({Player: PLAYER_FLAGS.BLOCKING});
    block.addFrame(player, 0, "", f("stance", 0), 1, {Player: PLAYER_FLAGS.BLOCKING | PLAYER_FLAGS.IGNORE_HOLD_FRAME});
    block.addFrame(player, 0, "", f("stance", 0), 4, {Player: PLAYER_FLAGS.BLOCKING | PLAYER_FLAGS.MUST_HOLD_KEY});
    block.addFrame(player, 0, "", f("stance", 0), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.BLOCKING | PLAYER_FLAGS.HOLD_FRAME});

    var cblock = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_BLOCK, "crouch block", 0, [BUTTONS.CROUCH, BUTTONS.BACK], -1, false);
    cblock.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}]);
    cblock.ButtonCount = 1;
    cblock.Flags = ({Player: PLAYER_FLAGS.BLOCKING, Pose: POSE_FLAGS.CROUCHING});
    cblock.addFrame(player, 0, "", f("crouch", 1), 1, {Player: PLAYER_FLAGS.BLOCKING | PLAYER_FLAGS.IGNORE_HOLD_FRAME});
    cblock.addFrame(player, 0, "", f("crouch", 1), 4, {Player: PLAYER_FLAGS.BLOCKING | PLAYER_FLAGS.MUST_HOLD_KEY});
    cblock.addFrame(player, 0, "", f("crouch", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.BLOCKING | PLAYER_FLAGS.HOLD_FRAME});

    var ablock = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.ALLOW_AIR_BLOCK, "air block", 0, [BUTTONS.BACK], -1, false);
    ablock.ButtonSequence.push([{Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}]);
    ablock.ButtonCount = 1;
    ablock.Flags = ({Player: PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player, 0, "", f("jump", 1), 1, {Player: PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player, 0, "", f("jump", 1), 4, {Player: PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.BLOCKING});
    ablock.chain(jump_land);

    // --- TURNING & LANDING ---
    var turn = player.addAnimation(POSE_FLAGS.STANDING, "turn", 0, ["turn"], 0, false);
    turn.ButtonCount = 1;
    turn.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Pose: POSE_FLAGS.STANDING});
    turn.addFrame(player, 0, "", f("stance", 1), 2, {Player: PLAYER_FLAGS.MOBILE});
    turn.addFrame(player, 0, "", f("stance", 0), 2);

    var cturn = player.addAnimation(POSE_FLAGS.CROUCHING, "crouch turn", 0, ["turn"], 0, false);
    cturn.ButtonCount = 1;
    cturn.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Pose: POSE_FLAGS.CROUCHING});
    cturn.addFrame(player, 0, "", f("crouch", 1), 3, {Player: PLAYER_FLAGS.MOBILE});
    cturn.chain(crouch, 1);

    var jump_land = player.addAnimation(MISC_FLAGS.NONE, "jump land", 0, ["jump-land"], 0, false);
    jump_land.addFrame(player, 0, "", f("crouch", 0), 2, {Player: PLAYER_FLAGS.MOBILE});

    // --- JUMPING MECHANICS ---
    var jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD, "jump", 0, [BUTTONS.JUMP], 95, false);
    jump.ButtonSequence.push([{Button: BUTTONS.JUMP, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.BACK, State: BUTTON_STATE.NONE}, {Button: BUTTONS.FORWARD, State: BUTTON_STATE.NONE}]);
    jump.ButtonCount = 1;
    jump.UseJumpSpeed = true;
    jump.Vy = 210;
    jump.addRepeatingFrame(player, 0, "", f("crouch", 0), 3);
    jump.addRepeatingFrame(player, 0, "", f("jump", 0), 6, {Pose: POSE_FLAGS.AIRBORNE});
    jump.addRepeatingFrame(player, 0, "", f("jump", 1), 8);
    jump.addRepeatingFrame(player, 0, "", f("jump", 2), 8);
    jump.addRepeatingFrame(player, 0, "", f("jump", 3), CONSTANTS.FRAME_MAX);
    jump.chain(jump_land);

    var f_jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD, "forward jump", 0, [BUTTONS.FORWARD, BUTTONS.JUMP], 95, false);
    f_jump.ButtonSequence.push([{Button: BUTTONS.BACK, State: BUTTON_STATE.NONE}, {Button: BUTTONS.JUMP, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED}]);
    f_jump.ButtonCount = 2;
    f_jump.UseJumpSpeed = true;
    f_jump.Vx = 35; f_jump.Vy = 210;
    f_jump.addRepeatingFrame(player, 0, "", f("crouch", 0), 3);
    f_jump.addRepeatingFrame(player, 0, "", f("jump", 0), 6, {Pose: POSE_FLAGS.AIRBORNE_FB});
    f_jump.addRepeatingFrame(player, 0, "", f("jump", 1), 8);
    f_jump.addRepeatingFrame(player, 0, "", f("jump", 2), 8);
    f_jump.addRepeatingFrame(player, 0, "", f("jump", 3), CONSTANTS.FRAME_MAX);
    f_jump.chain(jump_land);

    var b_jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD, "back jump", 0, [BUTTONS.BACK, BUTTONS.JUMP], 95, false);
    b_jump.ButtonSequence.push([{Button: BUTTONS.FORWARD, State: BUTTON_STATE.NONE}, {Button: BUTTONS.JUMP, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}]);
    b_jump.ButtonCount = 2;
    b_jump.UseJumpSpeed = true;
    b_jump.Vx = -35; b_jump.Vy = 210;
    b_jump.addRepeatingFrame(player, 0, "", f("crouch", 0), 3);
    b_jump.addRepeatingFrame(player, 0, "", f("jump", 0), 6, {Pose: POSE_FLAGS.AIRBORNE_FB});
    b_jump.addRepeatingFrame(player, 0, "", f("jump", 1), 8);
    b_jump.addRepeatingFrame(player, 0, "", f("jump", 2), 8);
    b_jump.addRepeatingFrame(player, 0, "", f("jump", 3), CONSTANTS.FRAME_MAX);
    b_jump.chain(jump_land);

    // --- STANDING PUNCHES ---
    var p1 = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1, "light punch", 5, [BUTTONS.LIGHT_PUNCH]);
    p1.ButtonSequence.push([{Button: BUTTONS.LIGHT_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p1.ButtonCount = 1;
    p1.Flags = ({Pose: POSE_FLAGS.STANDING});
    p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING, OVERRIDE_FLAGS.HPROJECTILE);
    p1.addFrame(player, 0, "", f("p1", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    p1.addFrame(player, 0, "", f("p1", 1), 3, {SwingSound: SWINGSOUND.LP, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.LP}, MISC_FLAGS.NONE, 0, 0, 0, 10, null, 0, 0, ATTACK_FLAGS.LIGHT, [{state: HIT_FLAGS.HIGH, x: 130, y: 190}], ATTACK_FLAGS.LIGHT, 1, 1, 10);
    p1.endBlock();
    p1.addFrame(player, 0, "", f("p1", 2), 3);

    var p2 = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1, "medium punch", 5, [BUTTONS.MEDIUM_PUNCH]);
    p2.ButtonSequence.push([{Button: BUTTONS.MEDIUM_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p2.ButtonCount = 1;
    p2.setMediumAttack();
    p2.Flags = ({Pose: POSE_FLAGS.STANDING});
    p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING, OVERRIDE_FLAGS.AIRBORNE);
    p2.addFrame(player, 0, "", f("p2", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    p2.addFrame(player, 0, "", f("p2", 1), 3, {SwingSound: SWINGSOUND.MP, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.MP}, MISC_FLAGS.NONE, 0, 0, 0, 15, null, 0, 0, ATTACK_FLAGS.MEDIUM, [{state: HIT_FLAGS.HIGH, x: 140, y: 195}], ATTACK_FLAGS.MEDIUM, 1, 1, 15);
    p2.endBlock();
    p2.addFrame(player, 0, "", f("p2", 2), 4);

  // --- HEAVY PUNCH (SAMURAI EDGE GUNSHOT) ---
    var p3 = player.addAnimation(
        POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1,
        "hard punch", 5, [BUTTONS.HARD_PUNCH]
    );
    p3.ButtonSequence.push([{Button: BUTTONS.HARD_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p3.ButtonCount = 1;
    p3.setHardAttack();
    p3.Flags = ({Pose: POSE_FLAGS.STANDING});
    p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING, OVERRIDE_FLAGS.HPROJECTILE);

    // Frame 0: Quick gun raise
    p3.addFrame(player, 0, "", f("p3", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});

    // Frame 1: Gunshot firing sound + bullet impact + extended range (x: 185)
    p3.addFrameWithSound(
        player, 1, "audio/misc/projectile-0.zzz", 0, "",
        f("p3", 1), 4,
        {
            Combat: COMBAT_FLAGS.ATTACK,
            Pose: POSE_FLAGS.ALLOW_INTERUPT_1,
            HitSound: HITSOUND.HP3
        },
        MISC_FLAGS.NONE, 0, 0, 0, 25, null, 0, 0,
        ATTACK_FLAGS.HARD,
        [{state: HIT_FLAGS.HIGH, x: 185, y: 190}],
        ATTACK_FLAGS.HARD, 1, 1, 20
    );
    p3.endBlock();

    // Frame 2: Gun recoil
    p3.addFrame(player, 0, "", f("p3", 2), 5);
  

    // --- STANDING KICKS ---
    var k1 = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1, "light kick", 5, [BUTTONS.LIGHT_KICK]);
    k1.ButtonSequence.push([{Button: BUTTONS.LIGHT_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k1.ButtonCount = 1;
    k1.Flags = ({Pose: POSE_FLAGS.STANDING});
    k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    k1.addFrame(player, 0, "", f("k1", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    k1.addFrame(player, 0, "", f("k1", 1), 3, {SwingSound: SWINGSOUND.LK, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.LK}, MISC_FLAGS.NONE, 0, 0, 0, 10, null, 0, 0, ATTACK_FLAGS.LIGHT, [{state: HIT_FLAGS.LOW, x: 130, y: 130}], ATTACK_FLAGS.LIGHT, 1, 1, 10);
    k1.endBlock();
    k1.addFrame(player, 0, "", f("k1", 2), 3);

    var k2 = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1, "medium kick", 5, [BUTTONS.MEDIUM_KICK]);
    k2.ButtonSequence.push([{Button: BUTTONS.MEDIUM_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k2.ButtonCount = 1;
    k2.setMediumAttack();
    k2.Flags = ({Pose: POSE_FLAGS.STANDING});
    k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING, OVERRIDE_FLAGS.AIRBORNE);
    k2.addFrame(player, 0, "", f("k2", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    k2.addFrame(player, 0, "", f("k2", 1), 4, {SwingSound: SWINGSOUND.MK, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.MK}, MISC_FLAGS.NONE, 0, 0, 0, 15, null, 0, 0, ATTACK_FLAGS.MEDIUM, [{state: HIT_FLAGS.HIGH, x: 145, y: 155}], ATTACK_FLAGS.MEDIUM, 1, 1, 15);
    k2.endBlock();
    k2.addFrame(player, 0, "", f("k2", 2), 4);

    var k3 = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1, "hard kick", 5, [BUTTONS.HARD_KICK]);
    k3.ButtonSequence.push([{Button: BUTTONS.HARD_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k3.ButtonCount = 1;
    k3.setHardAttack();
    k3.Flags = ({Pose: POSE_FLAGS.STANDING});
    k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    k3.addFrame(player, 0, "", f("k3", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    k3.addFrame(player, 0, "", f("k3", 1), 4, {SwingSound: SWINGSOUND.HK, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.HK}, MISC_FLAGS.NONE, 0, 0, 0, 25, null, 0, 0, ATTACK_FLAGS.HARD, [{state: HIT_FLAGS.HIGH, x: 160, y: 170}], ATTACK_FLAGS.HARD, 1, 1, 20);
    k3.endBlock();
    k3.addFrame(player, 0, "", f("k3", 2), 5);

    // =========================================================================
    // --- CROUCHING ATTACKS (Removed POSE_FLAGS.STANDING so crouch attacks work!) ---
    // =========================================================================
    var crouch_p1 = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_INTERUPT_1, "crouch p1", 5, [BUTTONS.CROUCH, BUTTONS.LIGHT_PUNCH], 110);
    crouch_p1.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.LIGHT_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p1.ButtonCount = 2;
    crouch_p1.Flags = ({Pose: POSE_FLAGS.CROUCHING});
    crouch_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING, OVERRIDE_FLAGS.STANDING);
    crouch_p1.addFrame(player, 0, "", f("c-p1", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    crouch_p1.addFrame(player, 0, "", f("c-p1", 1), 3, {SwingSound: SWINGSOUND.LP, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.LP}, MISC_FLAGS.NONE, 0, 0, 0, 10, null, 0, 0, ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW, [{state: HIT_FLAGS.LOW, x: 125, y: 100}], ATTACK_FLAGS.LIGHT, 1, 0, 10);
    crouch_p1.endBlock();
    crouch_p1.addFrame(player, 0, "", f("c-p1", 2), 3);
    crouch_p1.chain(crouch, 2);

    var crouch_p2 = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_INTERUPT_1, "crouch p2", 5, [BUTTONS.CROUCH, BUTTONS.MEDIUM_PUNCH], 110);
    crouch_p2.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.MEDIUM_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p2.ButtonCount = 2;
    crouch_p2.setMediumAttack();
    crouch_p2.Flags = ({Pose: POSE_FLAGS.CROUCHING});
    crouch_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING, OVERRIDE_FLAGS.STANDING);
    crouch_p2.addFrame(player, 0, "", f("c-p2", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    crouch_p2.addFrame(player, 0, "", f("c-p2", 1), 3, {SwingSound: SWINGSOUND.MP, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.MP}, MISC_FLAGS.NONE, 0, 0, 0, 15, null, 0, 0, ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW, [{state: HIT_FLAGS.LOW, x: 135, y: 105}], ATTACK_FLAGS.MEDIUM, 1, 0, 15);
    crouch_p2.endBlock();
    crouch_p2.addFrame(player, 0, "", f("c-p2", 2), 4);
    crouch_p2.chain(crouch, 2);

    var crouch_p3 = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_INTERUPT_1, "crouch p3", 5, [BUTTONS.CROUCH, BUTTONS.HARD_PUNCH], 110);
    crouch_p3.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.HARD_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p3.ButtonCount = 2;
    crouch_p3.setHardAttack();
    crouch_p3.Flags = ({Pose: POSE_FLAGS.CROUCHING});
    crouch_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING, OVERRIDE_FLAGS.STANDING | OVERRIDE_FLAGS.AIRBORNE);
    crouch_p3.addFrame(player, 0, "", f("c-p3", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    crouch_p3.addFrame(player, 0, "", f("c-p3", 1), 4, {SwingSound: SWINGSOUND.HP, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.HP}, MISC_FLAGS.NONE, 0, 0, 0, 25, null, 0, 0, ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW, [{state: HIT_FLAGS.HIGH, x: 145, y: 165}], ATTACK_FLAGS.HARD, 1, 0, 20);
    crouch_p3.endBlock();
    crouch_p3.addFrame(player, 0, "", f("c-p3", 2), 5);
    crouch_p3.chain(crouch, 2);

    var crouch_k1 = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_INTERUPT_1, "crouch k1", 5, [BUTTONS.CROUCH, BUTTONS.LIGHT_KICK], 110);
    crouch_k1.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.LIGHT_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k1.ButtonCount = 2;
    crouch_k1.Flags = ({Pose: POSE_FLAGS.CROUCHING});
    crouch_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING, OVERRIDE_FLAGS.STANDING);
    crouch_k1.addFrame(player, 0, "", f("c-k1", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    crouch_k1.addFrame(player, 0, "", f("c-k1", 1), 3, {SwingSound: SWINGSOUND.LK, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.LK}, MISC_FLAGS.NONE, 0, 0, 0, 10, null, 0, 0, ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW, [{state: HIT_FLAGS.LOW, x: 130, y: 40}], ATTACK_FLAGS.LIGHT, 1, 0, 10);
    crouch_k1.endBlock();
    crouch_k1.addFrame(player, 0, "", f("c-k1", 2), 3);
    crouch_k1.chain(crouch, 2);

    var crouch_k2 = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_INTERUPT_1, "crouch k2", 5, [BUTTONS.CROUCH, BUTTONS.MEDIUM_KICK], 110);
    crouch_k2.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.MEDIUM_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k2.ButtonCount = 2;
    crouch_k2.setMediumAttack();
    crouch_k2.Flags = ({Pose: POSE_FLAGS.CROUCHING});
    crouch_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING, OVERRIDE_FLAGS.STANDING);
    crouch_k2.addFrame(player, 0, "", f("c-k2", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    crouch_k2.addFrame(player, 0, "", f("c-k2", 1), 4, {SwingSound: SWINGSOUND.MK, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.MK}, MISC_FLAGS.NONE, 0, 0, 0, 15, null, 0, 0, ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW, [{state: HIT_FLAGS.LOW, x: 145, y: 40}], ATTACK_FLAGS.MEDIUM, 1, 0, 15);
    crouch_k2.endBlock();
    crouch_k2.addFrame(player, 0, "", f("c-k2", 2), 4);
    crouch_k2.chain(crouch, 2);

    var crouch_k3 = player.addAnimation(POSE_FLAGS.CROUCHING | POSE_FLAGS.ALLOW_INTERUPT_1, "crouch k3", 5, [BUTTONS.CROUCH, BUTTONS.HARD_KICK], 110);
    crouch_k3.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.HARD_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k3.ButtonCount = 2;
    crouch_k3.setHardAttack();
    crouch_k3.Flags = ({Pose: POSE_FLAGS.CROUCHING});
    crouch_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING, OVERRIDE_FLAGS.STANDING);
    crouch_k3.addFrame(player, 0, "", f("c-k3", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    crouch_k3.addFrame(player, 0, "", f("c-k3", 1), 4, {SwingSound: SWINGSOUND.HK, Combat: COMBAT_FLAGS.ATTACK, Pose: POSE_FLAGS.ALLOW_INTERUPT_1, HitSound: HITSOUND.HK}, MISC_FLAGS.NONE, 0, 0, 0, 20, null, 0, 0, ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW | ATTACK_FLAGS.TRIP, [{state: HIT_FLAGS.LOW, x: 160, y: 35}], ATTACK_FLAGS.HARD, 1, 1, 20, 0, CONSTANTS.TRIP_SLIDEFACTOR);
    crouch_k3.endBlock();
    crouch_k3.addFrame(player, 0, "", f("c-k3", 2), 5);
    crouch_k3.chain(crouch, 2);

    // --- AIRBORNE ATTACKS ---
    var airKnockBackX = 1;
    var jump_p1 = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB, "jump p1", 5, [BUTTONS.LIGHT_PUNCH], 0, true, true);
    jump_p1.ButtonSequence.push([{Button: BUTTONS.LIGHT_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p1.ButtonCount = 1;
    jump_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.AIRBORNE, OVERRIDE_FLAGS.NULL);
    jump_p1.addFrame(player, 0, "", f("jump-p1", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    jump_p1.addFrame(player, 0, "", f("jump-p1", 1), 12, {SwingSound: SWINGSOUND.LP, Combat: COMBAT_FLAGS.ATTACK, HitSound: HITSOUND.LP}, MISC_FLAGS.NONE, 0, 0, 0, 10, null, 0, 0, ATTACK_FLAGS.HITS_HIGH | ATTACK_FLAGS.LIGHT, [{state: HIT_FLAGS.LOW, x: 140, y: 90, Fx: airKnockBackX, Fy: 0}], ATTACK_FLAGS.LIGHT, 1, 1, 10);
    jump_p1.endBlock();
    jump_p1.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX);
    jump_p1.chain(jump_land);

    var jump_p2 = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB, "jump p2", 5, [BUTTONS.MEDIUM_PUNCH], 0, true, true);
    jump_p2.ButtonSequence.push([{Button: BUTTONS.MEDIUM_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p2.ButtonCount = 1; jump_p2.setMediumAttack();
    jump_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.AIRBORNE, OVERRIDE_FLAGS.NULL);
    jump_p2.addFrame(player, 0, "", f("jump-p2", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    jump_p2.addFrame(player, 0, "", f("jump-p2", 1), 12, {SwingSound: SWINGSOUND.MP, Combat: COMBAT_FLAGS.ATTACK, HitSound: HITSOUND.MP}, MISC_FLAGS.NONE, 0, 0, 0, 15, null, 0, 0, ATTACK_FLAGS.HITS_HIGH | ATTACK_FLAGS.MEDIUM, [{state: HIT_FLAGS.LOW, x: 150, y: 100, Fx: airKnockBackX, Fy: 0}], ATTACK_FLAGS.MEDIUM, 1, 1, 15);
    jump_p2.endBlock();
    jump_p2.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX);
    jump_p2.chain(jump_land);

    var jump_p3 = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB, "jump p3", 5, [BUTTONS.HARD_PUNCH], 0, true, true);
    jump_p3.ButtonSequence.push([{Button: BUTTONS.HARD_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p3.ButtonCount = 1; jump_p3.setHardAttack();
    jump_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.AIRBORNE, OVERRIDE_FLAGS.NULL);
    jump_p3.addFrame(player, 0, "", f("jump-p3", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    jump_p3.addFrame(player, 0, "", f("jump-p3", 1), 14, {SwingSound: SWINGSOUND.HP, Combat: COMBAT_FLAGS.ATTACK, HitSound: HITSOUND.HP}, MISC_FLAGS.NONE, 0, 0, 0, 20, null, 0, 0, ATTACK_FLAGS.HITS_HIGH | ATTACK_FLAGS.HARD, [{state: HIT_FLAGS.LOW, x: 170, y: 80, Fx: airKnockBackX, Fy: 0}], ATTACK_FLAGS.HARD, 1, 1, 20);
    jump_p3.endBlock();
    jump_p3.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX);
    jump_p3.chain(jump_land);

    var jump_k1 = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB, "jump k1", 5, [BUTTONS.LIGHT_KICK], 0, true, true);
    jump_k1.ButtonSequence.push([{Button: BUTTONS.LIGHT_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k1.ButtonCount = 1;
    jump_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.AIRBORNE, OVERRIDE_FLAGS.NULL);
    jump_k1.addFrame(player, 0, "", f("jump-k1", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    jump_k1.addFrame(player, 0, "", f("jump-k1", 1), 12, {SwingSound: SWINGSOUND.LK, Combat: COMBAT_FLAGS.ATTACK, HitSound: HITSOUND.LK}, MISC_FLAGS.NONE, 0, 0, 0, 10, null, 0, 0, ATTACK_FLAGS.HITS_HIGH | ATTACK_FLAGS.LIGHT, [{state: HIT_FLAGS.LOW, x: 140, y: 50, Fx: airKnockBackX, Fy: 0}], ATTACK_FLAGS.LIGHT, 1, 1, 10);
    jump_k1.endBlock();
    jump_k1.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX);
    jump_k1.chain(jump_land);

    var jump_k2 = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB, "jump k2", 5, [BUTTONS.MEDIUM_KICK], 0, true, true);
    jump_k2.ButtonSequence.push([{Button: BUTTONS.MEDIUM_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k2.ButtonCount = 1; jump_k2.setMediumAttack();
    jump_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.AIRBORNE, OVERRIDE_FLAGS.NULL);
    jump_k2.addFrame(player, 0, "", f("jump-k2", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    jump_k2.addFrame(player, 0, "", f("jump-k2", 1), 12, {SwingSound: SWINGSOUND.MK, Combat: COMBAT_FLAGS.ATTACK, HitSound: HITSOUND.MK}, MISC_FLAGS.NONE, 0, 0, 0, 15, null, 0, 0, ATTACK_FLAGS.HITS_HIGH | ATTACK_FLAGS.MEDIUM, [{state: HIT_FLAGS.LOW, x: 150, y: 50, Fx: airKnockBackX, Fy: 0}], ATTACK_FLAGS.MEDIUM, 1, 1, 15);
    jump_k2.endBlock();
    jump_k2.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX);
    jump_k2.chain(jump_land);

    var jump_k3 = player.addAnimation(POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB, "jump k3", 5, [BUTTONS.HARD_KICK], 0, true, true);
    jump_k3.ButtonSequence.push([{Button: BUTTONS.HARD_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k3.ButtonCount = 1; jump_k3.setHardAttack();
    jump_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.AIRBORNE, OVERRIDE_FLAGS.NULL);
    jump_k3.addFrame(player, 0, "", f("jump-k3", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    jump_k3.addFrame(player, 0, "", f("jump-k3", 1), 14, {SwingSound: SWINGSOUND.HK, Combat: COMBAT_FLAGS.ATTACK, HitSound: HITSOUND.HK}, MISC_FLAGS.NONE, 0, 0, 0, 20, null, 0, 0, ATTACK_FLAGS.HITS_HIGH | ATTACK_FLAGS.HARD, [{state: HIT_FLAGS.LOW, x: 160, y: 60, Fx: airKnockBackX, Fy: 0}], ATTACK_FLAGS.HARD, 1, 1, 20);
    jump_k3.endBlock();
    jump_k3.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX);
    jump_k3.chain(jump_land);

    // --- THROWS ---
    var throw1 = player.addThrow(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD, "throw 1", 0, [BUTTONS.FORWARD | BUTTONS.CHARGE, BUTTONS.FORWARD | BUTTONS.MEDIUM_PUNCH], CONSTANTS.MAX_PRIORITY, false, false, 0, "ShoulderThrow");
    throw1.ButtonSequence.push([{Button: [BUTTONS.FORWARD, BUTTONS.BACK], State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.MEDIUM_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    throw1.ButtonCount = 2;
    throw1.NbChargeFrames = 5;
    throw1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE, OVERRIDE_FLAGS.ALL);
    throw1.setGrappleDistance(CONSTANTS.GRAPPLE_DISTANCE);
    throw1.setOtherPlayerAirborneFlags(AIRBORNE_FLAGS.NO);
    throw1.addFrame(player, 0, "", f("stance", 0), 8, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 0, 0, ATTACK_FLAGS.THROW_START, [{state: HIT_FLAGS.LOW, x: 130, y: 145}, {state: HIT_FLAGS.HIGH, x: 170, y: 185}], ATTACK_FLAGS.NONE, 1);
    throw1.addFrame(player, 0, "", f("p3", 0), 8);
    throw1.addFrameWithSound(player, 1, "audio/misc/hit-hp-3.zzz", 0, "", f("p3", 1), 6);
    throw1.addFrame(player, 0, "", f("p3", 2), 20, {Combat: COMBAT_FLAGS.ATTACK}, MISC_FLAGS.NONE, -10, 0, 0, 100, null, 0, 0, ATTACK_FLAGS.THROW_EJECT, [{x: -1, y: -1, Fx: 1.5, Fy: 0.75}], ATTACK_FLAGS.NONE, 2, 1, 15);

    // =========================================================================
    // --- SPECIAL ABILITY: FORWARD ARROW + LIGHT PUNCH ---
    // =========================================================================
   // =========================================================================
    // --- SPECIAL ABILITY: PURPLE LIGHT / ENERGY STRIKE (FORWARD + LP) ---
    // =========================================================================
    var specialStrike = player.addAnimation(
        POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD | POSE_FLAGS.ALLOW_INTERUPT_1,
        "special-1", 10, [BUTTONS.FORWARD, BUTTONS.LIGHT_PUNCH], 50, true
    );
    specialStrike.ButtonSequence.push([
        {Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED},
        {Button: BUTTONS.LIGHT_PUNCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}
    ]);
    specialStrike.ButtonCount = 2;
    specialStrike.Flags = ({Pose: POSE_FLAGS.STANDING});
    specialStrike.IsSpecialMove = true;
    specialStrike.EnergyToAdd = 5;

    // Frame 0: Purple energy buildup / charging sound (from M.Bison's purple psycho energy)
    specialStrike.addFrameWithSound(
        player, 1, "audio/mbison/thrust-0.zzz", 0, "",
        f("special-1", 0), 4,
        {Combat: COMBAT_FLAGS.PENDING_ATTACK},
        {Player: PLAYER_FLAGS.MOBILE}
    );

    // Frame 1: Purple mystical energy blast with crackling flame impact (FIRE0)
    specialStrike.addFrameWithSound(
        player, 1, "audio/misc/fire-0.zzz", 0, "",
        f("special-1", 1), 10,
        {
            Combat: COMBAT_FLAGS.ATTACK,
            HitSound: HITSOUND.FIRE0
        },
        MISC_FLAGS.NONE, 0, 0, 0, 45, null, 0, 0,
        ATTACK_FLAGS.SPECIAL | ATTACK_FLAGS.HARD | ATTACK_FLAGS.KNOCKDOWN,
        [{state: HIT_FLAGS.HIGH, x: 165, y: 165}],
        ATTACK_FLAGS.HARD, 1, 2, 20
    );
    specialStrike.endBlock();

    // Frame 2: Dissipation of purple light
    specialStrike.addFrame(player, 0, "", f("special-1", 2), 8);
// =========================================================================
    // --- WESKER PHANTOM MOVE TELEPORT (ALL INPUTS) ---
    // =========================================================================

    // 1. REAPPEARANCE PHASES
    var tele_end_behind = player.addAnimation(
        POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,
        "teleport behind end", 0, ["tele_end_b"], 1, false, false, 0, null
    );
    tele_end_behind.Flags = ({Combat: COMBAT_FLAGS.TELEPORT_END, Pose: POSE_FLAGS.STANDING | POSE_FLAGS.QUICK_CHANGE_DIRECTION});
    tele_end_behind.addFrame(player, 0, "", "", 6, {Combat: COMBAT_FLAGS.TELEPORT_BEHIND, Player: PLAYER_FLAGS.INVISIBLE | PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_end_behind.addFrameWithSound(player, 1, "audio/akuma/warp-0.zzz", 0, "", f("teleport", 0), 4, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS | PLAYER_FLAGS.MOBILE, Pose: POSE_FLAGS.FORCE_FACE_TARGET});
    tele_end_behind.chain(stance, 0);

    var tele_end_back = player.addAnimation(
        POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,
        "teleport back end", 0, ["tele_end_bk"], 1, false, false, 0, null
    );
    tele_end_back.Flags = ({Combat: COMBAT_FLAGS.TELEPORT_END, Pose: POSE_FLAGS.STANDING | POSE_FLAGS.QUICK_CHANGE_DIRECTION});
    tele_end_back.addFrame(player, 0, "", "", 6, {Combat: COMBAT_FLAGS.TELEPORT_BACK, Player: PLAYER_FLAGS.INVISIBLE | PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_end_back.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 4, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS | PLAYER_FLAGS.MOBILE, Pose: POSE_FLAGS.FORCE_FACE_TARGET});
    tele_end_back.chain(stance, 0);

    // 2. SHORTCUT: ARROW + MEDIUM KICK (→ + MK to teleport behind, ← + MK to teleport back)
    var tele_shortcut_behind = player.addAnimation(
        POSE_FLAGS.ALLOW_INTERUPT_1 | POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,
        "teleport fwd mk", 40, [BUTTONS.FORWARD, BUTTONS.MEDIUM_KICK], 50, false
    );
    tele_shortcut_behind.ButtonSequence.push([{Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.MEDIUM_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    tele_shortcut_behind.ButtonCount = 2;
    tele_shortcut_behind.Flags = ({Pose: POSE_FLAGS.STANDING, Combat: COMBAT_FLAGS.TELEPORT_START});
    tele_shortcut_behind.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN, OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
    tele_shortcut_behind.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 3, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_shortcut_behind.chain(tele_end_behind);

    var tele_shortcut_back = player.addAnimation(
        POSE_FLAGS.ALLOW_INTERUPT_1 | POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,
        "teleport back mk", 40, [BUTTONS.BACK, BUTTONS.MEDIUM_KICK], 50, false
    );
    tele_shortcut_back.ButtonSequence.push([{Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.MEDIUM_KICK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    tele_shortcut_back.ButtonCount = 2;
    tele_shortcut_back.Flags = ({Pose: POSE_FLAGS.STANDING, Combat: COMBAT_FLAGS.TELEPORT_START});
    tele_shortcut_back.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN, OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
    tele_shortcut_back.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 3, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_shortcut_back.chain(tele_end_back);

    // 3. DRAGON PUNCH MOTIONS (→ ↓ ↘ + Kick / ← ↓ ↙ + Punch)
    var tele_dp_behind = player.addAnimation(
        POSE_FLAGS.ALLOW_INTERUPT_1 | POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,
        "teleport behind dp", 50, [], 1, false
    );
    tele_dp_behind.ButtonSequence.push([{Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED}]);
    tele_dp_behind.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}, {Button: BUTTONS.FORWARD, State: BUTTON_STATE.NONE}]);
    tele_dp_behind.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}]);
    tele_dp_behind.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.FORWARD, State: BUTTON_STATE.PRESSED}, {Button: [BUTTONS.LIGHT_KICK, BUTTONS.MEDIUM_KICK], State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}]);
    tele_dp_behind.ButtonCount = 4;
    tele_dp_behind.Flags = ({Pose: POSE_FLAGS.STANDING, Combat: COMBAT_FLAGS.TELEPORT_START});
    tele_dp_behind.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN, OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
    tele_dp_behind.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 3, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_dp_behind.chain(tele_end_behind);

    var tele_dp_back = player.addAnimation(
        POSE_FLAGS.ALLOW_INTERUPT_1 | POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,
        "teleport back dp", 50, [], 1, false
    );
    tele_dp_back.ButtonSequence.push([{Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}]);
    tele_dp_back.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}, {Button: BUTTONS.BACK, State: BUTTON_STATE.NONE}]);
    tele_dp_back.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}]);
    tele_dp_back.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}, {Button: BUTTONS.BACK, State: BUTTON_STATE.PRESSED}, {Button: [BUTTONS.LIGHT_PUNCH, BUTTONS.MEDIUM_PUNCH], State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}]);
    tele_dp_back.ButtonCount = 4;
    tele_dp_back.Flags = ({Pose: POSE_FLAGS.STANDING, Combat: COMBAT_FLAGS.TELEPORT_START});
    tele_dp_back.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN, OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
    tele_dp_back.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 3, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_dp_back.chain(tele_end_back);

    // 4. DOUBLE-TAP CROUCH (↓ ↓ + Kick to teleport behind / ↓ ↓ + Punch to teleport back)
    var tele_crouch_behind = player.addAnimation(
        POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.ALLOW_INTERUPT_1,
        "teleport behind crouch", 40, [], 1, false
    );
    tele_crouch_behind.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}]);
    tele_crouch_behind.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.NONE, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}]);
    tele_crouch_behind.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}, {Button: [BUTTONS.LIGHT_KICK, BUTTONS.MEDIUM_KICK], State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    tele_crouch_behind.ButtonCount = 3;
    tele_crouch_behind.Flags = ({Pose: POSE_FLAGS.STANDING, Combat: COMBAT_FLAGS.TELEPORT_START});
    tele_crouch_behind.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN, OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
    tele_crouch_behind.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 3, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_crouch_behind.chain(tele_end_behind);

    var tele_crouch_back = player.addAnimation(
        POSE_FLAGS.CROUCHING | POSE_FLAGS.STANDING | POSE_FLAGS.ALLOW_INTERUPT_1,
        "teleport back crouch", 40, [], 1, false
    );
    tele_crouch_back.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED}]);
    tele_crouch_back.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.NONE, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}]);
    tele_crouch_back.ButtonSequence.push([{Button: BUTTONS.CROUCH, State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.NBINTERIM_FRAMES}, {Button: [BUTTONS.LIGHT_PUNCH, BUTTONS.MEDIUM_PUNCH], State: BUTTON_STATE.PRESSED, MaxNbFrames: CONSTANTS.ATTACKBUTTON_FRAMES}]);
    tele_crouch_back.ButtonCount = 3;
    tele_crouch_back.Flags = ({Pose: POSE_FLAGS.STANDING, Combat: COMBAT_FLAGS.TELEPORT_START});
    tele_crouch_back.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN, OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
    tele_crouch_back.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", f("teleport", 0), 3, {Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player: PLAYER_FLAGS.MOBILE});
    tele_crouch_back.chain(tele_end_back);
  
    // =========================================================================
    // --- FULL ENGINE HIT REACTIONS & DAMAGE STATES ---
    // =========================================================================
    var hitReact_sLL = player.addAnimation(POSE_FLAGS.STANDING, "hr_sLL", 0, ["hr_sLL"], 0, false);
    hitReact_sLL.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLL.addFrame(player, 0, "", f("hit-sln", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_sLL.addFrame(player, 0, "", f("hit-sln", 1), 5);
    hitReact_sLL.addFrame(player, 0, "", f("hit-sln", 0), 3);
    hitReact_sLL.chain(stance, 0);

    var hitReact_sLH = player.addAnimation(POSE_FLAGS.STANDING, "hr_sLH", 0, ["hr_sLH"], 0, false);
    hitReact_sLH.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLH.addFrame(player, 0, "", f("hit-sln", 0), 3, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_sLH.addFrame(player, 0, "", f("hit-sln", 1), 5);
    hitReact_sLH.addFrame(player, 0, "", f("hit-sln", 0), 3);
    hitReact_sLH.chain(stance, 0);

    var hitReact_sML = player.addAnimation(POSE_FLAGS.STANDING, "hr_sML", 0, ["hr_sML"], 0, false);
    hitReact_sML.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sML.addFrame(player, 0, "", f("hit-sln", 0), 4, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE}).clipMove({Front: 20});
    hitReact_sML.addFrame(player, 0, "", f("hit-sln", 1), 6).clipMove({Front: 20});
    hitReact_sML.addFrame(player, 0, "", f("hit-sln", 0), 4).clipMove({Front: 20});
    hitReact_sML.chain(stance, 0);

    var hitReact_sMH = player.addAnimation(POSE_FLAGS.STANDING, "hr_sMH", 0, ["hr_sMH"], 0, false);
    hitReact_sMH.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sMH.addFrame(player, 0, "", f("hit-sln", 0), 4, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_sMH.addFrame(player, 0, "", f("hit-sln", 1), 6);
    hitReact_sMH.addFrame(player, 0, "", f("hit-sln", 0), 4);
    hitReact_sMH.chain(stance, 0);

    var hitReact_sHL = player.addAnimation(POSE_FLAGS.STANDING, "hr_sHL", 0, ["hr_sHL"], 0, false);
    hitReact_sHL.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHL.addFrame(player, 0, "", f("hit-sln", 0), 2, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE}).clipMove({Front: 20});
    hitReact_sHL.addFrameWithSound(player, 1, "audio/misc/hit-hp.zzz", 0, "", f("hit-sln", 1), 8).clipMove({Front: 20});
    hitReact_sHL.addFrame(player, 0, "", f("hit-sln", 0), 4).clipMove({Front: 20});
    hitReact_sHL.chain(stance, 0);

    var hitReact_sHH = player.addAnimation(POSE_FLAGS.STANDING, "hr_sHH", 0, ["hr_sHH"], 0, false);
    hitReact_sHH.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHH.addFrameWithSound(player, 1, "audio/misc/hit-hp.zzz", 0, "", f("hit-sln", 0), 4, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_sHH.addFrame(player, 0, "", f("hit-sln", 1), 8);
    hitReact_sHH.addFrame(player, 0, "", f("hit-sln", 0), 4);
    hitReact_sHH.chain(stance, 0);

    var hitReact_cLH = player.addAnimation(POSE_FLAGS.CROUCHING, "hr crouch light", 0, ["hr_cLH"], 0, false);
    hitReact_cLH.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Pose: POSE_FLAGS.CROUCHING});
    hitReact_cLH.addFrame(player, 0, "", f("crouch", 1), 8, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_cLH.chain(crouch, 2);

    var hitReact_cMH = player.addAnimation(POSE_FLAGS.CROUCHING, "hr crouch medium", 0, ["hr_cMH"], 0, false);
    hitReact_cMH.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Pose: POSE_FLAGS.CROUCHING});
    hitReact_cMH.addFrame(player, 0, "", f("crouch", 1), 4, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_cMH.addFrame(player, 0, "", f("crouch", 2), 6);
    hitReact_cMH.addFrame(player, 0, "", f("crouch", 1), 4);
    hitReact_cMH.chain(crouch, 2);

    var hitReact_cHH = player.addAnimation(POSE_FLAGS.CROUCHING, "hr crouch hard", 0, ["hr_cHH"], 0, false);
    hitReact_cHH.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Pose: POSE_FLAGS.CROUCHING});
    hitReact_cHH.addFrame(player, 0, "", f("crouch", 2), 6, MISC_FLAGS.NONE, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_cHH.addFrame(player, 0, "", f("crouch", 1), 6);
    hitReact_cHH.addFrame(player, 0, "", f("crouch", 0), 4);
    hitReact_cHH.chain(crouch, 2);

    var down = player.addAnimation(MISC_FLAGS.NONE, "down", 0, ["hr_down"], 0, false);
    down.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    down.addFrameWithSound(player, 1, "audio/misc/floored-1.zzz", 0, "200", f("down", 0), 4, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE | PLAYER_FLAGS.SPAWN_SMALLDIRT}, {Player: PLAYER_FLAGS.MOBILE});

    var getup = player.addAnimation(MISC_FLAGS.NONE, "getup", 0, ["hr_getup"], 0, false);
    getup.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    getup.addFrame(player, 0, "200", f("down", 0), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player, 0, "", f("getup", 0), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player, 0, "", f("getup", 1), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player, 0, "", f("getup", 2), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player, 0, "", f("crouch", 0), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.chain(stance, 0);

    var bounce = player.addAnimation(MISC_FLAGS.NONE, "bounce", 0, ["hr_bounce"], 0, false);
    bounce.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    bounce.chainVxFn = function(v) { return v * 0.75; };
    bounce.Vy = 80;
    bounce.addFrameWithSound(player, 1, "audio/misc/floored-2.zzz", 0, "200", f("hit-trip", 1), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS, Spawn: SPAWN_FLAGS.SPAWN_BIGDIRT}, {Player: PLAYER_FLAGS.MOBILE}, 0, 1);
    bounce.addFrame(player, 0, "200", f("down", 0), CONSTANTS.FRAME_MAX, {Pose: POSE_FLAGS.AIRBORNE, Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS}, {Player: PLAYER_FLAGS.MOBILE});
    bounce.chain(getup);

    var tripped = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.CROUCHING, "tripped", 0, ["hr_trip"], 0, false);
    tripped.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Juggle: JUGGLE_FLAGS.ALLOW});
    tripped.Vx = 25; tripped.Vy = 130;
    tripped.addFrame(player, 0, "", f("hit-trip", 0), 4, {Player: PLAYER_FLAGS.INVULNERABLE}, {Player: PLAYER_FLAGS.MOBILE});
    tripped.addFrame(player, 0, "", f("hit-trip", 1), 6, {Player: PLAYER_FLAGS.INVULNERABLE});
    tripped.addFrame(player, 0, "", f("hit-trip", 2), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.INVULNERABLE});
    tripped.chain(bounce);

    var knock_down = player.addAnimation(POSE_FLAGS.STANDING, "knock down", 0, ["hr_knockdown"], 0, false);
    knock_down.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Juggle: JUGGLE_FLAGS.ALLOW});
    knock_down.Vx = 25; knock_down.Vy = 150;
    knock_down.addFrame(player, 0, "", f("hit-trip", 0), 6, {Player: PLAYER_FLAGS.INVULNERABLE}, {Player: PLAYER_FLAGS.MOBILE}, 0, 1);
    knock_down.addFrame(player, 0, "", f("hit-trip", 1), 6, {Player: PLAYER_FLAGS.INVULNERABLE});
    knock_down.addFrame(player, 0, "", f("hit-trip", 2), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE});
    knock_down.chain(bounce);

    var hitReact_air = player.addAnimation(POSE_FLAGS.AIRBORNE, "hit in air", 0, ["hr_air"], 0, false);
    hitReact_air.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Juggle: JUGGLE_FLAGS.ALLOW});
    hitReact_air.Vx = -40; hitReact_air.Vy = 130;
    hitReact_air.addFrame(player, 0, "", f("hit-trip", 0), 8, {Player: PLAYER_FLAGS.INVULNERABLE}, {Player: PLAYER_FLAGS.MOBILE});
    hitReact_air.addFrame(player, 0, "", f("hit-trip", 1), 6, {Player: PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player, 0, "", f("jump", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_air.chain(jump_land);

    var eject = player.addAnimation(POSE_FLAGS.STANDING, "eject", 0, ["eject"], 0, false);
    eject.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Juggle: JUGGLE_FLAGS.ALLOW});
    eject.Vx = 35; eject.Vy = 200;
    eject.addFrame(player, 0, "", f("hit-trip", 0), 32, {Player: PLAYER_FLAGS.INVULNERABLE}, {Player: PLAYER_FLAGS.MOBILE}, 0, 1);
    eject.addFrame(player, 0, "", f("hit-trip", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE, Juggle: JUGGLE_FLAGS.IGNORE});
    eject.chain(bounce);

    var hitReact_red_fire = player.addAnimation(POSE_FLAGS.STANDING, "red fire", 0, ["hr_red_fire"], 0, false);
    hitReact_red_fire.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat: COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle: JUGGLE_FLAGS.ALLOW});
    hitReact_red_fire.Vx = 25; hitReact_red_fire.Vy = 200;
    hitReact_red_fire.addFrame(player, 0, "200", f("hit-trip", 0), 4, {Player: PLAYER_FLAGS.INVULNERABLE}, {Player: PLAYER_FLAGS.MOBILE}, 1);
    hitReact_red_fire.addFrame(player, 0, "200", f("hit-trip", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_red_fire.chain(bounce);

    var hitReact_blue_fire = player.addAnimation(POSE_FLAGS.STANDING, "blue fire", 0, ["hr_blue_fire"], 0, false);
    hitReact_blue_fire.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat: COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle: JUGGLE_FLAGS.ALLOW});
    hitReact_blue_fire.Vx = 50; hitReact_blue_fire.Vy = 150;
    hitReact_blue_fire.addFrame(player, 0, "200", f("hit-trip", 0), 4, {Player: PLAYER_FLAGS.INVULNERABLE}, {Player: PLAYER_FLAGS.MOBILE}, 1);
    hitReact_blue_fire.addFrame(player, 0, "200", f("hit-trip", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_blue_fire.chain(bounce);

    var dizzy = player.addAnimation(MISC_FLAGS.NONE, "so dizzy", 0, ["hr_sodizzy"], 0, false);
    dizzy.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Alert: ALERT_FLAGS.DIZZY});
    dizzy.AdjustShadowPosition = false;
    dizzy.addFrame(player, 0, "", f("hit-sln", 0), 32, {Player: PLAYER_FLAGS.DIZZY}, {Player: PLAYER_FLAGS.MOBILE});
    dizzy.addFrame(player, 0, "", f("hit-sln", 1), 32, {Player: PLAYER_FLAGS.DIZZY});
    dizzy.chain(dizzy);

    var getup_dizzy = player.addAnimation(MISC_FLAGS.NONE, "getup dizzy", 0, ["hr_getupdizzy"], 0, false);
    getup_dizzy.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    getup_dizzy.addFrameWithSound(player, 1, "audio/misc/floored-1.zzz", 0, "200", f("down", 0), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS, Spawn: SPAWN_FLAGS.SPAWN_SMALLDIRT}, {Player: PLAYER_FLAGS.MOBILE});
    getup_dizzy.addFrame(player, 0, "", f("getup", 0), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player, 0, "", f("getup", 1), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player, 0, "", f("getup", 2), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player, 0, "", f("crouch", 0), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.chain(dizzy);

    var hitReact_dizzyBounce = player.addAnimation(MISC_FLAGS.NONE, "dizzy bounce", 0, ["hr_dizzybounce"], 0, false);
    hitReact_dizzyBounce.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    hitReact_dizzyBounce.chainVxFn = function(v) { return v * 0.75; };
    hitReact_dizzyBounce.Vy = 80;
    hitReact_dizzyBounce.addFrameWithSound(player, 1, "audio/misc/floored-2.zzz", 0, "200", f("hit-trip", 1), 4, {Player: PLAYER_FLAGS.IGNORE_ATTACKS, Spawn: SPAWN_FLAGS.SPAWN_BIGDIRT}, {Player: PLAYER_FLAGS.MOBILE}, 0, 1);
    hitReact_dizzyBounce.addFrame(player, 0, "200", f("down", 0), CONSTANTS.FRAME_MAX, {Pose: POSE_FLAGS.AIRBORNE, Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS});
    hitReact_dizzyBounce.chain(getup_dizzy);

    var hitReact_dizzy = player.addAnimation(POSE_FLAGS.STANDING, "dizzy", 0, ["hr_dizzy"], 0, false);
    hitReact_dizzy.Flags = ({Player: PLAYER_FLAGS.MOVE_TO_FRONT});
    hitReact_dizzy.Vx = 35; hitReact_dizzy.Vy = 200;
    hitReact_dizzy.addFrame(player, 0, "200", f("hit-trip", 0), 32, {Player: PLAYER_FLAGS.IGNORE_ATTACKS}, {Player: PLAYER_FLAGS.MOBILE}, 1);
    hitReact_dizzy.addFrame(player, 0, "200", f("hit-trip", 1), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE | PLAYER_FLAGS.IGNORE_ATTACKS});
    hitReact_dizzy.chain(hitReact_dizzyBounce);

    var hitReact_deadBounce = player.addAnimation(MISC_FLAGS.NONE, "dead bounce", 0, ["hr_deadbounce"], 0, false);
    hitReact_deadBounce.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    hitReact_deadBounce.chainVxFn = function(v) { return v * 0.75; };
    hitReact_deadBounce.Vy = 80;
    hitReact_deadBounce.addFrameWithSound(player, 1, "audio/misc/floored-2.zzz", 0, "200", f("hit-trip", 1), 4, {Player: PLAYER_FLAGS.INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS, Spawn: SPAWN_FLAGS.SPAWN_BIGDIRT}, {Player: PLAYER_FLAGS.MOBILE}, 0, 1);
    hitReact_deadBounce.addFrame(player, 0, "200", f("down", 0), CONSTANTS.FRAME_MAX, {Pose: POSE_FLAGS.AIRBORNE, Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS | PLAYER_FLAGS.IGNORE_COLLISIONS});
    hitReact_deadBounce.chain(down);

    var dead = player.addAnimation(POSE_FLAGS.STANDING, "hr dead", 0, ["hr_dead"], 0, false);
    dead.Flags = ({Player: PLAYER_FLAGS.MOVE_TO_FRONT, Juggle: JUGGLE_FLAGS.ALLOW});
    dead.Vx = 35; dead.Vy = 200;
    dead.addFrame(player, 0, "200", f("hit-trip", 0), 32, {Player: PLAYER_FLAGS.INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS}, 0, 1);
    dead.addFrame(player, 0, "200", f("down", 0), CONSTANTS.FRAME_MAX, {Player: PLAYER_FLAGS.SUPER_INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS});
    dead.chain(hitReact_deadBounce);

    var win = player.addAnimation(MISC_FLAGS.NONE, "win 1", 0, ["win1"], 0, false);
    win.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX});
    win.addFrame(player, 0, "", f("win", 0), 6);
    win.addFrame(player, 0, "", f("win", 1), 8);
    win.addFrame(player, 0, "", f("win", 2), CONSTANTS.FRAME_MAX);
    player.WinAnimationNames = ["win 1"];

    player.sortAnimations();
    return player;
};

// Aliases for Engine & Mirror Match
window.createAlbertWesker = createAlbertWesker;
window.createalbertwesker = createAlbertWesker;
window.createAlbertWesker2 = createAlbertWesker;
window.createalbertwesker2 = createAlbertWesker;