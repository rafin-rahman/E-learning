import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import React, { forwardRef } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema as formSchema } from "@/lib/zodSchema.js";

const SignInFormField = forwardRef<
  HTMLInputElement,
  {
    label: string;
    name: FieldPath<z.infer<typeof formSchema>>;
    placeholder: string;
    description?: string;
    inputType?: string;
    formControl: Control<z.infer<typeof formSchema>, any>;
  }
>(({ label, name, placeholder, description, inputType, formControl }, ref) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
              ref={ref}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

SignInFormField.displayName = "SignInFormField";

export default SignInFormField;
