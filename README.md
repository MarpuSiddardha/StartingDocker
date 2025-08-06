# StartingDocker - Spring Boot with Docker and Kubernetes

A modern, containerized Spring Boot application with PostgreSQL, Docker, and Kubernetes integration, featuring a RESTful API for user management.

## 🚀 Features

- **RESTful API** for CRUD operations on users
- **Docker** containerization
- **Kubernetes** orchestration with deployments, services, and ingress
- **PostgreSQL** database with persistent storage
- **GitHub Actions** for CI/CD
- **RBAC** (Role-Based Access Control) for Kubernetes

## 🛠️ Tech Stack

- **Backend**: Spring Boot 3.5.3
- **Database**: PostgreSQL 15
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Java Version**: 17

## 📦 Prerequisites

- Java 17 or higher
- Maven
- Docker
- Minikube (for local Kubernetes)
- kubectl

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/StartingDocker.git](https://github.com/yourusername/StartingDocker.git)
   cd StartingDocker


2. **Build the application**
   ```bash
     ./mvnw clean package

3. **Run with Docker Compose**
   ```bash
    docker-compose up --build

### Kubernetes Development 

1. **start Minikube**
   ```bash
      minikube start
      eval $(minikube docker-env)
   
2. **Build Docker image**
   ```bash
   docker build -t starting-docker-app:local .

3. **Apply Kubernetes configurations**
   ```bash
      kubectl apply -f k8s/namespace.yaml
      kubectl apply -f k8s/

4. **Access the application**
   ```bash
      # Port forward the service
      kubectl port-forward -n starting-docker svc/app-service 8080:80
      # Or use minikube service
      minikube service -n starting-docker app-service

### API Endpoints

     GET /api/users - Get all users
     GET /api/users/{id} - Get user by ID
     POST /api/users - Create a new user
     PUT /api/users/{id} - Update a user
     DELETE /api/users/{id} - Delete a user

### Project structure

    StartingDocker/
    ├── k8s/                    # Kubernetes configurations
    │   ├── app-deployment.yaml
    │   ├── app-rbac.yaml
    │   ├── app-service.yaml
    │   ├── configmap.yaml
    │   ├── ingress.yaml
    │   ├── namespace.yaml
    │   ├── postgres-deployment.yaml
    │   ├── postgres-pv.yaml
    │   ├── postgres-service.yaml
    │   └── secret.yaml
    ├── src/                    # Source code
    ├── .github/workflows/      # GitHub Actions workflows
    ├── Dockerfile              # Docker configuration
    ├── docker-compose.yml      # Docker Compose for local development
    └── pom.xml                # Maven configuration

### Environment Variables
The application uses the following environment variables:

    SPRING_DATASOURCE_URL: JDBC URL for PostgreSQL
    SPRING_DATASOURCE_USERNAME: Database username
    SPRING_DATASOURCE_PASSWORD: Database password

