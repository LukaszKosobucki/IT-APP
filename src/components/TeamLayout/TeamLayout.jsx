import React from "react";
import styles from "./TeamLayout.module.css";
import { Input, Textarea } from "../shared/Inputs/Inputs";
import classnames from "classnames";
import Moment from "moment";
import { DarkButton } from "../shared/Buttons/Buttons";
import { Table } from "../shared/Table/Table";
import { Link } from "react-router-dom";
import { USER } from "../../constants/paths";
import { USER_LEVELS_FOR_SELECT } from "../../constants/userLevels";

const TeamLayout = ({ team, sports, teamMembers }) => (
  <div className={styles.teamLayout}>
    <div className={styles.sideInfo}>
      <div className={styles.imageContainer}>
        {team.imageURL && <img src={team.imageURL} />}
      </div>
      <Input
        label={"Sport"}
        disabled
        value={sports?.find((sport) => sport.value === team.sportId)?.label}
      />
      <Input
        label={"Level"}
        disabled
        value={
          USER_LEVELS_FOR_SELECT?.find((level) => level.value === team.level)
            ?.label
        }
      />
      <Link className={styles.link} to={USER(team.trainerId)}>
        Click here to see a trainer
      </Link>
    </div>
    <div className={styles.mainInfo}>
      <div className={styles.partContainer}>
        <h3 className={styles.partTitle}>Description:</h3>
        <p>{team.description}</p>
      </div>
      <div className={styles.partContainer}>
        <h3 className={styles.partTitle}>Members:</h3>
        <div className={styles.membersContainer}>
          {teamMembers.map((member) => (
            <Link
              to={USER(member.id)}
              className={styles.memberCard}
              key={member.id}
            >
              <div className={styles.smallImageContainer}>
                {member.avatarURL && <img src={member.avatarURL} />}
              </div>
              <h4>{`${member.name} ${member.surname}`}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TeamLayout;
