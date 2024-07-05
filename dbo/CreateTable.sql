USE RNRDatabase;

IF OBJECT_ID('dbo.Breakdowns', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Breakdowns;
END;

CREATE TABLE dbo.Breakdowns
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    BreakdownReference NVARCHAR(50) NOT NULL UNIQUE,
    CompanyName NVARCHAR(100) NOT NULL,
    DriverName NVARCHAR(100) NOT NULL,
    RegistrationNumber NVARCHAR(50) NOT NULL,
    BreakdownDate DATETIME NOT NULL
);
