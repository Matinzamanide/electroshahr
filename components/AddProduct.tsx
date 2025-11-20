"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface ProductForm {
  title: string;
  price: number;
  before_discount_price: number | null;
  inventory: number | null;
  brand: string;
  description: string;
  images: string[];
  categories: string[];
  features: string[];
}

export default function AddProduct() {
  const [form, setForm] = useState<ProductForm>({
    title: "",
    price: 0,
    before_discount_price: null,
    inventory: null,
    brand: "",
    description: "",
    images: [""],
    categories: [""],
    features: [""],
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    fieldArray?: keyof ProductForm
  ) => {
    const { name, value } = e.target;
    if (fieldArray !== undefined && index !== undefined) {
      const updatedArray = [...(form[fieldArray] as string[])];
      updatedArray[index] = value;
      setForm({ ...form, [fieldArray]: updatedArray });
    } else {
      const numFields: (keyof ProductForm)[] = ["price", "before_discount_price", "inventory"];
      setForm({
        ...form,
        [name]:
          numFields.includes(name as keyof ProductForm) && value !== ""
            ? Number(value)
            : value,
      });
    }
  };

  useEffect(()=>{
    console.log(form)
  },[form])

  const handleAddArrayItem = (fieldArray: keyof ProductForm) => {
    setForm({ ...form, [fieldArray]: [...(form[fieldArray] as string[]), ""] });
  };

  const handleRemoveArrayItem = (fieldArray: keyof ProductForm, index: number) => {
    const updatedArray = [...(form[fieldArray] as string[])];
    updatedArray.splice(index, 1);
    setForm({ ...form, [fieldArray]: updatedArray });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("https://apika.ir/electroshahr/insertProducts.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage({
        text: data.message || data.error || "محصول با موفقیت ثبت شد.",
        type: data.error ? "error" : "success",
      });
    } catch (err) {
      setMessage({ text: "خطا در اتصال به سرور.", type: "error" });
    }
  };

  const renderArrayFields = (field: keyof ProductForm, label: string) => {
    const items = form[field] as string[];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(e, idx, field)}
                placeholder={`مقدار ${label} را وارد کنید`}
                className="flex-1 px-3 py-2 text-right bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(field, idx)}
                  className="w-8 h-8 flex items-center justify-center text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
                  aria-label={`حذف ${label}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem(field)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <span>+</span> افزودن {label}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div dir="rtl" className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">افزودن محصول جدید</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* عنوان */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            عنوان محصول *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="نام محصول را وارد کنید"
            className="w-full px-4 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* قیمت‌ها و موجودی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              قیمت (تومان) *
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price || ""}
              onChange={handleChange}
              required
              min="0"
              placeholder="مثال: 1500000"
              className="w-full px-4 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="before_discount_price" className="block text-sm font-medium text-gray-700 mb-1">
              قیمت قبل از تخفیف
            </label>
            <input
              id="before_discount_price"
              type="number"
              name="before_discount_price"
              value={form.before_discount_price ?? ""}
              onChange={handleChange}
              min="0"
              placeholder="در صورت وجود"
              className="w-full px-4 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
              موجودی
            </label>
            <input
              id="inventory"
              type="number"
              name="inventory"
              value={form.inventory ?? ""}
              onChange={handleChange}
              min="0"
              placeholder="تعداد"
              className="w-full px-4 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* برند */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            برند
          </label>
          <input
            id="brand"
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="نام برند"
            className="w-full px-4 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* توضیحات */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            توضیحات
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="توضیحات کامل محصول..."
            className="w-full px-4 py-2 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* آرایه‌ها */}
        {renderArrayFields("images", "لینک تصاویر")}
        {renderArrayFields("categories", "دسته‌بندی‌ها")}
        {renderArrayFields("features", "ویژگی‌ها")}

        {/* دکمه ثبت */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          ثبت محصول
        </button>
      </form>

      {/* پیام موفقیت/خطا */}
      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-center font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}