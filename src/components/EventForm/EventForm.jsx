import React from "react";
import styles from "./EventForm.module.css";
import { Input, Textarea } from "../shared/Inputs/Inputs";
import { CustomDatePicker } from "../shared/Inputs/DateSelect";
import { Button, DarkButton } from "../shared/Buttons/Buttons";
import { EVENT_TYPE_FOR_SELECT, USER_TYPES } from "../../constants/userTypes";
import { USER_LEVELS_FOR_SELECT } from "../../constants/userLevels";
import Select from "../shared/Select/Select";

const eventForm = ({
  name,
  sportId,
  type,
  level,
  description,
  onChange,
  onSelectChange,
  onFileChange,
  image,
  onAccept,
  onCancel,
  sports,
  event,
  scale,
  startDate,
  endDate,
  onDateSelectChange,
}) => {
  return (
    <form>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={onCancel}>
          Cancel
        </Button>
        <DarkButton className={styles.button} onClick={onAccept}>
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
        value={name || event.name}
      />
      <Input
        label={"Scale"}
        type={"text"}
        onChange={onChange("scale")}
        value={scale || event.scale}
      />
      <Select
        label={"Type"}
        value={
          EVENT_TYPE_FOR_SELECT?.find(
            (eventType) => eventType.value === type
          ) ||
          EVENT_TYPE_FOR_SELECT?.find(
            (eventType) => eventType.value === event.type
          )
        }
        options={EVENT_TYPE_FOR_SELECT}
        onChange={onSelectChange("type")}
      />
      <CustomDatePicker
        label={"Start Date"}
        selected={startDate || event.startDate}
        onChange={onDateSelectChange("startDate")}
      />
      <CustomDatePicker
        label={"End Date"}
        selected={endDate || event.endDate}
        onChange={onDateSelectChange("endDate")}
      />
      <Select
        label={"Sport"}
        value={
          sports?.find((sport) => sport.value === sportId) ||
          sports?.find((sport) => sport.value === event.sportId)
        }
        options={sports}
        onChange={onSelectChange("sportId")}
      />
      <Select
        label={"Level"}
        value={
          USER_LEVELS_FOR_SELECT.find((option) => option.value === level) ||
          USER_LEVELS_FOR_SELECT.find((option) => option.value === event.level)
        }
        options={USER_LEVELS_FOR_SELECT}
        onChange={onSelectChange("level")}
      />
      <Textarea
        className={styles.textarea}
        label={"Description"}
        value={description || event.description}
        onChange={onChange("description")}
      />
    </form>
  );
};

export default eventForm;
