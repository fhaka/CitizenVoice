import { useTranslation } from "react-i18next";

export default function PhonePrefix({ prefix, phone, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="phone-group">
      <select
        className="phone-prefix"
        name="prefix"
        value={prefix}
        onChange={onChange}
        required
      >
        <option value="+355">🇦🇱 Albania (+355)</option>
        <option value="+1">🇺🇸 United States (+1)</option>
        <option value="+44">🇬🇧 United Kingdom (+44)</option>
        <option value="+49">🇩🇪 Germany (+49)</option>
        <option value="+34">🇪🇸 Spain (+34)</option>
        <option value="+39">🇮🇹 Italy (+39)</option>
        <option value="+48">🇵🇱 Poland (+48)</option>
        <option value="+33">🇫🇷 France (+33)</option>
        <option value="+31">🇳🇱 Netherlands (+31)</option>
        <option value="+32">🇧🇪 Belgium (+32)</option>
        <option value="+41">🇨🇭 Switzerland (+41)</option>
        <option value="+43">🇦🇹 Austria (+43)</option>
        <option value="+351">🇵🇹 Portugal (+351)</option>
        <option value="+30">🇬🇷 Greece (+30)</option>
        <option value="+46">🇸🇪 Sweden (+46)</option>
        <option value="+47">🇳🇴 Norway (+47)</option>
        <option value="+45">🇩🇰 Denmark (+45)</option>
        <option value="+358">🇫🇮 Finland (+358)</option>
        <option value="+353">🇮🇪 Ireland (+353)</option>
        <option value="+36">🇭🇺 Hungary (+36)</option>
        <option value="+420">🇨🇿 Czech Republic (+420)</option>
        <option value="+421">🇸🇰 Slovakia (+421)</option>
        <option value="+40">🇷🇴 Romania (+40)</option>
        <option value="+359">🇧🇬 Bulgaria (+359)</option>
        <option value="+385">🇭🇷 Croatia (+385)</option>
        <option value="+381">🇷🇸 Serbia (+381)</option>
        <option value="+386">🇸🇮 Slovenia (+386)</option>
        <option value="+90">🇹🇷 Turkey (+90)</option>
        <option value="+7">🇷🇺 Russia (+7)</option>
        <option value="+20">🇪🇬 Egypt (+20)</option>
        <option value="+212">🇲🇦 Morocco (+212)</option>
        <option value="+234">🇳🇬 Nigeria (+234)</option>
        <option value="+27">🇿🇦 South Africa (+27)</option>
        <option value="+91">🇮🇳 India (+91)</option>
        <option value="+92">🇵🇰 Pakistan (+92)</option>
        <option value="+880">🇧🇩 Bangladesh (+880)</option>
        <option value="+81">🇯🇵 Japan (+81)</option>
        <option value="+82">🇰🇷 South Korea (+82)</option>
        <option value="+86">🇨🇳 China (+86)</option>
        <option value="+61">🇦🇺 Australia (+61)</option>
        <option value="+64">🇳🇿 New Zealand (+64)</option>
        <option value="+55">🇧🇷 Brazil (+55)</option>
        <option value="+52">🇲🇽 Mexico (+52)</option>
        <option value="+54">🇦🇷 Argentina (+54)</option>
      </select>

      <input
        type="tel"
        name="phone"
        placeholder={t("contact.placeholders.phone")}
        value={phone}
        onChange={onChange}
        required
      />
    </div>
  );
}
