using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TryMVC.Models
{
    public class IndexViewModel {

        public List<Business> Businesses { get; set; } // 用于页面显示所有的业务

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy年MM月dd日}", ApplyFormatInEditMode = true)]
        public DateTime Start { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy年MM月dd日}", ApplyFormatInEditMode = true)]
        public DateTime End { get; set; }
    }
}
