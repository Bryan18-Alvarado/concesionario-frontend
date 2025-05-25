import { CarData, CarsResponse } from "@/interfaces/car.interface";

export async function getAllCars(
  offset: number = 0,
  limit: number = 5
): Promise<CarsResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/cars?offset=${Number(offset)}&limit=${Number(
      limit
    )}`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function addCar(carData: CarData) {
  //!Aqui va el token de autenticacion que genera cada 2 horas el backend

  const token = "Profesor, aqui escriba el token que le genera el postman";

  //? Profesor, Estos campos vienen como string desde el formulario/inputs
  //? pero el backend y la base de datos esperan valores numéricos,
  //? por eso los convertimos explícitamente a number antes de enviar.

  carData.year = +carData.year;
  carData.stock = +carData.stock;
  carData.price = +carData.price;
  carData.brand_id = +carData.brand_id;
  const res = await fetch("http://localhost:4000/api/v1/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  return await res.json();
}

export async function updateCar(id: number, carData: CarData) {
  const token = "Profesor, aqui escriba el token que le genera el postman";

  //! Aqui va el token de autenticacion que genera cada 2 horas el backend (http://localhost:4000/api/v1/cars)

  carData.year = +carData.year;
  carData.stock = +carData.stock;
  carData.price = +carData.price;
  carData.brand_id = +carData.brand_id;
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  return await res.json();
}
export async function deleteCar(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}
