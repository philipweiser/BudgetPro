﻿using BudgetPro.Models.Database;
using System;
using System.Collections.Generic;

namespace BudgetPro.Models
{
    public class BudgetItem
    {
        public BudgetItem() { }
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal Amount { get; set; }
        public int Frequency { get; set; }

    }
    public class DashModel
    {
        public DashModel() { }
        public int HouseholdId { get; set; }
        public List<TransModel> RecentTransactions { get; set; }
        public List<BankModel> MyAccounts { get; set; }
        public List<BudgetItem> MyBudget { get; set; }
        public List<object> MyGraph { get; set; }
    }
    public class HouseModel
    {
    }
    public class BankModel
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public decimal ReconciledBalance { get; set; }
    }
    public class TransModel
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public decimal AbsAmount { get; set; }
        public decimal ReconciledAmount { get; set; }
        public decimal AbsReconciledAmount { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Description { get; set; }
        public Nullable<DateTimeOffset> Updated { get; set; }
        public int UpdatedByUserId { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
    public class InsertTransModel
    {
        public string AccountName { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
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

        public static implicit operator UserModel(ApplicationUser user)
        {
            return new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                HouseholdId = user.HouseholdId,
                PhoneNumber = user.PhoneNumber,
                UserName = user.UserName
            };
        }
    }
    public class CategoryModel
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Name { get; set; }
    }
}