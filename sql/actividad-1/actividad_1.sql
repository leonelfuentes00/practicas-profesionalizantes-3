set names utf8mb4 collate utf8mb4_bin;

drop database if exists actividad_1;
create database actividad_1 character set utf8mb4 collate utf8mb4_bin;

use actividad_1;

create table country (
	id int primary key auto_increment not null,
	name varchar(40),
    capital varchar(40),
	language varchar(20),
    area double,
    population int);

-- 
delimiter //
create procedure country_get_by_name(
	in _name  varchar(40)
)
begin
	select * from country  where name = _name;
end;
// delimiter;    

--
delimiter //
create procedure country_create(
	in _name varchar(40),
    in _capital varchar(40),
    in _language varchar(20),
    in _area double, 
	in _area int
)
begin
	insert into country (name, capital, language, area, population)
    values (_name, _capital, _language, _area, _population);
end;
// delimiter;
--
delimiter //
create procedure country_update(
	in _id int,
    in _name varchar(40),
    in _capital varchar(40),
    in _language varchar(20),
    in _superficie double, 
	in _poblacion int
)
begin
	update country
    set name = _name, capital = _capital, language = _language, area = _area, population = _population
    where id = _id;
end;
// delimiter;   
--
delimiter //
create procedure country_delete(
	in _id int
)
begin
	delete from country where id = _id;
end;
// delimiter ;   

--

insert into country(name, capital, language, area, population) values
	('argentina', 'caba', 'español', 11111111, 10101010),
	('chile', 'santiago', 'español', 22222222, 20202020),
	('brasil', 'brasilia', 'portugues', 33333333, 30303030),
	('uruguay', 'montevideo', 'español', 44444444, 40404040),
	('bolivia', 'sucre', 'español', 55555555, 50505050);
    
-- 

call country_get_by_name('argentina');

call country_create('peru', 'lima', 'español', '66666666', '60606060');

call country_update(2, 'chile','sintiago', 'chileno','12345678','87654321');

call country_delete(5);

-- select * from paises

