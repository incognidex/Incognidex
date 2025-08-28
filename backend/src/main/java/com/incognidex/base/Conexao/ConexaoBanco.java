package main.java.com.incognidex.base.Conexao;
public class ConexaoBanco {
     private static final String URL = "jdbc:mysql://localhost:3306";
    private static final String USER = "incognidexhub"; // seu usuário do MySQL
    private static final String PASSWORD = "Meus2Gatos@TocamViolao!"; // sua senha do MySQL

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
}
