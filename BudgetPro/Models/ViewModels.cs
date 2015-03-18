﻿using BudgetPro.Models.Database;
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
        public int id { get; set; }
        public int AccountId { get; set; }
        public Decimal Amount { get; set; }
        public Decimal AbsAmount { get; set; }
        public Decimal ReconciledAmount { get; set; }
        public Decimal AbsReconciledAmount { get; set; }
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
}