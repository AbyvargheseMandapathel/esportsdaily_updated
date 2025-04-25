# API Documentation for Esports Daily Backend

Here's a comprehensive documentation of all the API endpoints available in your project, including sample payloads and HTTP requests.

## Base URL

```
http://localhost:8000/api/
```

## Authentication

Currently, the API doesn't require authentication.

## Endpoints

### Games

#### List all games

```
GET /api/games/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "PUBG Mobile",
    "description": "Battle royale game for mobile devices",
    "image_url": "https://example.com/pubgm.jpg"
  },
  {
    "id": 2,
    "name": "Valorant",
    "description": "5v5 tactical shooter",
    "image_url": "https://example.com/valorant.jpg"
  }
]
```

#### Get a specific game

```
GET /api/games/{id}/
```

**Sample Response:**
```json
{
  "id": 1,
  "name": "PUBG Mobile",
  "description": "Battle royale game for mobile devices",
  "image_url": "https://example.com/pubgm.jpg"
}
```

#### Create a new game

```
POST /api/games/
```

**Sample Payload:**
```json
{
  "name": "Free Fire",
  "description": "Popular battle royale game",
  "image_url": "https://example.com/freefire.jpg"
}
```

#### Update a game

```
PUT /api/games/{id}/
```

**Sample Payload:**
```json
{
  "name": "Free Fire MAX",
  "description": "Enhanced version of Free Fire",
  "image_url": "https://example.com/freefire-max.jpg"
}
```

#### Delete a game

```
DELETE /api/games/{id}/
```

### Organizers

#### List all organizers

```
GET /api/organizers/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "ESL",
    "description": "Electronic Sports League",
    "website_url": "https://www.eslgaming.com/"
  },
  {
    "id": 2,
    "name": "BLAST",
    "description": "Premier esports tournament organizer",
    "website_url": "https://blast.tv/"
  }
]
```

#### Create a new organizer

```
POST /api/organizers/
```

**Sample Payload:**
```json
{
  "name": "DreamHack",
  "description": "World's largest digital festival",
  "website_url": "https://dreamhack.com/"
}
```

### Teams

#### List all teams

```
GET /api/teams/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "Team Liquid",
    "logo_url": "https://example.com/teamliquid.png"
  },
  {
    "id": 2,
    "name": "Fnatic",
    "logo_url": "https://example.com/fnatic.png"
  }
]
```

#### Create a new team

```
POST /api/teams/
```

**Sample Payload:**
```json
{
  "name": "Cloud9",
  "logo_url": "https://example.com/cloud9.png"
}
```

### Players

#### List all players

```
GET /api/players/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "Shroud",
    "team": 1,
    "jersey_number": 7
  },
  {
    "id": 2,
    "name": "s1mple",
    "team": 2,
    "jersey_number": 1
  }
]
```

#### Create a new player

```
POST /api/players/
```

**Sample Payload:**
```json
{
  "name": "Faker",
  "team": 3,
  "jersey_number": 10
}
```

### Tournaments

#### List all tournaments

```
GET /api/tournaments/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "PMGC 2023",
    "short_description": "PUBG Mobile Global Championship",
    "description": "The biggest PUBG Mobile tournament of the year",
    "game": 1,
    "organiser": 1,
    "start_date": "2023-11-10T10:00:00Z",
    "end_time": "2023-12-10T18:00:00Z",
    "location": "Kuala Lumpur, Malaysia",
    "prize_pool": "3000000.00",
    "status": "completed",
    "rules": "Standard PUBG Mobile esports rules apply",
    "teams": [1, 2, 3],
    "website_link": "https://example.com/pmgc2023",
    "twitter_link": "https://twitter.com/PMGC",
    "twitch_link": "https://twitch.tv/PMGC",
    "youtube_link": "https://youtube.com/PMGC",
    "discord_link": "https://discord.gg/PMGC"
  }
]
```

#### Create a new tournament

```
POST /api/tournaments/
```

**Sample Payload:**
```json
{
  "name": "VCT 2024",
  "short_description": "Valorant Champions Tour",
  "description": "The premier Valorant esports competition",
  "game": 2,
  "organiser": 2,
  "start_date": "2024-02-15T12:00:00Z",
  "end_time": "2024-09-20T20:00:00Z",
  "location": "Various locations worldwide",
  "prize_pool": "2000000.00",
  "status": "upcoming",
  "rules": "Official Valorant esports rulebook applies",
  "teams": [1, 3, 5],
  "website_link": "https://example.com/vct2024",
  "twitter_link": "https://twitter.com/VCT",
  "twitch_link": "https://twitch.tv/VCT",
  "youtube_link": "https://youtube.com/VCT",
  "discord_link": "https://discord.gg/VCT"
}
```

### Schedules

#### List all schedules

