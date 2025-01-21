import React, { useState } from "react";
import { sendEmail } from "../utils/email";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    window.dataLayer.push({
      event: "form_submission",
      form_name: "contact_form",
      form_id: "contact_main",
    });

    try {
      await sendEmail(formData);
      setToastMessage("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
      setToastType("success");
      setShowToast(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setToastMessage("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Nombre
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='mt-1 p-2 block border-2 border-blue-200 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='mt-1 p-2 block border-2 border-blue-200 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
        <div>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
            Teléfono
          </label>
          <input
            type='tel'
            name='phone'
            id='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className='mt-1  p-2 block border-2 border-blue-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
        <div>
          <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
            Mensaje
          </label>
          <textarea
            name='message'
            id='message'
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className='mt-1 p-2 block border-2 border-blue-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed left-1/2 bottom-4 -translate-x-1/2 z-50 rounded-lg p-4 text-white shadow-lg transition-opacity duration-300 ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
