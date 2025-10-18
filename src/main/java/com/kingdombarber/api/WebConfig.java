package com.kingdombarber.api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // --- CORRECCIÓN DEFINITIVA ---
        // "file:uploads/" apunta a la carpeta 'uploads' en la raíz del proyecto.
        // Es la forma más simple y compatible.
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }

   @Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:3000",
                "http://localhost:8501",
                "https://kingdombarberdashboard.streamlit.app/",
                "https://pi-web2-six.vercel.app/" 
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
}