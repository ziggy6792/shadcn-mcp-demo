import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider, type ControllerProps, type FieldPath, type FieldValues, type FormProviderProps } from 'react-hook-form';
import { cn } from '@/lib/utils';

const Form = FormProvider as unknown as <TFieldValues extends FieldValues, TContext = unknown, TTransformedValues extends FieldValues | undefined = undefined>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>
) => React.ReactElement;

interface FormItemContextValue {
  id: string;
}
const FormItemContext = React.createContext<FormItemContextValue>({ id: '' });

function useFormField() {
  const fieldContext = React.useContext(FormItemContext);
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormItem>');
  }
  const { id } = fieldContext;
  return { id };
}

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />;
};

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  const { id } = useFormField();
  return (
    <LabelPrimitive.Root
      htmlFor={id}
      className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      {...props}
    />
  );
}

function FormControl({ className, ...props }: React.ComponentPropsWithoutRef<typeof Slot>) {
  const { id } = useFormField();
  return <Slot id={id} className={className} {...props} />;
}

function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-[0.8rem] text-muted-foreground', className)} {...props} />;
}

function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const body = children ?? null;
  return (
    <p className={cn('text-[0.8rem] font-medium text-destructive', className)} {...props}>
      {body}
    </p>
  );
}

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
