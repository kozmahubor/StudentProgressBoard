using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SemesterController : ControllerBase
    {
        private readonly ISemesterService service;

        public SemesterController(ISemesterService service)
        {
            this.service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet("listSemesters/{studentId}")]
        public async Task<IActionResult> ListTrainingAcademyYears(int studentId)
        {
            var list = await this.service.QueryAsync(x => x.StudentId == studentId);
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var item = await this.service.GetByIdAsync(id);
            if (item != null)
            {
                return Ok(item);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateAsync([FromBody]Semester entity)
        {
            if (entity == null)
            {
                return BadRequest();
            }

            if (entity.Id == 0)
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
            var semester = await service.GetByIdAsync(id);

            if (semester == null)
            {
                return BadRequest();
            }

            await this.service.DeleteAsync(semester);
            return Ok(semester);
        }
    }

}
