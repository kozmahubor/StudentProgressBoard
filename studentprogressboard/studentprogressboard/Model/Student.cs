using Microsoft.AspNetCore.Identity;
using studentprogressboard.Model.Base;
using studentprogressboard.Model.Enums;
using studentprogressboard.Model.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace studentprogressboard.Model
{
    public class Student : SiteUser, IEntity
    {
        public string Name { get; set; }
        public string NeptunCode { get; set; }
        public int YearOfAdministration { get; set; }
        public Sex? Sex { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Address { get; set; }
        public string? Nationality { get; set; }
        public string? MothersName { get; set; }
        public bool Absolved { get; set; } = false;
        public DateTime? AbsolvationDate { get; set; }
        public bool Graduated { get; set; } = false;
        public DateTime? GraduationDate { get; set; }
        //public bool Admin { get; set; } = false;

        public int TrainingId { get; set; }

        [ForeignKey(nameof(TrainingId))]
        [NotMapped]
        public virtual Training? Training { get; set; }

        [NotMapped]
        [JsonIgnore]
        public virtual ICollection<Semester>? Semesters { get; set; }

        public string Role { get; set; } = "ADMIN";
        public override string? PasswordHash
        {
            get => base.PasswordHash;
            set
            {
                try
                {
                    if (value.Length < 3) throw new ArgumentException("too short");
                    PasswordHasher<Student> ph = new PasswordHasher<Student>();
                    base.PasswordHash = ph.HashPassword(this, value);
                }
                catch (Exception ex)
                {

                }
            }
        }

        public Student()
        {
            Semesters = new HashSet<Semester>();
        }
    }
}
