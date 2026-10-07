# UniNest Backend Database

This is the complete MySQL backend layer for the UniNest project.

## Schema
Includes the 10 core tables:
1. STUDENT
2. LANDLORD
3. PROPERTY
4. AMENITY
5. PROPERTY_AMENITY
6. STUDENT_PREFERENCE
7. ROOMMATE_MATCH
8. BOOKING
9. LEASE
10. REVIEW

## Running the Database Setup
Run the master script in your MySQL shell (from within the `database` folder):
```bash
mysql -u root -p < 00_master_setup.sql
```
Or within the MySQL CLI:
```sql
SOURCE 00_master_setup.sql;
```

## Features
- All requested constraints, CHECK clauses, and Indexes.
- Pure SQL matching procedures (`CalculateRoommateCompatibility`).
- Analytics views and properties cost calculators.
- Robust triggers for maintaining capacity and verifying review authenticity.
- Transactions for booking approvals -> lease creation.

## Connecting with Frontend
- The frontend can consume data from views like `AVAILABLE_PROPERTIES` and `TOP_HOUSING_OPTIONS` to show rankings directly without recalculating true cost.
- `HOUSING_RECOMMENDATIONS` computes `true_monthly_cost` safely in SQL.
- When saving preferences or filtering properties, simply call the stored procedure `GetSuitableProperties` for fast filtering.
