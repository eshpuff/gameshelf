import random
from flask import Blueprint, request, jsonify, current_app
from .db import db
from .models import User, Game, RecommendedGame
import requests

main_bp = Blueprint('main', __name__)

# cadastro
@main_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json() 

    print(f"Dados recebidos no /api/signup: {data}")

    if not data:
        return jsonify({"message": "Nenhum dado enviado na requisição"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"message": "Esse email já possuí conta"}), 400
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Conta criada com sucesso"}), 201

# login
@main_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    print(f"Dados recebidos no /api/login: {data}")

    if not data:
        return jsonify({"message": "Nenhum dado enviado na requisição"}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({"message": "Credenciais Invalidas."}), 401
    
    if user.password != data['password']:
        return jsonify({"message": "Credenciais Invalidas"}), 401

    return jsonify({"message": "Login", "user_id": user.id})

# pega os jogos do usuário
@main_bp.route('/api/games/<int:user_id>', methods=['GET'])
def get_games(user_id):
    games = Game.query.filter_by(user_id=user_id).all()
    result = [{
        'id': game.id,
        'title': game.title,
        'genre': game.genre,
        'platform': game.platform,
        'rating': game.rating,
        'playtime': game.time,
        'platinumed': game.isPlatinum
    } for game in games]
    return jsonify(result)

# pegar imagens do jogo
@main_bp.route('/api/search-game-image/<path:game_title>', methods=['GET'])
def search_game_image(game_title):
    try:
        api_key = current_app.config['RAWG_API_KEY']
        if not api_key:
            return jsonify({"message": "A chave da API não foi configurada no servidor."}), 500

        url = f"https://api.rawg.io/api/games?key={api_key}&search={game_title}"

        # fazendo requisição pra api
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()

        # verifica se a busca retornou alguma coisa
        if data['results']:
            # pega a url da imagem de fundo do primeiro resultado
            image_url = data['results'][0].get('background_image')
            if image_url:
                return jsonify({"image_url": image_url})
            else:
                return jsonify({"message": "Jogo encontrado, mas sem imagem."}), 404
        else:
            return jsonify({"message": "Jogo não encontrado."}), 404

    except requests.exceptions.RequestException as e:
        return jsonify({"message": f"Erro ao contatar a API de jogos: {e}"}), 503
    except Exception as e:
        return jsonify({"message": f"Ocorreu um erro interno: {e}"}), 500

# adiciona jogo
@main_bp.route('/api/games', methods=['POST'])
def add_game():
    data = request.get_json()
    print(f"Adicionando novo jogo: {data}")

    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400
    
    new_game = Game(
        title=data['title'],
        genre=data['genre'],
        platform=data['platform'],
        rating=data.get('rating'),
        time=data.get('playtime'),
        isPlatinum=data.get('platinumed', False),
        user_id=user_id
    )
    db.session.add(new_game)
    db.session.commit()
    return jsonify({
        'id': new_game.id,
        'title': new_game.title,
        'genre': new_game.genre,
        'platform': new_game.platform,
        'rating': new_game.rating,
        'playtime': new_game.time,
        'platinumed': new_game.isPlatinum
    }), 201

# atualiza jogo
@main_bp.route('/api/games/<int:game_id>', methods=['PUT'])
def update_game(game_id):
    game = Game.query.get_or_404(game_id)
    data = request.get_json() # <--- MUDANÇA AQUI

    game.title = data['title']
    game.genre = data['genre']
    game.platform = data['platform']
    game.rating = data.get('rating', game.rating)
    game.time = data.get('playtime', game.time)
    game.isPlatinum = data.get('platinumed', game.isPlatinum)

    db.session.commit()
    return jsonify({"message": "Jogo atualizado com sucesso"})

# deleta jogo
@main_bp.route('/api/games/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    game = Game.query.get_or_404(game_id)

    db.session.delete(game)
    db.session.commit()
    return jsonify({"message": "Jogo deletado com Sucesso"}), 204

from flask import send_from_directory, current_app

# endpoint para pegar todas as recomendações
@main_bp.route('/api/recommendations', methods=['GET'])
def get_all_recommendations():
    all_games = RecommendedGame.query.all()
    result = [game.to_dict() for game in all_games]
    return jsonify(result)

# endpoint para pegar uma recomedaçao aleatoria
@main_bp.route('/api/recommendations/random/<int:user_id>', methods=['GET'])
def get_random_recommendation(user_id):
    user_games_titles = {game.title for game in Game.query.filter_by(user_id=user_id).all()}
    
    all_recommendations = RecommendedGame.query.all()

    potential_recommendations = [
        game for game in all_recommendations if game.title not in user_games_titles
    ]

    if not potential_recommendations:
        return jsonify({"message": "Uau! Você já tem todos os jogos da nossa lista de recomendações!"}), 404

    recommended_game = random.choice(potential_recommendations)
    
    return jsonify(recommended_game.to_dict())


# rota padrão
@main_bp.route("/")
def serve_index():
    return send_from_directory(current_app.static_folder, "index.html")

@main_bp.route("/<path:path>")
def serve_static(path):
    return send_from_directory(current_app.static_folder, path)