using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Base;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Logic.Services
{
    public class StudentCourseService : LogicServiceBase<StudentCourse>, IStudentCourseService
    {
        public StudentCourseService(IRepository<StudentCourse> repository) : base(repository)
        {

        }

        public async Task<IEnumerable<StudentCourse>> ListStudentCoursesAsync()
        {
            var list = await this.QueryAsync();

            return list.Where(x => x.Course != null && x.Semester != null);
        }
    }
}
