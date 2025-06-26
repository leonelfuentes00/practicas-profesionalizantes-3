set names utf8mb4 collate utf8mb4_bin;

drop database if exists actividad_3;
create database actividad_3 character set utf8mb4 collate utf8mb4_bin;
use actividad_3;

create table user (
	id int primary key auto_increment,
	name varchar(40),
	password varchar(100)
);

-- puse ugroups porque es una abreviación para usergroups y evitar el uso de la palabra reservada "group" o "groups"
create table ugroups (
	id int primary key auto_increment,
	name varchar(40)
);

create table actionpermissions (
	id int primary key auto_increment,
	action varchar(100)
);

-- creo relacion de muchos a muchos entre user y ugroups
create table user_ugroups (
	id_user int,
	id_ugroup int,
	primary key (id_user, id_ugroup),
	foreign key (id_user) references user(id),
	foreign key (id_ugroup) references ugroups(id)
);

-- creo relacion de muchos a muchos entre ugroups y actionpermissions
create table ugroups_actionpermissions (
	id_ugroup int,
	id_actionpermission int,
	primary key (id_ugroup, id_actionpermission),
	foreign key (id_ugroup) references ugroups(id),
	foreign key (id_actionpermission) references actionpermissions(id)
);

delimiter //

create procedure user_create(in _name varchar(40), in _password varchar(100))
begin
	insert into user(name, password) values (_name, _password);
end;
//

create procedure user_update(in _id int, in _name varchar(40), in _password varchar(100))
begin
	update user set name = _name, password = _password where id = _id;
end;
//

create procedure user_delete(in _id int)
begin
	delete from user where id = _id;
	delete from user_ugroups where id_user = _id;
end;
//

create procedure ugroup_create(in _name varchar(40))
begin
	insert into ugroups(name) values (_name);
end;
//

create procedure permission_create(in _action varchar(100))
begin
	insert into actionpermissions(action) values (_action);
end;
//

create procedure assign_user_ugroup(in _id_user int, in _id_ugroup int)
begin
	insert into user_ugroups(id_user, id_ugroup) values (_id_user, _id_ugroup);
end;
//

create procedure assign_ugroup_permission(in _id_ugroup int, in _id_permission int)
begin
	insert into ugroups_actionpermissions(id_ugroup, id_actionpermission)
	values (_id_ugroup, _id_permission);
end;
//

create procedure user_get_permissions(in _id_user int)
begin
	select distinct ap.action
	from actionpermissions ap
	join ugroups_actionpermissions gap on ap.id = gap.id_actionpermission
	join user_ugroups ug on gap.id_ugroup = ug.id_ugroup
	where ug.id_user = _id_user;
end;
//

delimiter ;

-- datos de prueba
insert into user(name, password) values
	('admin', 'admin123'),
	('juan', 'juan123'),
	('maria', 'maria123');

insert into ugroups(name) values
	('admin'),
	('regular'),
	('moderator');

insert into actionpermissions(action) values
	('post /api/uploadvideo'),
	('post /api/getuservideos'),
	('post /api/likevideo'),
	('post /api/commentonvideo'),
	('post /api/deletevideo'),
	('post /api/suspenduser');

-- admin: todos los permisos
insert into ugroups_actionpermissions(id_ugroup, id_actionpermission)
	select 1, id from actionpermissions;

-- regular: subir, ver, like, comentar
insert into ugroups_actionpermissions(id_ugroup, id_actionpermission) values
	(2, 1), (2, 2), (2, 3), (2, 4);

-- moderator: suspender usuario
insert into ugroups_actionpermissions(id_ugroup, id_actionpermission) values
	(3, 6);

-- admin / admin
insert into user_ugroups(id_user, id_ugroup) values (1, 1);

-- juan / regular
insert into user_ugroups(id_user, id_ugroup) values (2, 2);

-- maria / regular y maria / moderator
insert into user_ugroups(id_user, id_ugroup) values (3, 2), (3, 3);