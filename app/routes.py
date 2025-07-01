from flask import Blueprint, request, jsonify
from .db import db
from .models import User, Game

main_bp = Blueprint('main', __name__)


# cadastro
@main_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
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
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({"message": "Credenciais Invalidas."}), 401
    
    if user.password != data['password']:
        return jsonify({"message": "Credenciais Invalidas"}), 401

    return jsonify({"message": "Login", "user_id": user.id})

# add game
@main_bp.route('/api/games', methods=['POST'])
def add_game():
    data = request.json
    print(data)

    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"message": "User ID is required"}), 400
    
    new_game = Game(
        title=data['title'],
        genre=data['genre'],
        platform=data['platform'],
        rating=data.get('rating'),
        time=data.get('time'),
        isPlatinum=data.get('isPlatinum', False),
        user_id=user_id
    )
    db.session.add(new_game)
    db.session.commit()
    return jsonify({"message": "Jogo Adicionado com Sucesso"}), 201

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
        'time': game.time,
        'isPlatinum': game.isPlatinum
    } for game in games]
    return jsonify(result)


# update game
@main_bp.route('/api/games/<int:game_id>', methods=['PUT'])
def update_game(game_id):
    game = Game.query.get_or_404(game_id)
    data = request.json

    game.title = data['title']
    game.genre = data['genre']
    game.platform = data['platform']
    game.rating = data.get('rating', game.rating)
    game.time = data.get('time', game.time)
    game.isPlatinum = data.get('isPlatinum', game.isPlatinum)

    db.session.commit()
    return jsonify({"message": "Jogo atualizado com sucesso"})

# delete game
@main_bp.route('/api/games/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    game = Game.query.get_or_404(game_id)

    db.session.delete(game)
    db.session.commit()
    return jsonify({"message": "Jogo deletado com Sucesso"}), 204

from flask import send_from_directory, current_app

# rota padrão
@main_bp.route("/")
def serve_index():
    return send_from_directory(current_app.static_folder, "index.html")

@main_bp.route("/<path:path>")
def serve_static(path):
    return send_from_directory(current_app.static_folder, path)
