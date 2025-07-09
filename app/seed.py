from app import create_app, db
from app.models import RecommendedGame
import os

good_games = [
    {'title': 'The Witcher 3: Wild Hunt', 'genre': 'RPG de Ação', 'platform': 'PC'},
    {'title': 'Red Dead Redemption 2', 'genre': 'Ação-Aventura', 'platform': 'PC'},
    {'title': 'The Legend of Zelda: Breath of the Wild', 'genre': 'Ação-Aventura', 'platform': 'Nintendo Switch'},
    {'title': 'Dark Souls III', 'genre': 'RPG de Ação', 'platform': 'PC'},
    {'title': 'Minecraft', 'genre': 'Sandbox', 'platform': 'PC'},
    {'title': 'The Last of Us', 'genre': 'Ação-Aventura', 'platform': 'PlayStation 4'},
    {'title': 'The Last of Us Part II', 'genre': 'Ação-Aventura', 'platform': 'PlayStation 4'},
    {'title': 'Final Fantasy VII Remake', 'genre': 'RPG', 'platform': 'PlayStation 4'},
    {'title': 'Among Us', 'genre': 'Multiplayer Social Deduction', 'platform': 'PC'},
    {'title': 'Animal Crossing: New Horizons', 'genre': 'Simulação', 'platform': 'Nintendo Switch'},
    {'title': 'Sekiro: Shadows Die Twice', 'genre': 'Ação-Aventura', 'platform': 'PC'},
    {'title': 'Hades', 'genre': 'Roguelike', 'platform': 'PC'},
    {'title': 'Stardew Valley', 'genre': 'Simulação', 'platform': 'PC'},
    {'title': 'Cyberpunk 2077', 'genre': 'RPG de Ação', 'platform': 'PC'},
    {'title': 'Nier: Automata', 'genre': 'RPG de Ação', 'platform': 'PC'},
    {'title': 'Mario Kart 8 Deluxe', 'genre': 'Corrida', 'platform': 'Nintendo Switch'},
    {'title': 'Stellar Blade', 'genre': 'RPG de Ação', 'platform': 'PlayStation 4'},
    {'title': 'Baldur’s Gate 3', 'genre': 'RPG', 'platform': 'PC'},
    {'title': 'Overcooked! 2', 'genre': 'Multiplayer Cooperativo', 'platform': 'PC'},
    {'title': 'Ghost of Tsushima', 'genre': 'Ação-Aventura', 'platform': 'PlayStation 4'},
    {'title': 'Assassin’s Creed Valhalla', 'genre': 'Ação-Aventura', 'platform': 'PC'},
    {'title': 'Monster Hunter: World', 'genre': 'Ação-RPG', 'platform': 'PC'},
    {'title': 'Wuthering Waves', 'genre': 'Ação-RPG', 'platform': 'PC'},
    {'title': 'Hollow Knight', 'genre': 'Metroidvania', 'platform': 'PC'},
    {'title': 'Doom Eternal', 'genre': 'FPS', 'platform': 'PC'},
    {'title': 'Resident Evil Village', 'genre': 'Survival Horror', 'platform': 'PC'},
    {'title': 'Resident Evil 2 Remake', 'genre': 'Survival Horror', 'platform': 'PC'},
    {'title': 'Resident Evil 4 Remake', 'genre': 'Survival Horror', 'platform': 'PC'},
    {'title': 'Final Fantasy XIV Online', 'genre': 'MMORPG', 'platform': 'PC'},
    {'title': 'Persona 5 Royal', 'genre': 'RPG', 'platform': 'PlayStation 4'},
    {'title': 'God of War', 'genre': 'Ação-Aventura', 'platform': 'PlayStation 4'},
    {'title': 'Elden Ring', 'genre': 'RPG de Ação', 'platform': 'PlayStation 5'},
    {'title': 'Celeste', 'genre': 'Plataforma', 'platform': 'PC'},
    {'title': 'Portal 2', 'genre': 'Puzzle', 'platform': 'PC'},
    {'title': 'Bloodborne', 'genre': 'RPG de Ação', 'platform': 'PlayStation 4'},
]

app = create_app()

def seed_database():
    with app.app_context():
        db.session.query(RecommendedGame).delete()
        
        for game_data in good_games:
            new_game = RecommendedGame(
                title=game_data['title'],
                genre=game_data['genre'],
                platform=game_data['platform']
            )
            db.session.add(new_game)
            print(f"Adicionando {game_data['title']}...")

        db.session.commit()
        print("Banco de dados de recomendações populado com sucesso!")

if __name__ == '__main__':
    seed_database()