using Microsoft.EntityFrameworkCore;
using studentprogressboard.Model.Interfaces;

namespace studentprogressboard.Data.Repository.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        DbSet<TEntity> DbSet { get; set; }
        IQueryable<TEntity> ReadAll();
        Task<TEntity> ReadOne(int id);
        Task DeleteById(int id);
        Task<TEntity> Update(TEntity entity);
        Task<TEntity> Create(TEntity entity);
    }
}
