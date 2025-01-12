import emailjs from "@emailjs/browser";

export const sendEmail = async (formData: any) => {
  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: "info@sundeco.com.ar",
    };

    const result = await emailjs.send("service_x6gfwzi", "template_eyvee6a", templateParams, "fJBB05iscgidunIyk");

    if (result.status !== 200) {
      throw new Error("Error al enviar el correo");
    }

    return result;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};
