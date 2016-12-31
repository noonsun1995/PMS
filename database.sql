-- 创建PMS数据库
create database PMS;
-- 创建用户的表
create table PMS.tb_users (
	u_no varchar(12) not null primary key,
	u_password varchar(16) not null default '12345678',
	u_name varchar(20) not null default '不明',
	u_sex varchar(2) not null default '不明',
	u_birthday date not null default '1960-1-1',
	u_school_college varchar(16) not null default '不明',
	u_college_department varchar(16) not null default '不明',
	u_department varchar(20) not null default '不明',
	u_position varchar(20) not null default '不明',
	u_tel varchar(11) not null default '不明',
	u_qq varchar(11) not null default '不明',
	u_place varchar(50) not null default '不明',
	u_intro varchar(200) not null default '不明',
	u_remark varchar(200) not null default '不明',
	u_permission int not null default 2,
	u_is_delete tinyint(1) not null default 0,
	unique(u_no)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
-- 创建部门表
create table PMS.tb_departments (
	d_no int primary key not null auto_increment,
	d_name varchar(20) not null default '不明',
	d_intro varchar(500) not null default '不明',
	d_remark varchar(20) not null default '不明'
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;
-- 创建职位表
create table PMS.tb_positions (
	p_no int primary key not null auto_increment,
	p_name varchar(20) not null,
	p_intro varchar(500) not null,
	p_remark varchar(20) not null
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;
-- 删除表
drop table `PMS`.`tb_users`;
drop table `PMS`.`tb_departments`;
drop table `PMS`.`tb_positions`;

-- 插入一些数据到用户表
--
INSERT INTO `PMS`.`tb_users`
(u_no, u_password, u_name, u_department, u_position,u_sex, u_permission)
VALUES
('201400000000','12345678', '超级管理员', '技术部', '部长', '不明', 0);

INSERT INTO `PMS`.`tb_users`
(u_no, u_password, u_name, u_department, u_position,u_sex, u_school_college,
u_college_department, u_tel, u_qq, u_place, u_intro, u_remark, u_birthday)
VALUES
('201430550001','12345678', '王二小', '节目部', '部长', '男', '计算机科学与工程学院',
'计算机科学与技术','18813298638', '644179052', '四川广安', '喜欢写代码', '无', '1996-1-21');

INSERT INTO `PMS`.`tb_users`
(u_no, u_password, u_name, u_department, u_position,u_sex, u_school_college,
u_college_department, u_tel, u_qq, u_place, u_intro, u_remark, u_birthday)
VALUES
('201430550002','12345678', '王小明', '策推部', '部长', '女', '计算机科学与工程学院',
'计算机科学与技术','18813298638', '644179052', '四川广安', '喜欢写代码', '无', '1996-1-21');

INSERT INTO `PMS`.`tb_users`
(u_no, u_password, u_name, u_department, u_position,u_sex, u_school_college,
u_college_department, u_tel, u_qq, u_place, u_intro, u_remark, u_birthday, u_is_delete)
VALUES
('201430550003','12345678', '老王', '策推部', '部长', '女', '计算机科学与工程学院',
'计算机科学与技术','18813298638', '644179052', '四川广安', '喜欢写代码', '无', '1996-1-21',1);
-- 常用命令
delete from PMS.tb_users where u_no = '201461551289';
drop database PMS;
alter database PMS default character set 'utf8';
show create table PMS.tb_users;
alter table PMS.tb_users character ;
insert into PMS.tb_users (u_no, u_department) values ('211', '解决');
select u_birthday from PMS.tb_users where u_no = '201461551289';

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
('外联部', '拉赞助', '无备注');


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
