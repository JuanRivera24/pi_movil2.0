package com.kingdombarber.api;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class RequestLoggingInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Imprime en la consola el método y la URL de cada petición que llega.
        log.info("Solicitud recibida: {} en {}", request.getMethod(), request.getRequestURI());
        return true; // 'true' para que la petición continúe hacia el controlador.
    }
}