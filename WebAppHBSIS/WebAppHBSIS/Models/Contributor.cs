using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAppHBSIS.Models
{
    public class Contributor
    {
        public long ContributorId { get; set; }
        public string ContributorName { get; set; }
        public string Cpf { get; set; }
        public long Salary { get; set; }
        public long Dependents { get; set; }

    }
}