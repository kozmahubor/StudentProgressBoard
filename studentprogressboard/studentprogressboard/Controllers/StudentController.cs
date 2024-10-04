using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using studentprogressboard.Logic.Interfaces;
using studentprogressboard.Model;
using studentprogressboard.Model.Base;
using studentprogressboard.Model.Enums;

namespace studentprogressboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService service;

        public StudentController(IStudentService service)
        {
            this.service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        public async Task<IActionResult> ListStudentsAsync()
        {
            var list = await this.service.QueryAsync(x => x.Id != -1);
            return Ok(list);
        }

        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetStudent(int studentId)
        {
            var student = await this.service.GetByIdAsync(studentId);
            return Ok(student);

        }
        [HttpGet("student/{name}")]
        public async Task<IActionResult> GetStudentByMail(string name)
        {
            var student = await this.service.QueryAsync(x => x.UserName == name);
            return Ok(student);
        }


        [HttpDelete("{studentId}")]
        public async Task<IActionResult> DeleteStudent(int studentId)
        {
            var student = await service.GetByIdAsync(studentId);

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

        [HttpPost]
        public async Task<IActionResult> AddOrUpdateAsync(Student entity)
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

        [HttpGet("listStudents/{trainingId}")]
        public async Task<IActionResult> ListTrainingStudents(int trainingId)
        {
            var list = await this.service.QueryAsync(x => x.TrainingId == trainingId);
            return Ok(list);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCSV([FromForm] List<IFormFile> files)
        {
            try
            {
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        using (var reader = new StreamReader(file.OpenReadStream()))
                        {
                            // Read CSV content
                            var csvContent = reader.ReadToEnd();

                            // Process CSV content
                            var students = ProcessCSV(csvContent);

                            foreach (var student in students)
                            {
                                if (student.Id == 0)
                                {
                                    await service.AddAsync(student);
                                }
                                else
                                {
                                    await service.UpdateAsync(student);
                                }
                            }
                        }
                    }

                    return Ok("Files uploaded successfully.");
                }
                else
                {
                    return BadRequest("No files received.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private List<Student> ProcessCSV(string csvContent)
        {
            // Parse CSV content and create list of students
            var students = new List<Student>();
            var lines = csvContent.Split("\r\n", StringSplitOptions.RemoveEmptyEntries);
            foreach (var line in lines.Skip(1)) // Skip header
            {
                var fields = line.Split(',');
                var student = new Student
                {
                    TrainingId = Convert.ToInt32(fields[0].Trim()),
                    Name = fields[1].Trim(),
                    NeptunCode = fields[2].Trim(),
                    YearOfAdministration = Convert.ToInt32(fields[3].Trim()),
                    DateOfBirth = Convert.ToDateTime(fields[4].Trim()),
                    PlaceOfBirth = fields[5].Trim(),
                    Address = fields[6].Trim(),
                    Nationality = fields[7].Trim(),
                    MothersName = fields[8].Trim(),
                    Sex = Enum.TryParse(fields[9].Trim(), out Sex sex) ? sex : default(Sex)
                };
                students.Add(student);
            }
            return students;
        }

    }
}
