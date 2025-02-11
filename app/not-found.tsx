import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 flex flex-col items-center">
          <CardHeader className="flex flex-col items-center mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">404 Página não encontrada</h1>
          </CardHeader>
          <p className="text-center text-muted-foreground">
            A página que você está procurando não foi encontrada.
          </p>
          <Link href={"/"}>Voltar à página inicial</Link>
        </CardContent>
      </Card>
    </div>
  );
}
