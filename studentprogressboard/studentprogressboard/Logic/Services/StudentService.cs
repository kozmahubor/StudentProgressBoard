using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Base;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Logic.Services
{
    public class StudentService : LogicServiceBase<Student>, IStudentService
    {
        public StudentService(IRepository<Student> repository) : base(repository)
        {

        }
    }
}
