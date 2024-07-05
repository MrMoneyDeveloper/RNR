USE RNRDatabase;

DELETE FROM dbo.Breakdowns;

-- Temporary table to generate random data
DECLARE @Breakdowns TABLE (
    BreakdownReference NVARCHAR(50),
    CompanyName NVARCHAR(100),
    DriverName NVARCHAR(100),
    RegistrationNumber NVARCHAR(50),
    BreakdownDate DATETIME
);

-- Insert 10 random entries
DECLARE @Counter INT = 1;
WHILE @Counter <= 10
BEGIN
    INSERT INTO @Breakdowns (BreakdownReference, CompanyName, DriverName, RegistrationNumber, BreakdownDate)
    VALUES (
        'BRK-' + RIGHT('000' + CAST(@Counter AS VARCHAR(3)), 3),
        'Company ' + CHAR(64 + @Counter),
        'Driver ' + CHAR(64 + @Counter),
        'REG-' + RIGHT('000' + CAST(@Counter AS VARCHAR(3)), 3),
        DATEADD(DAY, @Counter, GETDATE()) + CAST(RAND(CHECKSUM(NEWID())) * 24 AS INT) / 24.0
    );
    SET @Counter = @Counter + 1;
END

-- Insert the generated data into the Breakdowns table
INSERT INTO dbo.Breakdowns (BreakdownReference, CompanyName, DriverName, RegistrationNumber, BreakdownDate)
SELECT BreakdownReference, CompanyName, DriverName, RegistrationNumber, BreakdownDate
FROM @Breakdowns;
