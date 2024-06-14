import { useState } from "react";
import { useUpdateMe } from "../../hooks/User/useUpdateMe";
import FormRow from "../ui/FormRow/FormRow";
import "../../pages/Settings/Settings.less";
import toast from "react-hot-toast";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue === email && nameValue === name) {
      toast.error("No changes were made");
      return;
    }
    if (!emailValue || !nameValue) {
      toast.error("Email and name are required");
      return;
    }
    updateMe({ email: emailValue, name: nameValue });
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
        {/* <FormRow label='Email address'>
        <input className='input-secondary' type='email' id='email' />
      </FormRow> ??? AVATAR ???? */}
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
