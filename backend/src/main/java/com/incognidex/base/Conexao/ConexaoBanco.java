package com.incognidex.base.Conexao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConexaoBanco {

    // 1. Definição do logger para esta classe.
    //    Isso permite registrar mensagens de forma organizada.
    private static final Logger logger = LoggerFactory.getLogger(ConexaoBanco.class);

    // 2. Suas informações de conexão.
    private static final String URL = "jdbc:mysql://localhost:3306/incognidex_banco";
    private static final String USER = "usuario_aqui";
    private static final String PASSWORD = "senha_aquifelipe";

    /**
     * Método estático que estabelece e retorna uma conexão com o banco de dados.
     * @return um objeto Connection pronto para uso, ou null se a conexão falhar.
     */
    public static Connection getConnection() {
        Connection conn = null;
        try {
            // Tenta estabelecer a conexão com o banco de dados
            conn = DriverManager.getConnection(URL, USER, PASSWORD);

            // Log de sucesso (opcional, mas bom para debug)
            // logger.info("Conexão com o banco de dados estabelecida com sucesso!");

        } catch (SQLException e) {
            // 3. Em caso de erro, usa o logger para registrar o problema.
            //    Isso é muito melhor que e.printStackTrace().
            //    A mensagem será clara e o erro 'e' fornecerá o stack trace completo no log.
            logger.error("FALHA AO CONECTAR AO BANCO DE DADOS. URL: {}", URL, e);
        }
        return conn;
    }
}