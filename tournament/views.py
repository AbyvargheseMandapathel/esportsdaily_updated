from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Game, Organizer, Team, Player, Tournament, Schedule, Match, Score, OverallStanding
from .serializers import (
    GameSerializer, OrganizerSerializer, TeamSerializer, PlayerSerializer,
    TournamentSerializer, ScheduleSerializer, MatchSerializer, ScoreSerializer,
    OverallStandingSerializer
)

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
        scores = Score.objects.filter(match=match).order_by('rank')
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
