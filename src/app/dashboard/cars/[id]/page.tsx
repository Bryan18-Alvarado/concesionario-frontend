"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarEditForm } from "../../../../components/cars/car-form";

function CarsEditPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Carro</CardTitle>
        </CardHeader>
        <CardContent>
          <CarEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CarsEditPage;
