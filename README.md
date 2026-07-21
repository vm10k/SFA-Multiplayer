# SFA Multiplayer
<img width="1280" height="894" alt="image" src="https://github.com/user-attachments/assets/3bcc3a0c-3a41-431e-b367-a773656559f2" />

Fight. Connect. Dominate.
https://sfa-multiplayer.ct.ws/

Street Fighter Alpha: Web Multiplayer is a browser-based fighting game experience that brings competitive arcade action to the web. Featuring real-time matchmaking, social integration, and multiple combat modes, it is designed for low-latency competitive play directly in your browser.

## Table of Contents
* [Overview](#overview)
* [Core Features](#core-features)
* [Game Modes](#game-modes)
* [Social and Competitive Systems](#social-and-competitive-systems)
* [Current Leaderboard](#current-leaderboard)
* [Technical Specifications](#technical-specifications)
* [Installation and Setup](#installation-and-setup)

## Overview
This project aims to recreate the high-intensity gameplay of classic fighting titles while leveraging modern web technologies to enable seamless multiplayer connectivity. Players can enter their handle, track their performance, and engage with a global community of fighters in real-time.

## Core Features
* **Low Latency Engine**: Optimized for performance with integrated ping monitoring to ensure precise input registration during battles.
* **Network Transparency**: Real-time display of active fighters online and ongoing battles.
* **Profile Management**: Simple name entry system to track individual statistics and leaderboard progress.
* **Cross-Platform Compatibility**: Playable on any modern web browser without the need for external plugins or heavy downloads.

## Game Modes
* **Training Mode**: A sandbox environment for players to practice combos and master character mechanics.
* **VS Battle (1v1)**: The standard competitive format for head-to-head combat.
* **Dramatic Battle (2v2)**: Cooperate with a partner or face off in larger skirmishes.
* **Team Survival (3v3)**: An endurance-based mode where teams of three compete for dominance.


## Social and Competitive Systems
* **Global Chat**: A real-time messaging system to communicate with the entire player base, organize matches, or discuss strategy.
* **Friends List**: Add and manage connections with other players to easily facilitate private matches.
* **Live Network Status**: A dedicated dashboard showing the health of the game environment and current activity levels.

## Current Leaderboard: Top Fighters
The leaderboard tracks the most active participants based on total matches played.

| Rank | Username | Status |
| :--- | :--- | :--- |
| 1 | Player | 21 Plays |
| 2 | homeland | 15 Plays |
| 3 | vm10k | 3 Plays |
| 4 | omlander | 1 Play |
| 5 | Triple T | 1 Play |

## Screenshot
<img width="1114" height="418" alt="Capture" src="https://github.com/user-attachments/assets/572abfb5-dbc7-4ed6-b324-d7a67b3d1630" />

## Community
Join our community to discuss strategies, report bugs, and stay updated on upcoming features. [https://discord.gg/TwfWuRnXun](https://discord.gg/td4qqkBXgv)

# How to Add a Character?

We welcome new characters! To keep the engine safe, you do not need to edit any existing game code. You only need to create and upload three things:

### 1. Your Sprite Folder
Create a folder named `images/misc/[character_name]/` (lowercase, e.g., `images/misc/homelander/`). Place your PNG spritesheets inside:
*   `sprites.png` (Required: Idle, walking, attacks, hit reactions)
*   `projectiles.png` (Optional: Fireballs, beams, etc.)
*   `trail-sprites.png` (Optional: After-image effects)
*   `misc-sprites.png` (Optional: Special effects)

### 2. Your Sprite Coordinates (`player-[character_name]-spritedata.js`)
Create a file named `player-[character_name]-spritedata.js` to map coordinates on your spritesheet. Use Ryu's spritedata file as a template.
*   Make sure your main function is named: `Create[character_name]SpriteData`

### 3. Your Move List & Frame Data (`player-[character_name].js`)
Create a file named `player-[character_name].js` to define your character's stats, moves, and hitboxes. Use Ryu's character file as a template.
*   Make sure your main function is named: `create[character_name]`

Once these three items are ready, submit a Pull Request. and we will handle the system integration and add your character to the select screen!
---

Copyright 2026 Fan Project. Server Alpha v1.0. All trademarks belong to their respective owners.
