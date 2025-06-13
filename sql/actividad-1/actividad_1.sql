drop database actividad_1;
create database actividad_1;

use actividad_1;

create table paises (
	id int primary key auto_increment not null,
	nombre varchar(40),
    capital varchar(40),
	idioma varchar(20),
    superficie double,
    poblacion int);

-- 
delimiter //
create procedure obtenerDatosPorPais(
	in _nombre varchar(40)
)
begin
	select * from paises where nombre = _nombre;
end;
// delimiter;    

--
delimiter //
create procedure crearPais(
	in _nombre varchar(40),
    in _capital varchar(40),
    in _idioma varchar(20),
    in _superficie double, 
	in _poblacion int
)
begin
	insert into paises (nombre, capital, idioma, superficie, poblacion)
    values (_nombre, _capital, _idioma, _superficie, _poblacion);
end;
// delimiter;
--
delimiter //
create procedure editarPais(
	in _id int,
    in _nombre varchar(40),
    in _capital varchar(40),
    in _idioma varchar(20),
    in _superficie double, 
	in _poblacion int
)
begin
	update paises
    set nombre = _nombre, capital = _capital, idioma = _idioma, superficie = _superficie, poblacion = _poblacion
    where id = _id;
end;
// delimiter;   
--
delimiter //
create procedure eliminarPais(
	in _id int
)
begin
	delete from paises where id = _id;
end;
// delimiter ;   

--

insert into paises(nombre, capital, idioma, superficie, poblacion) values
	('argentina', 'caba', 'español', 11111111, 10101010),
	('chile', 'santiago', 'español', 22222222, 20202020),
	('brasil', 'brasilia', 'portugues', 33333333, 30303030),
	('uruguay', 'montevideo', 'español', 44444444, 40404040),
	('bolivia', 'sucre', 'español', 55555555, 50505050);
    
-- 

call obtenerDatosPorPais('argentina');

call crearPais('peru', 'lima', 'español', '66666666', '60606060');

call editarPais(2, 'chile','sintiago', 'chileno','12345678','87654321');

call eliminarPais(5);

-- select * from paises

