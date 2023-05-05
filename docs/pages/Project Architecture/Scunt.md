---
layout: default
title: Havenger Scunt
parent: Project Architecture
---

# Scunt

Scunt is broken down into 3 models:

- GameSettings

Game settings are specified before the game begins and used for certain logic functions. For example when generating teams, the game settings are used to see how many teams are specified. The logic for if a game is running/if users can see certain information on their profile page about Scunt will be stored here. The game settings can be set on the frontend Scunt Game Settings page. You can also set the amount of starter bribe points, and the amount of leeway judges are allowed to give from the base recommended points of a mission.

- Missions

The missions are used for the objectives the frosh must complete. Usually, a spreadsheet populates this. `number`, `name`, `category`, `points`, `isHidden`, `isJudgingStation`
`isHidden` will hide the mission from other users and can be changed anytime during a game to remove any missions requested by the faculty during the game or to release new missions during the game. `isJudgingStation` is a bool that indicates to the players of Scunt that they must complete the mission in front of a judge (video/photo is not accepted at the time of judging). All these flags do not have any effect on the functionality of the game apart from points.

- Teams

The teams group contains information about a team. This includes the teams nickname and amount of points. Within this collection a list of all the teams transactions can be found. For example, if a judge adds points to a team for a certain task, it is stored here. This also includes bribe points and subtraction points. The subcollection is a log of all transactions that have occurred on that team. It is usually large and only admins have access to this information.

> For more information and to better understand the architecture, be sure to check out the `models` folder and analyze the Scunt backend structure.
