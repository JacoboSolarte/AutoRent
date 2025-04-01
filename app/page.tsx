"use client";

import { Car, CarFront, Calendar, DollarSign, User, Mail, Phone, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, SetStateAction } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";



const initialCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    description: "Vehículo eléctrico de lujo con autonomía de 350km",
    price: 75,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    category: "Eléctrico",
    isRented: false,
  },
  {
    id: 2,
    name: "BMW X5",
    description: "SUV deportiva con acabados premium y máximo confort",
    price: 120,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    category: "SUV",
    isRented: false,
  },
  {
    id: 3,
    name: "Mercedes Clase C",
    description: "Sedán ejecutivo con tecnología de última generación",
    price: 95,
    image: "https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&w=800&q=80",
    category: "Sedán",
    isRented: false,
  },
  {
    id: 4,
    name: "Tesla Model Y",
    description: "SUV eléctrico con amplio espacio interior y 400km de autonomía",
    price: 85,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
    category: "Eléctrico",
    isRented: false,
  },
  {
    id: 6,
    name: "Honda Civic",
    description: "Sedán compacto eficiente con excelente consumo de combustible",
    price: 65,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=800&q=80",
    category: "Sedán",
    isRented: false,
  },
  {
    id: 8,
    name: "Toyota RAV4",
    description: "SUV híbrido con bajo consumo y alta fiabilidad",
    price: 95,
    image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=800&q=80",
    category: "SUV",
    isRented: false,
  },
  {
    id: 9,
    name: "Toyota Camry",
    description: "Sedán espacioso con confort superior y tecnología híbrida",
    price: 85,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
    category: "Sedán",
    isRented: false,
  },
  {
    id: 13,
    name: "Porsche Taycan",
    description: "Deportivo eléctrico de alto rendimiento con 450km de autonomía",
    price: 180,
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80",
    category: "Eléctrico",
    isRented: false,
  },
  {
    id: 15,
    name: "BMW Serie 5",
    description: "Sedán ejecutivo con conducción deportiva y tecnología de vanguardia",
    price: 130,
    image: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80",
    category: "Sedán",
    isRented: false,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState(initialCars);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (!loginStatus) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const filteredCars = selectedCategory === "Todos" 
    ? cars 
    : cars.filter(car => car.category === selectedCategory);

  const handleReservation = (car: SetStateAction<null>) => {
    setSelectedCar(car);
  };

  const calculateTotalDays = () => {
    if (date.from && date.to) {
      return Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    if (selectedCar) {
      return selectedCar* calculateTotalDays();
    }
    return 0;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const handleSubmitReservation = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!selectedCar) {
      return;
    }
  
    // Actualizar el estado del auto a rentado
    setCars(prevCars => 
      prevCars.map(car => 
        car.id === selectedCar
          ? { ...car, isRented: true }
          : car
      )
    );
  
    setDialogOpen(false);
  };
  
  if (!isLoggedIn) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CarFront className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AutoRent</h1>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-4">
                {["Todos", "Eléctrico", "SUV", "Sedán"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
              <Button variant="outline" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <Card key={car.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${car.isRented ? 'opacity-75' : ''}`}>
              <div className="aspect-video relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="object-cover w-full h-full"
                />
                {car.isRented && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Rentado</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{car.name}</span>
                  <span className="text-blue-600 dark:text-blue-400 flex items-center">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {car.price}/día
                  </span>
                </CardTitle>
                <CardDescription>{car.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    {car.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {car.isRented ? 'No Disponible' : 'Disponible'}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => handleReservation(car)}
                      disabled={car.isRented}
                    >
                      {car.isRented ? 'No Disponible' : 'Reservar Ahora'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Reservar {car.name}</DialogTitle>
                      <DialogDescription>
                        Complete el formulario para reservar su vehículo
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReservation} className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <div className="flex">
                          <User className="w-4 h-4 mr-2 mt-3 text-gray-500" />
                          <Input id="name" placeholder="Juan Pérez" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <div className="flex">
                          <Mail className="w-4 h-4 mr-2 mt-3 text-gray-500" />
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="juan@ejemplo.com"
                            defaultValue={localStorage.getItem("userEmail") || ""}
                            required 
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <div className="flex">
                          <Phone className="w-4 h-4 mr-2 mt-3 text-gray-500" />
                          <Input id="phone" type="tel" placeholder="+34 600 000 000" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="card">Tarjeta de Crédito</Label>
                        <div className="flex">
                          <CreditCard className="w-4 h-4 mr-2 mt-3 text-gray-500" />
                          <Input id="card" placeholder="**** **** **** ****" required />
                        </div>
                      </div>
                      <Button type="submit" className="mt-4">
                        Confirmar Reserva
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}