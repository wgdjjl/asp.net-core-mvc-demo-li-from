using System;
using System.Collections.Generic;

namespace Demo.Models
{
    public partial class BankInfo
    {
        public long Id { get; set; }
        public string BankCode { get; set; }
        public string BranchCode { get; set; }
        public string Furigana { get; set; }
        public string Name { get; set; }
        public long BankType { get; set; }
        public long BranchType { get; set; }
    }
}
