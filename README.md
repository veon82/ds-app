# Daily Scrum App

## Overview

This project is designed to facilitate daily scrum meetings by providing a web application that allows teams to track their daily progress. The application features a timer for speech time during meetings, session history, user authentication, and task management.

## Architecture

The project is composed of a `frontend` built with React, a `backend` using Node.js and Express, and is deployable on a Kubernetes cluster with provided manifests.

### Frontend

The frontend is a React application that communicates with the backend through RESTful APIs. It provides interfaces for login, daily scrum sessions, and session history.

### Backend

The backend is a Node.js application using Express. It serves the API endpoints used by the frontend and connects to an SQLite database for persistence.

## Local Development

Before deployment, make sure to test the application in a local development environment.

### Prerequisites

- Node.js
- npm or yarn
- Docker (for containerization)
- Kubernetes cluster (for deployment)

### Backend Setup

Navigate to the backend directory:

```bash
cd daily-scrum-be
npm install
npm start
```

### Frontend Setup

```bash
cd daily-scrum-fe
npm install
npm start
```

### Deployment

#### Docker build & push

Example:

```
docker build -t veon82/ds-app-be:0.0.1 ./daily-scrum-be
docker build -t veon82/ds-app-fe:0.0.3 ./daily-scrum-fe

docker push veon82/ds-app-be:0.0.1
docker push veon82/ds-app-fe:0.0.3
```

#### Kubernetes

```
kubectl apply -f k8s/
```

The `k8s` directory contains all the necessary Kubernetes manifests to deploy the application on a Kubernetes cluster, including:

- Deployment and Service for both frontend and backend.
- Ingress to expose the application.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

