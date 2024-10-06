# StudentProgressBoard
It was a projectwork at Óubdai University.

# Használati utasítás
## Frontend - Angular
### Frontend Telepítési és Futtatási Lépések:
1. Navigálj a frontend mappájába: cd "C:\Users\USERNAME\source\repos\NEWFOLDER\studentprogressboard\studentprogressboard.Client"
2. Telepítsd az Angular projekt függőségeit: npm install
3. Futtasd az Angular fejlesztői szervert: ng serve

## Backend - ASP.NET
### Backend Telepítési és Futtatási Lépések
1. Navigálj a backend mappájába: cd "C:\Users\USERNAME\source\repos\NEWFOLDER\studentprogressboard\" 
2. Restore-olj minden szükséges NuGet csomagot: dotnet restore
3. Futtasd a backend alkalmazást: dotnet run --project studentprogressboard.sln

## Bejelentkezés
Alkalmazásba való belépés:
Admin: 
username: "admin"
password: "admin"

Student:
Csak már adatbázisban szereplő student tud belépni O365 segítségével

## API funkciólisa

| Controller             | HTTP Method | Endpoint                                  | Action                 | Leírás                                           |
|------------------------|-------------|-------------------------------------------|------------------------|--------------------------------------------------|
| `AuthController`       | `POST`      | `/api/auth/Microsoft`                     | `O365Login`            | Felhasználó bejelentkezése Microsoft bejelentkezési token használatával   |
| `AuthController`       | `POST`      | `/api/auth`                               | `Login`                | Felhasználó bejelentkezése felhasználónév és jelszó használatával          |
| `AuthController`       | `PUT`       | `/api/auth`                               | `InsertUser`           | Új felhasználó regisztrálása a megadott adatokkal                           |
| `AuthController`       | `GET`       | `/api/auth`                               | `GetUserInfos`         | A bejelentkezett felhasználó információinak lekérdezése                    |
| `CourseController`     | `GET`       | `/api/course`                             | `ListCourses`          | Összes kurzus listázása                                                      |
| `CourseController`     | `GET`       | `/api/course/{courseId}`                  | `GetCourseByIdAsync`   | Kurzus lekérdezése azonosító alapján                                        |
| `CourseController`     | `DELETE`    | `/api/course/{courseId}`                  | `DeleteAsync`          | Kurzus törlése azonosító alapján                                            |
| `CourseController`     | `POST`      | `/api/course`                             | `AddOrUpdateAsync`     | Kurzus hozzáadása vagy frissítése                                           |
| `SemesterController`   | `GET`       | `/api/semester/listSemesters/{studentId}` | `ListTrainingAcademyYears` | Szemeszterek listázása egy adott diák számára                            |
| `SemesterController`   | `GET`       | `/api/semester/{id}`                      | `GetByIdAsync`         | Szemeszter lekérdezése azonosító alapján                                   |
| `SemesterController`   | `POST`      | `/api/semester`                           | `AddOrUpdateAsync`     | Szemeszter hozzáadása vagy frissítése                                      |
| `SemesterController`   | `DELETE`    | `/api/semester/{id}`                      | `DeleteAsync`          | Szemeszter törlése azonosító alapján                                       |
| `StudentController`    | `GET`       | `/api/student`                            | `ListStudentsAsync`    | Összes diák listázása                                                       |
| `StudentController`    | `GET`       | `/api/student/{studentId}`                | `GetStudent`           | Diák lekérdezése azonosító alapján                                          |
| `StudentController`    | `GET`       | `/api/student/student/{name}`             | `GetStudentByMail`     | Diák lekérdezése név alapján                                                |
| `StudentController`    | `DELETE`    | `/api/student/{studentId}`                | `DeleteStudent`        | Diák törlése azonosító alapján                                              |
| `StudentController`    | `POST`      | `/api/student`                            | `AddOrUpdateAsync`     | Diák hozzáadása vagy frissítése                                             |
| `StudentController`    | `GET`       | `/api/student/listStudents/{trainingId}`  | `ListTrainingStudents` | Diákok listázása egy adott képzéshez                                        |
| `StudentController`    | `POST`      | `/api/student/upload`                     | `UploadCSV`            | CSV fájl feltöltése és feldolgozása diákinformációkkal                      |
| `StudentCourseController` | `GET`    | `/api/studentcourse/listStudentCourses/{semesterId}` | `GetCoursesForStudent` | Kurzusok listázása egy adott szemeszterhez                              |
| `StudentCourseController` | `GET`    | `/api/studentcourse/{id}`                 | `GetByIdAsync`         | Diák kurzus lekérdezése azonosító alapján                                   |
| `StudentCourseController` | `GET`    | `/api/studentcourse`                      | `ListStudentCoursesAsync` | Összes diák kurzus listázása                                            |
| `StudentCourseController` | `POST`   | `/api/studentcourse`                      | `AddOrUpdateAsync`     | Diák kurzus hozzáadása vagy frissítése                                      |
| `StudentCourseController` | `DELETE` | `/api/studentcourse/{studentCourseId}`    | `DeleteStudentCourse`  | Diák kurzus törlése azonosító alapján                                       |
| `TrainingController`   | `GET`       | `/api/training`                           | `ListTrainings`        | Összes képzés listázása                                                     |
| `TrainingController`   | `GET`       | `/api/training/{id}`                      | `GetByIdAsync`         | Képzés lekérdezése azonosító alapján                                        |
| `TrainingController`   | `POST`      | `/api/training`                           | `AddOrUpdateAsync`     | Képzés hozzáadása vagy frissítése                                           |
| `TrainingController`   | `DELETE`    | `/api/training/{id}`                      | `DeleteAsync`          | Képzés törlése azonosító alapján                                            |
