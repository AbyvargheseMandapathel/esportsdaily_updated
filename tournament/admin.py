from django.contrib import admin
from .models import (
    Game, Organizer, Team, Player, Tournament, 
    Schedule, Match, Score, OverallStanding
)

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Organizer)
class OrganizerAdmin(admin.ModelAdmin):
    list_display = ('name', 'website_url')
    search_fields = ('name',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'logo_url')
    search_fields = ('name',)

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name', 'team', 'jersey_number')
    list_filter = ('team',)
    search_fields = ('name', 'team__name')

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'game', 'organiser', 'start_date', 'end_time', 'status', 'prize_pool')
    list_filter = ('status', 'game', 'organiser')
    search_fields = ('name', 'description', 'game__name', 'organiser__name')
    filter_horizontal = ('teams',)
    date_hierarchy = 'start_date'

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('tournament', 'stage', 'start_date', 'end_date', 'number_of_matches')
    list_filter = ('tournament', 'stage')
    search_fields = ('tournament__name', 'stage')
    date_hierarchy = 'start_date'

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('tournament', 'schedule', 'map', 'status')
    list_filter = ('tournament', 'schedule', 'map', 'status')
    search_fields = ('tournament__name', 'schedule__stage')

@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
    list_display = ('match', 'team', 'position_points', 'kill_points', 'bonus_points', 'total_points', 'rank', 'wwcd')
    list_filter = ('match__tournament', 'team', 'wwcd')
    search_fields = ('team__name', 'match__tournament__name')

@admin.register(OverallStanding)
class OverallStandingAdmin(admin.ModelAdmin):
    list_display = ('tournament', 'team', 'day', 'total_matches', 'position_points', 
                   'kill_points', 'total_points', 'wwcd_count', 'final_rank')
    list_filter = ('tournament', 'team', 'day')
    search_fields = ('tournament__name', 'team__name')
    date_hierarchy = 'updated_at'
