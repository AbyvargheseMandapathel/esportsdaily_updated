from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Score, OverallStanding
from django.db import models

@receiver(post_save, sender=Score)
def update_overall_standings(sender, instance, created, **kwargs):
    """
    Update overall standings when a score is saved or updated
    """
    match = instance.match
    tournament = match.tournament
    team = instance.team
    
    # Get or create overall standing for this tournament and team
    standing, created = OverallStanding.objects.get_or_create(
        tournament=tournament,
        team=team,
        defaults={'day': match.schedule.stage}  # Use schedule stage as day if creating new
    )
    
    # Recalculate all scores for this team in this tournament
    scores = Score.objects.filter(
        match__tournament=tournament,
        team=team
    )
    
    # Update standing fields
    standing.total_matches = scores.count()
    standing.position_points = scores.aggregate(sum=models.Sum('position_points'))['sum'] or 0
    standing.kill_points = scores.aggregate(sum=models.Sum('kill_points'))['sum'] or 0
    standing.bonus_points = scores.aggregate(sum=models.Sum('bonus_points'))['sum'] or 0
    standing.wwcd_count = scores.filter(wwcd=True).count()
    
    # Save the standing (calculate_total will be called in save method)
    standing.save()
    
    # Update rankings for all teams in this tournament
    update_tournament_rankings(tournament)

@receiver(post_delete, sender=Score)
def update_standings_on_score_delete(sender, instance, **kwargs):
    """
    Update overall standings when a score is deleted
    """
    match = instance.match
    tournament = match.tournament
    team = instance.team
    
    try:
        standing = OverallStanding.objects.get(tournament=tournament, team=team)
        
        # Recalculate all scores for this team in this tournament
        scores = Score.objects.filter(
            match__tournament=tournament,
            team=team
        )
        
        if scores.exists():
            # Update standing fields
            standing.total_matches = scores.count()
            standing.position_points = scores.aggregate(sum=models.Sum('position_points'))['sum'] or 0
            standing.kill_points = scores.aggregate(sum=models.Sum('kill_points'))['sum'] or 0
            standing.bonus_points = scores.aggregate(sum=models.Sum('bonus_points'))['sum'] or 0
            standing.wwcd_count = scores.filter(wwcd=True).count()
            standing.save()
        else:
            # If no scores left, delete the standing
            standing.delete()
        
        # Update rankings for all teams in this tournament
        update_tournament_rankings(tournament)
    except OverallStanding.DoesNotExist:
        pass

def update_tournament_rankings(tournament):
    """
    Update final_rank for all teams in a tournament based on total_points
    """
    # Get all standings for this tournament ordered by total_points (descending)
    standings = OverallStanding.objects.filter(tournament=tournament).order_by('-total_points')
    
    # Update ranks
    for rank, standing in enumerate(standings, 1):
        if standing.final_rank != rank:
            standing.final_rank = rank
            standing.save(update_fields=['final_rank'])