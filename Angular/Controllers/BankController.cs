using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Demo.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Demo
{
    [Route("api/[controller]")]
    public class BankController : Controller
    {

        // GET api/<controller>/<action>
        [HttpGet("[action]/{prefix?}")]
        public List<BankInfo> List(string prefix)
        {
            using (var context = new DemoDbContext())
            {
                if (String.IsNullOrEmpty(prefix))
                {
                    var banks = context.BankInfo.ToList();
                    return banks;
                }
                else
                {
                    var banks = context.BankInfo.Where(b => b.Furigana.StartsWith("prefix")).ToList();
                    return banks;
                }
            }
        }

        // GET api/<controller>/5
        [HttpGet("[action]/{id:int}")]
        public BankInfo Info(int id)
        {
            using (var context = new DemoDbContext())
            {
                var bank = context.BankInfo.Single(b => b.Id == id);
                return bank;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
