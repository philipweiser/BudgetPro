using BudgetPro.Models.Database;
using System;
using System.Collections.Generic;

namespace BudgetPro.Models
{
    public class BudgetItem
    {
        public BudgetItem() { }
        public int Id { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int Frequency { get; set; }

    }
    public class DashModel
    {
        public DashModel() { }
    }
    public class HouseModel
    {
    }
    public class BankModel
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Name { get; set; }
        public string Balance { get; set; }
        public string ReconciledBalance { get; set; }
    }
    public class TransModel
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string Amount { get; set; }
        public string AbsAmount { get; set; }
        public string ReconciledAmount { get; set; }
        public string AbsReconciledAmount { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Description { get; set; }
        public Nullable<DateTimeOffset> Updated { get; set; }
        public int UpdatedByUserId { get; set; }
        public int CategoryId { get; set; }
    }
    public class UserModel
    {
        public UserModel() { }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int? HouseholdId { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
    }
    public class CategoryModel
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Name { get; set; }
    }
}