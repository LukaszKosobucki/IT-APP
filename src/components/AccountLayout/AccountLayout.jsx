import React from "react";
import styles from "./AccountLayout.module.css";
import { Input, Textarea } from "../shared/Inputs/Inputs";
import { USER_TYPES } from "../../constants/userTypes";
import { DarkButton } from "../shared/Buttons/Buttons";
import { USER_LEVELS } from "../../constants/userLevels";
import { Link } from "react-router-dom";
import { EDIT_ACCOUNT } from "../../constants/paths";

const HomePage = ({ userData, sports, noButton }) => (
  <div className={styles.accountLayout}>
    {!noButton && (
      <Link to={EDIT_ACCOUNT}>
        <DarkButton className={styles.editButton}>Edit account info</DarkButton>
      </Link>
    )}
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {userData.avatarURL && <img src={userData.avatarURL} />}
      </div>
      <div className={styles.infoContainer}>
        <Input label={"Email"} disabled value={userData.email} />
        <Input label={"Name"} disabled value={userData.name} />
        {userData.type !== USER_TYPES.organizer && (
          <Input label={"Surname"} disabled value={userData.surname} />
        )}
        {userData.type === USER_TYPES.sportsman && (
          <>
            <Input
              label={"Sport"}
              disabled
              value={
                sports
                  ? sports.find((sport) => sport.value === userData.sportId)
                      ?.label
                  : ""
              }
            />
            <Input
              label={"Level"}
              disabled
              value={USER_LEVELS[userData.level]}
            />
          </>
        )}
        <Textarea
          className={styles.textarea}
          label={"Description"}
          disabled
          value={userData.description}
        />
        {userData.type === USER_TYPES.organizer && (
          <>
            <Input
              label={"Verified"}
              disabled
              value={userData.verified.toString()}
            />
          </>
        )}
      </div>
    </div>
  </div>
);

export default HomePage;
