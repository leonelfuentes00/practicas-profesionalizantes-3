abstract class Vehicles {
    public abstract String crear();
}

class Coche extends Vehicles {
    @Override
    public String crear() {
        return "Creando un auto";
    }
}

class Moto extends Vehicles {
    @Override
    public String crear() {
        return "Creando moto";
    }
}

class vehiclesFactory {
    public Vehicles crearVehiculo(String tipo) {
        if (tipo.equalsIgnoreCase("auto")) {
            return new Coche();
        } else if (tipo.equalsIgnoreCase("moto")) {
            return new Moto();
        } else {
            throw new IllegalArgumentException("Tipo de vehículo no soportado");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        vehiclesFactory factory = new vehiclesFactory();

        Vehicles auto = factory.crearVehiculo("auto");
        System.out.println(auto.crear()); 

        Vehicles moto = factory.crearVehiculo("moto");
        System.out.println(moto.crear());
    }
}
