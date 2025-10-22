document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const usernameFromUrl = urlParams.get("username"); 
  const form = document.getElementById("edit-profile-form");
  const messageArea = document.getElementById("message-area");
  const profilePicPreview = document.getElementById("edit-profile-pic-preview");
  const fileInput = document.getElementById("file");

  const loggedInUsername = localStorage.getItem("username");

  if (!usernameFromUrl) {
    console.error("Nome de usuário não especificado para edição.");
    window.location.href = "index.html";
    return;
  }

  async function loadUserProfile(username) {
    try {
      const response = await fetch(
        `https://incognidex-backend.onrender.com/api/profile/${username}`,
        {
          headers: {
            "X-User-Username": loggedInUsername,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Perfil não encontrado ou acesso negado (Status: ${response.status})`
        );
      }
      const user = await response.json();

      document.getElementById("username").value = user.username || "";
      document.getElementById("nomeCompleto").value = user.nome_completo || "";
      document.getElementById("biografia").value = user.biografia || "";
      document.getElementById("interessesAcademicos").value =
        user.interesses_academicos || "";
      profilePicPreview.src =
        user.url_foto || "https://via.placeholder.com/150";
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
      messageArea.innerHTML = `<p style="color: red;">Erro ao carregar dados para edição. ${error.message}</p>`;
    }
  }

  if (!loggedInUsername || loggedInUsername !== usernameFromUrl) {
    console.error("Usuário logado não corresponde ao perfil a ser editado.");
    alert("Você não tem permissão para editar este perfil.");
    window.location.href = `user-profile.html?username=${usernameFromUrl}`;
    return;
  }

  loadUserProfile(usernameFromUrl);

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      profilePicPreview.src = URL.createObjectURL(file);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    if (fileInput.files.length === 0) {
      formData.delete("file");
    }

    try {
      messageArea.innerHTML = `<p style="color: orange;">Salvando alterações...</p>`;

      const response = await fetch(
        `https://incognidex-backend.onrender.com/api/profile/edit`,
        {
          method: "PUT",
          headers: {
            "X-User-Username": loggedInUsername,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        messageArea.innerHTML = `<p style="color: green; font-weight: bold;">✅ Perfil atualizado com sucesso!</p>`;

        if (updatedUser.username !== loggedInUsername) {
          localStorage.setItem("username", updatedUser.username);
        }

        setTimeout(() => {
          window.location.href = `user-profile.html?username=${updatedUser.username}`;
        }, 1500);
      } else {
        const errorText = await response.text();
        let errorMessage = "Erro ao salvar o perfil. Verifique os dados.";
        if (response.status === 400 && errorText.includes("Duplicate entry")) {
          errorMessage = "Nome de usuário ou e-mail já estão em uso.";
        } else if (response.status === 400) {
          errorMessage =
            "Dados inválidos. Verifique se o nome de usuário tem o formato correto.";
        } else if (response.status === 403) {
          errorMessage = "Erro de permissão. Faça login novamente.";
        }
        messageArea.innerHTML = `<p style="color: red;">❌ ${errorMessage}</p>`;
        console.error(
          "Erro na resposta do servidor:",
          response.status,
          errorText
        );
      }
    } catch (error) {
      console.error("Erro na requisição de atualização:", error);
      messageArea.innerHTML = `<p style="color: red;">Erro de conexão com o servidor.</p>`;
    }
  });

  document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = `user-profile.html?username=${loggedInUsername}`;
  });
});
