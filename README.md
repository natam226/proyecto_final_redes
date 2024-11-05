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
3. [Instalación](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#instalación)
4. [Uso](https://github.com/natam226/proyecto_final_redes?tab=readme-ov-file#uso)

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
├── docker_compose
└── Swarm
    ├── db
    │   ├── asignaturasdb
    │   ├── cursosdb
    │   └── usuariosdb
    ├── haproxy
    ├── microservicios
    │   ├── asignaturas
    │   │   ├── node_modules
    │   │   └── src
    │   ├── cursos
    │   │   ├── node_modules
    │   │   └── src
    │   ├── graficas
    │   │   ├── node_modules
    │   │   └── src
    │   └── usuarios
    │       ├── node_modules
    │       └── src
    └── vista

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
## Uso
