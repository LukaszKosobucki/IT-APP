import React from "react";
import styles from "./TeamForm.module.css";
import { Input, Textarea } from "../shared/Inputs/Inputs";
import { Button, DarkButton } from "../shared/Buttons/Buttons";
import { USER_LEVELS_FOR_SELECT } from "../../constants/userLevels";
import Select from "../shared/Select/Select";

const teamForm = ({
  name,
  sportId,
  level,
  description,
  onChange,
  hasChanges,
  onSelectChange,
  onFileChange,
  image,
  onAccept,
  onCancel,
  sports,
  team,
}) => {
  return (
    <form>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={onCancel}>
          Cancel
        </Button>
        <DarkButton disabled={!hasChanges} className={styles.button} onClick={onAccept}>
          Save changes
        </DarkButton>
      </div>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} />
        </div>
      )}
      <Input
        label={"Image"}
        className={styles.fileInput}
        type={"file"}
        onChange={onFileChange("image")}
        accept={"image/jpeg, image/png"}
      />
      <Input
        label={"Name"}
        type={"text"}
        onChange={onChange("name")}
        value={name || team?.name}
      />
      <Select
        label={"Sport"}
        value={
          sports?.find((sport) => sport.value === sportId) ||
          sports?.find((sport) => sport.value === team.sportId)
        }
        options={sports}
        onChange={onSelectChange("sportId")}
      />
      <Select
        label={"Level"}
        value={
          USER_LEVELS_FOR_SELECT.find((option) => option.value === level) ||
          USER_LEVELS_FOR_SELECT.find((option) => option.value === team?.level)
        }
        options={USER_LEVELS_FOR_SELECT}
        onChange={onSelectChange("level")}
      />
      <Textarea
        className={styles.textarea}
        label={"Description"}
        value={description || team.description}
        onChange={onChange("description")}
      />
    </form>
  );
};

export default teamForm;
