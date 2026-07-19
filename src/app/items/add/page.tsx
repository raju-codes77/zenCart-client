"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload, FiTag, FiDollarSign, FiPackage, FiInfo, FiAlignLeft, FiImage } from "react-icons/fi";
import Link from "next/link";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().max(200, "Max 200 characters").min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  category: z.enum(["electronics", "jewelery", "men's clothing", "women's clothing", "home", "sports"], {
    message: "Please select a valid category"
  }),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discountPrice: z.coerce.number().min(0, "Discount price cannot be negative").optional().or(z.literal("")),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  brand: z.string().optional(),
  condition: z.enum(["new", "used"], {
    message: "Please select condition"
  }),
  images: z.string().min(1, "At least one image URL is required"),
}).superRefine((data, ctx) => {
  if (typeof data.discountPrice === 'number' && data.discountPrice >= data.price) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Discount price must be less than price",
      path: ["discountPrice"]
    });
  }
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddItemPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      category: "electronics",
      price: 0,
      discountPrice: "",
      stock: 0,
      brand: "",
      condition: "new",
      images: "",
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login?from=/items/add");
      } else if (user?.role !== 'admin') {
        alert("This page is for store admins only.");
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-600"></div>
      </div>
    );
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        discountPrice: data.discountPrice === "" ? undefined : Number(data.discountPrice),
        images: data.images.split(",").map((url) => url.trim()).filter(Boolean),
      };

      await api.post("/products", payload);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // alert("Product added successfully!");
      router.push("/items/manage");
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || "Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 pl-11 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-400 dark:focus:bg-gray-800 dark:focus:ring-primary-400/20";
  const selectClasses =
    "w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 pl-11 text-gray-900 backdrop-blur-sm transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary-400 dark:focus:bg-gray-800 dark:focus:ring-primary-400/20 appearance-none";
  const textareaClasses =
    "w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 pl-11 text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-400 dark:focus:bg-gray-800 dark:focus:ring-primary-400/20 min-h-[120px]";
  const labelClasses = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            List a <span className="text-primary-600 dark:text-primary-400">Product</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Fill in the details below to start selling on ZenCart.
          </p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-xl backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-900/70 sm:p-10">
          {submitError && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className={labelClasses}>
                Product Title
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiTag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  {...register("title")}
                  className={inputClasses}
                />
              </div>
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            {/* Short Description */}
            <div>
              <label htmlFor="shortDescription" className={labelClasses}>
                Short Description
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiInfo className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="shortDescription"
                  type="text"
                  placeholder="Brief summary (max 200 characters)"
                  {...register("shortDescription")}
                  className={inputClasses}
                />
              </div>
              {errors.shortDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.shortDescription.message}</p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label htmlFor="fullDescription" className={labelClasses}>
                Full Description
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-3 left-0 flex items-center pl-3">
                  <FiAlignLeft className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="fullDescription"
                  placeholder="Detailed description of your product..."
                  {...register("fullDescription")}
                  className={textareaClasses}
                />
              </div>
              {errors.fullDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.fullDescription.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Category */}
              <div>
                <label htmlFor="category" className={labelClasses}>
                  Category
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiPackage className="h-5 w-5 text-gray-400" />
                  </div>
                  <select id="category" {...register("category")} className={selectClasses}>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="home">Home</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
              </div>

              {/* Condition */}
              <div>
                <label htmlFor="condition" className={labelClasses}>
                  Condition
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiTag className="h-5 w-5 text-gray-400" />
                  </div>
                  <select id="condition" {...register("condition")} className={selectClasses}>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Price */}
              <div>
                <label htmlFor="price" className={labelClasses}>
                  Price ($)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("price")}
                    className={inputClasses}
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
              </div>

              {/* Discount Price */}
              <div>
                <label htmlFor="discountPrice" className={labelClasses}>
                  Discount Price ($) <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="discountPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("discountPrice")}
                    className={inputClasses}
                  />
                </div>
                {errors.discountPrice && (
                  <p className="mt-1 text-sm text-red-500">{errors.discountPrice.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Stock */}
              <div>
                <label htmlFor="stock" className={labelClasses}>
                  Available Stock
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiPackage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="stock"
                    type="number"
                    placeholder="10"
                    {...register("stock")}
                    className={inputClasses}
                  />
                </div>
                {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock.message}</p>}
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand" className={labelClasses}>
                  Brand <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiTag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="brand"
                    type="text"
                    placeholder="Brand Name"
                    {...register("brand")}
                    className={inputClasses}
                  />
                </div>
                {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>}
              </div>
            </div>

            {/* Images */}
            <div>
              <label htmlFor="images" className={labelClasses}>
                Image URLs (comma-separated)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-3 left-0 flex items-center pl-3">
                  <FiImage className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="images"
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  {...register("images")}
                  className={textareaClasses}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Provide one or more full URLs to images of your product, separated by commas.
              </p>
              {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full justify-center overflow-hidden rounded-xl border border-transparent bg-primary-600 py-3.5 px-4 text-lg font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-gray-900"
              >
                <span className="absolute inset-0 bg-white/20 transition-all duration-300 group-hover:w-full w-0 ease-out h-full opacity-0 group-hover:opacity-100"></span>
                <span className="relative flex items-center gap-2">
                  <FiUpload className={`h-5 w-5 ${isSubmitting ? "animate-bounce" : ""}`} />
                  {isSubmitting ? "Listing Product..." : "List Product for Sale"}
                </span>
              </button>
            </div>
            
            <div className="mt-4 text-center">
               <Link href="/" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline transition-all">
                  Cancel and return to home
               </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
