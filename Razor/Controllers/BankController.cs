using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TryMVC.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TryMVC.Controllers
{
    public class BankController : Controller
    {
        public IActionResult Index()
        {
            IndexViewModel model = new IndexViewModel
            {
                Start = DateTime.Now,
                End = DateTime.Now
            };
            using (DemoDbContext db = new DemoDbContext())
            {
                model.Businesses = db.Business.ToList();
            }
            return View(model);
        }

        [HttpPost]
        public IActionResult Create(int business, DateTime start, DateTime end, string code)
        {

            // 実際にはデータベースに記入
            ViewData["business"] = business;
            ViewData["start"] = start;
            ViewData["end"] = end;
            ViewData["code"] = code;
            // 在新页面，需要什么数据，从数据读。
            // 这里不需要传数据
            switch (business)
            {
                case 1:
                    return Redirect("/Business1/");
                case 2:
                    return Redirect("/Business2/");
                default:
                    return NotFound();
            }
        }

        [HttpGet("api/[controller]/[action]/")]
        public BankInfo Info(string code, int id = 0)
        {
            if (!String.IsNullOrWhiteSpace(code)) // 当传入的url有code参数时，按照code查询
            {
                code = code.TrimStart(new Char[] { '0' }); // 我用的数据库中，代码前面的0是没有的，因此变换一下
                using (DemoDbContext db = new DemoDbContext())
                {
                    BankInfo bank = db.BankInfo.SingleOrDefault(b => b.BankCode == code && b.BankType == 1); // 我的数据库中本店支店需要用banktype区分
                    return bank;
                }
            }else
            {
                using (DemoDbContext db = new DemoDbContext())
                {
                    BankInfo bank = db.BankInfo.SingleOrDefault(b => b.Id == id);
                    return bank;
                }
            }
        }



        [HttpGet("api/[controller]/[action]/")]
        public object List(int rows = 10, int page = 1, string sort = "", string sortOrder = "asc", string search = "")
        {
            //  bankType は名称区分１：銀行名称２：支店名称
            //  branchType は並びコード１：重複なしor母店２～：出張所
            using (DemoDbContext db = new DemoDbContext())
            {
                IQueryable<BankInfo> all = from b in db.BankInfo
                                           where b.BankType == 1
                                           select b;

                if (!string.IsNullOrEmpty(search))
                {
                    if (search.Length == 2 && "アカサタナハマヤラワ".Contains(search[0]) && search[1].Equals('行'))
                    {
                        string kana = search.Substring(0, 1);
                        string[] gyo = Util.Japanese.Gyo(kana);
                        int cnt = 0;
                        List<BankInfo> bankinfos = new List<BankInfo>();
                        foreach (var k in gyo)
                        {
                            var tmp = all.Where(b => b.Furigana.StartsWith(k) || b.Furigana.StartsWith(Util.Japanese.Zen2Han(k))).OrderBy(b => Convert.ToInt32(b.BankCode));
                            cnt += tmp.Count();
                            bankinfos = bankinfos.Concat(tmp.ToList()).ToList();  
                        }
                        return new { total = cnt, rows = bankinfos.Skip((page - 1) * rows).Take(rows) };
                    }
                    else
                    {
                        all = all.Where(b => checkBankInfo(b, search) >= 0)
                        .OrderBy(b => checkBankInfo(b, search)).ThenBy(b => b.Name.Length);
                    }           
                }
                int total = all.Count();
                if (sort == "bankCode")
                {
                    if (sortOrder == "asc")
                    {
                        all = all.OrderBy(b => ("0000" + b.BankCode).Substring(b.BankCode.Length));
                    }
                    else if (sortOrder == "desc")
                    {
                        all = all.OrderByDescending(b => ("0000" + b.BankCode).Substring(b.BankCode.Length));
                    }
                }
                List<BankInfo> banks = all.Skip((page - 1) * rows).Take(rows).ToList();
                return new { total = total, rows = banks };
            }
        }
        // 查找Name和furigana中第一个匹配的位置
        // 位置是用于排序的，匹配位置越靠前，则检索结果放在前面。
        private int checkBankInfo(BankInfo bank, string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return -1;
            }
            if (bank.Name.Contains(keyword))
            {
                return bank.Name.IndexOf(keyword);
            }
            if (bank.Furigana.Contains(keyword))
            {
                return bank.Furigana.IndexOf(keyword);
            }
            keyword = Util.Japanese.Zen2Han(keyword);
            if (bank.Name.Contains(keyword))
            {
                return bank.Name.IndexOf(keyword);
            }
            if (bank.Furigana.Contains(keyword))
            {
                return bank.Furigana.IndexOf(keyword);
            }
            return -1;
        }
    }
}
