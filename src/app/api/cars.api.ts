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
  const token = localStorage.getItem(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQ4MTUyNjMyLCJleHAiOjE3NDgxNTk4MzJ9.FRSrVgZIYXGuf_6Fhz8LB0E1n2EQhBltNz9v6ijtTnQ"
  );
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
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
