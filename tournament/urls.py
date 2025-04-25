from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GameViewSet, OrganizerViewSet, TeamViewSet, PlayerViewSet,
    TournamentViewSet, ScheduleViewSet, MatchViewSet, ScoreViewSet,
    OverallStandingViewSet
)

router = DefaultRouter()
router.register(r'games', GameViewSet)
router.register(r'organizers', OrganizerViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'tournaments', TournamentViewSet)
router.register(r'schedules', ScheduleViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'scores', ScoreViewSet)
router.register(r'standings', OverallStandingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]