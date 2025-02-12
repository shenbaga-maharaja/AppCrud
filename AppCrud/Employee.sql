USE [DBEMPLOYEE]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[IdDepartment] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDepartment] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[IdEmployee] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](30) NULL,
	[IdDepartment] [int] NULL,
	[Salary] [int] NULL,
	[HireDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEmployee] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([IdDepartment], [Name]) VALUES (1, N'Operations')
INSERT [dbo].[Department] ([IdDepartment], [Name]) VALUES (2, N'Suport')
INSERT [dbo].[Department] ([IdDepartment], [Name]) VALUES (3, N'Analytics')
INSERT [dbo].[Department] ([IdDepartment], [Name]) VALUES (4, N'Sales')
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[Employee] ON 

INSERT [dbo].[Employee] ([IdEmployee], [FullName], [IdDepartment], [Salary], [HireDate]) VALUES (4, N'Jaba', 1, 1300, CAST(N'2020-07-11' AS Date))
INSERT [dbo].[Employee] ([IdEmployee], [FullName], [IdDepartment], [Salary], [HireDate]) VALUES (5, N'Raja', 3, 1200, CAST(N'2020-03-12' AS Date))
INSERT [dbo].[Employee] ([IdEmployee], [FullName], [IdDepartment], [Salary], [HireDate]) VALUES (25, N'Ari', 2, 1200, CAST(N'2023-08-01' AS Date))
INSERT [dbo].[Employee] ([IdEmployee], [FullName], [IdDepartment], [Salary], [HireDate]) VALUES (30, N'Jana', 4, 1500, CAST(N'2024-03-22' AS Date))
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD FOREIGN KEY([IdDepartment])
REFERENCES [dbo].[Department] ([IdDepartment])
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteEmployee]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_DeleteEmployee](
	@IdEmployee int
)
as
begin
	delete from Employee where IdEmployee = @IdEmployee
end
GO
/****** Object:  StoredProcedure [dbo].[sp_EditEmployee]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_EditEmployee](
	@IdEmployee int,
	@FullName varchar(30),
	@IdDepartment int,
	@Salary int,
	@HireDate varchar(10)
)
as
begin
	set dateformat dmy

	update Employee set
	FullName = @FullName,
	IdDepartment = @IdDepartment,
	Salary = @Salary,
	HireDate = convert(date,@HireDate)
	where IdEmployee = @IdEmployee
end
GO
/****** Object:  StoredProcedure [dbo].[sp_EmployeeList]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_EmployeeList]
as
begin
	set dateformat dmy

	select e.IdEmployee,e.FullName,
	d.IdDepartment,d.Name,
	e.Salary,
	convert(char(10),e.HireDate,103) as 'HireDate'
	from Employee as e
	inner join Department as d on e.IdDepartment=d.IdDepartment
end
GO
/****** Object:  StoredProcedure [dbo].[sp_ListDepartment]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_ListDepartment]
as
begin
	select IdDepartment,Name from Department
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SaveEmployee]    Script Date: 25/03/2024 12:19:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_SaveEmployee](
	@FullName varchar(30),
	@IdDepartment int,
	@Salary int,
	@HireDate varchar(10)
)
as
begin
	set dateformat dmy

	insert into Employee(FullName,IdDepartment,Salary,HireDate) values
	(@FullName,@IdDepartment,@Salary,convert(date,@HireDate))
end
GO
