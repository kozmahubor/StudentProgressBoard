using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using studentprogressboard.Model;
using studentprogressboard.Model.Enums;
using System.Reflection.Emit;

namespace studentprogressboard.Data
{
    public class ApplicationDbContext : IdentityDbContext<Student, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Student>? Students { get; set; }
        public DbSet<Semester>? Semesters { get; set; }
        public DbSet<StudentCourse>? StudentCourses { get; set; }
        public DbSet<Course>? Courses { get; set; }
        public DbSet<Training>? Trainings { get; set; }
        
        //public DbSet<AcademyYear>? AcademyYears { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /// Jelenleg inmemory database van, ezt majd szimplán át lehet változtatni sql + localdbre később
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseLazyLoadingProxies()
                    .UseInMemoryDatabase("Studentboarddb");
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Student>(s => s
                .HasOne(st => st.Training)
                .WithMany(ay => ay.Students)
                .HasForeignKey(st => st.TrainingId)
                .OnDelete(DeleteBehavior.Cascade));

            builder.Entity<Semester>(semester => semester
                .HasOne(s => s.Student)
                .WithMany(sm => sm.Semesters)
                .HasForeignKey(s => s.StudentId)
                .OnDelete(DeleteBehavior.Cascade));

            builder.Entity<StudentCourse>(sc => sc
                .HasOne(sc => sc.Semester)
                .WithMany(s => s.CoursesTaken)
                .HasForeignKey(sc => sc.SemesterId)
                .OnDelete(DeleteBehavior.Cascade));

            builder.Entity<StudentCourse>(sc => sc
                .HasOne(sc => sc.Course)
                .WithMany(c => c.StudentCourses)
                .HasForeignKey(sc => sc.CourseId)
                .OnDelete(DeleteBehavior.Cascade));

            builder.Entity<Course>(c => c
                .HasMany(c => c.StudentCourses)
                .WithOne(sc => sc.Course)
                .HasForeignKey(sc => sc.CourseId)
                .OnDelete(DeleteBehavior.Cascade));

            builder.Entity<IdentityRole>().HasData(
             new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
             new { Id = "2", Name = "Student", NormalizedName = "STUDENT" }
            );

            builder.Entity<Training>().HasData(new Training[]
            {
                new Training()
                {
                    Id = 1,
                    Name = "Üzemmérnök Informatikus",
                    EnglishName = "Computer Science Operational Engineer",
                    TrainingCode = "NBNEUM",
                    TrainingType = TrainingType.FullTime,
                    NumberOfSemesters = 6,
                    TrainingMode = TrainingMode.BSC,
                    Language = "Hungarian"
                    
                },
                new Training()
                {
                    Id = 2,
                    Name = "Mérnökinformatikus",
                    TrainingCode = "NBNEMI",
                    EnglishName = "Computer Science Engineer",
                    TrainingType = TrainingType.Evening,
                    NumberOfSemesters = 7,
                    TrainingMode = TrainingMode.BSC,
                    Language = "Hungarian"
                },
                new Training()
                {
                    Id = 3,
                    Name = "Gazdaság Informatikus",
                    TrainingCode = "NBNEGI",
                    EnglishName = "Busieness Informatics Specialist",
                    TrainingType = TrainingType.FullTime,
                    NumberOfSemesters = 7,
                    TrainingMode = TrainingMode.BSC,
                    Language = "Hungarian"
                }
            });
            

