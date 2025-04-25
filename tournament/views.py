from rest_framework import viewsets
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

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

class OverallStandingViewSet(viewsets.ModelViewSet):
    queryset = OverallStanding.objects.all()
    serializer_class = OverallStandingSerializer
