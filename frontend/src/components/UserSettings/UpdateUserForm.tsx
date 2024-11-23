import { useState } from "react";
import { useUpdateMe } from "../../hooks/User/useUpdateMe";
import FormRow from "../ui/FormRow/FormRow";
import toast from "react-hot-toast";
import ProfilePictureInput from "../ui/ProfilePictureInput/ProfilePictureInput";
import "../../pages/Settings/Settings.less";

type UpdateUserFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const { email, name } = user;
  const { updateMe, isLoading } = useUpdateMe();
  const [emailValue, setEmailValue] = useState(email);
  const [nameValue, setNameValue] = useState(name);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue === email && nameValue === name && !file) {
      toast.error("No changes were made");
      return;
    }
    if (!emailValue || !nameValue) {
      toast.error("Email and name are required");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("email", emailValue);
      formData.append("name", nameValue);

      if (file) {
        formData.append("profilePicture", file);
      }

      updateMe(formData);
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  return (
    <div className="settings__container">
      <h2 className="settings__container__title">Update user data</h2>
      <form className="settings__container__form" onSubmit={handleSubmit}>
        <FormRow label="Email address">
          <input
            disabled={isLoading}
            className="input-secondary"
            type="email"
            id="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </FormRow>
        <FormRow label="Name">
          <input
            disabled={isLoading}
            className="input-secondary"
            type="text"
            id="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </FormRow>
        <FormRow label="Profile picture">
          <ProfilePictureInput disabled={isLoading} onFileChange={handleFileChange} />
        </FormRow>
        <FormRow>
          <button
            disabled={isLoading}
            className="settings__container__form__btn"
            type="submit"
          >
            Update account
          </button>
        </FormRow>
      </form>
    </div>
  );
};

export default UpdateUserForm;
