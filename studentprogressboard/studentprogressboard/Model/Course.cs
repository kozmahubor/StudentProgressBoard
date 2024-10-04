using studentprogressboard.Model.Base;
using studentprogressboard.Model.Enums;
using studentprogressboard.Model.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace studentprogressboard.Model
{
    public class Course : Entity, IEntity
    {
        public string Name { get; set; }
        public string? CourseCode { get; set; }
        public int Credits { get; set; }
        public string? Organization { get; set; }
        public string? ResponsibleTeacher { get; set; }
        public CourseType CourseType { get; set; }
        public RequirementType RequirementType { get; set; }

        [NotMapped]
        [JsonIgnore]
        public virtual ICollection<StudentCourse> StudentCourses { get; set; }

        public Course()
        {
            StudentCourses = new HashSet<StudentCourse>();
        }
    }
}
