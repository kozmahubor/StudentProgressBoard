using Microsoft.EntityFrameworkCore.Metadata.Internal;
using studentprogressboard.Model.Base;
using studentprogressboard.Model.Enums;
using studentprogressboard.Model.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace studentprogressboard.Model
{
    public class Semester : Entity, IEntity
    {
        public int StudentId { get; set; }
        public int Year { get; set; }
        public int SemesterNumber { get; set; }
        public bool Active { get; set; }
        public FinancialStatus FinancialStatus { get; set; }


        [ForeignKey(nameof(StudentId))]
        [NotMapped]
        public virtual Student? Student { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual ICollection<StudentCourse> CoursesTaken { get; set; }
        public string SemesterYearString
        {
            get
            {
                return $"{Year}/{Year + 1}/{SemesterNumber}";
            }
        }

        public Semester()
        {
            CoursesTaken = new HashSet<StudentCourse>();
        }

    }
}
