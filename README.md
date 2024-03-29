# Getting Started with this backend service

## Project Setup

1. Install dependencies

   ```sh
   yarn install
   ```

2. Create new database.

   ```sh
   yarn db:create
   ```

3. Create tables for database.

   ```sh
   yarn db:migrate
   ```

4. Add dumb records into Coach and Student tables.

   ```sh
   yarn db:seed
   ```

5. Start development server

   ```sh
   yarn start:dev
   ```

The service should be running on port 3005

## API Endpoints

### Coach

#### Create Slots

- `http://localhost:3005/api/coaches/:coachId/slots`

#### Get Slots

- `http://localhost:3005/api/coaches/:coachId/slots`

Optional Query Param to get previous slots

- `previous=true`

#### Update Slot (PATCH)

- `http://localhost:3005/api/coaches/:coachId/slots/:slotsId`

#### Get Coaches

- `http://localhost:3005/api/coaches`

#### Get a Coach

- `http://localhost:3005/api/coaches/:coachId`

### Student

#### Get Coaches Slots

- `http://localhost:3005/api/students/:studentId/slots`

#### Book Coach Slot (PATCH)

- `http://localhost:3005/api/students/:studentId/slots/:slotsId`

#### Get Students

- `http://localhost:3005/api/students`

#### Get a Student

- `http://localhost:3005/api/students/:studentId`
