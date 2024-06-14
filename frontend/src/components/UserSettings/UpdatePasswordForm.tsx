import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdatePassword } from "../../hooks/Auth/useUpdatePassword";
import FormRow from "../ui/FormRow/FormRow";
import "../../pages/Settings/Settings.less";

const UpdatePasswordForm = () => {
  const { updatePassword, isLoading } = useUpdatePassword();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    updatePassword({ password, newPassword, passwordConfirm: confirmPassword });
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="settings__container">
      <h2 className="settings__container__title">Update user data</h2>
      <form className="settings__container__form" onSubmit={handleSubmit}>
        <FormRow label="Current password">
          <input
            disabled={isLoading}
            className="input-secondary"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <FormRow label="New password">
          <input
            disabled={isLoading}
            className="input-secondary"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormRow>
        <FormRow label="Confirm password">
          <input
            disabled={isLoading}
            className="input-secondary"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <button
            disabled={isLoading}
            className="settings__container__form__btn"
            type="submit"
          >
            Update password
          </button>
        </FormRow>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
