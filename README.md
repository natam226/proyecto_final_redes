# Proyecto de redes e infraestructura: Aplicación para gestión académica
El propósito de este proyecto es aplicar los conceptos aprendidos en el curso mediante el desarrollo de una aplicación web básica que resuelva un problema contextual. La aplicación está enfocada en la gestión de datos académicos mediante una arquitectura que resuelva el problema planteado y que a largo plazo sea escalable. 

El proyecto consiste en una plataforma para la gestión centralizada de programas académicos. La aplicación permitirá a los estudiantes inscribirse en cursos, consultar calificaciones y seguir su rendimiento académico; a los profesores, gestionar cursos y registrar notas; y al administrador del programa, supervisar usuarios, cursos y asignaturas. Además, incluirá herramientas de análisis visual para evaluar el rendimiento estudiantil y explorar patrones socioeconómicos y demográficos, con el fin de mejorar la toma de decisiones y la calidad educativa. Además, cuenta con un clúster de procesamiento de datos para generar información de interés. 

### Integrantes del Proyecto
*[Natalia Moreno Montoya](https://github.com/natam226)*

*[Valentina Bueno Collazos](https://github.com/valentinabc19)*

*[Estefania Hernandez Rojas](https://github.com/HEstefaniaR)*

*[Valeria Franco Cordoba](https://github.com/Hola12334)*

## Tabla de Contenidos
1. [Requisitos](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#requisitos)
2. [Estructura](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#estructura)
3. [Limpieza](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#limpieza)
4. [Instalación](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#instalación)
5. [Uso](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#uso)


## Requisitos
La arquitectura está diseñada para ser desplegada en dos servidores Linux. Para que el proyecto funcione es necesario instalar las siguientes dependencias en estos servidores (despliegue cada dependencia para obtener la guía para instalarla): 

<details>
<summary>Docker</summary>

  Actualice su lista de paquetes existente
  ```bash
            sudo apt update
            sudo apt install apt-transport-https ca-certificates curl software-properties-common
            
  ```
  instale algunos paquetes de requisitos previos que permitan a apt usar paquetes a través de HTTPS:
  ```bash
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
          
  ```
  Agregue el repositorio Docker a las fuentes APT:
  ```bash
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
        
   ```
  Actualice de nuevo el paquete de base de datos
  ```bash
  sudo apt update    
   ```
  Instale Docker
  ```bash
  sudo apt install docker-ce
  sudo systemctl status docker      
   ```

</details>

<details>
<summary>Docker Compose</summary>

Instale Docker compose y establezca permisos para usar el comando docker-compose
  ```bash
      sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
      sudo chmod +x /usr/local/bin/docker-compose
   ```

</details>

<details>
<summary>Git</summary>

Instale git
  ```bash
  sudo apt update
  sudo apt install git

   ```

</details>

## Estructura
El repositorio está estructurado de la siguiente manera: 
  ```bash
  proyecto_final_redes
├── clusterAplicacion
├── docker_swarm
│   ├── db
│   │   ├── asignaturasdb
│   │   ├── cursosdb
│   │   └── usuariosdb
│   ├── haproxy
│   ├── microservicios
│   │   ├── asignaturas
│   │   │   ├── node_modules
│   │   │   └── src
│   │   ├── cursos
│   │   │   ├── node_modules
│   │   │   └── src
│   │   └── usuarios
│   │       ├── node_modules
│   │       └── src
│   └── vista
└── PowerBI
    ├── rendimiento_beca
    ├── rendimiento_desplazado
    ├── rendimiento_estado_civil
    ├── rendimiento_genero
    ├── rendimiento_necesidadesEspeciales
    ├── rendimiento_pais
    └── rendimiento_prestamo

   ```

## Limpieza 
Antes de comenzar la instalación, y configuración del entorno, es recomendable detener procesos en el puerto 80 y eliminar volúmenes e imágenes de Docker sin utilizar. Siga estos pasos: 
  1. Detener servicios en el puerto 80:
     ```bash
      sudo fuser -k 80/tcp
       ```
  2. Eliminar volúmenes no utilizados:
     ```bash
      docker volume prune -f
       ```
  3. Eliminar imágenes no utilizadas:
      ```bash
      docker image prune -a -f

       ```
## Instalación
  Siga estos pasos para instalar el proyecto
  1. Clone este repositorio
      ```bash
      git clone https://github.com/natam226/proyecto_final_redes
       ```
  2. Navegue por el repositorio 
      ```bash
      cd proyecto_final_redes
       ```
  3. Ingrese los nodos al Swarm
     ```bash
      docker swarm init --advertise-addr 192.168.100.2
       ```
     Para el segundo nodo utilice el comando que le suministra el anterior con la siguiente estructura:
     ```bash
      docker swarm join --token <TOKEN> <IP_MANAGER>:2377
       ```
  4. Verifique los nodos
     ```bash
      docker node ls
       ```
  6. En la carpeta ./docker_swarm despliegue el docker-compose:
     ```bash
     docker stack deploy --compose-file docker-compose.yml academic_stack
      ```
  8. Verifique el funcionamiento de los servicios
     ```bash
     docker stack services academic_stack
      ```

## Uso
  > **Nota**: Si desea ver las estadísticas de HAProxy, ingrese al siguiente enlace: [http://192.168.100.2/haproxy?stats](http://192.168.100.2:8081/haproxy?stats)
  
  Ingrese al siguiente enlace [http://192.168.100.2:8081](http://192.168.100.2:8081) para acceder a la página de la aplicación.
  
Para ingresar como **Estudiante**, utilice las siguientes credenciales:

- **Usuario**: `aabrashkovu`
- **Contraseña**: `lI49GSLJ`

Para ingresar como **Profesor**, utilice las siguientes credenciales:

- **Usuario**: `aalvy4w`
- **Contraseña**: `iI157KRhMjBvN`

Para ingresar como **Director**, utilice las siguientes credenciales:

- **Usuario**: `director`
- **Contraseña**: `1234`

De acuerdo al usuario que escoja, se le presentará información diferente, en caso de entrar como estudiante usted podrá: 

- Crear su usuario.
- Iniciar sesión.
- Ver las asignaturas.
- Inscribirse a un curso.
- Ver los cursos matriculados.
- Ver los cursos matriculados en periodos académicos anteriores.
- Ver su información de usuario.
- Actualizar su información personal.

En caso de entrar como profesor, usted podrá: 

- Crear su usuario.
- Iniciar sesión.
- Ver cursos a los que esta asignado y los estudiantes que están inscritos en estos.
- Ingresar notas en cursos.
- Ver su información de usuario.
- Actualizar su información personal.

En caso de entrar como administrador (director), usted podrá: 

- Iniciar sesión.
- Ver y eliminar los estudiantes y profesores existentes.
- Crear asignaturas.
- Ver todas las asignaturas existentes.
- Ver asignaturas por ID.
- Modificar los cupos de las asignaturas.
- Ver todos los cursos existentes.
- Ver su información de usuario.
- Actualizar su información personal.
- Ver gráficas de la información relacionada con los estudiantes. 
