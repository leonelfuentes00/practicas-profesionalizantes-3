set names utf8mb4 collate utf8mb4_bin;

drop database if exists actividad_4;
create database actividad_4 character set utf8mb4 collate utf8mb4_bin;
use actividad_4;


-- para este ejercicio se crean dos tablas: folder y file
-- pero podria extenderse mucho si se quisiera agregar mas funcionalidades
-- mas cercanas a un sistema de gestion de archivos real, como una tabla de usuarios,
-- permisos, tipos de archivos, etc

-- por eso mismo decidi no ponerle "type" a folder, ya que no es necesario
create table folder (
	id int primary key auto_increment,
	name varchar(50),
	created_at datetime,
	updated_at datetime,
	id_folder_parent int null,
	foreign key (id_folder_parent) references folder(id)
);

create table file (
	id int primary key auto_increment,
	name varchar(50),
	type varchar(20),
	created_at datetime,
	updated_at datetime,
	size_mb double,
	id_folder int,
	foreign key (id_folder) references folder(id)
);


-- en los ejercicios anteriores ponia un delimitador por cada procedimiento pero no es necesario, soy un animal
delimiter //

-- carpetas
create procedure folder_create(
    in _name varchar(50),
    in _id_folder_parent int
)
begin
    insert into folder(name, created_at, updated_at, id_folder_parent)
    values (_name, now(), now(), _id_folder_parent);
end;

create procedure folder_update(
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

create procedure folder_delete(in _id int)
begin
	delete from folder where id = _id;
end;
//

-- archivos
create procedure file_create(
    in _name varchar(50),
    in _type varchar(20),
    in _created_at datetime,
    in _size_mb double,
    in _id_folder int
)
begin
    insert into file(name, type, created_at, updated_at, size_mb, id_folder)
    values (_name, _type, _created_at, now(), _size_mb, _id_folder);
end;

create procedure file_update(
    in _id int,
    in _name varchar(50),
    in _type varchar(20),
    in _created_at datetime,
    in _size_mb double,
    in _id_folder int
)
begin
    update file
    set name = _name,
        type = _type,
        created_at = _created_at,
        updated_at = now(),
        size_mb = _size_mb,
        id_folder = _id_folder
    where id = _id;
end;

create procedure file_delete(in _id int)
begin
	delete from file where id = _id;
end;
//

-- busquedas
create procedure file_search_by_type_date(in _type varchar(20), in _from datetime, in _to datetime)
begin
	select f.name, f.type, f.created_at, f.size_mb, folder.name as folder
	from file f
	join folder on f.id_folder = folder.id
	where f.type = _type and f.created_at between _from and _to;
end;
//

delimiter ;
----------------------------------------------------------------
-- insercion de datos de ejemplo

insert into folder(name, id_folder_parent) values
	('src', null),
	('documents', 1),
	('images', 1),
	('videos', 1);

insert into folder(name, id_folder_parent) values
	('2024', 2),
	('vacation', 3);

insert into file(name, type, created_at, size_mb, id_folder) values
	('curriculum.pdf', 'pdf', '2024-01-15 10:00:00', 0.8, 4),
	('notes.txt', 'txt', '2024-02-10 12:00:00', 0.2, 2),
	('photo1.jpg', 'jpg', '2024-03-20 14:00:00', 2.4, 5),
	('video1.mp4', 'mp4', '2024-04-01 16:00:00', 50.0, 3),
	('video2.mp4', 'mp4', '2024-04-15 18:00:00', 150.0, 6);

-- Crear nueva carpeta
CALL folder_create('proyectos', NULL);

-- Editar carpeta (renombrar "vacation" a "viaje")
CALL folder_update(6, 'viaje', 3);

-- Eliminar carpeta (por id)
-- CALL folder_delete(7);

-- Crear nuevo archivo
CALL file_create('presupuesto.xlsx', 'xlsx', '2024-06-01 08:30:00', 1.5, 2);

-- Editar archivo (cambiar nombre y tamaño)
CALL file_update(1, 'cv_actualizado.pdf', 'pdf', '2024-01-15 10:00:00', 0.9, 5);

-- Eliminar archivo
-- CALL file_delete(6);

-- Buscar archivos tipo 'mp4' creados entre el 1 y 30 de abril
CALL file_search_by_type_date('mp4', '2024-04-01 00:00:00', '2024-04-30 23:59:59');

-- Ver todo
-- SELECT * FROM folder;
-- SELECT * FROM file;