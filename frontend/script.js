const API_BASE = "http://localhost:5000/api";

function editGame(id) {
  window.location.href = `edit_game.html?id=${id}`;
}

// DELETAR JOGO
async function deleteGame(id) {
  if (!confirm("Tem certeza que deseja deletar este jogo?")) return;

  const res = await fetch(`${API_BASE}/games/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Jogo deletado com sucesso.");
    window.location.reload();
  } else {
    alert("Erro ao deletar o jogo.");
  }
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", () => {
  // CADASTRO
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const { username, email, password } = signupForm;

      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Falha no cadastro.");
      }
    });
  }

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const { email, password } = loginForm;

      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Falha ao realizar login.");
      }
    });
  }

  // DASHBOARD
  const gamesList = document.getElementById("gamesList");
  if (gamesList) {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
        // Se não houver usuário, volta para o login
        window.location.href = "login.html";
        return; // Para a execução para evitar erros
    }

    fetch(`${API_BASE}/games/${user_id}`)
      .then((res) => res.json())
      .then((games) => {
        if (!games.length) {
          gamesList.innerHTML = "<p class='text-gray-400 text-center'>Nenhum jogo adicionado ainda.</p>";
        } else {
          gamesList.innerHTML = games
            .map(
              (game) => `
            <div class="bg-gray-800 p-4 rounded-xl shadow-md flex justify-between items-center">
              <div>
                <h2 class="text-xl font-semibold text-purple-200">${game.title}</h2>
                <p class="text-sm text-gray-400">${game.platform} • ${game.genre}</p>
                <p class="text-sm text-gray-400">Nota: ${game.rating ?? "-"}, Tempo: ${game.time ?? "-"}h</p>
                <p class="text-sm text-yellow-400">${game.isPlatinum ? "🏆 Platina" : "Sem troféu ainda"}</p>
              </div>
              <div class="space-x-3 text-right">
                <button onclick="editGame(${game.id})" class="text-green-400 hover:underline">Editar</button>
                <button onclick="deleteGame(${game.id})" class="text-red-400 hover:underline">Deletar</button>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
  }

  // ADICIONAR JOGO
  const newGameForm = document.getElementById("newGameForm");
  if (newGameForm) {
    newGameForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user_id = localStorage.getItem("user_id");
      if (!user_id) return alert("Você precisa estar logado.");

      const data = {
        title: newGameForm.title.value,
        genre: newGameForm.genre.value,
        platform: newGameForm.platform.value,
        rating: parseInt(newGameForm.rating.value) || null,
        time: parseInt(newGameForm.time.value) || null,
        isPlatinum: newGameForm.isPlatinum.checked,
        user_id: parseInt(user_id),
      };

      const res = await fetch(`${API_BASE}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Jogo adicionado!");
        window.location.href = "dashboard.html";
      } else {
        alert("Erro ao adicionar jogo.");
      }
    });
  }

  // EDITAR JOGO
  const editGameForm = document.getElementById("editGameForm");
  if (editGameForm) {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");

    // Popula o formulário com os dados do jogo
    fetch(`${API_BASE}/games/${localStorage.getItem("user_id")}`)
      .then((res) => res.json())
      .then((games) => {
        const game = games.find((g) => g.id == gameId);
        if (game) {
          editGameForm.title.value = game.title;
          editGameForm.genre.value = game.genre;
          editGameForm.platform.value = game.platform;
          editGameForm.rating.value = game.rating;
          editGameForm.time.value = game.time;
          editGameForm.isPlatinum.checked = game.isPlatinum;
        }
      });

    // envia o formulário atualizado
    editGameForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        title: editGameForm.title.value,
        genre: editGameForm.genre.value,
        platform: editGameForm.platform.value,
        rating: parseInt(editGameForm.rating.value) || null,
        time: parseInt(editGameForm.time.value) || null,
        isPlatinum: editGameForm.isPlatinum.checked,
      };

      const res = await fetch(`${API_BASE}/games/${gameId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Jogo atualizado!");
        window.location.href = "dashboard.html";
      } else {
        alert("Erro ao atualizar o jogo.");
      }
    });
  }
});