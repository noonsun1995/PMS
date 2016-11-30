-- 创建PMS数据库
create database PMS;
-- 创建测试的表
create table PMS.test (
	s_no varchar(12) not null primary key,
	s_password varchar(16) not null
);
INSERT INTO `PMS`.`test`
VALUES
('201461551289','12345678');
-- 常用命令
delete from PMS.test where name = 'ruansongsong';
drop table PMS.test;
