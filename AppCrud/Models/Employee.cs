using DocuSign.eSign.Model;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace AppCrud.Models
{
    public class Employee
    {
        public int IdEmployee { get; set; }

        public string FullName { get; set; }

        public Department RefDepartment { get; set; }

        public int Salary { get; set; }

        public string HireDate { get; set; }
    }
}
