from django.db import models
from django.core.exceptions import ValidationError

class Game(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    
    def __str__(self):
        return self.name
    
class Organizer(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    website_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Team(models.Model):  # Renamed from Teams to Team
    name = models.CharField(max_length=100)
    logo_url = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    name = models.CharField(max_length=100)
    jersey_number = models.PositiveIntegerField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.team.name})"

class Tournament(models.Model):
    STATUS_CHOICES = (
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    )

    name = models.CharField(max_length=200)
    short_description = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='tournaments')
    organiser = models.ForeignKey(Organizer, on_delete=models.SET_NULL, null=True, related_name='organized_tournaments')
    start_date = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    prize_pool = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    rules = models.TextField(blank=True)
    teams = models.ManyToManyField(Team, related_name='tournaments', blank=True)

    # External links
    website_link = models.URLField(blank=True)
    twitter_link = models.URLField(blank=True)
    twitch_link = models.URLField(blank=True)
    youtube_link = models.URLField(blank=True)
    discord_link = models.URLField(blank=True)

    def clean(self):
        if self.end_time < self.start_date:
            raise ValidationError('End time must be after the start date.')

    def __str__(self):
        return self.name


class Schedule(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='schedules')
    stage = models.CharField(max_length=100)  # e.g., "Round 1", "Semifinals", etc.
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    detail = models.TextField(blank=True)
    number_of_matches = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.tournament.name} - {self.stage}"

    
class Match(models.Model):
    MAP_CHOICES = (
        ('erangel', 'Erangel'),
        ('miramar', 'Miramar'),
        ('sanhok', 'Sanhok'),
        ('vikendi', 'Vikendi'),
    )

    STATUS_CHOICES = (
        ('not_started', 'Not Started'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    )

    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches', db_index=True)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='matches', db_index=True)
    map = models.CharField(max_length=50, choices=MAP_CHOICES)
    live_link = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')

    def __str__(self):
        return f"{self.tournament.name} - {self.schedule.stage} - {self.get_map_display()} Match"

    
class Score(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='scores', db_index=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='scores', db_index=True)
    position_points = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    kill_points = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    bonus_points = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    total_points = models.DecimalField(max_digits=7, decimal_places=2, default=0)  # Changed to Decimal
    rank = models.IntegerField()
    wwcd = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.total_points = self.position_points + self.kill_points + self.bonus_points
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.team.name} - {self.match} - {self.total_points} pts"

class OverallStanding(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='overall_standings')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='overall_standings')
    day = models.CharField(max_length=50, blank=True)  # e.g., "Day 1", "Final", "Semis"
    total_matches = models.IntegerField(default=0)
    position_points = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    kill_points = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    bonus_points = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    total_points = models.DecimalField(max_digits=7, decimal_places=2, default=0)  # Changed to Decimal
    wwcd_count = models.IntegerField(default=0)
    penalties = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Changed to Decimal
    final_rank = models.IntegerField(null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def calculate_total(self):
        self.total_points = (
            self.position_points + self.kill_points + self.bonus_points - self.penalties
        )

    def save(self, *args, **kwargs):
        self.calculate_total()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tournament.name} - {self.team.name} - {self.day or 'Overall'}"
