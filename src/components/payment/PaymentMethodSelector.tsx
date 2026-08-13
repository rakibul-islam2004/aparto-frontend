"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Truck, Banknote, CheckCircle2 } from "lucide-react";

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string | null;
  onSelect: (methodId: string) => void;
}

export function PaymentMethodSelector({ methods, selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Select Payment Method</h3>
      <div className="grid grid-cols-1 gap-3">
        {methods.map((method) => (
          <Card
            key={method.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedMethod === method.id
                ? "border-primary bg-primary/5"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
            } ${method.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !method.disabled && onSelect(method.id)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                selectedMethod === method.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}>
                {method.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{method.name}</h4>
                  {selectedMethod === method.id && (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
