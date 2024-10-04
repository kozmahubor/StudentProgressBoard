using Microsoft.EntityFrameworkCore;
using studentprogressboard.Data.Repository.Interfaces;
using studentprogressboard.Model.Interfaces;

namespace studentprogressboard.Data.Repositories.Base
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        public ApplicationDbContext Db { get; set; }
        public DbSet<TEntity> DbSet { get; set; }

        public Repository(ApplicationDbContext Db)
        {
            this.Db = Db ?? throw new ArgumentNullException(nameof(Db));
            this.DbSet = this.Db.Set<TEntity>();
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            await Db.Set<TEntity>().AddAsync(entity);
            Db.SaveChanges();
            return entity;
        }

        public async Task DeleteById(int id)
        {
            var entity = await ReadOne(id);
            Db.Set<TEntity>().Remove(entity);
            Db.SaveChanges();
        }

        public async Task<TEntity> ReadOne(int id)
        {
            var entity = await Db.Set<TEntity>().FirstOrDefaultAsync(x => x.Id == id);
            return entity;
        }

        public IQueryable<TEntity> ReadAll()
        {
            return Db.Set<TEntity>();
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            var old = await ReadOne(entity.Id);
            foreach (var prop in old.GetType().GetProperties())
            {
                if (prop.GetAccessors().FirstOrDefault(t => t.IsVirtual) == null && prop.GetSetMethod() != null)
                {
                    prop.SetValue(old, prop.GetValue(entity));
                }
            }
            Db.SaveChanges();
            return entity;
        }
    }
}
