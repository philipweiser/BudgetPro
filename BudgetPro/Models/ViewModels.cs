using BudgetPro.Models.Database;
using System;
using System.Collections.Generic;

namespace BudgetPro.Models
{
    public class BudgetItem
    {
        public BudgetItem() { }

        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int HouseholdId { get; set; }
        public decimal Amount { get; set; }
        public int Frequency { get; set; }

    }
    public class DashModel
    {
        public DashModel() { }
    }
    public class HouseModel
    {
        //public HouseModel() {
        //    MemberNames = new List<Tuple<string, string>>();
        //}
        //public List<Tuple<string, string>> MemberNames { get; set; }
    }
    public class TransModel
    {
        public TransModel() { }
    }
    public class UserModel
    {
        public UserModel() { }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Household { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
    }
}