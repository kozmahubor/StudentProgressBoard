using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Model.Interfaces;
using System.Linq.Expressions;

namespace studentprogressboard.Logic.Interfaces
{
    public interface ILogicService<TEntity> where TEntity : class, IEntity
    {
        Task<TEntity> GetByIdAsync(int id);
        Task<IEnumerable<TEntity>> QueryAsync(Expression<Func<TEntity, bool>>? predicate = null);
        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
    }
}
