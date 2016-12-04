-- 创建PMS数据库
create database PMS;
-- 创建测试的表
create table PMS.tb_users (
	u_no varchar(12) not null primary key,
	u_password varchar(16) not null default '12345678',
	u_name varchar(20) not null,
	u_department varchar(20) not null,
	u_position varchar(20) not null
) ;
INSERT INTO `PMS`.`tb_users`
VALUES
('201461551289','12345678', '阮松松', '技术部', '部长');i
-- 常用命令
delete from PMS.tb_users where u_no = '201461551289';
drop table `PMS`.`tb_users`;
drop database PMS;
alter database PMS default character set 'utf8';
show create table PMS.tb_users;
alter table PMS.tb_users character ;
insert into PMS.tb_users (u_no, u_department) values ('211', '解决');

-- 部门表
create table PMS.tb_departments (
	d_no int primary key not null auto_increment,
	d_name varchar(20) not null,
	d_intro varchar(500) not null,
	d_remark varchar(20) not null
);
insert into PMS.tb_departments
(d_name, d_intro, d_remark)
values
('技术部', '写代码', '无备注');
insert into PMS.tb_departments
(d_name, d_intro, d_remark)
values
('节目部', '播音主持', '无备注');

insert into PMS.tb_departments
(d_name, d_intro, d_remark)
values
('外联部', '拉赞助', '无备注')

create table PMS.tb_positions (
	p_no int primary key not null auto_increment,
	p_name varchar(20) not null,
	p_intro varchar(500) not null,
	p_remark varchar(20) not null
);

insert into PMS.tb_positions
(p_name, p_intro, p_remark)
values
('部长', '部门老大', '无备注');

insert into PMS.tb_positions
(p_name, p_intro, p_remark)
values
('主管', '主管部门', '无备注');

insert into PMS.tb_positions
(p_name, p_intro, p_remark)
values
('干事', '干活', '无备注');
