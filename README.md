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


## UI felület

### Fő oldalak

Kezdőoldal még nem bejelentkezett felhasználóknak.

![home](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/e050313c-050f-4b9e-a0b9-457eee5860eb)

Bejelentkezés felület: adminnak felhasználónév és jelszó, diákoknak peddig O365 bejelentkeztetés.

![login](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/f318244e-1982-47bb-89ed-c93341289bdb)

Kezdőoldal adminok számára, egyszerű navigációs felület minden oldalra.

![home-admin](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/9a77fdb6-d7c5-42be-95c6-c04ea89ef03d)

### Listák - táblák megtekintése

Diákok kilistázásának a felülete (szerkesztés és törlés funkicó).

![list-students](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/8f0d758e-2e06-4d28-b9b1-752a6ab31c36)

Diákok adatainak módosítása, új diák létrehozása vagy feltöltése .csv fájlból.

![add-edit-student](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/58477ca1-0c6f-4aaf-93b1-ac6eb70d664d)

Kurzusok kilistázásának a felülete (szerkesztés és törlés funkicó).

![list-course](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/e5886536-dc4a-4620-a5f9-f07ce39e1785)

Kurzusok adatainak módosítása, új kurzus létrehozása.

![add-edit-course](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/7b16323b-f7dd-4414-b437-26c4b393b0e8)

Tréningek kilistázásának a felülete (szerkesztés és törlés funkicó).

![list-training](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/b8bcf274-4f37-4fb5-bab0-b38bb3eab485)

Tréningek adatainak módosítása, új tréning létrehozása.

![add-edit-training](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/8c7d14fb-327c-4813-8056-270e9eab4aaf)

### Statisztikák

Hallgatók nemzetiségeinek statisztikája

![statistic1](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/397d1e22-3372-4cf0-bcf9-fc3333755342)

A három legjobban teljesített hallgató statisztikája

![statistic2](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/54ceca4b-78d8-4544-a093-4149af6daf5f)

Félévenkénti hallgatók, akik ekkor diplomáztak le, illetve a még NEM lediplomázott hallgatók statisztikáája

![statistic3](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/a31b2b37-3d1d-4d21-9658-4a8bb3c4d316)

Adott tárgyak követelmény statisztikája

![statistic4](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/2012043c-1729-4fba-9954-54001eafdff1)

Adott kurzusokat elvégzett hallgatók statisztikája

![statistic5](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/98ff675b-3df0-4cec-aed9-7a06f55783ad)

Tanár statisztika, tanárokt szűrve megtekinthető mely kurzusokat tanítják. 

![statistic6](https://github.com/bprof-spec-codes/studprogressboard/assets/115083886/7749b791-ec5b-4183-ae0e-ecc5816cb01c)


