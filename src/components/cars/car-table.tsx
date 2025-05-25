"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car } from "../../interfaces/car.interface";
import { deleteCar, getAllCars } from "../../app/api/cars.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";

interface CarsResponse {
  data: Car[];
  total: number;
}

export function CarTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [carsData, setCarsData] = useState<CarsResponse>({
    data: [],
    total: 0,
  });

  const loadCars = async (newOffset: number) => {
    const result = await getAllCars(newOffset, limit);
    setCarsData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadCars(0);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/cars/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Auto
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carsData.data.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">{car.id}</TableCell>
                <TableCell>{car.brand?.name || "Sin marca"}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.description || "sin descripcion"}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.stock}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/cars/${car.id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white :hover:bg-blue-700"
                      >
                        <BiPencil className="h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={async () => {
                        await deleteCar(car.id);
                        setCarsData((prev) => ({
                          ...prev,
                          data: prev.data.filter((c) => c.id !== car.id),
                          total: prev.total - 1,
                        }));
                      }}
                    >
                      <BiTrash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadCars(Math.max(offset - limit, 0))}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(carsData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= carsData.total}
          onClick={() => loadCars(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default CarTable;
