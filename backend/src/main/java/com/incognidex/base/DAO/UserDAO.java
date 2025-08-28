package com.incognidex.base.DAO;

// 1. Corrigido o caminho para classe de model
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.incognidex.base.Conexao.ConexaoBanco;
import com.incognidex.base.Model.UserModel;

public class UserDAO {

    // CREATE
    public void adicionarUser(UserModel user) {
        // SQL padronizado para a tabela "users"
        String sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        // Usando try-catch específico para SQL
        try (Connection conn = ConexaoBanco.getConnection(); // Corrigido para ConexaoBanco
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword()); // Assumindo que o método getPassword() existe no UserModel
            stmt.executeUpdate();
            System.out.println("Usuário cadastrado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }

    // READ
    public List<UserModel> listarUser() {
        // Corrigido para retornar uma lista de UserModel
        List<UserModel> lista = new ArrayList<>();
        String sql = "SELECT * FROM users"; // SQL padronizado
        try (Connection conn = ConexaoBanco.getConnection(); // Corrigido para ConexaoBanco
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                // Corrigido para usar UserModel
                UserModel u = new UserModel();
                u.setId(rs.getInt("id"));
                u.setUsername(rs.getString("username"));
                u.setEmail(rs.getString("email"));
                u.setPassword(rs.getString("password_hash")); // Assumindo que o método setPassword() existe
                lista.add(u);
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar usuários: " + e.getMessage());
        }
        return lista;
    }

    // UPDATE
    public void atualizarUser(UserModel user) {
        String sql = "UPDATE users SET username=?, email=?, password_hash=? WHERE id=?"; // SQL padronizado
        try (Connection conn = ConexaoBanco.getConnection(); // Corrigido para ConexaoBanco
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setInt(4, user.getId()); // Corrigido de "usuario" para "user"
            stmt.executeUpdate();
            System.out.println("Usuário atualizado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao atualizar usuário: " + e.getMessage());
        }
    }

    // DELETE
    public void deletarUsuario(int id) {
        String sql = "DELETE FROM users WHERE id=?"; // SQL padronizado
        try (Connection conn = ConexaoBanco.getConnection(); // Corrigido para ConexaoBanco
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
            System.out.println("Usuário deletado com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao deletar usuário: " + e.getMessage());
        }
    }

    // LOGIN
    public boolean login(String email, String password_hash) {
        String sql = "SELECT * FROM users WHERE email=? AND password_hash=?"; // SQL padronizado
        try (Connection conn = ConexaoBanco.getConnection(); // Corrigido para ConexaoBanco
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, email);
            stmt.setString(2, password_hash);
            ResultSet rs = stmt.executeQuery();
            return rs.next(); // Retorna true se encontrar um registro
        } catch (SQLException e) {
            System.out.println("Erro ao tentar fazer login: " + e.getMessage());
            return false;
        }
    }
}