using Microsoft.EntityFrameworkCore;
using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model.Interfaces;
using System.Linq.Expressions;

namespace studentprogressboard.Logic.Base
{
    public class LogicServiceBase<TEntity> : ILogicService<TEntity> where TEntity : class, IEntity
    {
        private protected IRepository<TEntity> repository;

        public LogicServiceBase(IRepository<TEntity> repository)
        {
            this.repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            return await this.repository.Create(entity);
        }

        public async Task DeleteAsync(TEntity entity)
        {
            await this.repository.DeleteById(entity.Id);
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await this.repository.ReadOne(id);
        }

        public async Task<IEnumerable<TEntity>> QueryAsync(Expression<Func<TEntity, bool>>? predicate = null)
        {
            if(predicate != null)
            {
                return await repository.DbSet.Where(predicate).ToListAsync().ConfigureAwait(false);
            }

            return await repository.DbSet.ToListAsync().ConfigureAwait(false);
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            return await repository.Update(entity);
        }
    }
}
