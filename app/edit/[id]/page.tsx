"use client";

import { useState, useEffect, ChangeEvent, FormEvent, use } from "react";
import {
  Save,
  Plus,
  X,
  UploadCloud,
  Trash2,
  PackageCheck,
  ArrowRight,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";
import { IProduct } from "@/types/types";

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [form, setForm] = useState<IProduct | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [issubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    axios
      .get(`https://apitak.ir/electroshahr/getProducts.php?id=${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage({ text: "خطا در دریافت اطلاعات محصول", type: "error" });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    fieldArray?: keyof IProduct
  ) => {
    if (!form) return;

    const { name, value } = e.target;

    if (fieldArray !== undefined && index !== undefined) {
      const updated = [...(form[fieldArray] as string[])];
      updated[index] = value;
      setForm({ ...form, [fieldArray]: updated });
      return;
    }

    const numberFields = ["price", "before_discount_price", "inventory"];
    setForm({
      ...form,
      [name]: numberFields.includes(name)
        ? value === ""
          ? null
          : Number(value)
        : value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeExistingImage = (index: number) => {
    if (!form) return;
    const updatedImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updatedImages });
  };

  const addItem = (field: keyof IProduct) => {
    if (!form) return;
    setForm({ ...form, [field]: [...(form[field] as string[]), ""] });
  };

  const removeItem = (field: keyof IProduct, index: number) => {
    if (!form) return;
    const arr = [...(form[field] as string[])];
    arr.splice(index, 1);
    setForm({ ...form, [field]: arr });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setIsSubmitting(true);
    setMessage(null);

    try {
      let uploadedURLs: string[] = [...form.images];

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
        if (imgData.url) uploadedURLs.push(imgData.url);
      }

      const finalForm = { ...form, images: uploadedURLs };
      const res = await axios.post(
        "https://apitak.ir/electroshahr/updateProduct.php",
        finalForm
      );

      if (res.data) {
        setMessage({ text: "محصول با موفقیت به‌روزرسانی شد", type: "success" });
        setImageFiles([]);
      }
    } catch (error) {
      setMessage({ text: "خطا در ویرایش محصول", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <span className="font-black text-slate-400 animate-pulse uppercase tracking-widest">
          Fetching Data...
        </span>
      </div>
    );

  if (!form) return null;

  return (
    <div
      dir="rtl"
      className="max-w-5xl mx-auto my-12 p-6 lg:p-10 bg-white shadow-2xl shadow-slate-200/50 rounded-[3rem] border border-slate-50"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-50 pb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
            <PackageCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              ویرایش فنی محصول
            </h1>
            <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">
              Editor Mode • ID: {id}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all"
          >
            انصراف
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
              عنوان کامل محصول
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
              برند تجاری
            </label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-blue-50/30 p-6 rounded-4xl border border-blue-50/50">
          <div className="space-y-2">
            <label className="text-xs font-black text-blue-600 uppercase tracking-widest mr-2">
              قیمت نهایی (تومان)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-4 bg-white border border-blue-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 font-sans font-black text-xl text-blue-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
              قیمت قبل تخفیف
            </label>
            <input
              type="number"
              name="before_discount_price"
              value={form.before_discount_price ?? ""}
              onChange={handleChange}
              className="w-full p-4 bg-white border border-slate-100 rounded-2xl outline-none font-sans font-bold text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
              موجودی انبار
            </label>
            <input
              type="number"
              name="inventory"
              value={form.inventory ?? ""}
              onChange={handleChange}
              className="w-full p-4 bg-white border border-slate-100 rounded-2xl outline-none font-sans font-bold text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-black text-slate-800 tracking-tight">
            <ImageIcon size={18} className="text-blue-500" />
            مدیریت گالری تصاویر
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {form.images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-3xl overflow-hidden group border border-slate-100 shadow-sm"
              >
                <img
                  src={img}
                  className="w-full h-full object-contain p-2"
                  alt="product"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(idx)}
                  className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}

            {imageFiles.map((file, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-3xl overflow-hidden border-2 border-blue-200 opacity-60"
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                  alt="new"
                />
                <div className="absolute top-1 right-1 bg-blue-600 text-[8px] text-white px-2 py-1 rounded-full font-black">
                  NEW
                </div>
              </div>
            ))}

            <label className="aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all text-slate-400 hover:text-blue-600">
              <UploadCloud size={30} />
              <span className="text-[10px] font-black uppercase tracking-tighter">
                Add More
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2">
              دسته بندی ها{" "}
              <Plus
                size={16}
                className="text-blue-500 cursor-pointer"
                onClick={() => addItem("categories")}
              />
            </h3>
            {form.categories.map((cat, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={cat}
                  onChange={(e) => handleChange(e, i, "categories")}
                  className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-bold text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeItem("categories", i)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-slate-800 flex items-center gap-2">
              ویژگی‌های فنی{" "}
              <Plus
                size={16}
                className="text-blue-500 cursor-pointer"
                onClick={() => addItem("features")}
              />
            </h3>
            {form.features.map((feat, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={feat}
                  onChange={(e) => handleChange(e, i, "features")}
                  className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-bold text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeItem("features", i)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
            توضیحات تکمیلی
          </label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 font-medium leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={issubmitting}
          className={`w-full p-6 rounded-4xl font-black text-xl flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-[0.98] ${
            issubmitting
              ? "bg-slate-200 text-slate-400"
              : "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-100"
          }`}
        >
          {issubmitting
            ? "در حال ثبت تغییرات..."
            : "تأیید و به‌روزرسانی نهایی محصول"}
          {!issubmitting && <ArrowRight size={24} />}
        </button>
      </form>

      {message && (
        <div
          className={`mt-8 p-5 rounded-2xl text-center font-black animate-bounce ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
