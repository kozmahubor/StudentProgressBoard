using studentprogressboard.Model.Base;
using studentprogressboard.Model.Enums;
using studentprogressboard.Model.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace studentprogressboard.Model
{
    public class Training : Entity, IEntity
    {
        public string Name { get; set; }
        public string? EnglishName { get; set; }
        public string? TrainingCode { get; set; }
        public int NumberOfSemesters { get; set; }
        public string? Language { get; set; }
        public TrainingType TrainingType { get; set; }
        public TrainingMode TrainingMode { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual ICollection<Student> Students { get; set; }

        public Training()
        {
            Students = new HashSet<Student>();
        }
    }
}
