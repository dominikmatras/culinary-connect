import { FC, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import "./ProfilePictureInput.less";
import { useUser } from "../../../hooks/User/useUser";

interface ProfilePictureInputProps {
  onFileChange: (file: File | null) => void;
  disabled: boolean;
}

const ProfilePictureInput: FC<ProfilePictureInputProps> = ({ onFileChange, disabled = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useUser();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      onFileChange(e.target.files[0]);
    }
  };

  const onChooseFile = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div className="profile-picture-input">
      <input
        type="file"
        ref={inputRef}
        onChange={onChangeHandler}
        style={{ display: "none" }}
      />
      {selectedFile ? (
        <div
          className="profile-picture-input__image"
          style={{ backgroundImage: `url(${URL.createObjectURL(selectedFile)})` }}
        />
      ) : (
        <div
          className="profile-picture-input__image"
          style={{ backgroundImage: `url(${user?.profilePicture ? user.profilePicture : "./profileEmpty.jpg"})` }}
        />
      )}
      <button className="profile-picture-input__button" onClick={onChooseFile} disabled={disabled}>
        <FiUpload className="profile-picture-input__icon" />
        <span>Upload File</span>
      </button>
    </div>
  );
};

export default ProfilePictureInput;
