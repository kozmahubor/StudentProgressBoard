using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Base;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Logic.Services
{
    public class TrainingService : LogicServiceBase<Training>, ITrainingService
    {
        public TrainingService(IRepository<Training> repository) : base(repository)
        {
           
        }

    }
}
