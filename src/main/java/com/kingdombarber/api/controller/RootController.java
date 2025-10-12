package com.kingdombarber.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Este controlador maneja las peticiones a la ruta raíz de la API ("/").
 * Su propósito es mostrar un mensaje de estado para confirmar que la API está
 * funcionando correctamente.
 */
@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, String> apiStatus() {
        Map<String, String> status = new HashMap<>();
        
        status.put("status", "OK");
        status.put("message", "Bienvenido a la API de Kingdom Barber. El servicio está en línea.");
        status.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        
        return status;
    }
}