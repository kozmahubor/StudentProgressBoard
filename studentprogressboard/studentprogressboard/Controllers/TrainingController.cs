using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {
        private readonly ITrainingService service;

        public TrainingController(ITrainingService service)
        {
            this.service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        public async Task<IActionResult> ListTrainings()
        {
            var list = await this.service.QueryAsync();

            return Ok(list);
        }
        

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var item = await this.service.GetByIdAsync(id);
            if(item != null)
            {
                return Ok(item);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateAsync([FromBody] Training entity)
        {
            if(entity == null)
            {
                return BadRequest();
            }

            if(entity.Id == 0)
            {
                return Ok(await service.AddAsync(entity));
            }
            else
            {
                return Ok(await service.UpdateAsync(entity));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var entity = await this.service.GetByIdAsync(id);

            if(entity != null)
            {
                await this.service.DeleteAsync(entity);
                return Ok();
            }
            return BadRequest();
        }
    }
}
