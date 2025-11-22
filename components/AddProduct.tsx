"use client";

import { useState, ChangeEvent, FormEvent } from "react";

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

  // فایل تصویر
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    fieldArray?: keyof ProductForm
  ) => {
    const { name, value } = e.target;

    if (fieldArray !== undefined && index !== undefined) {
      const updated = [...(form[fieldArray] as string[])];
      updated[index] = value;
      setForm({ ...form, [fieldArray]: updated });
      return;
    }

    const numberFields: (keyof ProductForm)[] = [
      "price",
      "before_discount_price",
      "inventory",
    ];

    setForm({
      ...form,
      [name]: numberFields.includes(name as keyof ProductForm)
        ? value === ""
          ? null
          : Number(value)
        : value,
    });
  };

  const addItem = (field: keyof ProductForm) =>
    setForm({ ...form, [field]: [...(form[field] as string[]), ""] });

  const removeItem = (field: keyof ProductForm, index: number) => {
    const arr = [...(form[field] as string[])];
    arr.splice(index, 1);
    setForm({ ...form, [field]: arr });
  };

  // ===============================
  //  ارسال فرم همراه با آپلود تصویر
  // ===============================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      let uploadedImageURL = null;

      // اگر فایل انتخاب شده بود → آپلود تصویر
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgRes = await fetch(
          "https://apika.ir/electroshahr/uploadImage.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const imgData = await imgRes.json();

        if (!imgData.url) {
          setMessage({ text: "آپلود تصویر انجام نشد!", type: "error" });
          return;
        }

        uploadedImageURL = imgData.url;
        form.images[0] = uploadedImageURL;
      }

      // ارسال بقیه اطلاعات محصول
      const res = await fetch(
        "https://apika.ir/electroshahr/insertProducts.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      setMessage({
        text: data.message || data.error || "محصول با موفقیت ثبت شد.",
        type: data.error ? "error" : "success",
      });
    } catch (error) {
      setMessage({ text: "خطا در اتصال به سرور", type: "error" });
    }
  };

  const renderArray = (field: keyof ProductForm, label: string) => {
    const items = form[field] as string[];

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => handleChange(e, i, field)}
                className="flex-1 p-2 border rounded"
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(field, i)}
                  className="bg-red-500 text-white w-8 h-8 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addItem(field)}
            className="text-blue-600"
          >
            + افزودن {label}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div dir="rtl" className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">افزودن محصول جدید</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>عنوان محصول</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* قیمت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>قیمت *</label>
            <input
              type="number"
              name="price"
              value={form.price ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label>قبل از تخفیف</label>
            <input
              type="number"
              name="before_discount_price"
              value={form.before_discount_price ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>موجودی</label>
            <input
              type="number"
              name="inventory"
              value={form.inventory ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* برند */}
        <div>
          <label>برند</label>
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* توضیحات */}
        <div>
          <label>توضیحات</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* آپلود تصویر */}
        <div>
          <label>آپلود تصویر</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* آرایه‌ها */}
        {renderArray("images", "تصاویر")}
        {renderArray("categories", "دسته‌بندی")}
        {renderArray("features", "ویژگی‌ها")}

        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded"
        >
          ثبت محصول
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 p-3 rounded text-center ${
            message.type === "success"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
