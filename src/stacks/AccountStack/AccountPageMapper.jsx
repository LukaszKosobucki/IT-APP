import React from "react";
import { USER_TYPES } from "../../constants/userTypes";

const mappings = {};

mappings[USER_TYPES.organizer] = {
  innerComponents: [(props) => null],
  roleProps: { showAddButton: false },
};

mappings[USER_TYPES.trainer] = {
  innerComponents: [(props) => null],
  roleProps: { showAddButton: true },
};

mappings[USER_TYPES.sportsman] = {
  innerComponents: [(props) => null],
  roleProps: { showAddButton: true },
};

export { mappings };
