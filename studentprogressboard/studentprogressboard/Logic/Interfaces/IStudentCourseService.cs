using studentprogressboard.Model;

namespace studentprogressboard.Logic.Interfaces
{
    public interface IStudentCourseService : ILogicService<StudentCourse>
    {
        Task<IEnumerable<StudentCourse>> ListStudentCoursesAsync();
    }
}
