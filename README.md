# Demyst Loan Application System

## Overview
This system is a comprehensive solution for handling business loan applications. It includes a NestJS backend, which interfaces with a mock accounting service and a decision engine, and a Next.js frontend for user interactions.

## Getting Started

### Prerequisites
- Node.js
- Docker

### Installation
1. Clone the repository:

2. Navigate to the project directory:


### Running the Application
1. Build and run the Docker containers:

`docker-compose up --build`

2. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:3001`.

### Usage
Fill out the loan application form on the frontend. The data will be processed by the backend, applying pre-defined rules before sending to the decision engine.
