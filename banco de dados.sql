USE [HbsisAppDB]
GO

/****** Object:  Table [dbo].[Contributors]    Script Date: 31/01/2020 18:16:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Contributors](
	[ContributorId] [bigint] IDENTITY(1,1) NOT NULL,
	[ContributorName] [varchar](50) NOT NULL,
	[Cpf] [varchar](200) NOT NULL,
	[Salary] [decimal](18, 0) NOT NULL,
	[Dependents] [int] NOT NULL
) ON [PRIMARY]
GO

