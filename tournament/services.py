from django.db import transaction
from .models import Tournament, Match, Score, OverallStanding, Team

def process_final_standings(tournament_id, match_id, final_standings_data):
    try:
        with transaction.atomic():
            tournament = Tournament.objects.get(id=tournament_id)
            match = Match.objects.get(id=match_id, tournament=tournament)
            
            # Delete any existing live updates for this match
            Score.objects.filter(match=match, is_live_update=True).delete()
            
            for standing_data in final_standings_data:
                team_id = standing_data.get('team')  # Correct field
                team = Team.objects.get(id=team_id)
                
                previous_standing, created = OverallStanding.objects.get_or_create(
                    tournament=tournament,
                    team=team,
                    defaults={
                        'day': match.schedule.stage,
                        'total_matches': 0,
                        'position_points': 0,
                        'kill_points': 0,
                        'bonus_points': 0,
                        'total_points': 0,
                        'wwcd_count': 0,
                        'penalties': 0
                    }
                )
                
                new_standing_data = {
                    'position_points': standing_data.get('position_points', previous_standing.position_points),
                    'kill_points': standing_data.get('kill_points', previous_standing.kill_points),
                    'bonus_points': standing_data.get('bonus_points', previous_standing.bonus_points),
                    'total_points': standing_data.get('total_points', previous_standing.total_points),
                    'wwcd_count': standing_data.get('wwcd_count', previous_standing.wwcd_count),
                    'penalties': standing_data.get('penalties', previous_standing.penalties),
                    'total_matches': standing_data.get('total_matches', previous_standing.total_matches)
                }
                
                # Differences for this match
                position_points_diff = new_standing_data['position_points'] - previous_standing.position_points
                kill_points_diff = new_standing_data['kill_points'] - previous_standing.kill_points
                bonus_points_diff = new_standing_data['bonus_points'] - previous_standing.bonus_points
                wwcd = (new_standing_data['wwcd_count'] > previous_standing.wwcd_count)
                
                # ✅ Create score (without rank)
                Score.objects.create(
                    match=match,
                    team=team,
                    position_points=position_points_diff,
                    kill_points=kill_points_diff,
                    bonus_points=bonus_points_diff,
                    wwcd=wwcd,
                    is_live_update=False
                )
                
                # Update overall standing
                for field, value in new_standing_data.items():
                    setattr(previous_standing, field, value)
                previous_standing.save()
            
            # Update tournament rankings
            update_tournament_rankings(tournament)
            
            return True
    except Exception as e:
        print(f"Error processing final standings: {str(e)}")
        return False


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