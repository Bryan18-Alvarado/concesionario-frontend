"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CarData } from "../../interfaces/car.interface";
import { getAllBrands } from "../../app/api/brands.api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { addCar } from "@/app/api/cars.api";

export function CarForm() {
  const { register, handleSubmit, setValue } = useForm<CarData>();
  const router = useRouter();
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getAllBrands(0, 100);
      setBrands(res.data);
    };
    fetchBrands();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await addCar(data);
    router.push("/dashboard/cars/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label>Modelo</Label>
      <Input {...register("model")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <Label>Año</Label>
      <Input type="number" {...register("year")} />
      <Label>Stock</Label>
      <Input type="number" {...register("stock")} />
      <Label>Precio</Label>
      <Input type="number" {...register("price")} />

      <Label>Marca</Label>
      <Select onValueChange={(value) => setValue("brand_id", parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona una Marca" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className={buttonVariants({ variant: "agregar" })}>
        Agregar Auto
      </Button>
    </form>
  );
}
