from rest_framework import viewsets, status  # Added status import here
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Game, Organizer, Team, Player, Tournament, Schedule, Match, Score, OverallStanding
from .serializers import (
    GameSerializer, OrganizerSerializer, TeamSerializer, PlayerSerializer,
    TournamentSerializer, ScheduleSerializer, MatchSerializer, ScoreSerializer,
    OverallStandingSerializer
)
from .services import process_final_standings

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class OrganizerViewSet(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    
    @action(detail=True, methods=['get'])
    def schedules(self, request, pk=None):
        """Get all schedules for a specific tournament"""
        tournament = self.get_object()
        schedules = Schedule.objects.filter(tournament=tournament)
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def matches(self, request, pk=None):
        """Get all matches for a specific tournament"""
        tournament = self.get_object()
        matches = Match.objects.filter(tournament=tournament)
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def teams(self, request, pk=None):
        """Get all teams participating in a specific tournament"""
        tournament = self.get_object()
        teams = tournament.teams.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def standings(self, request, pk=None):
        """Get overall standings for a specific tournament"""
        tournament = self.get_object()
        standings = OverallStanding.objects.filter(tournament=tournament).order_by('final_rank')
        serializer = OverallStandingSerializer(standings, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_team(self, request, pk=None):
        """Add a team to a tournament"""
        tournament = self.get_object()
        team_id = request.data.get('team_id')
        
        if not team_id:
            return Response({"error": "team_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            team = Team.objects.get(pk=team_id)
            tournament.teams.add(team)
            return Response({"success": f"Team {team.name} added to tournament {tournament.name}"})
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    
    @action(detail=True, methods=['get'])
    def scores(self, request, pk=None):
        """Get all scores for a specific match"""
        match = self.get_object()
        scores = Score.objects.filter(match=match)
        serializer = ScoreSerializer(scores, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_score(self, request, pk=None):
        """Add a score for a team in this match"""
        match = self.get_object()
        
        # Add match_id to the data
        score_data = request.data.copy()
        score_data['match'] = match.id
        
        serializer = ScoreSerializer(data=score_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_live_score(self, request, pk=None):
        match = self.get_object()
        
        # Check if we're receiving a single score or multiple scores
        if isinstance(request.data, list):
            # Handle multiple scores
            results = []
            for score_data in request.data:
                team_id = score_data.get('team')
                
                # Check if a live score already exists for this team in this match
                existing_score = Score.objects.filter(
                    match=match,
                    team_id=team_id,
                    is_live_update=True
                ).first()
                
                if existing_score:
                    # Update existing score
                    serializer = ScoreSerializer(existing_score, data={
                        **score_data,
                        'match': match.id,
                        'is_live_update': True
                    }, partial=True)
                else:
                    # Create new score
                    serializer = ScoreSerializer(data={
                        **score_data,
                        'match': match.id,
                        'is_live_update': True
                    })
                
                if serializer.is_valid():
                    serializer.save()
                    results.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(results, status=status.HTTP_201_CREATED)
        else:
            # Handle single score (existing logic)
            team_id = request.data.get('team')
            
            # Check if a live score already exists for this team in this match
            existing_score = Score.objects.filter(
                match=match,
                team_id=team_id,
                is_live_update=True
            ).first()
            
            if existing_score:
                # Update existing score
                serializer = ScoreSerializer(existing_score, data={
                    **request.data,
                    'match': match.id,
                    'is_live_update': True
                }, partial=True)
            else:
                # Create new score
                serializer = ScoreSerializer(data={
                    **request.data,
                    'match': match.id,
                    'is_live_update': True
                })
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def submit_final_standings(self, request, pk=None):
        """Submit final standings for a match"""
        match = self.get_object()
        tournament_id = match.tournament.id
        
        # Get the raw standings data
        raw_standings_data = request.data
        
        # Check if we're receiving data with team IDs or team names
        if raw_standings_data and 'team' in raw_standings_data[0]:
            # Data already has team IDs, verify each team exists
            final_standings_data = []
            for standing in raw_standings_data:
                team_id = standing.get('team')
                # Verify team exists
                try:
                    team = Team.objects.get(pk=team_id)
                    # Ensure team_id is an integer
                    standing_data = {
                        'team': int(team_id),
                        'rank': int(standing.get('rank')),
                        'total_matches': int(standing.get('total_matches', 1)),
                        'wwcd_count': int(standing.get('wwcd_count', 0)),
                        'position_points': int(standing.get('position_points', 0)),
                        'kill_points': int(standing.get('kill_points', 0)),
                        'total_points': int(standing.get('total_points', 0))
                    }
                    final_standings_data.append(standing_data)
                    print(f"Team found: {team.name} (ID: {team_id})")
                except Team.DoesNotExist:
                    error_msg = f"Team with ID {team_id} does not exist"
                    print(error_msg)
                    return Response({"error": error_msg}, 
                                   status=status.HTTP_400_BAD_REQUEST)
        else:
            # Transform the data from TeamName format to the expected format
            final_standings_data = []
            for standing in raw_standings_data:
                # Get team ID from name
                team_id = self._get_team_id_by_name(standing.get('TeamName'))
                if not team_id:
                    error_msg = f"Team not found: {standing.get('TeamName')}"
                    print(error_msg)
                    return Response({"error": error_msg}, 
                                   status=status.HTTP_400_BAD_REQUEST)
                
                # Create the expected format with explicit type conversion
                transformed_standing = {
                    'team': int(team_id),
                    'rank': int(standing.get('rank')),
                    'total_matches': int(standing.get('match', 1)),
                    'wwcd_count': 1 if standing.get('wwcd') == '1' else 0,
                    'position_points': int(standing.get('placePoint', 0)),
                    'kill_points': int(standing.get('totalKill', 0)),
                    'total_points': int(standing.get('totalPoint', 0))
                }
                final_standings_data.append(transformed_standing)
        
        # print(f"Final standings data: {final_standings_data}")
        
        try:
            # Process the transformed standings data
            success = process_final_standings(tournament_id, match.id, final_standings_data)
            
            if not success:
                print("Failed to process final standings")
                return Response({"error": "Failed to process final standings"}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"message": "Final standings processed successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            error_msg = f"Error processing final standings: {str(e)}"
            print(error_msg)
            return Response({"error": error_msg}, status=status.HTTP_400_BAD_REQUEST)
    
    def _get_team_id_by_name(self, team_name):
        """Helper method to get team ID by name"""
        print(f"Looking for team name: '{team_name}'")  # <-- add this
        try:
            team = Team.objects.get(name=team_name)
            return team.id
        except Team.DoesNotExist:
            print(f"Team not found: {team_name}")  # <-- add this
            return None

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    
    @action(detail=True, methods=['get'])
    def matches(self, request, pk=None):
        """Get all matches for a specific schedule"""
        schedule = self.get_object()
        matches = Match.objects.filter(schedule=schedule)
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_match(self, request, pk=None):
        """Add a match to this schedule"""
        schedule = self.get_object()
        
        # Add schedule_id to the data
        match_data = request.data.copy()
        match_data['schedule'] = schedule.id
        match_data['tournament'] = schedule.tournament.id
        
        serializer = MatchSerializer(data=match_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

class OverallStandingViewSet(viewsets.ModelViewSet):
    queryset = OverallStanding.objects.all()
    serializer_class = OverallStandingSerializer
