set names utf8mb4 collate utf8mb4_bin;

drop database if exists actividad_5;
create database actividad_5 character set utf8mb4 collate utf8mb4_bin;
use actividad_5;

create table user (
    id int primary key auto_increment,
    name varchar(40),
    password varchar(100)
);

create table ugroups (
    id int primary key auto_increment,
    name varchar(40)
);

create table actionpermissions (
    id int primary key auto_increment,
    action varchar(100)
);

create table user_ugroups (                     
    id_user  int,
    id_ugroups int,
    primary key (id_user, id_ugroups),
    foreign key (id_user) references user(id),
    foreign key (id_ugroups) references ugroups(id)
);

create table ugroups_actionpermissions (        
    id_ugroups int,
    id_actionpermissions int,
    primary key (id_ugroups, id_actionpermissions),
    foreign key (id_ugroups) references ugroups(id),
    foreign key (id_actionpermissions) references actionpermissions(id)
);

create table folder (
    id int primary key auto_increment,
    name varchar(50),
    created_at datetime,
    updated_at datetime,
    id_folder_parent int null,
    id_user int,            
    foreign key (id_folder_parent) references folder(id),
    foreign key (id_user) references user(id)
);

create table file (
    id int primary key auto_increment,
    name varchar(50),
    type varchar(20),
    created_at datetime,
    updated_at datetime,
    size double,
    id_folder int,
    id_user int,                        
    foreign key (id_folder) references folder(id),
    foreign key (id_user) references user(id)
);

delimiter //

create procedure folder_create (
    in _name varchar(50),
    in _id_folder_parent int,
    in _id_user int
)
begin
    insert into folder (name, created_at, updated_at, id_folder_parent, id_user)
    values (_name, now(), now(), _id_folder_parent, _id_user);
end;

create procedure folder_update (
    in _id int,
    in _name varchar(50),
    in _id_folder_parent int
)
begin
    update folder
    set name = _name,
        id_folder_parent = _id_folder_parent,
        updated_at = now()
    where id = _id;
end;

create procedure folder_delete (in _id int)
begin
    delete from folder where id = _id;
end;

-- archivos
create procedure file_create (
    in _name varchar(50),
    in _type varchar(20),
    in _size double,
    in _id_folder int,
    in _id_user int
)
begin
    insert into file (name, type, created_at, updated_at, size, id_folder, id_user)
    values (_name, _type, now(), now(), _size, _id_folder, _id_user);
end;

create procedure file_update (
    in _id int,
    in _name varchar(50),
    in _type varchar(20),
    in _size double,
    in _id_folder int
)
begin
    update file
    set name = _name,
        type = _type,
        size = _size,
        id_folder = _id_folder,
        updated_at = now()
    where id = _id;
end;

create procedure file_delete (in _id int)
begin
    delete from file where id = _id;
end;

create procedure user_get_permissions (in _id_user int)
begin
    select distinct ap.action
    from actionpermissions ap
    join ugroups_actionpermissions gap on ap.id = gap.id_actionpermissions
    join user_ugroups ug on gap.id_ugroups = ug.id_ugroups
    where ug.id_user = _id_user;
end;
//
delimiter ;
