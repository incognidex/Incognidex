package main.java.com.incognidex.base.DAO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    // CREATE
    public void adicionarUser(User user) {
        String sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.executeUpdate();
            System.out.println("Usuário cadastrado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // READ
    public List<User> listarUser() {
        List<User> lista = new ArrayList<>();
        String sql = "SELECT * FROM users";
        try (Connection conn = Conexao.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
             //ATUALIZAR COM FRONT END
            while (rs.next()) {
                Usuario u = new Usuario();
                u.setId(rs.getInt("id"));
                u.setUsername(rs.getString("username"));
                u.setEmail(rs.getString("email"));
                u.setPassword(rs.getString("password"));
                lista.add(u);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }

    // UPDATE
    public void atualizarUser(User user) {
        String sql = "UPDATE users SET username=?, email=?, password=? WHERE id=?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setInt(4, usuario.getId());
            stmt.executeUpdate();
            System.out.println("Usuário atualizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // DELETE
    public void deletarUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id=?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
            System.out.println("Usuário deletado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // LOGIN
    public boolean login(String email, String password) {
        String sql = "SELECT * FROM usuarios WHERE email=? AND senha=?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, senha);
            ResultSet rs = stmt.executeQuery();
            return rs.next(); // true se achou
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
