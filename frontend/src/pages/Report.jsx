import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reportissue.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

function ClickToSetMarker({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function clampText(s, max) {
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
}

export default function Report() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road / Potholes");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [coords, setCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState([41.3275, 19.8187]); // Tirana default (can be any)

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const TITLE_MAX = 70;
  const DESC_MAX = 600;

  const CATEGORY_OPTIONS = useMemo(
    () => [
      "Road / Potholes",
      "Street Lighting",
      "Garbage & Sanitation",
      "Water Issues",
      "Electricity",
      "Emergency Hazard",
    ],
    []
  );

  function onPickFile(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(t("report.errors.imageOnly") || "Please upload an image file.");
      return;
    }

    // 5MB soft limit
    if (file.size > 5 * 1024 * 1024) {
      setError(t("report.errors.imageTooLarge") || "Image is too large (max 5MB).");
      return;
    }

    setError("");
    setPhoto(file);

    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  }

  function clearPhoto() {
    setPhoto(null);
    setPhotoPreview("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function useMyLocation() {
    if (!navigator.geolocation) {
      setError(t("report.errors.geoNotSupported") || "Geolocation is not supported.");
      return;
    }

    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setMapCenter([lat, lng]);
      },
      () => {
        setError(
          t("report.errors.geoDenied") ||
            "Location permission denied. Please click on the map instead."
        );
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function clearMarker() {
    setCoords(null);
  }

  function validate() {
    const cleanTitle = title.trim();
    const cleanCity = city.trim();
    const cleanDesc = description.trim();

    if (!cleanTitle || !cleanCity || !cleanDesc) {
      return t("report.errors.required") || "Please fill all required fields.";
    }
    if (cleanTitle.length < 5) {
      return t("report.errors.titleShort") || "Title is too short.";
    }
    if (cleanDesc.length < 15) {
      return t("report.errors.descShort") || "Description is too short.";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert(t("report.errors.loginRequired") || "You must login first");
      return;
    }

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("category", category);
      fd.append("city", city.trim());
      fd.append("description", description.trim());

      if (coords) {
        fd.append("latitude", coords.lat);
        fd.append("longitude", coords.lng);
      }

      if (photo) fd.append("photo", photo);

      const res = await fetch(`${API_URL}/api/reports`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (res.ok) {
        navigate("/my-reports");
      } else {
        let msg = t("report.errors.submitFail") || "Failed to submit report";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {
          msg = t("report.errors.submitFail") || "Failed to submit report";
        }
        setError(msg);
      }
    } catch {
      setError(t("report.errors.submitFail") || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="report-page">
      <div className="report-hero">
        <div className="report-hero-inner">
          <h1 className="report-title">{t("report.title")}</h1>
          <p className="report-subtitle">{t("report.subtitle")}</p>

          <div className="report-hero-tips">
            <div className="tip-pill">📝 {t("report.tips.clearTitle") || "Use a clear title"}</div>
            <div className="tip-pill">📍 {t("report.tips.addLocation") || "Add location if possible"}</div>
            <div className="tip-pill">📷 {t("report.tips.photoHelps") || "Photo helps faster resolution"}</div>
          </div>
        </div>
      </div>

      <div className="report-wrap">
        <form className="report-card" onSubmit={handleSubmit}>
          <div className="report-card-head">
            <div>
              <h2 className="report-card-title">
                {t("report.sections.details") || "Issue details"}
              </h2>
              <p className="report-card-sub">
                {t("report.sections.detailsSub") || "Tell us what happened and where."}
              </p>
            </div>

            <div className="report-actions-top">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={useMyLocation}
              >
                📍 {t("report.actions.useMyLocation") || "Use my location"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setTitle("");
                  setCity("");
                  setDescription("");
                  setCategory("Road / Potholes");
                  clearMarker();
                  clearPhoto();
                  setError("");
                }}
              >
                ↺ {t("report.actions.reset") || "Reset"}
              </button>
            </div>
          </div>

          {error ? <div className="report-alert">{error}</div> : null}

          <div className="report-grid">
            {/* LEFT: Fields */}
            <div className="report-fields">
              <div className="field">
                <div className="field-row">
                  <label>{t("report.fields.issueTitle")}</label>
                  <span className="counter">
                    {title.length}/{TITLE_MAX}
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(clampText(e.target.value, TITLE_MAX))}
                  placeholder={t("report.placeholders.issueTitle")}
                  required
                />
                <div className="hint">
                  {t("report.hints.title") ||
                    "Example: “Pothole near Central Ave causing traffic.”"}
                </div>
              </div>

              <div className="field">
                <label>{t("report.fields.category")}</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>{t("report.fields.city")}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t("report.placeholders.city")}
                  required
                />
              </div>

              <div className="field">
                <div className="field-row">
                  <label>{t("report.fields.description")}</label>
                  <span className="counter">
                    {description.length}/{DESC_MAX}
                  </span>
                </div>

                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) =>
                    setDescription(clampText(e.target.value, DESC_MAX))
                  }
                  placeholder={t("report.placeholders.description")}
                  required
                />
                <div className="hint">
                  {t("report.hints.description") ||
                    "Include what you saw, how long it’s been happening, and any safety concerns."}
                </div>
              </div>

              {/* Photo upload */}
              <div className="field">
                <label>{t("report.fields.photo")}</label>

                <div
                  className="upload-box"
                  onClick={() => fileRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") fileRef.current?.click();
                  }}
                >
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <b>{t("report.upload.title") || "Add a photo (optional)"}</b>
                    <div className="muted">
                      {t("report.upload.subtitle") ||
                        "JPG/PNG • up to 5MB • helps admins verify faster"}
                    </div>
                  </div>

                  <div className="upload-cta">
                    {t("report.upload.button") || "Choose file"}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickFile(e.target.files?.[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {photoPreview ? (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="preview" />
                    <div className="photo-meta">
                      <div className="photo-name">{photo?.name}</div>
                      <button
                        type="button"
                        className="btn btn-danger-outline"
                        onClick={clearPhoto}
                      >
                        {t("report.actions.removePhoto") || "Remove"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="submit-row">
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting
                    ? t("report.actions.submitting") || "Submitting..."
                    : t("report.actions.submit") || "Submit Report"}
                </button>

                <div className="submit-hint">
                  {t("report.hints.submit") ||
                    "After submitting, you can track progress in “My Reports”."}
                </div>
              </div>
            </div>

            {/* RIGHT: Map */}
            <div className="report-map">
              <div className="map-card">
                <div className="map-head">
                  <div>
                    <div className="map-title">
                      {t("report.fields.map") || "Map Location (optional)"}
                    </div>
                    <div className="map-sub">
                      {t("report.hints.map") ||
                        "Click on the map to pin the location. You can also use your current location."}
                    </div>
                  </div>

                  <div className="map-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={useMyLocation}
                    >
                      📍 {t("report.actions.useMyLocation") || "Use my location"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={clearMarker}
                      disabled={!coords}
                      title={coords ? "" : (t("report.actions.noMarker") || "No marker set")}
                    >
                      ✖ {t("report.actions.clearMarker") || "Clear"}
                    </button>
                  </div>
                </div>

                <div className="map-wrap">
                  <MapContainer
                    center={mapCenter}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ClickToSetMarker setCoords={setCoords} />
                    {coords && <Marker position={[coords.lat, coords.lng]} />}
                  </MapContainer>
                </div>

                <div className="map-footer">
                  {coords ? (
                    <div className="coords-pill">
                      ✅ {t("report.selected") || "Selected"}:{" "}
                      <b>{coords.lat.toFixed(5)}</b>, <b>{coords.lng.toFixed(5)}</b>
                    </div>
                  ) : (
                    <div className="coords-pill muted">
                      {t("report.hints.noLocation") ||
                        "No location selected. (You can submit without a location.)"}
                    </div>
                  )}
                </div>
              </div>

              <div className="mini-info">
                <div className="mini-info-title">
                  {t("report.side.title") || "What happens next?"}
                </div>
                <ul className="mini-list">
                  <li>{t("report.side.step1") || "Your report is saved and shown to admins."}</li>
                  <li>{t("report.side.step2") || "Admins review and update status."}</li>
                  <li>{t("report.side.step3") || "Track changes in “My Reports”."}</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
