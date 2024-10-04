using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Base;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Logic.Services
{
    public class SemesterService : LogicServiceBase<Semester>, ISemesterService
    {
        public SemesterService(IRepository<Semester> repository) : base(repository)
        {

        }
    }
}
