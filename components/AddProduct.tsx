"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Plus, X, UploadCloud, PackagePlus, Trash2 } from "lucide-react";

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
    images: [],
    categories: [""],
    features: [""],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = (field: keyof ProductForm) =>
    setForm({ ...form, [field]: [...(form[field] as string[]), ""] });

  const removeItem = (field: keyof ProductForm, index: number) => {
    const arr = [...(form[field] as string[])];
    arr.splice(index, 1);
    setForm({ ...form, [field]: arr });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsUploading(true);

    try {
      const uploadedURLs: string[] = [
        ...form.images.filter((url) => url !== ""),
      ];

      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const imgRes = await fetch(
          "https://apitak.ir/electroshahr/uploadImage.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const imgData = await imgRes.json();
        if (imgData.url) {
          uploadedURLs.push(imgData.url);
        }
      }

      const finalForm = { ...form, images: uploadedURLs };

      const res = await fetch(
        "https://apitak.ir/electroshahr/insertProducts.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalForm),
        }
      );

      const data = await res.json();

      if (!data.error) {
        setMessage({
          text: "محصول و تمامی تصاویر با موفقیت ثبت شدند.",
          type: "success",
        });
        setImageFiles([]);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "خطا در اتصال به سرور", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const renderArray = (field: keyof ProductForm, label: string) => {
    const items = form[field] as string[];
    return (
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                placeholder={`${label} ${i + 1}`}
                onChange={(e) => handleChange(e, i, field)}
                className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => removeItem(field, i)}
                className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem(field)}
            className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-2 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} /> افزودن {label}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      dir="rtl"
      className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] border border-slate-50"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
          <PackagePlus size={28} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          پنل افزودن محصول جدید
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            عنوان محصول *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              قیمت نهایی (تومان) *
            </label>
            <input
              type="number"
              name="price"
              value={form.price ?? ""}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              قیمت قبل تخفیف
            </label>
            <input
              type="number"
              name="before_discount_price"
              value={form.before_discount_price ?? ""}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              تعداد در انبار
            </label>
            <input
              type="number"
              name="inventory"
              value={form.inventory ?? ""}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 tracking-tight">
            تصاویر گالری محصول
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="aspect-square border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group">
              <UploadCloud
                className="text-slate-400 group-hover:text-blue-500 transition-colors"
                size={32}
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">
                Click to Upload
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {imageFiles.map((file, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-4xl overflow-hidden border border-slate-100 group"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-2 left-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">نام برند</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              توضیحات کلی
            </label>
            <textarea
              name="description"
              rows={1}
              value={form.description}
              onChange={handleChange}
              className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderArray("categories", "دسته‌بندی")}
          {renderArray("features", "ویژگی‌های فنی")}
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full p-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-[0.98] ${
            isUploading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isUploading
            ? "در حال آپلود و ثبت اطلاعات..."
            : "تأیید و انتشار محصول"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 p-4 rounded-2xl text-center font-bold animate-bounce ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
