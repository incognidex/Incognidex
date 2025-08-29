package com.incognidex.base.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.incognidex.base.Service.*;
import com.incognidex.base.model.UsuarioModel;;

public class UsersController {
 @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/editar")
    public String exibirPaginaEdicao(Model model) {

        Object usuarioIdLogado = null;
        UsuarioModel usuario = UsuarioModel.buscarPorId(usuarioIdLogado);

        model.addAttribute("usuario", usuario);
        
        return "pagina-de-edicao";
    }
}


