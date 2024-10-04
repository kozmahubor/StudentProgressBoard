using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Base;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Logic.Services
{
    public class CourseService : LogicServiceBase<Course>, ICourseService
    {
        public CourseService(IRepository<Course> repository) : base(repository)
        {

        }
    }
}
