# Stloy

## QuickStart

### Config
Edit `./src/utils/api.js` and set `BACKEND_API` to your backend endpoint:
```javascript ./src/utils/api.js
const BACKEND_API = "<YOUR_BACKEND_URL>";   // for example: http://localhost:4207/api
```

### Run
Run the `dev` script with `npm`:
```bash
npm run dev
```

## Endpoints

### Auth
- [POST]    `/login`        -> Used for getting `accessToken` and `refreshToken`; with `name`, `email` and `password`
- [POST]    `/refresh`      -> Used for getting new `accessToken` and `refreshToken`; with `userId` and `refreshToken`
- [GET]     `/config`       -> Used for getting `userId`; with `name`, `email` and `password` (alongside `/login`)

### Student
- [POST]    `/student`      -> Used for creating a student; with `empId`, `name`, `email`, `phone` and `designation`

#### ADMIN
- [GET]     `/students`     -> Used for getting a list of `student`; with nothing
- [PUT]     `/student/{id}` -> Used for updaing a `student` of id `userId`; with `name`, `email`, `phone` and `designation`
- [DELETE]  `/student/{id}` -> Used for removing a `student` of id `userId`; with nothing

# REFERENCES
[CSS](https://gemini.google.com)