            builder.Entity<Student>().HasData(new Student[]
            {
                new Student()
                {
                    Id = -1,
                    Name = "Admin",
                    NeptunCode = "ADMIN1",
                    UserName = "admin",
                    PasswordHash = "admin",
                    Email = "admin@admin.com",
                    NormalizedEmail = "ADMIN@ADMIN.COM",
                    EmailConfirmed = true,
                    NormalizedUserName = "ADMIN",
                    YearOfAdministration = 0,
                    Role = "Admin"
                    //Admin = true
                },


                new Student()
                {
                    Id = -9,
                    Name = "Kozma Hunor",
                    NeptunCode = "IUE7VU",
                    UserName = "kozmahunor",
                    PasswordHash = "",
                    Email = "kozmahunor@stud.uni-obuda.hu",
                    NormalizedEmail = "KOZMAHUNOR@STUD.UNI-OBUDA.HU",
                    EmailConfirmed = true,
                    NormalizedUserName = "KOZMAHUNOR",
                    YearOfAdministration = 2021,
                    Role = "Student",
                    TrainingId = 1,
                    Sex = Sex.Male,
                    Graduated = false,
                    Absolved = false,
                    DateOfBirth = new DateTime(2000, 03, 21),
                    PlaceOfBirth = "Budapest",
                    Address = "Fecske utca 11.",
                    Nationality = "Hungarian",
                    MothersName = "Mosó Nóra"
                },

                new Student()
                {
                    Id = -8,
                    Name = "Varga Márk",
                    NeptunCode = "A3ZWKY",
                    UserName = "vargamark",
                    PasswordHash = "",
                    Email = "VargaMark@stud.uni-obuda.hu",
                    NormalizedEmail = "VARGAMARK@STUD.UNI-OBUDA.HU",
                    EmailConfirmed = true,
                    NormalizedUserName = "VARGAMARK",
                    YearOfAdministration = 2021,
                    Role = "Student",
                    TrainingId = 1,
                    Sex = Sex.Male,
                    Graduated = false,
                    Absolved = false,
                    DateOfBirth = new DateTime(2000, 10, 08),
                    PlaceOfBirth = "Budapest",
                    Address = "Őszike utca 15.",
                    Nationality = "Hungarian",
                    MothersName = "Sütő Éva"
                },




                new Student()
                {
                    Id = 1,
                    Name = "Kerekes János",
                    NeptunCode = "ASD123",
                    UserName = "Test",
                    NormalizedUserName = "",
                    TrainingId = 1,
                    PasswordHash = "123",
                    Sex = Sex.Male,
                    YearOfAdministration = 2021,
                    Graduated = true,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 2, 20, 12, 30, 0),
                    DateOfBirth = new DateTime(2001,2,20,12,30,0),
                    PlaceOfBirth = "Budapest",
                    Address="Kiss Béla utca 10.",
                    Nationality="Slovakian",
                    MothersName="Szlovák Anna"

        },
                new Student()
                    {
                        Id = 2,
                        Name = "Szabó Eszter",
                        NeptunCode = "RTY789",
                        TrainingId = 3,
                        Sex = Sex.Female,
                        YearOfAdministration = 2021,
                        Graduated = false,
                        Absolved = false,
                        GraduationDate = null,
                        DateOfBirth = new DateTime(2000, 4, 15),
                        PlaceOfBirth = "Debrecen",
                        Address = "Kossuth utca 5.",
                        Nationality = "Hungarian",
                        MothersName = "Szabó Katalin"
                    },
                new Student()
                {
                    Id = 3,
                    Name = "Nagy Ádám",
                    NeptunCode = "UIO123",
                    TrainingId = 1,
                    Sex = Sex.Male,
                    YearOfAdministration = 2021,
                    Graduated = false,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 2, 20, 12, 30, 0),
                    DateOfBirth = new DateTime(2002, 7, 10),
                    PlaceOfBirth = "Szeged",
                    Address = "Petőfi tér 12.",
                    Nationality = "Slovakian",
                    MothersName = "Nagy Mária"
                },
                new Student()
                {
                    Id = 4,
                    Name = "Kovács Anna",
                    NeptunCode = "JKL456",
                    TrainingId = 2,
                    Sex = Sex.Female,
                    YearOfAdministration = 2021,
                    Graduated = false,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 2, 20, 12, 30, 0),
                    DateOfBirth = new DateTime(1999, 11, 25),
                    PlaceOfBirth = "Miskolc",
                    Address = "Arany János utca 8.",
                    Nationality = "Hungarian",
                    MothersName = "Kovács Irén"
                },
                new Student()
                {
                    Id = 5,
                    Name = "Tóth Gergő",
                    NeptunCode = "ZXC789",
                    TrainingId = 2,
                    Sex = Sex.Male,
                    YearOfAdministration = 2021,
                    Graduated = true,
                    Absolved = true,
                    GraduationDate = new DateTime(2023, 1, 12),
                    DateOfBirth = new DateTime(2001, 9, 5),
                    PlaceOfBirth = "Pécs",
                    Address = "Dózsa György út 20.",
                    Nationality = "Hungarian",
                    MothersName = "Tóth Ilona"
                },
                new Student()
                {
                    Id = 6,
                    Name = "Varga Péter",
                    NeptunCode = "QWE456",
                    TrainingId = 2,
                    Sex = Sex.Male,
                    YearOfAdministration = 2022,
                    Graduated = true,
                    Absolved = true,
                    GraduationDate = new DateTime(2023, 1, 12),
                    DateOfBirth = new DateTime(2003, 3, 18),
                    PlaceOfBirth = "Szombathely",
                    Address = "Bocskai utca 15.",
                    Nationality = "German",
                    MothersName = "Varga Éva"
                },
                new Student()
                {
                    Id = 7,
                    Name = "Bánfi Dániel",
                    NeptunCode = "ASD453",
                    TrainingId = 3,
                    Sex = Sex.Male,
                    YearOfAdministration = 2022,
                    Graduated = true,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 1, 12),
                    DateOfBirth = new DateTime(2002, 6, 8),
                    PlaceOfBirth = "Győr",
                    Address = "Széchenyi tér 3.",
                    Nationality = "Hungarian",
                    MothersName = "Bánfi Ilona"
                },
                new Student()
                {
                    Id = 8,
                    Name = "Király Emília",
                    NeptunCode = "FGH456",
                    TrainingId = 2,
                    Sex = Sex.Female,
                    YearOfAdministration = 2022,
                    Graduated = true,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 1, 12),
                    DateOfBirth = new DateTime(2004, 1, 12),
                    PlaceOfBirth = "Eger",
                    Address = "Kossuth Lajos út 6.",
                    Nationality = "Hungarian",
                    MothersName = "Király Mónika"
                },
                new Student()
                {
                    Id = 9,
                    Name = "Bakos Gábor",
                    NeptunCode = "JKL789",
                    TrainingId = 1,
                    Sex = Sex.Male,
                    YearOfAdministration = 2023,
                    Graduated = false,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 2, 20, 12, 30, 0),
                    DateOfBirth = new DateTime(2002, 12, 3),
                    PlaceOfBirth = "Székesfehérvár",
                    Address = "Bartók Béla út 30.",
                    Nationality = "Hungarian",
                    MothersName = "Bakos Andrea"
                },
                new Student()
                {
                    Id = 10,
                    Name = "Fehér Ilona",
                    NeptunCode = "QWE123",
                    TrainingId = 1,
                    Sex = Sex.Female,
                    YearOfAdministration = 2023,
                    Graduated = false,
                    Absolved = false,
                    GraduationDate = new DateTime(2023, 1, 12),
                    DateOfBirth = new DateTime(2003, 5, 20),
                    PlaceOfBirth = "Veszprém",
                    Address = "Ady Endre út 2.",
                    Nationality = "Hungarian",
                    MothersName = "Fehér Gabriella"
                },
                new Student()
                {
                    Id = 11,
                    Name = "Pintér Zsuzsanna",
                    NeptunCode = "TYU456",
                    TrainingId = 2,
                    Sex = Sex.Female,
                    YearOfAdministration = 2023,
                    Graduated = false,
                    Absolved = false,
                    GraduationDate = null,
                    DateOfBirth = new DateTime(2004, 8, 7),
                    PlaceOfBirth = "Kecskemét",
                    Address = "Szabadság tér 1.",
                    Nationality = "Hungarian",
                    MothersName = "Pintér Edit"
                }

            });

            builder.Entity<Semester>().HasData(new Semester[]
            {
                new Semester()
                {
                    Id = 1,
                    Year = 2021,
                    SemesterNumber = 1,
                    StudentId = 1,
                    Active = true,
                    FinancialStatus = FinancialStatus.Scholarship
                },
                new Semester()
                {
                    Id = 2,
                    Year = 2021,
                    SemesterNumber = 2,
                    StudentId = 1,
                    Active = true,
                    FinancialStatus = FinancialStatus.Scholarship
                },
                new Semester()
                {
                    Id = 3,
                    Year = 2022,
                    SemesterNumber = 1,
                    StudentId = 1,
                    Active = true,
                    FinancialStatus = FinancialStatus.SelfSupporting
                },

                new Semester() { Id = 4, Year = 2021, SemesterNumber = 1, StudentId = 2, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 5, Year = 2021, SemesterNumber = 2, StudentId = 2, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 6, Year = 2022, SemesterNumber = 1, StudentId = 2, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },


                new Semester() { Id = 7, Year = 2021, SemesterNumber = 1, StudentId = 3, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 8, Year = 2021, SemesterNumber = 2, StudentId = 3, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 9, Year = 2022, SemesterNumber = 1, StudentId = 3, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },


                new Semester() { Id = 10, Year = 2021, SemesterNumber = 1, StudentId = 4, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 11, Year = 2021, SemesterNumber = 2, StudentId = 4, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 12, Year = 2022, SemesterNumber = 1, StudentId = 4, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 13, Year = 2021, SemesterNumber = 1, StudentId = 5, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 14, Year = 2021, SemesterNumber = 2, StudentId = 5, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 15, Year = 2022, SemesterNumber = 1, StudentId = 5, Active = false, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 16, Year = 2022, SemesterNumber = 1, StudentId = 6, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 17, Year = 2023, SemesterNumber = 1, StudentId = 6, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 18, Year = 2023, SemesterNumber = 2, StudentId = 6, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 19, Year = 2022, SemesterNumber = 2, StudentId = 6, Active = false, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 20, Year = 2023, SemesterNumber = 1, StudentId = 7, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 21, Year = 2023, SemesterNumber = 2, StudentId = 7, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 22, Year = 2022, SemesterNumber = 1, StudentId = 8, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 23, Year = 2023, SemesterNumber = 1, StudentId = 8, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 24, Year = 2023, SemesterNumber = 2, StudentId = 8, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 25, Year = 2022, SemesterNumber = 1, StudentId = 9, Active = false, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 26, Year = 2023, SemesterNumber = 1, StudentId = 9, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 27, Year = 2023, SemesterNumber = 2, StudentId = 9, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 28, Year = 2022, SemesterNumber = 1, StudentId = 10, Active = false, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 29, Year = 2023, SemesterNumber = 1, StudentId = 10, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 30, Year = 2023, SemesterNumber = 2, StudentId = 10, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 31, Year = 2022, SemesterNumber = 1, StudentId = 11, Active = false, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 32, Year = 2023, SemesterNumber = 1, StudentId =11, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 33, Year = 2023, SemesterNumber = 2, StudentId = 11, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 34, Year = 2022, SemesterNumber = 2, StudentId = 9, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                new Semester() { Id = 35, Year = 2023, SemesterNumber = 1, StudentId = 3, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },
                new Semester() { Id = 36, Year = 2023, SemesterNumber = 2, StudentId = 3, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                //Márk adatai:
                new Semester() { Id = 37, Year = 2021, SemesterNumber = 1, StudentId = -8, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 38, Year = 2021, SemesterNumber = 2, StudentId = -8, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 39, Year = 2022, SemesterNumber = 1, StudentId = -8, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

                //Hunor adatai:
                new Semester() { Id = 40, Year = 2021, SemesterNumber = 1, StudentId = -9, Active = true, FinancialStatus = FinancialStatus.Scholarship },
                new Semester() { Id = 41, Year = 2022, SemesterNumber = 2, StudentId = -9, Active = true, FinancialStatus = FinancialStatus.SelfSupporting },

    //7-10
            });

            builder.Entity<Course>().HasData(new Course[]
            {
                new Course()
                {
                    Id = 1,
                    Name = "Haladó fejlesztési technikák",
                    CourseCode = "HFT",
                    Credits = 6,
                    CourseType = CourseType.Theory,
                    RequirementType = RequirementType.Exam,
                    ResponsibleTeacher="Farkas Gyula",
                    Organization="Neumann János Informatika kar",
                },
                new Course()
                {
                    Id = 2,
                    Name = "Frontend fejlesztés",
                    CourseCode = "FRFE1",
                    Credits = 4,
                    CourseType = CourseType.Labour,
                    RequirementType = RequirementType.MidTermMark,
                    ResponsibleTeacher = "Kovács Anna",
                    Organization = "Informatika Intézet"
                },
                new Course()
                {
                    Id = 3,
                    Name = "Backend fejlesztés",
                    CourseCode = "BEF",
                    Credits = 4,
                    CourseType = CourseType.Labour,
                    RequirementType = RequirementType.MidTermMark,
                    ResponsibleTeacher = "Nagy Péter",
                    Organization = "Informatika Intézet"
                },
                new Course()
                {
                    Id = 4,
                    Name = "Szoftvertechnológia",
                    CourseCode = "SZT",
                    Credits = 6,
                    CourseType = CourseType.Theory,
                    RequirementType = RequirementType.Exam,
                    ResponsibleTeacher = "Kiss Balázs",
                    Organization = "Neumann János Informatikai Kar"
                },
                new Course()
                {
                    Id = 5,
                    Name = "Elektronika",
                    CourseCode = "ELEK",
                    Credits = 5,
                    CourseType = CourseType.Theory,
                    RequirementType = RequirementType.Exam,
                    ResponsibleTeacher = "Varga Márton",
                    Organization = "Műszaki Kar"
                }
            });

            builder.Entity<StudentCourse>().HasData(new StudentCourse[]
            {
                new StudentCourse()
                {
                    Id = 1,
                    SemesterId = 1,
                    CourseId = 1,
                    Grade = 5,
                    CourseStatus = CourseStatus.Ongoing
                },
                new StudentCourse()
                {
                    Id = 2,
                    SemesterId = 1,
                    CourseId = 2,
                    Grade = 4,
                    CourseStatus = CourseStatus.Ongoing
                },
                new StudentCourse()
                {
                    Id = 3,
                    SemesterId = 1,
                    CourseId = 3,
                    Grade = 5,
                    CourseStatus = CourseStatus.Ongoing
                },
                new StudentCourse()
                {
                    Id = 4,
                    SemesterId = 2,
                    CourseId = 4,
                    Grade = 4,
                    CourseStatus = CourseStatus.Ongoing
                },
                new StudentCourse()
                {
                    Id = 5,
                    SemesterId = 2,
                    CourseId = 5,
                    Grade = 5,
                    CourseStatus = CourseStatus.Banned
                },
                new StudentCourse() { Id = 6, SemesterId = 4, CourseId = 2, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 20, SemesterId = 4, CourseId = 3, Grade = 3, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 34, SemesterId = 4, CourseId = 4, Grade = 5, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 7, SemesterId = 5, CourseId = 4, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 21, SemesterId = 5, CourseId = 5, Grade = 1, CourseStatus = CourseStatus.Banned },
                new StudentCourse() { Id = 35, SemesterId = 5, CourseId = 1, Grade = 3, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 8, SemesterId = 6, CourseId = 1, Grade = 4, CourseStatus = CourseStatus.Ongoing },
                new StudentCourse() { Id = 22, SemesterId = 6, CourseId = 2, Grade = 1, CourseStatus = CourseStatus.AssignmentUnsuccessful },
                new StudentCourse() { Id = 36, SemesterId = 6, CourseId = 3, Grade = 2, CourseStatus = CourseStatus.Ongoing },

                new StudentCourse() { Id = 9, SemesterId = 7, CourseId = 3, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 23, SemesterId = 7, CourseId = 1, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 37, SemesterId = 7, CourseId = 5, Grade = 3, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 10, SemesterId = 8, CourseId = 5, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 24, SemesterId = 8, CourseId = 1, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 38, SemesterId = 8, CourseId = 3, Grade = 4, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 11, SemesterId = 9, CourseId = 4, Grade = 3, CourseStatus = CourseStatus.Ongoing },
                new StudentCourse() { Id = 25, SemesterId = 9, CourseId = 2, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 39, SemesterId = 9, CourseId = 3, Grade = 4, CourseStatus = CourseStatus.Ongoing },

                new StudentCourse() { Id = 12, SemesterId = 10, CourseId = 3, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 26, SemesterId = 10, CourseId = 1, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 40, SemesterId = 10, CourseId = 5, Grade = 3, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 13, SemesterId = 11, CourseId = 1, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 27, SemesterId = 11, CourseId = 2, Grade = 1, CourseStatus = CourseStatus.AssignmentUnsuccessful },
                new StudentCourse() { Id = 41, SemesterId = 11, CourseId = 3, Grade = 3, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 14, SemesterId = 12, CourseId = 1, Grade = 3, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 28, SemesterId = 12, CourseId = 2, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 42, SemesterId = 12, CourseId = 3, Grade = 1, CourseStatus = CourseStatus.Banned },

                new StudentCourse() { Id = 15, SemesterId = 13, CourseId = 4, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 29, SemesterId = 13, CourseId = 5, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 43, SemesterId = 13, CourseId = 1, Grade = 4, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 16, SemesterId = 14, CourseId = 2, Grade = 3, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 30, SemesterId = 14, CourseId = 5, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 44, SemesterId = 14, CourseId = 1, Grade = 5, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 17, SemesterId = 15, CourseId = 1, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 31, SemesterId = 15, CourseId = 3, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 45, SemesterId = 15, CourseId = 5, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },

                new StudentCourse() { Id = 18, SemesterId = 16, CourseId = 1, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 32, SemesterId = 16, CourseId = 3, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 46, SemesterId = 16, CourseId = 5, Grade = 4, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 19, SemesterId = 17, CourseId = 4, Grade = 3, CourseStatus = CourseStatus.Ongoing },
                new StudentCourse() { Id = 33, SemesterId = 17, CourseId = 1, Grade = 1, CourseStatus = CourseStatus.Banned },
                new StudentCourse() { Id = 47, SemesterId = 17, CourseId = 2, Grade = 2, CourseStatus = CourseStatus.Ongoing },

                //Márk
                new StudentCourse() { Id = 48, SemesterId = 37, CourseId = 2, Grade = 4, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 49, SemesterId = 37, CourseId = 5, Grade = 1, CourseStatus = CourseStatus.AssignmentUnsuccessful },
                new StudentCourse() { Id = 50, SemesterId = 37, CourseId = 1, Grade = 5, CourseStatus = CourseStatus.Completed },

                new StudentCourse() { Id = 51, SemesterId = 38, CourseId = 5, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 52, SemesterId = 38, CourseId = 4, Grade = 1, CourseStatus = CourseStatus.ExamUnsuccessfull },
                new StudentCourse() { Id = 53, SemesterId = 38, CourseId = 3, Grade = 1, CourseStatus = CourseStatus.Banned },

                new StudentCourse() { Id = 55, SemesterId = 39, CourseId = 3, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 56, SemesterId = 39, CourseId = 4, Grade = 4, CourseStatus = CourseStatus.Completed },

                //Hunor
                new StudentCourse() { Id = 57, SemesterId = 40, CourseId = 1, Grade = 3, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 58, SemesterId = 40, CourseId = 3, Grade = 1, CourseStatus = CourseStatus.AssignmentUnsuccessful },
                new StudentCourse() { Id = 59, SemesterId = 40, CourseId = 5, Grade = 1, CourseStatus = CourseStatus.Banned },

                new StudentCourse() { Id = 60, SemesterId = 41, CourseId = 3, Grade = 5, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 61, SemesterId = 41, CourseId = 5, Grade = 1, CourseStatus = CourseStatus.Completed },
                new StudentCourse() { Id = 62, SemesterId = 41, CourseId = 4, Grade = 4, CourseStatus = CourseStatus.Completed },


            });


            base.OnModelCreating(builder);
        }
    }
}
