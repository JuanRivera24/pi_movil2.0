import pandas as pd
import json

def migrar_sedes():
    print("Iniciando migración de SEDES...")
    
    # --- ¡IMPORTANTE! Ajusta esta ruta a la ubicación de tus archivos .json ---
    ruta_json = 'C:/Users/juanm/OneDrive/Desktop/3PROYECTO/API/database/sedes.json'
    ruta_sql_salida = 'src/main/resources/data.sql'

    try:
        # 1. Leer el archivo JSON con pandas
        df_sedes = pd.read_json(ruta_json)
        
        # 2. Preparar el archivo SQL para escribir
        with open(ruta_sql_salida, 'w', encoding='utf-8') as f_sql:
            f_sql.write("-- Datos migrados de sedes.json\n")
            
            # 3. Recorrer cada fila del DataFrame y generar el INSERT
            for index, fila in df_sedes.iterrows():
                id_sede = fila['ID_Sede']
                nombre_sede = fila['Nombre_Sede'].replace("'", "''") # Escapar comillas simples
                
                sql_statement = f"INSERT INTO SEDES (ID_Sede, Nombre_Sede) VALUES ({id_sede}, '{nombre_sede}');\n"
                
                # 4. Escribir la línea en el archivo .sql
                f_sql.write(sql_statement)
                
        print(f"✅ ¡Éxito! Se han migrado {len(df_sedes)} sedes a {ruta_sql_salida}")

    except FileNotFoundError:
        print(f"🚨 ERROR: No se encontró el archivo en la ruta: {ruta_json}")
        print("Asegúrate de que la ruta al archivo sedes.json sea correcta.")
    except Exception as e:
        print(f"🚨 Ocurrió un error inesperado: {e}")

# --- Ejecutar la función de migración ---
if __name__ == "__main__":
    migrar_sedes()