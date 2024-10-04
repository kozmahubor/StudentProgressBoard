using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;

namespace studentprogressboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentCourseController : ControllerBase
    {
        private readonly IStudentCourseService service;

        public StudentCourseController(IStudentCourseService service)
        {
            this.service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet("listStudentCourses/{semesterId}")]
        public async Task<IActionResult> GetCoursesForStudent(int semesterId)
        {
            var courses = (await this.service.ListStudentCoursesAsync()).Where(x => x.SemesterId == semesterId);
            return Ok(courses);
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


        [HttpGet]
        public async Task<IActionResult> ListStudentCoursesAsync()
        {
            var studentCourses = await this.service.ListStudentCoursesAsync();
            
            return Ok(studentCourses);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateAsync([FromBody] StudentCourse entity)
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

        [HttpDelete("{studentCourseId}")]
        public async Task<IActionResult> DeleteStudentCourse(int studentCourseId)
        {
            var student = await service.GetByIdAsync(studentCourseId);

            if (student != null)
            {
                await this.service.DeleteAsync(student);
                return Ok(student);
            }
            else
            {
                return BadRequest("There is no existing entity with this Id");
            }


        }
    }
}
