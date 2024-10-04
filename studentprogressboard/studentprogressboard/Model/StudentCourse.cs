using studentprogressboard.Model.Base;
using studentprogressboard.Model.Enums;
using studentprogressboard.Model.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace studentprogressboard.Model
{
    public class StudentCourse : Entity, IEntity
    {
        public int? Grade { get; set; }
        public int SemesterId { get; set; }
        public int CourseId { get; set; }
        public CourseStatus? CourseStatus { get; set; } 


        [ForeignKey(nameof(SemesterId))]
        [NotMapped]
        public virtual Semester? Semester { get; set; }


        [ForeignKey(nameof(CourseId))]
        [NotMapped]
        public virtual Course? Course { get; set; }
    }
}
