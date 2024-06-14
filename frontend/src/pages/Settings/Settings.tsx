import UpdatePasswordForm from "../../components/UserSettings/UpdatePasswordForm";
import UpdateUserForm from "../../components/UserSettings/UpdateUserForm";
import Spinner from "../../components/ui/Spinner/Spinner";
import { useUser } from "../../hooks/User/useUser";
import "./Settings.less";

const Settings = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <div className="settings">
      <h1 className="settings__title">Settings</h1>

      <UpdateUserForm user={user}/>
      <UpdatePasswordForm />
    </div>
  );
};

export default Settings;
