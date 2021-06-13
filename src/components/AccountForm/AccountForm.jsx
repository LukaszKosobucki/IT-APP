import React from "react";
import styles from "./AccountForm.module.css";
import { Input, Textarea } from "../shared/Inputs/Inputs";
import { Button, DarkButton } from "../shared/Buttons/Buttons";
import { USER_TYPES } from "../../constants/userTypes";
import {
  USER_LEVELS,
  USER_LEVELS_FOR_SELECT,
} from "../../constants/userLevels";
import Select from "../shared/Select/Select";

const userLayout = ({
  name,
  surname,
  sportId,
  level,
  description,
  onChange,
  hasChanges,
  onSelectChange,
  onFileChange,
  avatar,
  onAccept,
  onCancel,
  userData,
  sports,
}) => {
  return (
    <form>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={onCancel}>
          Cancel
        </Button>
        <DarkButton
          disabled={!hasChanges}
          className={styles.button}
          onClick={(event) => onAccept(event)}
        >
          Save changes
        </DarkButton>
      </div>
      {avatar && (
        <div className={styles.imageContainer}>
          <img src={avatar} />
        </div>
      )}
      <Input
        label={"Avatar"}
        className={styles.fileInput}
        type={"file"}
        onChange={onFileChange("avatar")}
        accept={"image/jpeg, image/png"}
      />
      <Input
        label={"Name"}
        type={"text"}
        onChange={onChange("name")}
        value={name || userData.name}
      />
      {userData.type !== USER_TYPES.organizer && (
        <Input
          label={"Surname"}
          value={surname || userData.surname}
          onChange={onChange("surname")}
        />
      )}
      {userData.type === USER_TYPES.sportsman && (
        <>
          <Select
            label={"Sport"}
            value={
              sports.find((sport) => sport.value === sportId) ||
              sports.find((sport) => sport.value === userData.sportId)
            }
            options={sports}
            onChange={onSelectChange("sportId")}
          />
          <Select
            label={"Level"}
            value={
              USER_LEVELS_FOR_SELECT.find((option) => option.value === level) ||
              USER_LEVELS_FOR_SELECT.find(
                (option) => option.value === userData.level
              )
            }
            options={USER_LEVELS_FOR_SELECT}
            onChange={onSelectChange("level")}
          />
        </>
      )}
      <Textarea
        className={styles.textarea}
        label={"Description"}
        value={description || userData.description}
        onChange={onChange("description")}
      />
    </form>
  );
};

export default userLayout;
