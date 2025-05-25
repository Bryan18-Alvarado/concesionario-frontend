"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { useRouter, useParams } from "next/navigation";
import { BrandData } from "../../interfaces/brand.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addBrand, updateBrand } from "../../app/api/brands.api";

export const metadata = {
  title: "Agregar Marca",
  description: "Agregar una nueva marca al sistema",
};

export function BrandForm() {
  const { register, handleSubmit } = useForm<BrandData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await addBrand(data);
    router.push("/dashboard/brands/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />

      <Button className={buttonVariants({ variant: "agregar" })}>
        Agregar Marca
      </Button>
    </form>
  );
}

export function BrandEditForm() {
  const { id } = useParams();
  const router = useRouter();

  const { register, handleSubmit } = useForm<BrandData>({});

  const onSubmit = handleSubmit(async (data) => {
    await updateBrand(Number(id), data);
    router.push("/dashboard/brands/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <Button className={`${buttonVariants({ variant: "ghost" })} mt-4`}>
        Guardar Cambios
      </Button>
    </form>
  );
}
