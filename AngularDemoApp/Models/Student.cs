using System;
using System.ComponentModel.DataAnnotations;

namespace AngularDemoApp.Models
{
    public interface IStudent
    {
        Guid StudentID { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Address { get; set; }
        string City { get; set; }
        //string State { get; set; }
        string ZipCode { get; set; }
        string Phone { get; set; }
        string Email { get; set; }
    }

    public class StudentViewModel : IStudent
    {
        [Required]
        public Guid StudentID { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }

        [Required, StringLength(50)]
        public string LastName { get; set; }

        [Required, StringLength(50)]
        public string Address { get; set; }

        [Required, StringLength(50)]
        public string City { get; set; }

        [Required, StringLength(5), DataType(DataType.PostalCode)]
        public string ZipCode { get; set; }

        [Required, StringLength(10), DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [Required, StringLength(50), DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}