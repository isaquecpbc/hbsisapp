using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebAppHBSIS.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Http.Cors;

namespace WebAppHBSIS.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ContributorController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable() ;

            string query = @"SELECT ContributorId, ContributorName, Cpf, Salary, Dependents FROM dbo.Contributors";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public HttpResponseMessage Get(int id)
        {
            DataTable table = new DataTable();

            string query = @"SELECT ContributorId, ContributorName, Cpf, Salary, Dependents FROM dbo.Contributors WHERE ContributorId =" + id;

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [HttpGet]
        [ActionName("Calculate")]
        public HttpResponseMessage GetCalculate(double value)
        {
            double minsalary = value;
            double income = 0;
            double tax = 0;
            DataTable table = new DataTable();

            string query = @"SELECT ContributorId, ContributorName, Cpf, Salary, Dependents FROM dbo.Contributors";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            // novo datatable com novos valores
            DataTable dt = new DataTable { TableName = "NewValues" }; ;
            dt.Columns.Add("ContributorId");
            dt.Columns.Add("ContributorName");
            dt.Columns.Add("Cpf");
            dt.Columns.Add("Salary");
            dt.Columns.Add("Dependents");
            dt.Columns.Add("Tax");

            foreach (DataRow row in table.Rows)
            {
                double dependents = Convert.ToDouble(row["dependents"].ToString());
                double salary = Convert.ToDouble(row["salary"].ToString());

                // get salario liquido com desconto de dependentes se tiver
                if (dependents > 0)
                {
                    income = salary - (salary / 100 * (5 * dependents));
                }
                else
                {
                    income = salary;
                }
                // get numero de salarios minimos 
                double calcNumBasic = salary / minsalary;

                // get salario com imposto caso...
                if (calcNumBasic > 7)
                {
                    tax = income / 100 * 27.50;
                }
                else if (calcNumBasic > 5)
                {
                    tax = income / 100 * 22.50;
                }
                else if (calcNumBasic > 4)
                {
                    tax = income / 100 * 15;
                }
                else if (calcNumBasic >= 2)
                {
                    tax = income / 100 * 7.50;
                }
                else
                {
                    tax = 0;
                }

                //store results
                dt.Rows.Add(new Object[] { row["ContributorId"], row["ContributorName"], row["Cpf"], row["Salary"], row["Dependents"], tax });
            }

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        public string Post(Contributor req)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"
                    INSERT INTO dbo.Contributors (ContributorName, Cpf, Salary, Dependents) 
                        VALUES ('" + req.ContributorName + @"', '" + req.Cpf + @"','" + req.Salary + @"', '" + req.Dependents + @"' )";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "foi";
            }
            catch
            {
                return "Não foi cara";
            }
        }

    }
}
