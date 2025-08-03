'use client'

import z, { } from "zod"

import { trpc } from "@/trpc/client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { videoUpdateSchema } from "@/db/schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { UseFormReturn } from "react-hook-form"

interface CategoriesSectionProps {
  form: UseFormReturn<z.infer<typeof videoUpdateSchema>>
}

export const CategoriesSection = ({form}:CategoriesSectionProps) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                < CategoriesSectionSuspense form={form} />
            </ErrorBoundary>
        </Suspense>
    )
}


const CategoriesSectionSuspense = ({form}:CategoriesSectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery()

    return (
        <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        Category
                    </FormLabel>
                    <Select onValueChange={field.onChange}
                        defaultValue={field.value ?? undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}