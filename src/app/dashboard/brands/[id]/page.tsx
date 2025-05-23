import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandEditForm } from "../../../../components/brands/brand-form";

function BrandsEditPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsEditPage;
