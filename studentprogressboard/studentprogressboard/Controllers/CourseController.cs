using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService service;

        public CourseController(ICourseService service)
        {
            this.service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        public async Task<ActionResult> ListCourses()
        {
            var list = await this.service.QueryAsync();
            return Ok(list);
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetCourseByIdAsync(int courseId) {

            var course = await this.service.GetByIdAsync(courseId);
            return Ok(course);
        }
        
        [HttpDelete("{courseId}")]
        public async Task<IActionResult> DeleteAsync(int courseId)
        {
            var course = await service.GetByIdAsync(courseId);

            if (course != null)
            {
                await this.service.DeleteAsync(course);
                return Ok(course);
            }
            else
            {
                return BadRequest("There is no existing entity with this Id");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateAsync([FromBody] Course entity)
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
    }
}
