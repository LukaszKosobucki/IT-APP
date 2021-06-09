import React from "react";
import styles from "./EventLayout.module.css";
import { DarkButton } from "../shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { EVENT_EDIT } from "../../constants/paths";
import { Input } from "../shared/Inputs/Inputs";
import Moment from "moment";
import { Table } from "../shared/Table/Table";

const Brakets = () => {};

const EventLayout = ({ event, sports, template, headers, participants }) => {
  return (
    event && (
      <div className={styles.eventLayout}>
        <div className={styles.sideInfo}>
          <div className={styles.imageContainer}>
            {event.imageURL && <img src={event.imageURL} />}
          </div>
          <Input
            label={"Sport"}
            disabled
            value={
              sports?.find((sport) => sport.value === event.sportId)?.label
            }
          />
          <Input label={"Scale"} disabled value={event.scale} />
          <Input
            label={"Start date"}
            disabled
            value={Moment(event.startDate?.toDate()).format("DD/MM/Y hh:mm")}
          />
          <Input
            label={"End date"}
            disabled
            value={Moment(event.endDate?.toDate()).format("DD/MM/Y hh:mm")}
          />
          <Input label={"Mode"} disabled value={event.name} />
          <Input label={"Type"} disabled value={event.type} />
          <Input label={"Level"} disabled value={event.level} />
        </div>
        <div className={styles.mainInfo}>
          {/*<Link to={EVENT_EDIT(event.id)}>*/}
          {/*  <DarkButton className={styles.editButton}>Edit event</DarkButton>*/}
          {/*</Link>*/}
          {/*<DarkButton className={styles.editButton}>*/}
          {/*  Sign up for event*/}
          {/*</DarkButton>*/}
          {/*<DarkButton className={styles.editButton}>*/}
          {/*  Random lader generator*/}
          {/*</DarkButton>*/}
          <div className={styles.partContainer}>
            <h3 className={styles.partTitle}>Description:</h3>
            <p>{event.description}</p>
          </div>
          <div className={styles.partContainer}>
            <h4>
              The ladder was not generated yet. Do you want to generate it?
            </h4>
            <DarkButton className={styles.editButton}>
              Random lader generator
            </DarkButton>
          </div>
          <div className={styles.partContainer}>
            <h3 className={styles.partTitle}>Participants:</h3>
            <Table template={template} headers={headers} data={participants} />
          </div>
        </div>
      </div>
    )
  );
};

export default EventLayout;