```
GET /api/schedules/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "tournament": 1,
    "stage": "Group Stage",
    "start_date": "2023-11-10T10:00:00Z",
    "end_date": "2023-11-20T18:00:00Z",
    "detail": "16 teams compete in a round-robin format",
    "number_of_matches": 24
  },
  {
    "id": 2,
    "tournament": 1,
    "stage": "Semifinals",
    "start_date": "2023-11-25T12:00:00Z",
    "end_date": "2023-11-26T20:00:00Z",
    "detail": "Top 8 teams compete in a single elimination bracket",
    "number_of_matches": 4
  }
]
```

#### Create a new schedule

```
POST /api/schedules/
```

**Sample Payload:**
```json
{
  "tournament": 1,
  "stage": "Finals",
  "start_date": "2023-12-09T14:00:00Z",
  "end_date": "2023-12-10T18:00:00Z",
  "detail": "Top 4 teams compete for the championship",
  "number_of_matches": 2
}
```

### Matches

#### List all matches

```
GET /api/matches/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "tournament": 1,
    "schedule": 1,
    "map": "erangel",
    "live_link": "https://twitch.tv/PMGC/match1",
    "status": "completed"
  },
  {
    "id": 2,
    "tournament": 1,
    "schedule": 1,
    "map": "miramar",
    "live_link": "https://twitch.tv/PMGC/match2",
    "status": "not_started"
  }
]
```

#### Create a new match

```
POST /api/matches/
```

**Sample Payload:**
```json
{
  "tournament": 1,
  "schedule": 2,
  "map": "sanhok",
  "live_link": "https://twitch.tv/PMGC/semifinal1",
  "status": "not_started"
}
```

### Scores

#### List all scores

```
GET /api/scores/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "match": 1,
    "team": 1,
    "position_points": "12.00",
    "kill_points": "15.00",
    "bonus_points": "0.00",
    "total_points": "27.00",
    "rank": 1,
    "wwcd": true
  },
  {
    "id": 2,
    "match": 1,
    "team": 2,
    "position_points": "8.00",
    "kill_points": "10.00",
    "bonus_points": "0.00",
    "total_points": "18.00",
    "rank": 2,
    "wwcd": false
  }
]
```

#### Create a new score

```
POST /api/scores/
```

**Sample Payload:**
```json
{
  "match": 2,
  "team": 1,
  "position_points": "10.00",
  "kill_points": "8.00",
  "bonus_points": "2.00",
  "rank": 2,
  "wwcd": false
}
```

### Overall Standings

#### List all standings

```
GET /api/standings/
```

**Sample Response:**
```json
[
  {
    "id": 1,
    "tournament": 1,
    "team": 1,
    "day": "Day 1",
    "total_matches": 5,
    "position_points": "45.00",
    "kill_points": "38.00",
    "bonus_points": "5.00",
    "total_points": "88.00",
    "wwcd_count": 2,
    "penalties": "0.00",
    "final_rank": 1,
    "updated_at": "2023-11-15T18:30:00Z"
  },
  {
    "id": 2,
    "tournament": 1,
    "team": 2,
    "day": "Day 1",
    "total_matches": 5,
    "position_points": "32.00",
    "kill_points": "42.00",
    "bonus_points": "0.00",
    "total_points": "74.00",
    "wwcd_count": 1,
    "penalties": "0.00",
    "final_rank": 2,
    "updated_at": "2023-11-15T18:30:00Z"
  }
]
```

## Making HTTP Requests

### Using cURL

```bash
# Get all tournaments
curl -X GET http://localhost:8000/api/tournaments/

# Create a new team
curl -X POST http://localhost:8000/api/teams/ \
  -H "Content-Type: application/json" \
  -d '{"name": "NaVi", "logo_url": "https://example.com/navi.png"}'
```

### Using JavaScript (Fetch API)

```javascript
// Get all matches
fetch('http://localhost:8000/api/matches/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Create a new score
fetch('http://localhost:8000/api/scores/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "match": 3,
    "team": 2,
    "position_points": "6.00",
    "kill_points": "12.00",
    "bonus_points": "0.00",
    "rank": 3,
    "wwcd": false
  }),
})
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

### Using Python (Requests)

```python
import requests
import json

# Get all teams
response = requests.get('http://localhost:8000/api/teams/')
teams = response.json()
print(teams)

# Create a new player
player_data = {
    "name": "TenZ",
    "team": 3,
    "jersey_number": 5
}
response = requests.post(
    'http://localhost:8000/api/players/',
    data=json.dumps(player_data),
    headers={'Content-Type': 'application/json'}
)
print(response.json())
```

## Notes

- The Overall Standings are automatically calculated when scores are added, updated, or deleted.
- All decimal fields (like points) should be sent as strings in JSON.
- For creating related objects, use the ID of the related object.


