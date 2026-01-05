"use client";

import type { LucideIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  className?: string;
  inputClassName?: string;
};

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  className,
  inputClassName,
}: FormFieldProps<TFieldValues>) {
  const inputId = String(name);
  const errorId = error ? `form-${inputId}-error` : undefined;
  const hasIcon = Boolean(Icon);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {Icon ? (
          <Icon
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
        ) : null}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={inputId}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ""}
              className={cn(
                "h-10 bg-background/50 backdrop-blur-sm border-border/50 focus-visible:ring-2 focus-visible:ring-ring transition-all sm:h-11",
                hasIcon && "pl-10",
                error &&
                  "border-destructive focus-visible:ring-destructive pr-10",
                inputClassName
              )}
              aria-invalid={Boolean(error)}
              aria-describedby={errorId}
            />
          )}
        />
        {error ? (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive"
            aria-hidden="true"
          >
            <AlertCircle className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
