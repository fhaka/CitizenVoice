import { useState } from "react";
import PhonePrefix from "../components/PhonePrefix";
import "./Contact.css";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    prefix: "+355",
    phone: "",
    topic: "",
    description: "",
  });

  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          email: formData.email,
          prefix: formData.prefix,
          phone: formData.phone,
          topic: formData.topic,
          description: formData.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message");

      alert(t("contact.success"));
      setFormData({
        email: "",
        prefix: "+355",
        phone: "",
        topic: "",
        description: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  }


  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.subtitle")}</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>{t("contact.fields.email")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("contact.placeholders.email")}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>{t("contact.fields.phone")}</label>
          <PhonePrefix
            prefix={formData.prefix}
            phone={formData.phone}
            onChange={handleChange}
          />

          <label>{t("contact.fields.topic")}</label>
          <input
            type="text"
            name="topic"
            placeholder={t("contact.placeholders.topic")}
            value={formData.topic}
            onChange={handleChange}
            required
          />

          <label>{t("contact.fields.description")}</label>
          <textarea
            name="description"
            rows="5"
            placeholder={t("contact.placeholders.description")}
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button className="contact-submit" type="submit" disabled={sending}>
            {sending ? t("contact.sending") : t("contact.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
