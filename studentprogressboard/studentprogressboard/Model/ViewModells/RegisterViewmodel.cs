using studentprogressboard.Model.Enums;

namespace studentprogressboard.Model.ViewModells
{
    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public string Name { get; set; }
        public string NeptunCode { get; set; }
        public int TrainingId { get; set; }
        public int YearOfAdministration { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Nationality { get; set; }
        public string MothersName { get; set; }
        public string Address { get; set; }
        public Sex Sex { get; set; }
    }
}
